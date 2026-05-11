import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { candidatoCompetencias, competencies } from '@/lib/db/schema/competencies'
import { candidateProfiles } from '@/lib/db/schema/users'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'

function getUserIdFromToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return null
  const token = authHeader.split(' ')[1]
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
    return decoded.id
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromToken(request)
    if (!userId) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    // Get candidate profile
    const candidateProfile = await db.query.candidateProfiles.findFirst({
      where: eq(candidateProfiles.userId, userId)
    })

    if (!candidateProfile) {
      return NextResponse.json({ message: 'Perfil de candidato não encontrado' }, { status: 404 })
    }

    // Get candidate competencies
    const candidateComps = await db.query.candidatoCompetencias.findMany({
      where: eq(candidatoCompetencias.candidatoId, candidateProfile.id)
    })

    // Get competency details
    const competencyIds = candidateComps.map(c => c.competenciaId)
    
    if (competencyIds.length === 0) {
      return NextResponse.json([])
    }

    const allCompetencies = await db.query.competencies.findMany()
    const candidateCompetenciesList = allCompetencies.filter(c => competencyIds.includes(c.id))

    return NextResponse.json(candidateCompetenciesList)
  } catch (error) {
    console.error('Erro ao buscar competências do candidato:', error)
    return NextResponse.json(
      { message: 'Erro ao buscar competências' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromToken(request)
    if (!userId) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    const { competencyIds } = await request.json()

    if (!Array.isArray(competencyIds)) {
      return NextResponse.json(
        { message: 'competencyIds deve ser um array' },
        { status: 400 }
      )
    }

    // Validação: mínimo 4 competências
    if (competencyIds.length < 4) {
      return NextResponse.json(
        { message: 'Adicione no mínimo 4 competências para completar seu perfil.' },
        { status: 400 }
      )
    }

    // Get candidate profile
    const candidateProfile = await db.query.candidateProfiles.findFirst({
      where: eq(candidateProfiles.userId, userId)
    })

    if (!candidateProfile) {
      return NextResponse.json({ message: 'Perfil de candidato não encontrado' }, { status: 404 })
    }

    // Remove existing competencies
    await db.delete(candidatoCompetencias)
      .where(eq(candidatoCompetencias.candidatoId, candidateProfile.id))

    // Insert new competencies
    for (const competencyId of competencyIds) {
      await db.insert(candidatoCompetencias).values({
        candidatoId: candidateProfile.id,
        competenciaId: competencyId,
        createdAt: new Date()
      })
    }

    return NextResponse.json({ 
      message: 'Competências salvas com sucesso',
      count: competencyIds.length 
    })
  } catch (error: any) {
    console.error('Erro ao salvar competências:', error)
    return NextResponse.json(
      { message: 'Erro ao salvar competências: ' + (error.message || 'Erro interno') },
      { status: 500 }
    )
  }
}

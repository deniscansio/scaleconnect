import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { candidateProfiles } from '@/lib/db/schema/users'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'

// Helper para obter o ID do usuário do token
async function getUserIdFromToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null
  
  const token = authHeader.split(' ')[1]
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret-key')
    return decoded.id
  } catch (e) {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromToken(request)
    if (!userId) return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })

    const profile = await db.query.candidateProfiles.findFirst({
      where: eq(candidateProfiles.userId, userId)
    })

    return NextResponse.json(profile || {})
  } catch (error) {
    console.error('Get profile error:', error)
    return NextResponse.json({ message: 'Erro ao buscar perfil' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromToken(request)
    if (!userId) return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })

    const data = await request.json()
    
    // Verificar se perfil já existe
    const existingProfile = await db.query.candidateProfiles.findFirst({
      where: eq(candidateProfiles.userId, userId)
    })

    if (existingProfile) {
      // Atualizar
      await db.update(candidateProfiles)
        .set({
          ...data,
          updatedAt: new Date()
        })
        .where(eq(candidateProfiles.userId, userId))
    } else {
      // Criar novo
      await db.insert(candidateProfiles).values({
        ...data,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    return NextResponse.json({ message: 'Perfil salvo com sucesso' })
  } catch (error) {
    console.error('Save profile error:', error)
    return NextResponse.json({ message: 'Erro ao salvar perfil' }, { status: 500 })
  }
}

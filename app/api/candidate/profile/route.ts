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

// ========================
// GET - Buscar perfil
// ========================
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromToken(request)
    if (!userId) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    const profile = await db.query.candidateProfiles.findFirst({
      where: eq(candidateProfiles.userId, userId)
    })

    return NextResponse.json(profile || {})
  } catch (error) {
    console.error('Get profile error:', error)
    return NextResponse.json({ message: 'Erro ao buscar perfil' }, { status: 500 })
  }
}

// ========================
// POST - Criar ou atualizar perfil
// ========================
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromToken(request)
    if (!userId) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    const data = await request.json()

    const existingProfile = await db.query.candidateProfiles.findFirst({
      where: eq(candidateProfiles.userId, userId)
    })

    const profileData = {
      fullName: data.fullName,
      age: data.age,
      gender: data.gender,
      phone: data.phone,
      linkedinUrl: data.linkedinUrl,
      profilePhoto: data.profilePhoto,
      currentPosition: data.currentPosition,
      currentCompany: data.currentCompany,
      currentSalary: data.currentSalary,
      yearsOfExperience: data.yearsOfExperience,
      bio: data.bio,
      skills: JSON.stringify(data.skills || []),
      updatedAt: new Date()
    }

    if (existingProfile) {
      // Atualizar
      await db.update(candidateProfiles)
        .set(profileData)
        .where(eq(candidateProfiles.userId, userId))
    } else {
      // Criar novo
      await db.insert(candidateProfiles).values({
        userId: userId,
        ...profileData,
        createdAt: new Date()
      })
    }

    return NextResponse.json({ message: 'Perfil salvo com sucesso' })

  } catch (error) {
    console.error('Save profile error:', error)
    return NextResponse.json({ message: 'Erro ao salvar perfil' }, { status: 500 })
  }
}

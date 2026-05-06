import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { candidateProfiles, users } from '@/lib/db/schema/users'
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

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId)
    })

    const profile = await db.query.candidateProfiles.findFirst({
      where: eq(candidateProfiles.userId, userId)
    })

    const mergedProfile = {
      ...profile,
      fullName: user?.fullName || '',
      email: user?.email || '',
    }

    return NextResponse.json(mergedProfile)
  } catch (error) {
    console.error('Erro ao buscar perfil:', error)
    return NextResponse.json({ message: 'Erro ao buscar perfil' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromToken(request)
    if (!userId) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    const data = await request.json()

    // ✅ Valida tamanho da foto antes de salvar
    if (data.profilePhoto && data.profilePhoto.startsWith('data:image')) {
      const sizeKB = Math.round(data.profilePhoto.length / 1024)
      console.log('Tamanho da foto recebida:', sizeKB, 'KB')
      if (sizeKB > 500) {
        return NextResponse.json(
          { message: `Foto muito grande (${sizeKB}KB). Máximo 500KB. Use uma imagem menor.` },
          { status: 413 }
        )
      }
    }

    const existingProfile = await db.query.candidateProfiles.findFirst({
      where: eq(candidateProfiles.userId, userId)
    })

    const mappedData = {
      age: data.age ? Number(data.age) : undefined,
      gender: data.gender || '',
      phone: data.phone || '',
      linkedinUrl: data.linkedinUrl || '',
      profilePhoto: data.profilePhoto ? String(data.profilePhoto).substring(0, 500000) : '',
      currentPosition: data.currentPosition || '',
      currentCompany: data.currentCompany || '',
      currentSalary: data.currentSalary ? String(data.currentSalary) : undefined,
      yearsOfExperience: data.yearsOfExperience ? Number(data.yearsOfExperience) : undefined,
      bio: data.bio || '',
      skills: data.skills || '',
      updatedAt: new Date()
    }

    if (existingProfile) {
      await db.update(candidateProfiles)
        .set(mappedData)
        .where(eq(candidateProfiles.userId, userId))
    } else {
      await db.insert(candidateProfiles).values({
        ...mappedData,
        userId,
        createdAt: new Date()
      })
    }

    return NextResponse.json({ message: 'Perfil salvo com sucesso' })

  } catch (error: any) {
    console.error('Erro detalhado ao salvar perfil:', {
      message: error.message,
      code: error.code,
      stack: error.stack,
    })
    return NextResponse.json({
      message: 'Erro ao salvar: ' + (error.message || 'Erro interno'),
      details: error.code
    }, { status: 500 })
  }
}

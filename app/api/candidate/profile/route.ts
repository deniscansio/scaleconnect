import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { candidateProfiles, users } from '@/lib/db/schema/users'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'

// 🔐 Pegar usuário pelo token
async function getUserIdFromToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null

  const token = authHeader.split(' ')[1]

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret-key')
    return decoded.id
  } catch {
    return null
  }
}

// 🔎 BUSCAR PERFIL
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromToken(request)
    if (!userId) return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })

    const profile = await db.query.candidateProfiles.findFirst({
      where: eq(candidateProfiles.userId, userId)
    })

    return NextResponse.json(profile || {})
  } catch (error) {
    console.error('Erro ao buscar perfil:', error)
    return NextResponse.json({ message: 'Erro ao buscar perfil' }, { status: 500 })
  }
}

// 💾 SALVAR PERFIL
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromToken(request)
    if (!userId) return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })

    const data = await request.json()

    // 🔥 ATUALIZA NOME E EMAIL NA TABELA USERS
    await db.update(users)
      .set({
        fullName: data.fullName || '',
        email: data.email || ''
      })
      .where(eq(users.id, userId))

    // 🔎 Verifica se já existe perfil
    const existingProfile = await db.query.candidateProfiles.findFirst({
      where: eq(candidateProfiles.userId, userId)
    })

    // 🔥 MAPEAMENTO CORRETO
    const mappedData = {
      age: data.age ? Number(data.age) : null,
      gender: data.gender || '',
      phone: data.phone || '',
      linkedinUrl: data.linkedinUrl || '',
      profilePhoto: data.profilePhoto || '',
      currentPosition: data.currentPosition || '',
      currentCompany: data.currentCompany || '',
      currentSalary: data.currentSalary ? Number(data.currentSalary) : null,
      yearsOfExperience: data.yearsOfExperience ? Number(data.yearsOfExperience) : null,
      bio: data.bio || '',
      careerGoal: data.careerGoal || '',
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
  } catch (error) {
    console.error('Erro ao salvar perfil:', error)
    return NextResponse.json({ message: 'Erro ao salvar perfil' }, { status: 500 })
  }
}

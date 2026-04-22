import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { candidateProfiles, users } from '@/lib/db/schema/users'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'

// 🔐 pegar usuário pelo token
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

// 🔎 GET PERFIL
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
    return NextResponse.json({ message: 'Erro ao buscar perfil' }, { status: 500 })
  }
}

// 💾 SALVAR PERFIL
export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromToken(request)
    if (!userId) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    const data = await request.json()

    const existingProfile = await db.query.candidateProfiles.findFirst({
      where: eq(candidateProfiles.userId, userId)
    })

    const mappedData = {
      age: data.age ? Number(data.age) : undefined,
      gender: data.gender || '',
      phone: data.phone || '',
      linkedinUrl: data.linkedinUrl || '',
      profilePhoto: data.profilePhoto || '',
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
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao salvar' }, { status: 500 })
  }
}

    return NextResponse.json({ message: 'Perfil salvo com sucesso' })
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao salvar' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { candidateProfiles, users } from '@/lib/db/schema/users'
import { eq } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    const user = await db.query.users.findFirst({
      where: eq(users.id, id)
    })

    if (!user) {
      return NextResponse.json({ message: 'Candidato não encontrado' }, { status: 404 })
    }

    const profile = await db.query.candidateProfiles.findFirst({
      where: eq(candidateProfiles.userId, id)
    })

    const mergedProfile = {
      ...profile,
      fullName: user.fullName,
      email: user.email,
      isActive: user.isActive === 1,
      userType: user.userType
    }

    return NextResponse.json(mergedProfile)
  } catch (error) {
    console.error('Erro ao buscar perfil do candidato:', error)
    return NextResponse.json({ message: 'Erro interno' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const { isActive } = await request.json()

    await db.update(users)
      .set({ isActive: isActive ? 1 : 0 })
      .where(eq(users.id, id))

    return NextResponse.json({ message: 'Status atualizado com sucesso' })
  } catch (error) {
    console.error('Erro ao atualizar status:', error)
    return NextResponse.json({ message: 'Erro ao atualizar status' }, { status: 500 })
  }
}

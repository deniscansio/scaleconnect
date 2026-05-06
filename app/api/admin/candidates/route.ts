import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema/users'
import { eq, desc } from 'drizzle-orm'

// Garante que a Vercel sempre busque dados novos do banco
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const candidates = await db
      .select({
        id: users.id,
        name: users.fullName,
        email: users.email,
        joinDate: users.createdAt,
        isActive: users.isActive,
      })
      .from(users)
      .where(eq(users.userType, 'CANDIDATE'))
      .orderBy(desc(users.createdAt))

    const result = candidates.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      status: c.isActive === 1 ? 'Ativo' : 'Bloqueado',
      joinDate: c.joinDate
        ? new Date(c.joinDate).toISOString().split('T')[0]
        : '',
      earnings: 'R$ 0',
    }))

    return NextResponse.json(result)

  } catch (error) {
    console.error('Erro ao buscar candidatos:', error)
    return NextResponse.json(
      { error: 'Erro interno' },
      { status: 500 }
    )
  }
}

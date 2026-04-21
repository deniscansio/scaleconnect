import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema/users'
import { eq, sql } from 'drizzle-orm'

export async function GET() {
  try {
    const totalCandidates = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(eq(users.userType, 'CANDIDATE'))

    const totalCompanies = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(eq(users.userType, 'COMPANY'))

    return NextResponse.json({
      activeCompanies: Number(totalCompanies[0]?.count ?? 0),
      totalCompanies: Number(totalCompanies[0]?.count ?? 0),
      activeCandidates: Number(totalCandidates[0]?.count ?? 0),
      totalCandidates: Number(totalCandidates[0]?.count ?? 0),
      activePartners: 0,
      totalPartners: 0,
      monthlyRevenue: 'R$ 0',
      totalRevenue: 'R$ 0',
    })
  } catch (error) {
    console.error('Erro ao buscar stats:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

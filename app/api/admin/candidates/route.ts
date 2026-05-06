import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema/users'
import { eq, desc } from 'drizzle-orm'

// Esta linha impede que a Vercel guarde uma versão antiga da lista
export const dynamic = 'force-dynamic' 

export async function GET() {
  try {
    // Busca usuários do tipo CANDIDATE, ordenando pelos mais novos primeiro
    const candidates = await db.query.users.findMany({
      where: eq(users.userType, 'CANDIDATE'),
      orderBy: [desc(users.createdAt)]
    })
    
    return NextResponse.json(candidates)
  } catch (error) {
    console.error('Erro ao buscar candidatos:', error)
    return NextResponse.json({ message: 'Erro ao buscar candidatos' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { competencies } from '@/lib/db/schema/competencies'
import { ilike } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search') || ''

    let query = db.query.competencies.findMany({
      orderBy: (competencies, { asc }) => [asc(competencies.nome)],
    })

    // If search parameter is provided, filter by name
    if (search.trim()) {
      const allCompetencies = await db.query.competencies.findMany({
        orderBy: (competencies, { asc }) => [asc(competencies.nome)],
      })
      
      const filtered = allCompetencies.filter(comp =>
        comp.nome.toLowerCase().includes(search.toLowerCase())
      )
      
      return NextResponse.json(filtered)
    }

    const allCompetencies = await db.query.competencies.findMany({
      orderBy: (competencies, { asc }) => [asc(competencies.nome)],
    })

    return NextResponse.json(allCompetencies)
  } catch (error) {
    console.error('Erro ao buscar competências:', error)
    return NextResponse.json(
      { message: 'Erro ao buscar competências' },
      { status: 500 }
    )
  }
}

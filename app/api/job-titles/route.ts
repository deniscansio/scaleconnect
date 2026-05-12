import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

async function getConnection() {
  return await mysql.createConnection({
    uri: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: true
    }
  })
}

export async function GET() {
  let connection: any = null
  try {
    connection = await getConnection()

    // Buscar cargos únicos da tabela candidate_profiles
    const [titles] = await connection.execute(
      'SELECT DISTINCT cargo as titulo FROM candidate_profiles WHERE cargo IS NOT NULL ORDER BY cargo ASC'
    ) as any

    // Transformar em array com IDs
    const jobTitles = titles.map((t: any, index: number) => ({
      id: index + 1,
      titulo: t.titulo
    }))

    return NextResponse.json(jobTitles)
  } catch (error) {
    console.error('Erro ao buscar cargos:', error)
    return NextResponse.json(
      { message: 'Erro ao buscar cargos' },
      { status: 500 }
    )
  } finally {
    if (connection) await connection.end()
  }
}

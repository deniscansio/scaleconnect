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

    const [benefits] = await connection.execute(
      'SELECT id, nome, icone FROM benefits ORDER BY nome ASC'
    ) as any

    return NextResponse.json(benefits)
  } catch (error) {
    console.error('Erro ao buscar benefícios:', error)
    return NextResponse.json(
      { message: 'Erro ao buscar benefícios' },
      { status: 500 }
    )
  } finally {
    if (connection) await connection.end()
  }
}

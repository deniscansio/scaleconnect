import { NextRequest, NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

export async function GET(request: NextRequest) {
  try {
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'EXISTS' : 'MISSING')
    
    const connection = await mysql.createConnection({
      uri: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: true
      }
    })

    const [result] = await connection.execute('SELECT 1 as test') as any
    await connection.end()

    return NextResponse.json({
      message: 'Conexão com banco de dados OK',
      result
    })
  } catch (error: any) {
    console.error('Erro ao conectar ao banco:', error?.message || error)
    return NextResponse.json(
      { 
        message: 'Erro ao conectar ao banco de dados',
        error: error?.message || 'Erro desconhecido',
        code: error?.code
      },
      { status: 500 }
    )
  }
}

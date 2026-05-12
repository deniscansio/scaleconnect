export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import mysql from 'mysql2/promise'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'scaleconnect-super-secret-key-2026')

async function verifyToken(token: string) {
  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload
  } catch (error) {
    return null
  }
}

async function getConnection() {
  return await mysql.createConnection({
    uri: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: true
    }
  })
}

export async function GET(request: NextRequest) {
  let connection: any = null
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { message: 'Token não fornecido' },
        { status: 401 }
      )
    }

    const payload = await verifyToken(token)
    if (!payload || !payload.userId) {
      return NextResponse.json(
        { message: 'Token inválido' },
        { status: 401 }
      )
    }

    const candidateId = payload.userId as number
    connection = await getConnection()

    // Buscar candidaturas do candidato
    const [applications] = await connection.execute(
      'SELECT id, job_id, status, created_at FROM job_applications WHERE candidate_id = ? ORDER BY created_at DESC',
      [candidateId]
    ) as any

    return NextResponse.json(applications)
  } catch (error) {
    console.error('Erro ao buscar candidaturas:', error)
    return NextResponse.json(
      { message: 'Erro ao buscar candidaturas' },
      { status: 500 }
    )
  } finally {
    if (connection) await connection.end()
  }
}

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

export async function POST(request: NextRequest) {
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
    const body = await request.json()
    const { jobId } = body

    if (!jobId) {
      return NextResponse.json(
        { message: 'ID da vaga é obrigatório' },
        { status: 400 }
      )
    }

    connection = await getConnection()

    // Verificar se já existe candidatura
    const [existing] = await connection.execute(
      'SELECT id FROM job_applications WHERE job_id = ? AND candidate_id = ?',
      [jobId, candidateId]
    ) as any

    if (existing.length > 0) {
      return NextResponse.json(
        { message: 'Você já se candidatou a esta vaga' },
        { status: 400 }
      )
    }

    // Criar candidatura
    const [result] = await connection.execute(
      'INSERT INTO job_applications (job_id, candidate_id, status) VALUES (?, ?, "APPLIED")',
      [jobId, candidateId]
    ) as any

    return NextResponse.json(
      { message: 'Candidatura enviada com sucesso', applicationId: result.insertId },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erro ao enviar candidatura:', error)
    return NextResponse.json(
      { message: 'Erro ao enviar candidatura' },
      { status: 500 }
    )
  } finally {
    if (connection) await connection.end()
  }
}

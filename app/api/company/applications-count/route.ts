import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import mysql from 'mysql2/promise'

async function getConnection() {
  return await mysql.createConnection({
    uri: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: true
    }
  })
}

function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'scaleconnect-secret-2026') as any
    return decoded
  } catch (error) {
    return null
  }
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

    const payload = verifyToken(token)
    if (!payload || !payload.id) {
      return NextResponse.json(
        { message: 'Token inválido' },
        { status: 401 }
      )
    }

    const companyId = payload.id as number
    connection = await getConnection()

    // Contar total de candidaturas para as vagas da empresa
    const [result] = await connection.execute(
      `SELECT COUNT(*) as total FROM job_applications ja
       INNER JOIN job_postings jp ON ja.job_id = jp.id
       WHERE jp.company_id = ?`,
      [companyId]
    ) as any

    const totalApplications = result[0]?.total || 0

    return NextResponse.json({
      totalApplications
    })
  } catch (error: any) {
    console.error('Erro ao contar candidaturas:', error?.message)
    return NextResponse.json(
      { message: 'Erro ao contar candidaturas' },
      { status: 500 }
    )
  } finally {
    if (connection) await connection.end()
  }
}

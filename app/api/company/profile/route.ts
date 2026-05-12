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

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'scaleconnect-secret-2026') as any
    const userId = decoded.id

    connection = await getConnection()

    // Buscar perfil da empresa
    const [profiles] = await connection.execute(
      'SELECT * FROM company_profiles WHERE user_id = ?',
      [userId]
    ) as any

    if (profiles.length === 0) {
      return NextResponse.json(
        { message: 'Perfil não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(profiles[0])
  } catch (error: any) {
    console.error('Erro ao buscar perfil:', error?.message)
    return NextResponse.json(
      { message: 'Erro ao buscar perfil' },
      { status: 500 }
    )
  } finally {
    if (connection) await connection.end()
  }
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

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'scaleconnect-secret-2026') as any
    const userId = decoded.id

    const body = await request.json()
    const { companyName, cnpj, segment, employees, website, email, phone, address, about } = body

    // Validar campos obrigatórios
    if (!cnpj || !email || !phone) {
      return NextResponse.json(
        { message: 'CNPJ, Email e Telefone são obrigatórios' },
        { status: 400 }
      )
    }

    connection = await getConnection()

    // Verificar se já existe perfil
    const [existing] = await connection.execute(
      'SELECT id FROM company_profiles WHERE user_id = ?',
      [userId]
    ) as any

    if (existing.length > 0) {
      // Atualizar perfil existente
      await connection.execute(
        `UPDATE company_profiles SET 
          company_name = ?, cnpj = ?, segment = ?, employees = ?, 
          website = ?, email = ?, phone = ?, address = ?, about = ?
         WHERE user_id = ?`,
        [companyName, cnpj, segment, employees, website, email, phone, address, about, userId]
      )
    } else {
      // Criar novo perfil
      await connection.execute(
        `INSERT INTO company_profiles (user_id, company_name, cnpj, segment, employees, website, email, phone, address, about)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, companyName, cnpj, segment, employees, website, email, phone, address, about]
      )
    }

    return NextResponse.json(
      { message: 'Perfil salvo com sucesso' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Erro ao salvar perfil:', error?.message)
    return NextResponse.json(
      { message: 'Erro ao salvar perfil', error: error?.message },
      { status: 500 }
    )
  } finally {
    if (connection) await connection.end()
  }
}

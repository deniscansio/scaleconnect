import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema/users'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName, companyName, userType } = await request.json()

    // Validações
    if (!email || !password || !fullName || !userType) {
      return NextResponse.json(
        { message: 'Email, senha, nome e tipo de usuário são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar se email já existe no banco de dados real
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email)
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email já cadastrado' },
        { status: 409 }
      )
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Criar usuário no banco de dados real
    const result: any = await db.insert(users).values({
      email,
      password: hashedPassword,
      fullName,
      companyName: userType === 'COMPANY' ? companyName : null,
      userType: userType as 'CANDIDATE' | 'COMPANY' | 'ADMIN',
    })

    // No TiDB Serverless, o result contém o lastInsertId ou insertId
    const userId = result.lastInsertId || result.insertId || Math.random().toString(36).substr(2, 9)

    // Gerar JWT
    const token = jwt.sign(
      { id: userId, email, userType },
      process.env.JWT_SECRET || 'secret-key',
      { expiresIn: '7d' }
    )

    return NextResponse.json({
      message: 'Usuário criado com sucesso',
      token,
      userType,
      user: {
        id: userId,
        email,
        fullName,
        userType,
      },
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'Erro ao criar usuário no servidor' },
      { status: 500 }
    )
  }
}

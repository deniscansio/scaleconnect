import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Mock database - em produção usar Prisma
const users: any[] = []

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

    // Verificar se email já existe
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email já cadastrado' },
        { status: 409 }
      )
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Criar usuário
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password: hashedPassword,
      fullName,
      companyName: userType === 'COMPANY' ? companyName : null,
      userType,
      createdAt: new Date(),
    }

    users.push(newUser)

    // Gerar JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, userType: newUser.userType },
      process.env.JWT_SECRET || 'secret-key',
      { expiresIn: '7d' }
    )

    return NextResponse.json({
      message: 'Usuário criado com sucesso',
      token,
      userType: newUser.userType,
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        userType: newUser.userType,
      },
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'Erro ao criar usuário' },
      { status: 500 }
    )
  }
}

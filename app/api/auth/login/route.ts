import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Mock database - em produção usar Prisma
const users: any[] = [
  {
    id: '1',
    email: 'candidato@test.com',
    password: await bcrypt.hash('123456', 10),
    fullName: 'João Candidato',
    userType: 'CANDIDATE',
    createdAt: new Date(),
  },
  {
    id: '2',
    email: 'empresa@test.com',
    password: await bcrypt.hash('123456', 10),
    fullName: 'Maria Empresa',
    companyName: 'Tech Solutions',
    userType: 'COMPANY',
    createdAt: new Date(),
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validações
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Buscar usuário
    const user = users.find((u) => u.email === email)
    if (!user) {
      return NextResponse.json(
        { message: 'Email ou senha incorretos' },
        { status: 401 }
      )
    }

    // Verificar senha
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return NextResponse.json(
        { message: 'Email ou senha incorretos' },
        { status: 401 }
      )
    }

    // Gerar JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET || 'secret-key',
      { expiresIn: '7d' }
    )

    return NextResponse.json({
      message: 'Login realizado com sucesso',
      token,
      userType: user.userType,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        userType: user.userType,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Erro ao fazer login' },
      { status: 500 }
    )
  }
}

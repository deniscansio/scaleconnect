import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema/users'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validações básicas
    if (!email || !password) {
      return NextResponse.json(
        { message: 'E-mail e senha são obrigatórios para o login.' },
        { status: 400 }
      )
    }

    // Buscar usuário no banco de dados MySQL real
    const user = await db.query.users.findFirst({
      where: eq(users.email, email)
    })

    if (!user) {
      return NextResponse.json(
        { message: 'E-mail ou senha incorretos. Verifique seus dados.' },
        { status: 401 }
      )
    }

    // Verificar senha criptografada
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'E-mail ou senha incorretos. Verifique seus dados.' },
        { status: 401 }
      )
    }

    // Gerar token JWT seguro
    const token = jwt.sign(
      { id: user.id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET || 'scaleconnect-secret-2026',
      { expiresIn: '7d' }
    )

    return NextResponse.json({
      message: 'Login realizado com sucesso!',
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
      { message: 'Erro interno no servidor ao realizar o login. Tente novamente em instantes.' },
      { status: 500 }
    )
  }
}

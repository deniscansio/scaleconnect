import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema/users'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // =========================
    // VALIDAÇÃO
    // =========================
    if (!email || !password) {
      return NextResponse.json(
        { message: 'E-mail e senha são obrigatórios para o login.' },
        { status: 400 }
      )
    }

    // =========================
    // BUSCAR USUÁRIO (SEM CPF)
    // =========================
    const user = await db.query.users.findFirst({
      where: eq(users.email, email)
    })

    if (!user) {
      return NextResponse.json(
        { message: 'E-mail ou senha incorretos. Verifique seus dados.' },
        { status: 401 }
      )
    }

    // =========================
    // VALIDAR SENHA
    // =========================
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'E-mail ou senha incorretos. Verifique seus dados.' },
        { status: 401 }
      )
    }

    // =========================
    // GERAR JWT
    // =========================
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        userType: user.userType || null,
      },
      process.env.JWT_SECRET || 'scaleconnect-secret-2026',
      { expiresIn: '7d' }
    )

    // =========================
    // RESPOSTA SEGURA
    // =========================
    return NextResponse.json({
      message: 'Login realizado com sucesso!',
      token,
      userType: user.userType || null,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName || null,
        userType: user.userType || null,
        cpf: user.cpf || null, // ⚠️ opcional, NÃO bloqueia login
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

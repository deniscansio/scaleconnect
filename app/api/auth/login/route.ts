export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema/users'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'E-mail e senha são obrigatórios para o login.' },
        { status: 400 }
      )
    }

    let user
    try {
      const result = await db
        .select({
          id: users.id,
          fullName: users.fullName,
          email: users.email,
          password: users.password,
          userType: users.userType,
          companyName: users.companyName,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        })
        .from(users)
        .where(eq(users.email, email))
        .limit(1)

      user = result[0]
    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { message: 'Erro ao conectar ao banco de dados. Tente novamente em instantes.' },
        { status: 503 }
      )
    }

    if (!user) {
      return NextResponse.json(
        { message: 'E-mail ou senha incorretos. Verifique seus dados.' },
        { status: 401 }
      )
    }

    let isPasswordValid = false
    try {
      isPasswordValid = await bcrypt.compare(password, user.password)
    } catch (bcryptError) {
      console.error('Bcrypt error:', bcryptError)
      return NextResponse.json(
        { message: 'Erro ao validar senha. Tente novamente em instantes.' },
        { status: 500 }
      )
    }

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'E-mail ou senha incorretos. Verifique seus dados.' },
        { status: 401 }
      )
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        userType: user.userType,
      },
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

export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema/users'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, password, userType, companyName } = body

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: 'Preencha todos os campos obrigatórios.' },
        { status: 400 }
      )
    }

    const existingEmail = await db.query.users.findFirst({
      where: eq(users.email, email)
    })

    if (existingEmail) {
      return NextResponse.json(
        { message: 'Este e-mail já está cadastrado. Tente fazer login.' },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const [result] = await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
      userType: (userType as 'CANDIDATE' | 'COMPANY' | 'ADMIN') || 'CANDIDATE',
      companyName: userType === 'COMPANY' ? companyName : null,
    })

    const userId = (result as any).insertId

    const token = jwt.sign(
      { id: userId, email, userType: userType || 'CANDIDATE' },
      process.env.JWT_SECRET || 'scaleconnect-secret-2026',
      { expiresIn: '7d' }
    )

    return NextResponse.json({
      message: 'Conta criada com sucesso!',
      token,
      userType: userType || 'CANDIDATE',
      user: {
        id: userId,
        email,
        fullName,
        userType: userType || 'CANDIDATE',
      },
    })

  } catch (error) {
    console.error('Erro signup:', error)
    return NextResponse.json(
      { message: 'Erro ao criar usuário. Tente novamente.' },
      { status: 500 }
    )
  }
}

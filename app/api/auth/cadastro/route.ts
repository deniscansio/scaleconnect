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
    const { email, password, fullName, companyName, userType } = body

    // Validação rigorosa dos campos obrigatórios
    if (!email || !password || !fullName || !userType) {
      const missingFields = []
      if (!email) missingFields.push('email')
      if (!password) missingFields.push('senha')
      if (!fullName) missingFields.push('nome completo')
      if (!userType) missingFields.push('tipo de usuário')
      
      return NextResponse.json(
        { message: `Os seguintes campos são obrigatórios: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Verificar se email já existe no banco de dados real
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email)
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Este e-mail já está cadastrado. Tente fazer login.' },
        { status: 409 }
      )
    }

    // Hash da senha para segurança permanente
    const hashedPassword = await bcrypt.hash(password, 10)

    // Criar usuário no banco de dados MySQL
    const [result] = await db.insert(users).values({
      email,
      password: hashedPassword,
      fullName,
      companyName: userType === 'COMPANY' ? companyName : null,
      userType: userType as 'CANDIDATE' | 'COMPANY' | 'ADMIN',
    })

    // No mysql2/drizzle, o result contém o insertId
    const userId = result.insertId

    // Gerar JWT para autenticação segura
    const token = jwt.sign(
      { id: userId, email, userType },
      process.env.JWT_SECRET || 'scaleconnect-secret-2026',
      { expiresIn: '7d' }
    )

    return NextResponse.json({
      message: 'Conta criada com sucesso!',
      token,
      userType,
      user: {
        id: userId,
        email,
        fullName,
        userType,
      },
    })
  } catch (error: any) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'Erro interno no servidor ao criar sua conta. Por favor, tente novamente em instantes.' },
      { status: 500 }
    )
  }
}

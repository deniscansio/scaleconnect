import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema/users'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { fullName, email, password, cpf } = body

    // validação obrigatória
    if (!fullName || !email || !password || !cpf) {
      return NextResponse.json(
        { message: 'Preencha todos os campos' },
        { status: 400 }
      )
    }

    // verificar email duplicado
    const existingEmail = await db.query.users.findFirst({
      where: eq(users.email, email)
    })

    if (existingEmail) {
      return NextResponse.json(
        { message: 'Email já cadastrado' },
        { status: 400 }
      )
    }

    // verificar CPF duplicado
    const existingCpf = await db.query.users.findFirst({
      where: eq(users.cpf, cpf)
    })

    if (existingCpf) {
      return NextResponse.json(
        { message: 'CPF já cadastrado' },
        { status: 400 }
      )
    }

    // criar usuário
    await db.insert(users).values({
      fullName,
      email,
      password,
      cpf
    })

    return NextResponse.json({
      message: 'Usuário criado com sucesso'
    })

  } catch (error) {
    console.error('Erro signup:', error)
    return NextResponse.json(
      { message: 'Erro ao criar usuário' },
      { status: 500 }
    )
  }
}

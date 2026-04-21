import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@email.com',
      status: 'Ativo',
      joinDate: '2024-01-10',
      earnings: 'R$ 500',
    },
  ])
}

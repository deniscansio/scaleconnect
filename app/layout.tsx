import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ScaleConnect - Plataforma SaaS de Vendas e Carreira',
  description: 'Conectando candidatos, empresas e parceiros educacionais para crescimento profissional e geração de renda.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  )
}

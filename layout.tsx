import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

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
      <body className="bg-white text-gray-900">
        {/* Navbar */}
        <header className="bg-blue-900 text-white p-4 flex justify-between items-center">
          <h1 className="font-bold text-xl">ScaleConnect</h1>
          <nav className="space-x-4">
            <Link href="/candidato" className="hover:underline">Candidato</Link>
            <Link href="/empresa" className="hover:underline">Empresa</Link>
            <Link href="/parceiro" className="hover:underline">Parceiro</Link>
            <Link href="/admin" className="hover:underline">Admin</Link>
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/signup" className="hover:underline">Cadastro</Link>
          </nav>
        </header>

        {/* Conteúdo principal */}
        <main>{children}</main>
      </body>
    </html>
  )
}

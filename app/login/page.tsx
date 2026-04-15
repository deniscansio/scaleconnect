'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { companyConfig } from '../config/company'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Erro ao fazer login')
        return
      }

      // Salvar token no localStorage
      localStorage.setItem('scaleconnect_token', data.token)
      localStorage.setItem('scaleconnect_userType', data.userType)
      localStorage.setItem('scaleconnect_user', JSON.stringify(data.user))

      // ✅ CORREÇÃO: Salvar também em cookie para o servidor reconhecer
      document.cookie = `scaleconnect_token=${data.token}; path=/; max-age=604800`
      document.cookie = `scaleconnect_userType=${data.userType}; path=/; max-age=604800`

      // Redirecionar baseado no tipo de usuário
      if (data.userType === 'CANDIDATE') {
        router.push('/candidato/dashboard')
      } else if (data.userType === 'COMPANY') {
        router.push('/empresa/dashboard')
      } else if (data.userType === 'ADMIN') {
        router.push('/admin/dashboard')
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="text-center mb-8">
            <Image src={companyConfig.logo} alt="Logo" width={60} height={60} className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-candidate-primary mb-2">ScaleConnect</h1>
            <p className="text-xs text-gray-500 mb-4">by {companyConfig.name}</p>
            <p className="text-gray-600">Faça login na sua conta</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-candidate-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Não tem conta?{' '}
              <Link href="/cadastro" className="text-candidate-primary font-semibold hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
            <p className="mb-2">Precisa de ajuda?</p>
            <p>
              <a href={`mailto:${companyConfig.contact.email}`} className="text-candidate-primary hover:underline">
                {companyConfig.contact.email}
              </a>
            </p>
            <p>
              <a href={companyConfig.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-candidate-primary hover:underline">
                WhatsApp: {companyConfig.contact.whatsapp}
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
        </div>
      </div>
    </main>
  )
}

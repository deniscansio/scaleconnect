'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [userType, setUserType] = useState<'CANDIDATE' | 'COMPANY' | 'PARTNER' | null>(
    (searchParams.get('type') as any) || null
  )
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    companyName: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não correspondem')
      return
    }

    if (!userType) {
      setError('Selecione um tipo de usuário')
      return
    }

    setLoading(true)

    try {
      const payload: any = {
        email: formData.email,
        password: formData.password,
        userType,
      }

      if (userType === 'CANDIDATE') {
        payload.fullName = formData.fullName
      } else if (userType === 'COMPANY') {
        payload.fullName = formData.fullName
        payload.companyName = formData.companyName
      }

      // Usando a rota correta que acabamos de criar
      const response = await fetch('/api/auth/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Erro ao criar conta')
        return
      }

      // Salvar token com a chave correta
      localStorage.setItem('scaleconnect_token', data.token)
      localStorage.setItem('scaleconnect_userType', data.userType)
      localStorage.setItem('scaleconnect_user', JSON.stringify(data.user))

      // Redirecionar
      if (userType === 'CANDIDATE') {
        router.push('/candidato/dashboard')
      } else if (userType === 'COMPANY') {
        router.push('/empresa/dashboard')
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor')
    } finally {
      setLoading(false)
    }
  }

  if (!userType) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Bem-vindo ao ScaleConnect</h1>
            <p className="text-lg text-gray-600">Escolha seu tipo de conta para começar</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Candidate Option */}
            <button
              onClick={() => setUserType('CANDIDATE')}
              className="card hover:shadow-lg transition cursor-pointer border-2 border-transparent hover:border-candidate-primary"
            >
              <div className="text-5xl mb-4">👤</div>
              <h3 className="text-2xl font-bold mb-2">Candidato</h3>
              <p className="text-gray-600 mb-4">
                Encontre vagas, oportunidades de vendas e ganhe comissões
              </p>
              <button className="w-full py-2 bg-candidate-primary text-white rounded-lg font-semibold hover:bg-opacity-90">
                Continuar
              </button>
            </button>

            {/* Company Option */}
            <button
              onClick={() => setUserType('COMPANY')}
              className="card hover:shadow-lg transition cursor-pointer border-2 border-transparent hover:border-company-primary"
            >
              <div className="text-5xl mb-4">🏢</div>
              <h3 className="text-2xl font-bold mb-2">Empresa</h3>
              <p className="text-gray-600 mb-4">
                Publique vagas, crie oportunidades e gerencie leads
              </p>
              <button className="w-full py-2 bg-company-primary text-white rounded-lg font-semibold hover:bg-opacity-90">
                Continuar
              </button>
            </button>

            {/* Partner Option */}
            <button
              onClick={() => setUserType('PARTNER')}
              className="card hover:shadow-lg transition cursor-pointer border-2 border-transparent hover:border-gray-400"
            >
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-2xl font-bold mb-2">Parceiro</h3>
              <p className="text-gray-600 mb-4">
                Publique cursos e certificações
              </p>
              <button className="w-full py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800">
                Continuar
              </button>
            </button>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Já tem conta?{' '}
              <Link href="/login" className="text-candidate-primary font-semibold hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-candidate-primary mb-2">ScaleConnect</h1>
            <p className="text-gray-600">
              Cadastro - {userType === 'CANDIDATE' ? 'Candidato' : userType === 'COMPANY' ? 'Empresa' : 'Parceiro'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="input-field"
                placeholder="Seu nome"
                required
              />
            </div>

            {userType === 'COMPANY' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Empresa</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Nome da empresa"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Senha</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
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
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Já tem conta?{' '}
              <Link href="/login" className="text-candidate-primary font-semibold hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
      <SignupForm />
    </Suspense>
  )
}

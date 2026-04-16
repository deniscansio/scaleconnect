'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function SignupPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    cpf: ''
  })

  const [loading, setLoading] = useState(false)

  const formatCPF = (value: string) => {
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    return value
  }

  const handleChange = (field: string, value: string) => {
    if (field === 'cpf') {
      value = formatCPF(value)
    }
    setForm({ ...form, [field]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!form.cpf) {
      alert('CPF é obrigatório')
      return
    }

    try {
      setLoading(true)

      await axios.post('/api/auth/signup', form)

      alert('✅ Cadastro realizado com sucesso!')
      router.push('/login')
    } catch (error) {
      alert('Erro ao cadastrar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Criar Conta</h1>

        <input
          type="text"
          placeholder="Nome completo"
          value={form.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={(e) => handleChange('password', e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          placeholder="CPF"
          value={form.cpf}
          onChange={(e) => handleChange('cpf', e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white p-3 rounded-lg font-semibold"
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  )
}

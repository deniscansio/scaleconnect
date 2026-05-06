'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CandidateDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const fetchProfile = useCallback(async (token: string) => {
    try {
      const response = await fetch('/api/candidate/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
      } else {
        setProfile({})
      }
    } catch (error) {
      console.error('Erro ao buscar perfil:', error)
      setProfile({})
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isClient) return

    const token = localStorage.getItem('scaleconnect_token')
    const userType = localStorage.getItem('scaleconnect_userType')

    if (!token || userType !== 'CANDIDATE') {
      router.replace('/login')
      return
    }

    const storedUser = localStorage.getItem('scaleconnect_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        router.replace('/login')
        return
      }
    }

    fetchProfile(token)
  }, [isClient, router, fetchProfile])

  const handleLogout = () => {
    localStorage.removeItem('scaleconnect_token')
    localStorage.removeItem('scaleconnect_userType')
    localStorage.removeItem('scaleconnect_user')
    document.cookie = 'scaleconnect_token=; path=/; max-age=0'
    document.cookie = 'scaleconnect_userType=; path=/; max-age=0'
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-candidate-light to-slate-50">
      <nav className="bg-white shadow-sm border-b-4 border-candidate-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-candidate-primary">ScaleConnect</div>
          <div className="flex gap-4 items-center">
            <span className="text-gray-700">{user?.fullName || 'Candidato'}</span>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Sair</button>
          </div>
        </div>
      </nav>
      <div className="flex">
        <aside className="w-64 bg-white shadow-md min-h-screen p-6">
          <nav className="space-y-4">
            <Link href="/candidato/jornada-sucesso" className="block px-4 py-2 bg-candidate-primary text-white rounded-lg font-semibold">🚀 Jornada de Sucesso</Link>
            <Link href="/candidato/jobs" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">📋 Vagas</Link>
            <Link href="/candidato/opportunities" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">🤝 Afiliado</Link>
            <Link href="/candidato/earnings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">💰 Meus Ganhos</Link>
            <Link href="/candidato/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">📊 Dashboard</Link>
            <Link href="/candidato/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">👤 Perfil</Link>
          </nav>
        </aside>
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Bem-vindo, {user?.fullName?.split(' ')[0] || 'Candidato'}! 🚀</h1>
            <p className="text-gray-600 mb-8">Explore suas oportunidades de crescimento.</p>
            <div className="bg-gradient-to-r from-candidate-primary to-candidate-secondary rounded-lg p-8 text-white mb-8 shadow-lg">
              <p className="opacity-80 mb-2">Ganhos Totais</p>
              <h2 className="text-4xl font-bold">R$ {(profile?.totalEarnings || 0).toLocaleString('pt-BR')}</h2>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

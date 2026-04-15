'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CandidateDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('scaleconnect_token')
    const userType = localStorage.getItem('scaleconnect_userType')

    if (!token || userType !== 'CANDIDATE') {
      router.push('/login')
      return
    }

    const storedUser = localStorage.getItem('scaleconnect_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      setUser({
        id: '1',
        fullName: 'Candidato',
        email: '',
        currentPosition: 'Sales Development Representative',
        currentCompany: 'Tech Solutions',
        yearsOfExperience: 3,
        totalEarnings: 12450,
        totalSales: 8,
        totalLeads: 24,
        careerLevel: 'MID',
      })
    }
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('scaleconnect_token')
    localStorage.removeItem('scaleconnect_userType')
    localStorage.removeItem('scaleconnect_user')
    router.push('/')
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-candidate-light to-slate-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b-4 border-candidate-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-candidate-primary">ScaleConnect</div>
          <div className="flex gap-4 items-center">
            <span className="text-gray-700">{user?.fullName}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar + Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-screen p-6">
          <nav className="space-y-4">
            <Link href="/candidato/jornada-sucesso" className="block px-4 py-2 bg-candidate-primary text-white rounded-lg font-semibold">
              🚀 Jornada de Sucesso
            </Link>
            <Link href="/candidato/jobs" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📋 Vagas
            </Link>
            <Link href="/candidato/opportunities" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              🤝 Afiliado
            </Link>
            <Link href="/candidato/earnings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              💰 Meus Ganhos
            </Link>
            <Link href="/candidato/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📊 Dashboard
            </Link>
            <Link href="/candidato/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              👤 Perfil
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Bem-vindo, {user?.fullName?.split(' ')[0]}! 🚀
              </h1>
              <p className="text-gray-600">Você está em uma jornada de sucesso profissional. Explore vagas e oportunidades para crescer e ganhar.</p>
            </div>

            {/* Earnings Card */}
            <div className="bg-gradient-to-r from-candidate-primary to-candidate-secondary rounded-lg p-8 text-white mb-8 shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-candidate-light opacity-80 mb-2">Ganhos Totais</p>
                  <h2 className="text-4xl font-bold">R$ {user?.totalEarnings?.toLocaleString('pt-BR') || '0'}</h2>
                  <p className="text-candidate-light opacity-80 mt-2">↑ +R$ 2.100 este mês</p>
                </div>
                <div className="text-5xl">💰</div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="card bg-white">
                <div className="text-4xl mb-4">📊</div>
                <p className="text-gray-600 mb-2">Vendas Realizadas</p>
                <p className="text-3xl font-bold text-candidate-primary">{user?.totalSales || 0}</p>
              </div>
              <div className="card bg-white">
                <div className="text-4xl mb-4">📝</div>
                <p className="text-gray-600 mb-2">Leads Gerados</p>
                <p className="text-3xl font-bold text-candidate-primary">{user?.totalLeads || 0}</p>
              </div>
              <div className="card bg-white">
                <div className="text-4xl mb-4">🎯</div>
                <p className="text-gray-600 mb-2">Nível de Carreira</p>
                <p className="text-3xl font-bold text-candidate-primary">{user?.careerLevel || 'INICIANTE'}</p>
              </div>
            </div>

            {/* Opportunities Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">💼 Oportunidades Ativas</h2>
                <Link href="/candidato/opportunities" className="text-candidate-primary font-semibold hover:underline">
                  Ver Todas
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="card bg-white hover:shadow-lg transition">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Tech Company {i}</h3>
                        <p className="text-sm text-gray-600">Geração de Leads B2B</p>
                      </div>
                      <span className="text-2xl font-bold text-candidate-secondary">R$ 500</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Por lead qualificado</p>
                    <button className="w-full py-2 bg-candidate-primary text-white rounded-lg font-semibold hover:bg-opacity-90">
                      Ver Detalhes
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Jobs Section */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">📋 Vagas Recomendadas</h2>
                <Link href="/candidato/jobs" className="text-candidate-primary font-semibold hover:underline">
                  Ver Todas
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="card bg-white hover:shadow-lg transition">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Sales Manager</h3>
                        <p className="text-sm text-gray-600">Company {i} • São Paulo</p>
                      </div>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        R$ 8k-10k
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Sênior • Full-time</p>
                    <button className="w-full py-2 bg-candidate-primary text-white rounded-lg font-semibold hover:bg-opacity-90">
                      Candidatar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
    </main>
  )
}

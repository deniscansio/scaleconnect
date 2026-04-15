'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CompanyDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('scaleconnect_token')
    const userType = localStorage.getItem('scaleconnect_userType')

    if (!token || userType !== 'COMPANY') {
      router.push('/login')
      return
    }

    // Simular carregamento de dados da empresa
    setUser({
      id: '2',
      fullName: 'Maria Empresa',
      email: 'empresa@test.com',
      companyName: 'Tech Solutions',
      subscriptionPlan: 'GROWTH',
      totalLeads: 156,
      totalMeetings: 42,
      totalSales: 18,
      activeJobs: 5,
    })
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('scaleconnect_token')
    localStorage.removeItem('scaleconnect_userType')
    localStorage.removeItem('scaleconnect_user')
    document.cookie = 'scaleconnect_token=; path=/; max-age=0'
    document.cookie = 'scaleconnect_userType=; path=/; max-age=0'
    router.push('/')
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-company-light to-slate-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b-4 border-company-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-company-primary">ScaleConnect</div>
          <div className="flex gap-4 items-center">
            <span className="text-gray-700">{user?.companyName}</span>
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
            <Link href="/empresa/dashboard" className="block px-4 py-2 bg-company-primary text-white rounded-lg font-semibold">
              📊 Dashboard
            </Link>
            <Link href="/empresa/jobs" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📋 Vagas
            </Link>
            <Link href="/empresa/opportunities" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              💼 Oportunidades
            </Link>
            <Link href="/empresa/leads" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📞 Leads
            </Link>
            <Link href="/empresa/meetings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📅 Reuniões
            </Link>
            <Link href="/empresa/metrics" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📈 Métricas
            </Link>
            <Link href="/empresa/billing" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              💳 Faturamento
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Dashboard - {user?.companyName}
              </h1>
              <p className="text-gray-600">Plano: <span className="font-bold text-company-primary">{user?.subscriptionPlan}</span></p>
            </div>

            {/* Plan Badge */}
            <div className="bg-gradient-to-r from-company-primary to-company-secondary rounded-lg p-6 text-white mb-8 shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-company-light opacity-80 mb-2">Seu Plano</p>
                  <h2 className="text-3xl font-bold mb-2">{user?.subscriptionPlan}</h2>
                  <p className="text-company-light opacity-80">Próxima renovação em 30 dias</p>
                </div>
                <button className="px-6 py-2 bg-white text-company-primary rounded-lg font-semibold hover:bg-opacity-90">
                  Fazer Upgrade
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="card bg-white">
                <div className="text-4xl mb-4">📞</div>
                <p className="text-gray-600 mb-2">Leads Gerados</p>
                <p className="text-3xl font-bold text-company-primary">{user?.totalLeads}</p>
              </div>

              <div className="card bg-white">
                <div className="text-4xl mb-4">📅</div>
                <p className="text-gray-600 mb-2">Reuniões Agendadas</p>
                <p className="text-3xl font-bold text-company-primary">{user?.totalMeetings}</p>
              </div>

              <div className="card bg-white">
                <div className="text-4xl mb-4">💰</div>
                <p className="text-gray-600 mb-2">Vendas Fechadas</p>
                <p className="text-3xl font-bold text-company-primary">{user?.totalSales}</p>
              </div>

              <div className="card bg-white">
                <div className="text-4xl mb-4">📋</div>
                <p className="text-gray-600 mb-2">Vagas Ativas</p>
                <p className="text-3xl font-bold text-company-primary">{user?.activeJobs}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card bg-white">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h3>
                <div className="space-y-3">
                  <Link href="/empresa/jobs/new" className="block w-full py-2 px-4 bg-company-primary text-white rounded-lg text-center font-semibold hover:bg-opacity-90">
                    + Publicar Vaga
                  </Link>
                  <Link href="/empresa/opportunities/new" className="block w-full py-2 px-4 bg-company-secondary text-white rounded-lg text-center font-semibold hover:bg-opacity-90">
                    + Criar Oportunidade
                  </Link>
                  <Link href="/empresa/leads/import" className="block w-full py-2 px-4 bg-gray-500 text-white rounded-lg text-center font-semibold hover:bg-opacity-90">
                    📥 Importar Leads
                  </Link>
                </div>
              </div>

              <div className="card bg-white">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Últimas Atividades</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lead qualificado recebido</span>
                    <span className="text-gray-400">há 2h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reunião agendada</span>
                    <span className="text-gray-400">há 4h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vaga publicada</span>
                    <span className="text-gray-400">há 1d</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

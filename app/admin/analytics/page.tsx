'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('month')

  const analyticsData = {
    month: {
      newUsers: 234,
      activeUsers: 4876,
      newCompanies: 12,
      activeCompanies: 1089,
      totalRevenue: 'R$ 245.680',
      platformFee: 'R$ 36.852',
      avgSessionTime: '12m 34s',
      conversionRate: '3.2%',
    },
    week: {
      newUsers: 56,
      activeUsers: 2340,
      newCompanies: 3,
      activeCompanies: 1089,
      totalRevenue: 'R$ 58.920',
      platformFee: 'R$ 8.838',
      avgSessionTime: '11m 20s',
      conversionRate: '2.8%',
    },
  }

  const currentData = analyticsData[timeRange as keyof typeof analyticsData]

  const topCompanies = [
    { name: 'Tech Solutions Brasil', revenue: 'R$ 15.000', leads: 245, conversions: 18 },
    { name: 'E-commerce Solutions', revenue: 'R$ 12.500', leads: 198, conversions: 15 },
    { name: 'Marketing Digital Plus', revenue: 'R$ 8.900', leads: 142, conversions: 11 },
    { name: 'Consultoria XYZ', revenue: 'R$ 6.200', leads: 95, conversions: 7 },
  ]

  const topCandidates = [
    { name: 'Maria Santos', earnings: 'R$ 5.800', leads: 45, sales: 8 },
    { name: 'João Silva', earnings: 'R$ 4.200', leads: 32, sales: 6 },
    { name: 'Pedro Costa', earnings: 'R$ 3.100', leads: 28, sales: 5 },
    { name: 'Ana Oliveira', earnings: 'R$ 2.900', leads: 24, sales: 4 },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Navigation */}
      <nav className="bg-black shadow-lg border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-yellow-400">🔐 ScaleConnect Admin</div>
          <div className="flex gap-4">
            <Link href="/login" className="text-white font-semibold hover:text-yellow-400">
              Logout
            </Link>
          </div>
        </div>
      </nav>

      {/* Sidebar + Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 bg-gray-950 shadow-lg min-h-screen p-6 border-r border-gray-700">
          <nav className="space-y-4">
            <Link href="/admin/dashboard" className="block px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg">
              📊 Dashboard
            </Link>
            <Link href="/admin/companies" className="block px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg">
              🏢 Gerenciar Empresas
            </Link>
            <Link href="/admin/candidates" className="block px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg">
              👥 Gerenciar Candidatos
            </Link>
            <Link href="/admin/partners" className="block px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg">
              🎓 Gerenciar Parceiros
            </Link>
            <Link href="/admin/subscriptions" className="block px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg">
              💳 Assinaturas
            </Link>
            <Link href="/admin/payments" className="block px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg">
              💰 Pagamentos
            </Link>
            <Link href="/admin/analytics" className="block px-4 py-3 bg-yellow-400 text-black rounded-lg font-semibold">
              📈 Analytics
            </Link>
            <Link href="/admin/settings" className="block px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg">
              ⚙️ Configurações
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">📈 Analytics</h1>
                <p className="text-gray-400">Análise detalhada de performance da plataforma</p>
              </div>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-yellow-400 outline-none"
              >
                <option value="week">Última Semana</option>
                <option value="month">Último Mês</option>
              </select>
            </div>

            {/* KPIs */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Novos Usuários</p>
                <p className="text-3xl font-bold text-blue-400">+{currentData.newUsers}</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Usuários Ativos</p>
                <p className="text-3xl font-bold text-green-400">{currentData.activeUsers}</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Receita Total</p>
                <p className="text-3xl font-bold text-yellow-400">{currentData.totalRevenue}</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Taxa de Conversão</p>
                <p className="text-3xl font-bold text-purple-400">{currentData.conversionRate}</p>
              </div>
            </div>

            {/* More KPIs */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Novas Empresas</p>
                <p className="text-3xl font-bold text-orange-400">+{currentData.newCompanies}</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Empresas Ativas</p>
                <p className="text-3xl font-bold text-cyan-400">{currentData.activeCompanies}</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Taxa da Plataforma</p>
                <p className="text-3xl font-bold text-red-400">{currentData.platformFee}</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Tempo Médio de Sessão</p>
                <p className="text-3xl font-bold text-pink-400">{currentData.avgSessionTime}</p>
              </div>
            </div>

            {/* Top Companies */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">🏆 Top Empresas</h2>
              <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-900 border-b border-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-gray-300 font-semibold">Empresa</th>
                      <th className="px-6 py-4 text-left text-gray-300 font-semibold">Receita</th>
                      <th className="px-6 py-4 text-left text-gray-300 font-semibold">Leads Gerados</th>
                      <th className="px-6 py-4 text-left text-gray-300 font-semibold">Conversões</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCompanies.map((company, idx) => (
                      <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700 transition">
                        <td className="px-6 py-4 text-white font-semibold">{company.name}</td>
                        <td className="px-6 py-4 text-yellow-400 font-semibold">{company.revenue}</td>
                        <td className="px-6 py-4 text-gray-300">{company.leads}</td>
                        <td className="px-6 py-4 text-green-400 font-semibold">{company.conversions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Candidates */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">⭐ Top Candidatos</h2>
              <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-900 border-b border-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-gray-300 font-semibold">Candidato</th>
                      <th className="px-6 py-4 text-left text-gray-300 font-semibold">Ganhos</th>
                      <th className="px-6 py-4 text-left text-gray-300 font-semibold">Leads Gerados</th>
                      <th className="px-6 py-4 text-left text-gray-300 font-semibold">Vendas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCandidates.map((candidate, idx) => (
                      <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700 transition">
                        <td className="px-6 py-4 text-white font-semibold">{candidate.name}</td>
                        <td className="px-6 py-4 text-yellow-400 font-semibold">{candidate.earnings}</td>
                        <td className="px-6 py-4 text-gray-300">{candidate.leads}</td>
                        <td className="px-6 py-4 text-green-400 font-semibold">{candidate.sales}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

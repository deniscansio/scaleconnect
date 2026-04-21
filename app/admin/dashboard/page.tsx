'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { companyConfig } from '../../config/company'

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data
  const [stats, setStats] = useState<any>(null)
const [loading, setLoading] = useState(true)

useEffect(() => {
  const fetchData = async () => {
    try {
      const [statsRes, candidatesRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/candidates'),
      ])

      const statsData = await statsRes.json()
      const candidatesData = await candidatesRes.json()

      setStats(statsData)
      setCandidates(candidatesData)

    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    }
  }

  fetchData()
}, [])
  const companies = [
    { id: 1, name: 'Tech Solutions Brasil', plan: 'Growth', status: 'Ativo', joinDate: '2024-01-15', revenue: 'R$ 997' },
    { id: 2, name: 'Marketing Digital Plus', plan: 'Basic', status: 'Ativo', joinDate: '2024-02-20', revenue: 'R$ 497' },
    { id: 3, name: 'E-commerce Solutions', plan: 'Scale', status: 'Ativo', joinDate: '2024-03-10', revenue: 'R$ 1.997' },
    { id: 4, name: 'Consultoria XYZ', plan: 'Growth', status: 'Bloqueado', joinDate: '2024-03-01', revenue: 'R$ 0' },
  ]

  const candidates = [
  const [candidates, setCandidates] = useState<any[]>([])

  const partners = [
    { id: 1, name: 'Sales Academy', type: 'Cursos Online', status: 'Ativo', joinDate: '2024-01-10', courses: 24 },
    { id: 2, name: 'EdTech Solutions', type: 'Plataforma', status: 'Ativo', joinDate: '2024-02-01', courses: 18 },
    { id: 3, name: 'Tech Academy', type: 'Bootcamp', status: 'Pendente', joinDate: '2024-03-15', courses: 0 },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Navigation */}
      <nav className="bg-black shadow-lg border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src={companyConfig.logo} alt="Logo" width={40} height={40} className="h-10 w-10" />
            <div>
              <div className="text-xs text-gray-400">{companyConfig.name}</div>
              <div className="text-xl font-bold text-yellow-400">ScaleConnect Admin</div>
            </div>
          </div>
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
            <Link href="/admin/dashboard" className="block px-4 py-3 bg-yellow-400 text-black rounded-lg font-semibold">
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
            <Link href="/admin/analytics" className="block px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg">
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
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">📊 Dashboard Administrativo</h1>
              <p className="text-gray-400">Controle total da plataforma ScaleConnect</p>
            </div>

            {/* KPIs */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Empresas Ativas</p>
                <p className="text-4xl font-bold text-yellow-400">{stats?.activeCompanies || 0}</p>
                <p className="text-xs text-gray-600 mt-2">de {stats?.totalCompanies || 0} total</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Candidatos Ativos</p>
                <p className="text-4xl font-bold text-green-400">{stats?.activeCandidates || 0}</p>
                <p className="text-xs text-gray-600 mt-2">de {stats?.totalCandidates || 0} total</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Parceiros Ativos</p>
                <p className="text-4xl font-bold text-blue-400">{stats?.activePartners || 0}</p>
                <p className="text-xs text-gray-600 mt-2">de {stats?.totalPartners || 0} total</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Receita Mensal</p>
                <p className="text-3xl font-bold text-purple-400">{stats?.monthlyRevenue || 'R$ 0'}</p>
                <p className="text-xs text-gray-600 mt-2">Total: {stats?.totalRevenue || 'R$ 0'}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-gray-700">
              <button
                onClick={() => setActiveTab('companies')}
                className={`px-6 py-3 font-semibold border-b-4 transition ${
                  activeTab === 'companies'
                    ? 'border-yellow-400 text-yellow-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                🏢 Empresas Recentes
              </button>
              <button
                onClick={() => setActiveTab('candidates')}
                className={`px-6 py-3 font-semibold border-b-4 transition ${
                  activeTab === 'candidates'
                    ? 'border-yellow-400 text-yellow-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                👥 Candidatos Recentes
              </button>
              <button
                onClick={() => setActiveTab('partners')}
                className={`px-6 py-3 font-semibold border-b-4 transition ${
                  activeTab === 'partners'
                    ? 'border-yellow-400 text-yellow-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                🎓 Parceiros Recentes
              </button>
            </div>

            {/* Companies Table */}
            {activeTab === 'companies' && (
              <div className="bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-700">
                <table className="w-full">
                  <thead className="bg-gray-900 border-b border-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Empresa</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Plano</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Data de Entrada</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Receita Mensal</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {companies.map((company) => (
                      <tr key={company.id} className="hover:bg-gray-700 transition">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-white">{company.name}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-xs font-semibold">
                            {company.plan}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            company.status === 'Ativo'
                              ? 'bg-green-900 text-green-200'
                              : 'bg-red-900 text-red-200'
                          }`}>
                            {company.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">{company.joinDate}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-yellow-400">{company.revenue}</td>
                        <td className="px-6 py-4 text-sm space-x-2">
                          <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Ver
                          </button>
                          <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                            Bloquear
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Candidates Table */}
            {activeTab === 'candidates' && (
              <div className="bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-700">
                <table className="w-full">
                  <thead className="bg-gray-900 border-b border-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Nome</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Data de Entrada</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Ganhos</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {candidates.map((candidate) => (
                      <tr key={candidate.id} className="hover:bg-gray-700 transition">
                        <td className="px-6 py-4 font-semibold text-white">{candidate.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">{candidate.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            candidate.status === 'Ativo'
                              ? 'bg-green-900 text-green-200'
                              : 'bg-gray-900 text-gray-200'
                          }`}>
                            {candidate.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">{candidate.joinDate}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-green-400">{candidate.earnings}</td>
                        <td className="px-6 py-4 text-sm space-x-2">
                          <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Ver
                          </button>
                          <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                            Bloquear
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Partners Table */}
            {activeTab === 'partners' && (
              <div className="bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-700">
                <table className="w-full">
                  <thead className="bg-gray-900 border-b border-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Parceiro</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Tipo</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Data de Entrada</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Cursos</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {partners.map((partner) => (
                      <tr key={partner.id} className="hover:bg-gray-700 transition">
                        <td className="px-6 py-4 font-semibold text-white">{partner.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">{partner.type}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            partner.status === 'Ativo'
                              ? 'bg-green-900 text-green-200'
                              : partner.status === 'Pendente'
                              ? 'bg-yellow-900 text-yellow-200'
                              : 'bg-red-900 text-red-200'
                          }`}>
                            {partner.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">{partner.joinDate}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-blue-400">{partner.courses}</td>
                        <td className="px-6 py-4 text-sm space-x-2">
                          <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Ver
                          </button>
                          <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                            Aprovar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

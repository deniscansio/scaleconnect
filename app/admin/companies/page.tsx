'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState([
    { id: 1, name: 'Tech Solutions Brasil', plan: 'Growth', status: 'Ativo', joinDate: '2024-01-15', revenue: 'R$ 997/mês', users: 5 },
    { id: 2, name: 'Marketing Digital Plus', plan: 'Basic', status: 'Ativo', joinDate: '2024-02-20', revenue: 'R$ 497/mês', users: 2 },
    { id: 3, name: 'E-commerce Solutions', plan: 'Scale', status: 'Ativo', joinDate: '2024-03-10', revenue: 'R$ 1.997/mês', users: 12 },
    { id: 4, name: 'Consultoria XYZ', plan: 'Growth', status: 'Bloqueado', joinDate: '2024-03-01', revenue: 'R$ 0', users: 0 },
    { id: 5, name: 'Startup Inovadora', plan: 'Basic', status: 'Pendente', joinDate: '2024-04-05', revenue: 'R$ 0', users: 1 },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('Todos')

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'Todos' || company.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleBlockCompany = (id: number) => {
    setCompanies(companies.map(c => c.id === id ? { ...c, status: 'Bloqueado' } : c))
  }

  const handleApproveCompany = (id: number) => {
    setCompanies(companies.map(c => c.id === id ? { ...c, status: 'Ativo' } : c))
  }

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
            <Link href="/admin/companies" className="block px-4 py-3 bg-yellow-400 text-black rounded-lg font-semibold">
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
              <h1 className="text-4xl font-bold text-white mb-2">🏢 Gerenciar Empresas</h1>
              <p className="text-gray-400">Total de {companies.length} empresas cadastradas</p>
            </div>

            {/* Filters */}
            <div className="mb-6 flex gap-4">
              <input
                type="text"
                placeholder="Buscar empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-yellow-400 outline-none"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-yellow-400 outline-none"
              >
                <option>Todos</option>
                <option>Ativo</option>
                <option>Bloqueado</option>
                <option>Pendente</option>
              </select>
            </div>

            {/* Companies Table */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-900 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Empresa</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Plano</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Data de Entrada</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Receita</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Usuários</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.map((company) => (
                    <tr key={company.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                      <td className="px-6 py-4 text-white font-semibold">{company.name}</td>
                      <td className="px-6 py-4 text-gray-300">{company.plan}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          company.status === 'Ativo' ? 'bg-green-500 text-white' :
                          company.status === 'Bloqueado' ? 'bg-red-500 text-white' :
                          'bg-yellow-500 text-black'
                        }`}>
                          {company.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{company.joinDate}</td>
                      <td className="px-6 py-4 text-yellow-400 font-semibold">{company.revenue}</td>
                      <td className="px-6 py-4 text-gray-300">{company.users}</td>
                      <td className="px-6 py-4 flex gap-2">
                        {company.status === 'Pendente' && (
                          <button
                            onClick={() => handleApproveCompany(company.id)}
                            className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                          >
                            Aprovar
                          </button>
                        )}
                        {company.status === 'Ativo' && (
                          <button
                            onClick={() => handleBlockCompany(company.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                          >
                            Bloquear
                          </button>
                        )}
                        <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

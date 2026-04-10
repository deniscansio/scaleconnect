'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, company: 'Tech Solutions Brasil', plan: 'Growth', status: 'Ativa', startDate: '2024-01-15', renewalDate: '2024-05-15', price: 'R$ 997/mês' },
    { id: 2, company: 'Marketing Digital Plus', plan: 'Basic', status: 'Ativa', startDate: '2024-02-20', renewalDate: '2024-05-20', price: 'R$ 497/mês' },
    { id: 3, company: 'E-commerce Solutions', plan: 'Scale', status: 'Ativa', startDate: '2024-03-10', renewalDate: '2024-06-10', price: 'R$ 1.997/mês' },
    { id: 4, company: 'Consultoria XYZ', plan: 'Growth', status: 'Cancelada', startDate: '2024-03-01', renewalDate: '2024-04-01', price: 'R$ 997/mês' },
    { id: 5, company: 'Startup Inovadora', plan: 'Basic', status: 'Pendente', startDate: '2024-04-05', renewalDate: '2024-07-05', price: 'R$ 497/mês' },
  ])

  const [filterStatus, setFilterStatus] = useState('Todos')

  const filteredSubscriptions = subscriptions.filter(sub => {
    return filterStatus === 'Todos' || sub.status === filterStatus
  })

  const activeCount = subscriptions.filter(s => s.status === 'Ativa').length
  const totalMRR = subscriptions
    .filter(s => s.status === 'Ativa')
    .reduce((sum, s) => sum + parseFloat(s.price.replace('R$ ', '').replace('/mês', '').replace('.', '').replace(',', '.')), 0)

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
            <Link href="/admin/subscriptions" className="block px-4 py-3 bg-yellow-400 text-black rounded-lg font-semibold">
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
              <h1 className="text-4xl font-bold text-white mb-2">💳 Gerenciar Assinaturas</h1>
              <p className="text-gray-400">Controle de planos e renovações de empresas</p>
            </div>

            {/* KPIs */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Assinaturas Ativas</p>
                <p className="text-3xl font-bold text-green-400">{activeCount}</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">MRR (Receita Mensal)</p>
                <p className="text-3xl font-bold text-yellow-400">R$ {totalMRR.toFixed(2).replace('.', ',')}</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Total de Assinaturas</p>
                <p className="text-3xl font-bold text-blue-400">{subscriptions.length}</p>
              </div>
            </div>

            {/* Filter */}
            <div className="mb-6">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-yellow-400 outline-none"
              >
                <option>Todos</option>
                <option>Ativa</option>
                <option>Cancelada</option>
                <option>Pendente</option>
              </select>
            </div>

            {/* Subscriptions Table */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-900 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Empresa</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Plano</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Data de Início</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Data de Renovação</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Preço</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubscriptions.map((sub) => (
                    <tr key={sub.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                      <td className="px-6 py-4 text-white font-semibold">{sub.company}</td>
                      <td className="px-6 py-4 text-gray-300">{sub.plan}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          sub.status === 'Ativa' ? 'bg-green-500 text-white' :
                          sub.status === 'Cancelada' ? 'bg-red-500 text-white' :
                          'bg-yellow-500 text-black'
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{sub.startDate}</td>
                      <td className="px-6 py-4 text-gray-300">{sub.renewalDate}</td>
                      <td className="px-6 py-4 text-yellow-400 font-semibold">{sub.price}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">
                          Editar
                        </button>
                        <button className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700">
                          Cancelar
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

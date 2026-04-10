'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState([
    { id: 1, type: 'Assinatura', user: 'Tech Solutions Brasil', amount: 'R$ 997', date: '2024-04-01', status: 'Pago', method: 'Cartão de Crédito' },
    { id: 2, type: 'Comissão', user: 'João Silva', amount: 'R$ 500', date: '2024-03-28', status: 'Pago', method: 'Transferência' },
    { id: 3, type: 'Assinatura', user: 'E-commerce Solutions', amount: 'R$ 1.997', date: '2024-04-01', status: 'Pago', method: 'Boleto' },
    { id: 4, type: 'Comissão', user: 'Maria Santos', amount: 'R$ 800', date: '2024-03-25', status: 'Pendente', method: 'Transferência' },
    { id: 5, type: 'Assinatura', user: 'Marketing Digital Plus', amount: 'R$ 497', date: '2024-04-02', status: 'Falha', method: 'Cartão de Crédito' },
  ])

  const [filterStatus, setFilterStatus] = useState('Todos')

  const filteredPayments = payments.filter(payment => {
    return filterStatus === 'Todos' || payment.status === filterStatus
  })

  const totalPago = payments
    .filter(p => p.status === 'Pago')
    .reduce((sum, p) => sum + parseFloat(p.amount.replace('R$ ', '').replace('.', '').replace(',', '.')), 0)

  const totalPendente = payments
    .filter(p => p.status === 'Pendente')
    .reduce((sum, p) => sum + parseFloat(p.amount.replace('R$ ', '').replace('.', '').replace(',', '.')), 0)

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
            <Link href="/admin/payments" className="block px-4 py-3 bg-yellow-400 text-black rounded-lg font-semibold">
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
              <h1 className="text-4xl font-bold text-white mb-2">💰 Gerenciar Pagamentos</h1>
              <p className="text-gray-400">Histórico e controle de transações financeiras</p>
            </div>

            {/* KPIs */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Total Pago</p>
                <p className="text-3xl font-bold text-green-400">R$ {totalPago.toFixed(2).replace('.', ',')}</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Pendente</p>
                <p className="text-3xl font-bold text-yellow-400">R$ {totalPendente.toFixed(2).replace('.', ',')}</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Total de Transações</p>
                <p className="text-3xl font-bold text-blue-400">{payments.length}</p>
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
                <option>Pago</option>
                <option>Pendente</option>
                <option>Falha</option>
              </select>
            </div>

            {/* Payments Table */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-900 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Tipo</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Usuário</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Valor</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Data</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Método</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                      <td className="px-6 py-4 text-white font-semibold">{payment.type}</td>
                      <td className="px-6 py-4 text-gray-300">{payment.user}</td>
                      <td className="px-6 py-4 text-yellow-400 font-semibold">{payment.amount}</td>
                      <td className="px-6 py-4 text-gray-300">{payment.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          payment.status === 'Pago' ? 'bg-green-500 text-white' :
                          payment.status === 'Pendente' ? 'bg-yellow-500 text-black' :
                          'bg-red-500 text-white'
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{payment.method}</td>
                      <td className="px-6 py-4">
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

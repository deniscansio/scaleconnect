'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function CandidateEarningsPage() {
  const [earnings, setEarnings] = useState([
    {
      id: 1,
      type: 'lead',
      company: 'Tech Solutions',
      description: 'Lead qualificado - João Silva',
      amount: 500,
      status: 'paid',
      date: '2024-03-28',
    },
    {
      id: 2,
      type: 'sale',
      company: 'Cloud Corp',
      description: 'Venda de plano Growth',
      amount: 2000,
      status: 'paid',
      date: '2024-03-25',
    },
    {
      id: 3,
      type: 'lead',
      company: 'Tech Solutions',
      description: 'Lead qualificado - Maria Santos',
      amount: 500,
      status: 'approved',
      date: '2024-03-22',
    },
    {
      id: 4,
      type: 'meeting',
      company: 'Sales Pro',
      description: 'Reunião agendada com prospect',
      amount: 200,
      status: 'approved',
      date: '2024-03-20',
    },
    {
      id: 5,
      type: 'lead',
      company: 'Tech Solutions',
      description: 'Lead qualificado - Pedro Oliveira',
      amount: 500,
      status: 'pending',
      date: '2024-03-18',
    },
    {
      id: 6,
      type: 'sale',
      company: 'Business Growth',
      description: 'Venda de plano Scale',
      amount: 3000,
      status: 'pending',
      date: '2024-03-15',
    },
  ])

  const getTypeLabel = (type: string) => {
    const map: { [key: string]: { label: string; icon: string } } = {
      lead: { label: 'Lead', icon: '📞' },
      sale: { label: 'Venda', icon: '💰' },
      meeting: { label: 'Reunião', icon: '📅' },
    }
    return map[type] || { label: type, icon: '📌' }
  }

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { bg: string; text: string; label: string } } = {
      paid: { bg: 'bg-green-100', text: 'text-green-700', label: 'Pago' },
      approved: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Aprovado' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pendente' },
    }
    const s = statusMap[status] || statusMap.pending
    return <span className={`px-3 py-1 ${s.bg} ${s.text} rounded-full text-sm font-semibold`}>{s.label}</span>
  }

  const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0)
  const paidEarnings = earnings.filter(e => e.status === 'paid').reduce((sum, e) => sum + e.amount, 0)
  const approvedEarnings = earnings.filter(e => e.status === 'approved').reduce((sum, e) => sum + e.amount, 0)
  const pendingEarnings = earnings.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.amount, 0)

  return (
    <main className="min-h-screen bg-gradient-to-br from-candidate-light to-slate-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b-4 border-candidate-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-candidate-primary">ScaleConnect</div>
          <Link href="/candidate/dashboard" className="text-candidate-primary font-semibold hover:underline">
            ← Voltar ao Dashboard
          </Link>
        </div>
      </nav>

      {/* Sidebar + Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-screen p-6">
          <nav className="space-y-4">
            <Link href="/candidate/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📊 Dashboard
            </Link>
            <Link href="/candidate/jobs" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📋 Vagas
            </Link>
            <Link href="/candidate/opportunities" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              💼 Oportunidades
            </Link>
            <Link href="/candidate/earnings" className="block px-4 py-2 bg-candidate-primary text-white rounded-lg font-semibold">
              💰 Meus Ganhos
            </Link>
            <Link href="/candidate/career-path" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              🚀 Trilha de Carreira
            </Link>
            <Link href="/candidate/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              👤 Perfil
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">💰 Meus Ganhos</h1>
              <p className="text-gray-600">Acompanhe suas comissões e ganhos com vendas e leads</p>
            </div>

            {/* Earnings Summary */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="card bg-gradient-to-br from-green-50 to-green-100">
                <p className="text-gray-600 mb-2">Total de Ganhos</p>
                <p className="text-3xl font-bold text-green-600">R$ {totalEarnings.toLocaleString('pt-BR')}</p>
              </div>
              <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
                <p className="text-gray-600 mb-2">Ganhos Pagos</p>
                <p className="text-3xl font-bold text-blue-600">R$ {paidEarnings.toLocaleString('pt-BR')}</p>
              </div>
              <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
                <p className="text-gray-600 mb-2">Ganhos Aprovados</p>
                <p className="text-3xl font-bold text-purple-600">R$ {approvedEarnings.toLocaleString('pt-BR')}</p>
              </div>
              <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100">
                <p className="text-gray-600 mb-2">Ganhos Pendentes</p>
                <p className="text-3xl font-bold text-yellow-600">R$ {pendingEarnings.toLocaleString('pt-BR')}</p>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-4 mb-8 overflow-x-auto">
              <button className="px-4 py-2 bg-candidate-primary text-white rounded-lg font-semibold whitespace-nowrap">
                Todos ({earnings.length})
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 whitespace-nowrap">
                Pagos ({earnings.filter(e => e.status === 'paid').length})
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 whitespace-nowrap">
                Aprovados ({earnings.filter(e => e.status === 'approved').length})
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 whitespace-nowrap">
                Pendentes ({earnings.filter(e => e.status === 'pending').length})
              </button>
            </div>

            {/* Earnings Table */}
            <div className="card bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tipo</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Empresa</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Descrição</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Valor</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Data</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {earnings.map((earning) => {
                      const typeInfo = getTypeLabel(earning.type)
                      return (
                        <tr key={earning.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <span className="text-2xl">{typeInfo.icon}</span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-semibold text-gray-900">{earning.company}</p>
                          </td>
                          <td className="px-6 py-4 text-gray-700">{earning.description}</td>
                          <td className="px-6 py-4">
                            <p className="font-bold text-candidate-secondary">
                              R$ {earning.amount.toLocaleString('pt-BR')}
                            </p>
                          </td>
                          <td className="px-6 py-4">{getStatusBadge(earning.status)}</td>
                          <td className="px-6 py-4 text-gray-700">{earning.date}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Export Button */}
            <div className="mt-8 flex justify-end">
              <button className="px-6 py-3 bg-candidate-primary text-white rounded-lg font-semibold hover:bg-opacity-90">
                📥 Exportar Relatório
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

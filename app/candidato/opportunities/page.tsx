'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function CandidateOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState([
    {
      id: 1,
      product: 'Software de CRM Cloud',
      company: 'Tech Solutions',
      description: 'Represente nosso software de CRM e ganhe comissões por reunião agendada',
      ticketMedio: 5000,
      commissionPerMeeting: 250,
      commissionPerSale: 1500,
      targetAudience: 'Empresas de 10-100 funcionários',
      activeRepresentatives: 45,
      status: 'interested',
    },
    {
      id: 2,
      product: 'Plataforma de Marketing Automation',
      company: 'Cloud Corp',
      description: 'Ganhe comissões altas representando nossa plataforma de automação',
      ticketMedio: 8000,
      commissionPerMeeting: 400,
      commissionPerSale: 2400,
      targetAudience: 'Agências de marketing e e-commerce',
      activeRepresentatives: 32,
      status: 'interested',
    },
    {
      id: 3,
      product: 'Consultoria em Vendas B2B',
      company: 'Sales Pro',
      description: 'Represente nossos serviços de consultoria em vendas',
      ticketMedio: 15000,
      commissionPerMeeting: 500,
      commissionPerSale: 4500,
      targetAudience: 'Empresas em crescimento',
      activeRepresentatives: 18,
      status: 'applied',
    },
    {
      id: 4,
      product: 'Plataforma de Treinamento Online',
      company: 'EdTech Solutions',
      description: 'Ganhe comissões indicando nossos cursos de vendas',
      ticketMedio: 1200,
      commissionPerMeeting: 100,
      commissionPerSale: 360,
      targetAudience: 'Profissionais de vendas',
      activeRepresentatives: 120,
      status: 'interested',
    },
  ])

  const [selectedOpportunity, setSelectedOpportunity] = useState<number | null>(null)
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false)
  const [withdrawalReason, setWithdrawalReason] = useState('')

  const handleApply = (id: number) => {
    setOpportunities(opportunities.map(opp => 
      opp.id === id ? { ...opp, status: 'applied' } : opp
    ))
  }

  const handleWithdraw = (id: number, reason: string) => {
    setOpportunities(opportunities.map(opp => 
      opp.id === id ? { ...opp, status: 'interested' } : opp
    ))
    setShowWithdrawalModal(false)
    setWithdrawalReason('')
  }

  const calculateMonthlyPotential = (commissionPerMeeting: number) => {
    return commissionPerMeeting * 10 // Assuming 10 meetings per month
  }

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
            <Link href="/candidate/opportunities" className="block px-4 py-2 bg-candidate-primary text-white rounded-lg font-semibold">
              💼 Oportunidades
            </Link>
            <Link href="/candidate/earnings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              💰 Meus Ganhos
            </Link>
            <Link href="/candidate/career-path" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              🚀 Jornada de Sucesso
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
              <h1 className="text-4xl font-bold text-gray-900 mb-2">💼 Oportunidades de Representação</h1>
              <p className="text-gray-600">Represente produtos e serviços e ganhe comissões por reunião agendada</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-4 mb-8 overflow-x-auto">
              <button className="px-4 py-2 bg-candidate-primary text-white rounded-lg font-semibold whitespace-nowrap">
                Todas ({opportunities.length})
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 whitespace-nowrap">
                Minhas ({opportunities.filter(o => o.status === 'applied').length})
              </button>
            </div>

            {/* Opportunities Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {opportunities.map((opp) => (
                <div 
                  key={opp.id} 
                  className="card bg-white border-l-4 border-candidate-secondary hover:shadow-lg transition cursor-pointer"
                  onClick={() => setSelectedOpportunity(selectedOpportunity === opp.id ? null : opp.id)}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{opp.product}</h3>
                      <p className="text-candidate-primary font-semibold">{opp.company}</p>
                    </div>
                    {opp.status === 'applied' && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        ✓ Representando
                      </span>
                    )}
                  </div>

                  <p className="text-gray-700 mb-4">{opp.description}</p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Ticket Médio</p>
                      <p className="text-lg font-bold text-candidate-primary">R$ {opp.ticketMedio.toLocaleString('pt-BR')}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Comissão por Reunião</p>
                      <p className="text-lg font-bold text-green-600">R$ {opp.commissionPerMeeting.toLocaleString('pt-BR')}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Comissão por Venda</p>
                      <p className="text-lg font-bold text-purple-600">R$ {opp.commissionPerSale.toLocaleString('pt-BR')}</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Potencial Mensal</p>
                      <p className="text-lg font-bold text-orange-600">R$ {calculateMonthlyPotential(opp.commissionPerMeeting).toLocaleString('pt-BR')}</p>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="mb-4 pb-4 border-b">
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-semibold">👥 Público-alvo:</span> {opp.targetAudience}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">🤝 Representantes ativos:</span> {opp.activeRepresentatives}
                    </p>
                  </div>

                  {/* Expandable Details */}
                  {selectedOpportunity === opp.id && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold text-gray-900 mb-3">📊 Detalhes da Comissão</h4>
                      <div className="space-y-2 text-sm text-gray-700 mb-4">
                        <p>💰 Cada reunião agendada: <span className="font-bold text-green-600">R$ {opp.commissionPerMeeting}</span></p>
                        <p>🎯 Cada venda fechada: <span className="font-bold text-green-600">R$ {opp.commissionPerSale}</span></p>
                        <p>📈 Com 10 reuniões/mês: <span className="font-bold text-green-600">R$ {calculateMonthlyPotential(opp.commissionPerMeeting)}/mês</span></p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4">
                    {opp.status === 'interested' ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleApply(opp.id)
                        }}
                        className="flex-1 px-4 py-2 bg-candidate-secondary text-white rounded-lg font-semibold hover:bg-opacity-90"
                      >
                        Representar Produto
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedOpportunity(opp.id)
                          setShowWithdrawalModal(true)
                        }}
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600"
                      >
                        Desistir
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Withdrawal Modal */}
            {showWithdrawalModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="card bg-white max-w-md mx-auto">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Desistir da Representação</h2>
                  <p className="text-gray-600 mb-6">Por favor, nos diga o motivo da desistência:</p>
                  
                  <div className="space-y-3 mb-6">
                    {[
                      'Consegui outro emprego',
                      'Sem interesse no produto',
                      'Recebi outra proposta melhor',
                      'Falta de tempo',
                      'Outro motivo'
                    ].map((reason) => (
                      <label key={reason} className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="reason"
                          value={reason}
                          checked={withdrawalReason === reason}
                          onChange={(e) => setWithdrawalReason(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-gray-700">{reason}</span>
                      </label>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        if (withdrawalReason && selectedOpportunity !== null) {
                          handleWithdraw(selectedOpportunity, withdrawalReason)
                        }
                      }}
                      disabled={!withdrawalReason}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 disabled:opacity-50"
                    >
                      Confirmar Desistência
                    </button>
                    <button
                      onClick={() => setShowWithdrawalModal(false)}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

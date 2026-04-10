'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function CompanyLeadsPage() {
  const [activeTab, setActiveTab] = useState('provided') // 'provided', 'generated'
  const [showImportModal, setShowImportModal] = useState(false)

  // Leads Cedidos pela Empresa
  const [providedLeads, setProvidedLeads] = useState<any[]>([
    {
      id: 1,
      companyName: 'Tech Solutions Brasil',
      legalName: 'Tech Solutions Brasil LTDA',
      phone: '(11) 98765-4321',
      email: 'contato@techsolutions.com.br',
      persona: 'Diretor de TI',
      personaPhone: '(11) 99876-5432',
      personaEmail: 'diretor.ti@techsolutions.com.br',
      comment: 'Empresa em crescimento, orçamento aprovado para Q2',
      status: 'Bloqueado',
      assignedTo: null,
      authorizedReps: [],
      createdAt: '2024-03-20',
      lastUpdated: '2024-03-20',
      stage: 'Prospecção',
      value: 'R$ 5.000',
    },
    {
      id: 2,
      companyName: 'Marketing Digital Plus',
      legalName: 'Marketing Digital Plus EIRELI',
      phone: '(21) 3456-7890',
      email: 'vendas@marketingplus.com.br',
      persona: 'Gerente de Marketing',
      personaPhone: '(21) 98765-4321',
      personaEmail: 'gerente@marketingplus.com.br',
      comment: 'Agência com 50 clientes, alto potencial de ticket',
      status: 'Bloqueado',
      assignedTo: null,
      authorizedReps: [],
      createdAt: '2024-03-19',
      lastUpdated: '2024-03-19',
      stage: 'Prospecção',
      value: 'R$ 3.000',
    },
    {
      id: 3,
      companyName: 'E-commerce Solutions',
      legalName: 'E-commerce Solutions SA',
      phone: '(31) 2345-6789',
      email: 'contato@ecommerce.com.br',
      persona: 'Diretor Comercial',
      personaPhone: '(31) 99876-5432',
      personaEmail: 'diretor@ecommerce.com.br',
      comment: 'Empresa consolidada, decisor disponível',
      status: 'Autorizado',
      assignedTo: 'João Silva (BDR)',
      authorizedReps: ['João Silva'],
      createdAt: '2024-03-18',
      lastUpdated: '2024-03-21',
      stage: 'Qualificação',
      value: 'R$ 5.000',
    },
  ])

  // Leads Gerados pelo Representante
  const [generatedLeads, setGeneratedLeads] = useState([
    {
      id: 101,
      companyName: 'Startup Tech Inovadora',
      legalName: 'Startup Tech Inovadora LTDA',
      phone: '(11) 91234-5678',
      email: 'contato@startuptech.com.br',
      persona: 'Founder/CEO',
      personaPhone: '(11) 99123-4567',
      personaEmail: 'ceo@startuptech.com.br',
      comment: 'Startup em fase de crescimento, buscando soluções de gestão',
      generatedBy: 'Maria Santos (SDR)',
      status: 'Ativo',
      stage: 'Apresentação',
      value: 'R$ 5.000',
      createdAt: '2024-03-22',
      lastUpdated: '2024-03-23',
      updates: 2,
      accessRequests: 1,
      revenue: 'R$ 150',
    },
    {
      id: 102,
      companyName: 'Consultoria Empresarial XYZ',
      legalName: 'Consultoria Empresarial XYZ EIRELI',
      phone: '(85) 3234-5678',
      email: 'vendas@consultoriaxyz.com.br',
      persona: 'Sócio-Diretor',
      personaPhone: '(85) 99234-5678',
      personaEmail: 'socio@consultoriaxyz.com.br',
      comment: 'Consultoria com 30 clientes, interessada em automação',
      generatedBy: 'Pedro Costa (AE)',
      status: 'Ativo',
      stage: 'Negociação',
      value: 'R$ 3.000',
      createdAt: '2024-03-21',
      lastUpdated: '2024-03-22',
      updates: 3,
      accessRequests: 2,
      revenue: 'R$ 300',
    },
  ])

  const representatives = [
    { id: 1, name: 'João Silva', role: 'BDR', status: 'Ativo' },
    { id: 2, name: 'Maria Santos', role: 'SDR', status: 'Ativo' },
    { id: 3, name: 'Pedro Costa', role: 'Account Executive', status: 'Ativo' },
  ]

  const handleAuthorizeRepresentative = (leadId: number, repName: string) => {
    setProvidedLeads(providedLeads.map(lead => 
      lead.id === leadId 
        ? {
            ...lead,
            status: 'Autorizado',
            assignedTo: repName,
            authorizedReps: [...lead.authorizedReps, repName]
          }
        : lead
    ))
  }

  const handleBlockLead = (leadId: number) => {
    setProvidedLeads(providedLeads.map(lead =>
      lead.id === leadId
        ? { ...lead, status: 'Bloqueado', assignedTo: null }
        : lead
    ))
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-company-light to-slate-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b-4 border-company-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-company-primary">ScaleConnect</div>
          <Link href="/empresa/dashboard" className="text-company-primary font-semibold hover:underline">
            ← Voltar ao Dashboard
          </Link>
        </div>
      </nav>

      {/* Sidebar + Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-screen p-6">
          <nav className="space-y-4">
            <Link href="/empresa/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📊 Dashboard
            </Link>
            <Link href="/empresa/jobs" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📋 Vagas
            </Link>
            <Link href="/empresa/opportunities" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              💼 Representação
            </Link>
            <Link href="/empresa/leads" className="block px-4 py-2 bg-company-primary text-white rounded-lg font-semibold">
              📞 CRM de Leads
            </Link>
            <Link href="/empresa/metrics" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📈 Métricas
            </Link>
            <Link href="/empresa/billing" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              💳 Faturamento
            </Link>
            <Link href="/empresa/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              ⚙️ Perfil da Empresa
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">📞 CRM de Leads</h1>
              <p className="text-gray-600">Gerencie leads cedidos e gerados por representantes com controle de acesso</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b">
              <button
                onClick={() => setActiveTab('provided')}
                className={`px-6 py-3 font-semibold border-b-4 transition ${
                  activeTab === 'provided'
                    ? 'border-company-primary text-company-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                🏢 Leads Cedidos (Empresa)
              </button>
              <button
                onClick={() => setActiveTab('generated')}
                className={`px-6 py-3 font-semibold border-b-4 transition ${
                  activeTab === 'generated'
                    ? 'border-company-primary text-company-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                👤 Leads Gerados (Representantes)
              </button>
            </div>

            {/* Leads Cedidos */}
            {activeTab === 'provided' && (
              <div className="space-y-6">
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowImportModal(true)}
                    className="px-6 py-2 bg-company-primary text-white rounded-lg font-semibold hover:bg-opacity-90"
                  >
                    📥 Importar Leads
                  </button>
                </div>

                {/* Import Modal */}
                {showImportModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
                      <h2 className="text-2xl font-bold mb-4">Importar Leads</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Formato: CSV ou Excel</label>
                          <p className="text-xs text-gray-600 mb-3">Colunas obrigatórias: Nome da Empresa, Razão Social, Telefone, Email, Persona, Cel Persona, Email Corporativo, Comentário</p>
                          <input type="file" className="w-full border rounded-lg p-2" accept=".csv,.xlsx" />
                        </div>
                        <div className="flex gap-4">
                          <button
                            onClick={() => setShowImportModal(false)}
                            className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-400"
                          >
                            Cancelar
                          </button>
                          <button className="flex-1 px-4 py-2 bg-company-primary text-white rounded-lg font-semibold hover:bg-opacity-90">
                            Importar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Leads Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Empresa</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Contato</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Persona</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Autorizado Para</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {providedLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-semibold text-gray-900">{lead.companyName}</p>
                              <p className="text-xs text-gray-600">{lead.legalName}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <p className="text-gray-900">{lead.email}</p>
                            <p className="text-xs text-gray-600">{lead.phone}</p>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <p className="text-gray-900">{lead.persona}</p>
                            <p className="text-xs text-gray-600">{lead.personaEmail}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              lead.status === 'Autorizado'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {lead.authorizedReps.length > 0 ? (
                              <div className="space-y-1">
                                {lead.authorizedReps.map((rep: string) => (
                                  <span key={rep} className="block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                    {rep}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-gray-500 text-xs">Nenhum</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm space-y-2">
                            {lead.status === 'Bloqueado' && (
                              <div className="flex gap-2">
                                <select
                                  onChange={(e) => {
                                    if (e.target.value) {
                                      handleAuthorizeRepresentative(lead.id, e.target.value)
                                      e.target.value = ''
                                    }
                                  }}
                                  className="px-2 py-1 border rounded text-xs"
                                >
                                  <option value="">Autorizar para...</option>
                                  {representatives.map((rep) => (
                                    <option key={rep.id} value={rep.name}>
                                      {rep.name} ({rep.role})
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                            {lead.status === 'Autorizado' && (
                              <button
                                onClick={() => handleBlockLead(lead.id)}
                                className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200"
                              >
                                Bloquear
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Leads Gerados */}
            {activeTab === 'generated' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-gray-600 mb-1">Total de Leads Gerados</p>
                    <p className="text-3xl font-bold text-blue-600">{generatedLeads.length}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-xs text-gray-600 mb-1">Atualizações Solicitadas</p>
                    <p className="text-3xl font-bold text-green-600">{generatedLeads.reduce((sum, lead) => sum + lead.accessRequests, 0)}</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-xs text-gray-600 mb-1">Receita Gerada</p>
                    <p className="text-3xl font-bold text-orange-600">R$ {generatedLeads.reduce((sum, lead) => {
                      const value = parseInt(lead.revenue.replace('R$ ', '').replace(',', ''))
                      return sum + value
                    }, 0)}</p>
                  </div>
                </div>

                {/* Leads Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {generatedLeads.map((lead) => (
                    <div key={lead.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-company-primary">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{lead.companyName}</h3>
                          <p className="text-xs text-gray-600">{lead.legalName}</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          {lead.status}
                        </span>
                      </div>

                      <div className="space-y-3 mb-4 pb-4 border-b">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-xs text-gray-600">Email</p>
                            <p className="font-semibold text-gray-900">{lead.email}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Telefone</p>
                            <p className="font-semibold text-gray-900">{lead.phone}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Persona</p>
                          <p className="font-semibold text-gray-900">{lead.persona}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Comentário</p>
                          <p className="text-sm text-gray-900">{lead.comment}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-4 pb-4 border-b">
                        <div className="p-2 bg-blue-50 rounded">
                          <p className="text-xs text-gray-600">Gerado por</p>
                          <p className="text-sm font-semibold text-gray-900">{lead.generatedBy}</p>
                        </div>
                        <div className="p-2 bg-purple-50 rounded">
                          <p className="text-xs text-gray-600">Estágio</p>
                          <p className="text-sm font-semibold text-gray-900">{lead.stage}</p>
                        </div>
                        <div className="p-2 bg-green-50 rounded">
                          <p className="text-xs text-gray-600">Atualizações</p>
                          <p className="text-sm font-semibold text-gray-900">{lead.updates}</p>
                        </div>
                        <div className="p-2 bg-orange-50 rounded">
                          <p className="text-xs text-gray-600">Receita</p>
                          <p className="text-sm font-semibold text-orange-600">{lead.revenue}</p>
                        </div>
                      </div>

                      <div className="text-xs text-gray-600 mb-4">
                        <p>Criado em: {lead.createdAt}</p>
                        <p>Última atualização: {lead.lastUpdated}</p>
                      </div>

                      <button className="w-full px-4 py-2 bg-company-primary text-white rounded-lg font-semibold hover:bg-opacity-90">
                        👁️ Ver Detalhes
                      </button>
                    </div>
                  ))}
                </div>

                {/* Pricing Info */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">💰 Modelo de Monetização</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">Por Atualização de Lead</p>
                      <p className="text-2xl font-bold text-orange-600">R$ 50</p>
                      <p className="text-xs text-gray-600">Cada vez que representante atualiza informações</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">Por Acesso</p>
                      <p className="text-2xl font-bold text-orange-600">R$ 25</p>
                      <p className="text-xs text-gray-600">Cada vez que empresa acessa lead gerado</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">Comissão Representante</p>
                      <p className="text-2xl font-bold text-green-600">70%</p>
                      <p className="text-xs text-gray-600">Representante recebe 70% da receita</p>
                    </div>
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

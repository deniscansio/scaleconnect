'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function CompanyRepresentationPage() {
  const [activeTab, setActiveTab] = useState('leads')
  const [selectedOpp, setSelectedOpp] = useState<number | null>(null)
  const [showMaterials, setShowMaterials] = useState(false)

  // Oportunidades de Geração de Leads (BDR/SDR)
  const [leadsOpportunities, setLeadsOpportunities] = useState([
    {
      id: 1,
      name: 'Geração de Leads - Software de Gestão',
      product: 'SaaS de Gestão Empresarial',
      productCharacteristics: 'Cloud-based, Integração com 50+ ferramentas, Dashboard em tempo real, Suporte 24/7',
      productBenefits: 'Reduz custos operacionais em 40%, Aumenta produtividade em 60%, ROI em 3 meses',
      companyHistory: 'Fundada em 2015, 150 funcionários, Líder no mercado de gestão empresarial com 5000+ clientes',
      salesPitch: 'Transforme sua gestão empresarial com nossa solução cloud. Integre todos os seus processos em um único lugar, economize tempo e dinheiro.',
      approachPitch: 'Olá! Identificamos que sua empresa poderia se beneficiar com nossa solução de gestão. Podemos agendar uma conversa rápida?',
      emailTemplate: 'Olá [NOME],\n\nEspero que esteja bem! Gostaria de apresentar uma solução que pode revolucionar a gestão da sua empresa...',
      whatsappTemplate: 'Oi [NOME]! 👋 Vi seu perfil e acho que podemos ajudar sua empresa com gestão. Quer uma demo rápida?',
      linkedinTemplate: 'Oi [NOME], vi que você trabalha em [EMPRESA]. Temos uma solução que pode ajudar no processo de gestão. Bora conversar?',
      ticketMedio: 'R$ 5.000',
      commissionPerMeeting: 'R$ 250',
      targetPersona: 'Diretores de TI, Gerentes de Operações',
      segment: 'Tecnologia, Manufatura, Varejo',
      employees: '50-500',
      channels: ['Email', 'LinkedIn', 'Telefone', 'Reunião Presencial'],
      salesProcess: ['Prospecção', 'Qualificação', 'Apresentação', 'Negociação', 'Fechamento'],
      companyProfile: 'Empresa de software com 150 funcionários, líder em soluções de gestão',
      minimumScore: 8,
      interested: 47,
      inCourse: 28,
      courseCompleted: 15,
      activeReps: 12,
      meetingsScheduled: 45,
      status: 'Ativa',
      role: 'BDR/SDR - Geração de Leads',
      materials: [
        { name: 'Apresentação Executiva', type: 'PDF', size: '2.4 MB', url: '#' },
        { name: 'Flyer Produto', type: 'PDF', size: '1.2 MB', url: '#' },
        { name: 'eBook - Guia Completo', type: 'PDF', size: '5.8 MB', url: '#' },
        { name: 'Banners Web', type: 'ZIP', size: '3.1 MB', url: '#' },
        { name: 'Vídeo Demo', type: 'MP4', size: '45 MB', url: '#' },
        { name: 'Planilha de Prospecção', type: 'XLSX', size: '0.8 MB', url: '#' },
      ]
    },
    {
      id: 2,
      name: 'Geração de Leads - Plataforma de Marketing',
      product: 'Platform de Marketing Automation',
      productCharacteristics: 'Automação de email, Segmentação avançada, Analytics em tempo real, Integração com CRM',
      productBenefits: 'Aumenta conversão em 50%, Reduz tempo de campanha em 70%, Melhora ROI em 200%',
      companyHistory: 'Startup de marketing automation fundada em 2018, 80 funcionários, Parceira de 2000+ agências',
      salesPitch: 'Automatize suas campanhas de marketing e aumente suas conversões com nossa plataforma inteligente.',
      approachPitch: 'Oi! Vi que você trabalha com marketing. Temos uma ferramenta que pode triplicar seu ROI. Quer conhecer?',
      emailTemplate: 'Olá [NOME],\n\nVi que você trabalha com marketing digital. Temos uma solução que pode aumentar suas conversões em 50%...',
      whatsappTemplate: 'Oi [NOME]! 📊 Temos uma plataforma de marketing automation que triplicou o ROI de nossos clientes. Quer ver?',
      linkedinTemplate: 'Oi [NOME], vi que você é especialista em marketing. Temos uma ferramenta que pode revolucionar suas campanhas. Bora conversar?',
      ticketMedio: 'R$ 3.000',
      commissionPerMeeting: 'R$ 150',
      targetPersona: 'Gerentes de Marketing, Diretores Comerciais',
      segment: 'E-commerce, Agências, SaaS',
      employees: '20-200',
      channels: ['Email', 'LinkedIn', 'WhatsApp'],
      salesProcess: ['Prospecção', 'Qualificação', 'Demo', 'Negociação', 'Fechamento'],
      companyProfile: 'Startup de marketing automation com 80 funcionários',
      minimumScore: 8,
      interested: 32,
      inCourse: 18,
      courseCompleted: 10,
      activeReps: 8,
      meetingsScheduled: 28,
      status: 'Ativa',
      role: 'BDR/SDR - Geração de Leads',
      materials: [
        { name: 'Pitch Deck', type: 'PDF', size: '3.2 MB', url: '#' },
        { name: 'Case Studies', type: 'PDF', size: '2.1 MB', url: '#' },
        { name: 'eBook - Marketing Automation', type: 'PDF', size: '4.5 MB', url: '#' },
        { name: 'Templates Email', type: 'ZIP', size: '1.5 MB', url: '#' },
        { name: 'Vídeo Tutorial', type: 'MP4', size: '32 MB', url: '#' },
      ]
    },
  ])

  // Oportunidades de Executivo de Vendas (AE)
  const [salesOpportunities, setSalesOpportunities] = useState([
    {
      id: 3,
      name: 'Executivo de Vendas - Software de Gestão',
      product: 'SaaS de Gestão Empresarial',
      productCharacteristics: 'Cloud-based, Integração com 50+ ferramentas, Dashboard em tempo real, Suporte 24/7',
      productBenefits: 'Reduz custos operacionais em 40%, Aumenta produtividade em 60%, ROI em 3 meses',
      companyHistory: 'Fundada em 2015, 150 funcionários, Líder no mercado de gestão empresarial com 5000+ clientes',
      salesPitch: 'Transforme sua gestão empresarial com nossa solução cloud. Integre todos os seus processos em um único lugar, economize tempo e dinheiro.',
      approachPitch: 'Olá! Identificamos que sua empresa poderia se beneficiar com nossa solução de gestão. Podemos agendar uma conversa rápida?',
      emailTemplate: 'Olá [NOME],\n\nEspero que esteja bem! Gostaria de apresentar uma solução que pode revolucionar a gestão da sua empresa...',
      whatsappTemplate: 'Oi [NOME]! 👋 Vi seu perfil e acho que podemos ajudar sua empresa com gestão. Quer uma demo rápida?',
      linkedinTemplate: 'Oi [NOME], vi que você trabalha em [EMPRESA]. Temos uma solução que pode ajudar no processo de gestão. Bora conversar?',
      ticketMedio: 'R$ 5.000',
      commissionPerSale: 'R$ 1.500',
      targetPersona: 'Diretores de TI, Gerentes de Operações',
      segment: 'Tecnologia, Manufatura, Varejo',
      employees: '50-500',
      channels: ['Email', 'LinkedIn', 'Telefone', 'Reunião Presencial'],
      salesProcess: ['Qualificação', 'Apresentação', 'Negociação', 'Fechamento', 'Onboarding'],
      companyProfile: 'Empresa de software com 150 funcionários, líder em soluções de gestão',
      minimumScore: 8,
      interested: 28,
      inCourse: 15,
      courseCompleted: 8,
      activeReps: 6,
      salesClosed: 23,
      status: 'Ativa',
      role: 'Account Executive - Fechamento de Vendas',
      materials: [
        { name: 'Apresentação Executiva', type: 'PDF', size: '2.4 MB', url: '#' },
        { name: 'Flyer Produto', type: 'PDF', size: '1.2 MB', url: '#' },
        { name: 'eBook - Guia Completo', type: 'PDF', size: '5.8 MB', url: '#' },
        { name: 'Banners Web', type: 'ZIP', size: '3.1 MB', url: '#' },
        { name: 'Vídeo Demo', type: 'MP4', size: '45 MB', url: '#' },
      ]
    },
  ])

  // Oportunidades Full Stack (Qualifica + Vende)
  const [fullstackOpportunities, setFullstackOpportunities] = useState([
    {
      id: 5,
      name: 'Representante Full Stack - Software de Gestão',
      product: 'SaaS de Gestão Empresarial',
      productCharacteristics: 'Cloud-based, Integração com 50+ ferramentas, Dashboard em tempo real, Suporte 24/7',
      productBenefits: 'Reduz custos operacionais em 40%, Aumenta produtividade em 60%, ROI em 3 meses',
      companyHistory: 'Fundada em 2015, 150 funcionários, Líder no mercado de gestão empresarial com 5000+ clientes',
      salesPitch: 'Transforme sua gestão empresarial com nossa solução cloud. Integre todos os seus processos em um único lugar, economize tempo e dinheiro.',
      approachPitch: 'Olá! Identificamos que sua empresa poderia se beneficiar com nossa solução de gestão. Podemos agendar uma conversa rápida?',
      emailTemplate: 'Olá [NOME],\n\nEspero que esteja bem! Gostaria de apresentar uma solução que pode revolucionar a gestão da sua empresa...',
      whatsappTemplate: 'Oi [NOME]! 👋 Vi seu perfil e acho que podemos ajudar sua empresa com gestão. Quer uma demo rápida?',
      linkedinTemplate: 'Oi [NOME], vi que você trabalha em [EMPRESA]. Temos uma solução que pode ajudar no processo de gestão. Bora conversar?',
      ticketMedio: 'R$ 5.000',
      commissionPerMeeting: 'R$ 250',
      commissionPerSale: 'R$ 1.500',
      targetPersona: 'Diretores de TI, Gerentes de Operações',
      segment: 'Tecnologia, Manufatura, Varejo',
      employees: '50-500',
      channels: ['Email', 'LinkedIn', 'Telefone', 'Reunião Presencial'],
      salesProcess: ['Prospecção', 'Qualificação', 'Apresentação', 'Negociação', 'Fechamento'],
      companyProfile: 'Empresa de software com 150 funcionários, líder em soluções de gestão',
      minimumScore: 8,
      interested: 22,
      inCourse: 12,
      courseCompleted: 6,
      activeReps: 5,
      meetingsScheduled: 32,
      salesClosed: 18,
      status: 'Ativa',
      role: 'Representante Full Stack - Qualifica e Vende',
      materials: [
        { name: 'Apresentação Executiva', type: 'PDF', size: '2.4 MB', url: '#' },
        { name: 'Flyer Produto', type: 'PDF', size: '1.2 MB', url: '#' },
        { name: 'eBook - Guia Completo', type: 'PDF', size: '5.8 MB', url: '#' },
        { name: 'Banners Web', type: 'ZIP', size: '3.1 MB', url: '#' },
        { name: 'Vídeo Demo', type: 'MP4', size: '45 MB', url: '#' },
        { name: 'Planilha de Prospecção', type: 'XLSX', size: '0.8 MB', url: '#' },
      ]
    },
  ])

  const handleViewDetails = (id: number) => {
    setSelectedOpp(selectedOpp === id ? null : id)
  }

  const renderOpportunities = () => {
    let opportunities = []
    let title = ''

    if (activeTab === 'leads') {
      opportunities = leadsOpportunities
      title = '🎯 Geração de Leads Qualificados (BDR/SDR)'
    } else if (activeTab === 'sales') {
      opportunities = salesOpportunities
      title = '💰 Executivo de Vendas (Account Executive)'
    } else {
      opportunities = fullstackOpportunities
      title = '🚀 Representante Full Stack (Qualifica + Vende)'
    }

    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
        {opportunities.map((opp) => (
          <div key={opp.id} className="card bg-white border-l-4 border-company-secondary">
            {/* Header */}
            <div className="flex justify-between items-start mb-4 pb-4 border-b">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{opp.name}</h3>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    opp.status === 'Ativa'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {opp.status}
                  </span>
                  <span className="text-sm text-gray-600 font-semibold">{opp.role}</span>
                </div>
              </div>
            </div>

            {/* Estatísticas Importantes */}
            <div className="grid md:grid-cols-4 gap-4 mb-6 pb-6 border-b">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Interessados</p>
                <p className="text-2xl font-bold text-blue-600">{opp.interested}</p>
                <p className="text-xs text-gray-500">em representar</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Acessando Curso</p>
                <p className="text-2xl font-bold text-purple-600">{opp.inCourse}</p>
                <p className="text-xs text-gray-500">em treinamento</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Curso Concluído</p>
                <p className="text-2xl font-bold text-green-600">{opp.courseCompleted}</p>
                <p className="text-xs text-gray-500">certificados</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Ativos Representando</p>
                <p className="text-2xl font-bold text-orange-600">{opp.activeReps}</p>
                <p className="text-xs text-gray-500">em ação</p>
              </div>
            </div>

            {/* Key Info - Produto e Comissão */}
            <div className={`grid gap-4 mb-6 pb-6 border-b ${
              activeTab === 'leads' ? 'md:grid-cols-3' : activeTab === 'sales' ? 'md:grid-cols-3' : 'md:grid-cols-4'
            }`}>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Produto</p>
                <p className="font-semibold text-gray-900">{opp.product}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Ticket Médio</p>
                <p className="font-semibold text-gray-900">{opp.ticketMedio}</p>
              </div>
              
              {activeTab === 'leads' && (
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Comissão/Reunião</p>
                  <p className="font-bold text-purple-600">{(opp as any).commissionPerMeeting}</p>
                </div>
              )}

              {activeTab === 'sales' && (
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Comissão/Venda</p>
                  <p className="font-bold text-orange-600">{(opp as any).commissionPerSale}</p>
                </div>
              )}

              {activeTab === 'fullstack' && (
                <>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Comissão/Reunião</p>
                    <p className="font-bold text-purple-600">{(opp as any).commissionPerMeeting}</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Comissão/Venda</p>
                    <p className="font-bold text-orange-600">{(opp as any).commissionPerSale}</p>
                  </div>
                </>
              )}
            </div>

            {/* Expandable Details */}
            {selectedOpp === opp.id && (
              <div className="mb-6 pb-6 border-b space-y-6">
                {/* Informações do Produto */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">📦 Informações do Produto</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Características</p>
                      <p className="text-sm text-gray-900">{opp.productCharacteristics}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Benefícios</p>
                      <p className="text-sm text-gray-900">{opp.productBenefits}</p>
                    </div>
                  </div>
                </div>

                {/* História da Empresa */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">🏢 História da Empresa</h4>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-900">{opp.companyHistory}</p>
                  </div>
                </div>

                {/* Pitches de Vendas */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">🎤 Pitches de Vendas</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-2 font-semibold">Pitch de Vendas</p>
                      <p className="text-sm text-gray-900">{opp.salesPitch}</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-2 font-semibold">Pitch de Abordagem</p>
                      <p className="text-sm text-gray-900">{opp.approachPitch}</p>
                    </div>
                  </div>
                </div>

                {/* Templates de Comunicação */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">📧 Templates de Comunicação</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-xs text-gray-600 mb-2 font-semibold">📧 Email Padrão</p>
                      <textarea 
                        className="w-full p-2 border rounded text-xs bg-white"
                        rows={3}
                        value={opp.emailTemplate}
                        readOnly
                      />
                      <button className="mt-2 px-3 py-1 bg-yellow-600 text-white rounded text-xs hover:bg-yellow-700">
                        Copiar
                      </button>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-xs text-gray-600 mb-2 font-semibold">💬 WhatsApp Padrão</p>
                      <textarea 
                        className="w-full p-2 border rounded text-xs bg-white"
                        rows={3}
                        value={opp.whatsappTemplate}
                        readOnly
                      />
                      <button className="mt-2 px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700">
                        Copiar
                      </button>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs text-gray-600 mb-2 font-semibold">🔗 LinkedIn Padrão</p>
                      <textarea 
                        className="w-full p-2 border rounded text-xs bg-white"
                        rows={3}
                        value={opp.linkedinTemplate}
                        readOnly
                      />
                      <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">
                        Copiar
                      </button>
                    </div>
                  </div>
                </div>

                {/* Materiais Anexados */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">📚 Materiais para Estudo</h4>
                  <div className="space-y-2">
                    {opp.materials.map((material, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-company-primary text-white rounded flex items-center justify-center text-xs font-bold">
                            {material.type}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{material.name}</p>
                            <p className="text-xs text-gray-600">{material.size}</p>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-company-primary text-white rounded text-sm hover:bg-opacity-90">
                          ⬇️ Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Empresa */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">🏢 Sobre a Empresa</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600">Segmentos Alvo</p>
                      <p className="text-sm text-gray-900">{opp.segment}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600">Persona</p>
                      <p className="text-sm text-gray-900">{opp.targetPersona}</p>
                    </div>
                  </div>
                </div>

                {/* Processo de Vendas */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">📊 Funil de Vendas</h4>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {opp.salesProcess.map((stage, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="px-4 py-2 bg-company-primary text-white rounded-lg text-sm font-semibold whitespace-nowrap">
                          {stage}
                        </div>
                        {idx < opp.salesProcess.length - 1 && (
                          <div className="mx-2 text-company-primary">→</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Canais de Abordagem */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">📞 Canais de Abordagem</h4>
                  <div className="flex flex-wrap gap-2">
                    {opp.channels.map((channel) => (
                      <span key={channel} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Treinamento Obrigatório */}
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">🎓 Treinamento Obrigatório</h4>
                      <p className="text-sm text-gray-600">Pontuação mínima: {opp.minimumScore}/10 para representar</p>
                    </div>
                    <button className="px-4 py-2 bg-company-primary text-white rounded-lg font-semibold hover:bg-opacity-90">
                      📖 Ver Treinamento
                    </button>
                  </div>
                </div>

                {/* Requisitos de Lead Qualificado */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">✅ Requisitos de Lead Qualificado</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      '✓ Nome da empresa',
                      '✓ Número de funcionários',
                      '✓ Decisor ou principal influenciador',
                      '✓ Email e telefone',
                      '✓ Dor principal identificado',
                      '✓ Resumo das características'
                    ].map((req, idx) => (
                      <div key={idx} className="p-2 bg-green-50 border border-green-200 rounded-lg text-sm text-gray-900">
                        {req}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={() => handleViewDetails(opp.id)}
              className="w-full px-4 py-2 bg-company-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              {selectedOpp === opp.id ? '▲ Ocultar Detalhes' : '▼ Ver Detalhes Completos'}
            </button>
          </div>
        ))}
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-company-light to-slate-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b-4 border-company-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-company-primary">ScaleConnect</div>
          <Link href="/company/dashboard" className="text-company-primary font-semibold hover:underline">
            ← Voltar ao Dashboard
          </Link>
        </div>
      </nav>

      {/* Sidebar + Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-screen p-6">
          <nav className="space-y-4">
            <Link href="/company/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📊 Dashboard
            </Link>
            <Link href="/company/jobs" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📋 Vagas
            </Link>
            <Link href="/company/opportunities" className="block px-4 py-2 bg-company-primary text-white rounded-lg font-semibold">
              💼 Representação
            </Link>
            <Link href="/company/leads" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📞 CRM de Leads
            </Link>
            <Link href="/company/metrics" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📈 Métricas
            </Link>
            <Link href="/company/billing" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              💳 Faturamento
            </Link>
            <Link href="/company/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              ⚙️ Perfil da Empresa
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">💼 Representação</h1>
              <p className="text-gray-600">Gerencie oportunidades de representação com informações completas, materiais e templates</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b">
              <button
                onClick={() => setActiveTab('leads')}
                className={`px-6 py-3 font-semibold border-b-4 transition ${
                  activeTab === 'leads'
                    ? 'border-company-primary text-company-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                🎯 Geração de Leads (BDR/SDR)
              </button>
              <button
                onClick={() => setActiveTab('sales')}
                className={`px-6 py-3 font-semibold border-b-4 transition ${
                  activeTab === 'sales'
                    ? 'border-company-primary text-company-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                💰 Executivo de Vendas (AE)
              </button>
              <button
                onClick={() => setActiveTab('fullstack')}
                className={`px-6 py-3 font-semibold border-b-4 transition ${
                  activeTab === 'fullstack'
                    ? 'border-company-primary text-company-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                🚀 Full Stack (Qualifica + Vende)
              </button>
            </div>

            {/* Content */}
            {renderOpportunities()}
          </div>
        </div>
      </div>
    </main>
  )
}

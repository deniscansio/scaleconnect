'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function CandidateCareerPathPage() {
  const [selectedRole, setSelectedRole] = useState(null)

  const careerJourney = [
    {
      id: 1,
      role: 'SDR (Sales Development Representative)',
      salary: 3500,
      description: 'Profissional iniciante em vendas focado em prospecção',
      progress: 100,
      completed: true,
      nextSteps: [
        { title: 'Fundamentos de Vendas', type: 'course', status: 'completed' },
        { title: 'Certificação SDR', type: 'certification', status: 'completed' },
        { title: '6 meses de experiência', type: 'experience', status: 'completed' },
      ],
      competencies: ['Prospecção', 'Negociação Básica', 'CRM', 'Comunicação'],
    },
    {
      id: 2,
      role: 'Account Executive',
      salary: 6500,
      description: 'Profissional responsável por fechar vendas',
      progress: 65,
      completed: false,
      nextSteps: [
        { title: 'Técnicas Avançadas de Vendas', type: 'course', status: 'in_progress' },
        { title: 'Certificação AE', type: 'certification', status: 'pending' },
        { title: '1 ano como SDR', type: 'experience', status: 'in_progress' },
        { title: '50 vendas fechadas', type: 'performance', status: 'in_progress' },
      ],
      competencies: ['Negociação Avançada', 'Gestão de Clientes', 'Análise de Dados', 'Liderança Básica'],
    },
    {
      id: 3,
      role: 'Sales Manager',
      salary: 12000,
      description: 'Profissional que lidera times de vendas',
      progress: 0,
      completed: false,
      nextSteps: [
        { title: 'Liderança em Vendas', type: 'course', status: 'pending' },
        { title: 'Certificação Manager', type: 'certification', status: 'pending' },
        { title: '2 anos como Account Executive', type: 'experience', status: 'pending' },
        { title: 'Liderar time de 5+ pessoas', type: 'performance', status: 'pending' },
      ],
      competencies: ['Liderança', 'Gestão de Equipes', 'Planejamento Estratégico', 'Mentoria'],
    },
    {
      id: 4,
      role: 'Director of Sales',
      salary: 18000,
      description: 'Profissional que gerencia toda a operação de vendas',
      progress: 0,
      completed: false,
      nextSteps: [
        { title: 'Estratégia de Vendas Corporativa', type: 'course', status: 'pending' },
        { title: 'Certificação Director', type: 'certification', status: 'pending' },
        { title: '3 anos como Sales Manager', type: 'experience', status: 'pending' },
        { title: 'Gerar R$ 1M+ em receita', type: 'performance', status: 'pending' },
      ],
      competencies: ['Visão Estratégica', 'Gestão Corporativa', 'Análise de Mercado', 'Negociação B2B'],
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { bg: string; text: string; label: string; icon: string } } = {
      completed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Concluído', icon: '✓' },
      in_progress: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Em Progresso', icon: '⏳' },
      pending: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Pendente', icon: '○' },
    }
    const s = statusMap[status] || statusMap.pending
    return <span className={`px-3 py-1 ${s.bg} ${s.text} rounded-full text-sm font-semibold`}>{s.icon} {s.label}</span>
  }

  const getTypeIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      course: '📚',
      certification: '🏆',
      experience: '💼',
      performance: '📊',
    }
    return icons[type] || '📌'
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
            <Link href="/candidate/opportunities" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              💼 Oportunidades
            </Link>
            <Link href="/candidate/earnings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              💰 Meus Ganhos
            </Link>
            <Link href="/candidate/career-path" className="block px-4 py-2 bg-candidate-primary text-white rounded-lg font-semibold">
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
              <h1 className="text-4xl font-bold text-gray-900 mb-2">🚀 Sua Jornada de Sucesso Profissional</h1>
              <p className="text-gray-600">Construa seu caminho profissional com ganhos reais. Cada passo traz novas oportunidades e renda.</p>
            </div>

            {/* Current Status */}
            <div className="card bg-gradient-to-r from-candidate-primary to-candidate-secondary text-white mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-candidate-light opacity-80 mb-2">Você está em</p>
                  <h2 className="text-3xl font-bold mb-2">SDR - Sales Development Representative</h2>
                  <p className="text-candidate-light opacity-80">Salário: R$ 3.500 • Progresso: 100%</p>
                </div>
                <div className="text-6xl">✓</div>
              </div>
            </div>

            {/* Career Journey Timeline */}
            <div className="space-y-6">
              {careerJourney.map((journey, index) => (
                <div key={journey.id} className="relative">
                  {/* Timeline Line */}
                  {index < careerJourney.length - 1 && (
                    <div className="absolute left-8 top-24 w-1 h-12 bg-candidate-secondary"></div>
                  )}

                  {/* Journey Card */}
                  <div 
                    className={`card bg-white border-l-4 cursor-pointer transition hover:shadow-lg ${
                      journey.completed ? 'border-green-500' : 'border-candidate-secondary'
                    }`}
                    onClick={() => setSelectedRole(selectedRole === journey.id ? null : journey.id)}
                  >
                    <div className="flex gap-6">
                      {/* Timeline Dot */}
                      <div className="flex flex-col items-center">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-white ${
                          journey.completed ? 'bg-green-500' : 'bg-candidate-primary'
                        }`}>
                          {journey.completed ? '✓' : index + 1}
                        </div>
                      </div>

                      {/* Journey Content */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">{journey.role}</h3>
                            <p className="text-gray-600 mt-1">{journey.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-3xl font-bold text-candidate-secondary">R$ {journey.salary.toLocaleString('pt-BR')}</p>
                            {journey.completed && (
                              <span className="text-sm text-green-700 font-semibold">Concluído</span>
                            )}
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-semibold text-gray-700">Progresso</p>
                            <p className="text-sm font-bold text-candidate-primary">{journey.progress}%</p>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-candidate-secondary h-2 rounded-full transition-all"
                              style={{ width: `${journey.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Competencies */}
                        <div className="mb-4">
                          <p className="text-sm font-semibold text-gray-700 mb-2">Competências Necessárias:</p>
                          <div className="flex flex-wrap gap-2">
                            {journey.competencies.map((comp, idx) => (
                              <span key={idx} className="px-3 py-1 bg-candidate-light text-candidate-primary rounded-full text-sm font-semibold">
                                {comp}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Expandable Details */}
                        {selectedRole === journey.id && (
                          <div className="mt-6 pt-6 border-t">
                            <h4 className="font-semibold text-gray-900 mb-3">📋 Próximos Passos para Avançar:</h4>
                            <div className="space-y-3">
                              {journey.nextSteps.map((step, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                  <span className="text-xl">{getTypeIcon(step.type)}</span>
                                  <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-900">{step.title}</p>
                                    <div className="mt-1">{getStatusBadge(step.status)}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Próximos Passos Recomendados</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/candidate/opportunities" className="p-4 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 transition">
                  <p className="font-semibold text-gray-900">💼 Explorar Oportunidades</p>
                  <p className="text-sm text-gray-600 mt-1">Ganhe comissões representando produtos e serviços</p>
                </Link>
                <Link href="/candidate/jobs" className="p-4 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 transition">
                  <p className="font-semibold text-gray-900">📋 Candidatar-se a Vagas</p>
                  <p className="text-sm text-gray-600 mt-1">Encontre vagas alinhadas com sua jornada</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

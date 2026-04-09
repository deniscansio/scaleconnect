'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function CandidateJobsPage() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Sales Development Representative',
      company: 'Tech Solutions',
      location: 'São Paulo, SP',
      type: 'Full-time',
      salary: 'R$ 3.000 - R$ 4.500',
      description: 'Procuramos um SDR experiente para prospecção e geração de leads. Você será responsável por qualificar leads e agendar reuniões com prospects.',
      requirements: ['2+ anos de experiência', 'Conhecimento de CRM', 'Comunicação excelente', 'Proatividade'],
      benefits: ['Vale refeição', 'Vale transporte', 'Bônus por performance', 'Treinamento contínuo'],
      status: 'applied',
      appliedAt: '2024-03-25',
    },
    {
      id: 2,
      title: 'Account Executive',
      company: 'Cloud Corp',
      location: 'Rio de Janeiro, RJ',
      type: 'Full-time',
      salary: 'R$ 5.000 - R$ 8.000',
      description: 'Buscamos um AE para fechar vendas de software SaaS. Você terá autonomia para gerenciar seu pipeline e atingir metas de receita.',
      requirements: ['3+ anos como SDR', 'Experiência em vendas B2B', 'Fluência em inglês', 'Conhecimento de SaaS'],
      benefits: ['Comissão por venda', 'Vale refeição', 'Plano de saúde', 'Bônus anual'],
      status: 'interested',
      appliedAt: null,
    },
    {
      id: 3,
      title: 'Sales Manager',
      company: 'Business Growth',
      location: 'Belo Horizonte, MG',
      type: 'Full-time',
      salary: 'R$ 8.000 - R$ 12.000',
      description: 'Gerenciar time de vendas e atingir metas de receita. Você será responsável por recrutar, treinar e motivar a equipe.',
      requirements: ['5+ anos em vendas', 'Experiência em liderança', 'Conhecimento de CRM avançado', 'Visão estratégica'],
      benefits: ['Comissão por venda', 'Bônus por performance', 'Plano de saúde premium', 'Carro da empresa'],
      status: 'interested',
      appliedAt: null,
    },
    {
      id: 4,
      title: 'Sales Development Representative',
      company: 'StartUp XYZ',
      location: 'São Paulo, SP',
      type: 'Full-time',
      salary: 'R$ 2.500 - R$ 3.500',
      description: 'Startup em crescimento procura SDR para prospecção. Ambiente dinâmico com oportunidades de crescimento rápido.',
      requirements: ['1+ ano de experiência', 'Proatividade', 'Vontade de aprender', 'Comunicação clara'],
      benefits: ['Equity na startup', 'Ambiente descontraído', 'Trabalho remoto', 'Treinamento'],
      status: 'interested',
      appliedAt: null,
    },
  ])

  const [selectedJob, setSelectedJob] = useState(null)

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { bg: string; text: string; label: string } } = {
      applied: { bg: 'bg-green-100', text: 'text-green-700', label: 'Candidatado' },
      interested: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Interessado' },
      rejected: { bg: 'bg-red-100', text: 'text-red-700', label: 'Rejeitado' },
    }
    const s = statusMap[status] || statusMap.interested
    return <span className={`px-3 py-1 ${s.bg} ${s.text} rounded-full text-sm font-semibold`}>{s.label}</span>
  }

  const handleApply = (id: number) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, status: 'applied', appliedAt: new Date().toISOString().split('T')[0] } : job
    ))
  }

  const handleWithdraw = (id: number, reason: string) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, status: 'interested', appliedAt: null } : job
    ))
    setShowWithdrawalModal(false)
    setWithdrawalReason('')
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
            <Link href="/candidate/jobs" className="block px-4 py-2 bg-candidate-primary text-white rounded-lg font-semibold">
              📋 Vagas
            </Link>
            <Link href="/candidate/opportunities" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
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
              <h1 className="text-4xl font-bold text-gray-900 mb-2">📋 Vagas de Emprego</h1>
              <p className="text-gray-600">Explore vagas alinhadas com sua jornada profissional e ganhe com sua carreira</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-4 mb-8 overflow-x-auto">
              <button className="px-4 py-2 bg-candidate-primary text-white rounded-lg font-semibold whitespace-nowrap">
                Todas ({jobs.length})
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 whitespace-nowrap">
                Candidatadas ({jobs.filter(j => j.status === 'applied').length})
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 whitespace-nowrap">
                Interessadas ({jobs.filter(j => j.status === 'interested').length})
              </button>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
              {jobs.map((job) => (
                <div 
                  key={job.id} 
                  className="card bg-white border-l-4 border-candidate-secondary hover:shadow-lg transition cursor-pointer"
                  onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                      <p className="text-candidate-primary font-semibold">{job.company}</p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span>📍 {job.location}</span>
                        <span>💼 {job.type}</span>
                        <span>💰 {job.salary}</span>
                      </div>
                    </div>
                    {getStatusBadge(job.status)}
                  </div>

                  <p className="text-gray-700 mb-4">{job.description}</p>

                  {/* Expandable Details */}
                  {selectedJob === job.id && (
                    <div className="mb-4 pb-4 border-t pt-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Requirements */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">📋 Requisitos:</h4>
                          <ul className="space-y-2">
                            {job.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-700">
                                <span className="text-candidate-primary mt-1">✓</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Benefits */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">🎁 Benefícios:</h4>
                          <ul className="space-y-2">
                            {job.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-700">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (job.status === 'interested') {
                          handleApply(job.id)
                        }
                      }}
                      disabled={job.status === 'applied'}
                      className="flex-1 px-6 py-2 bg-candidate-secondary text-white rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {job.status === 'applied' ? '✓ Candidatado' : 'Candidatar-se'}
                    </button>
                  </div>

                  {/* Applied Status */}
                  {job.status === 'applied' && (
                    <p className="text-sm text-green-700 font-semibold mt-2">✓ Candidatado em {job.appliedAt}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="card bg-white">
                <p className="text-gray-600 mb-2">Total de Vagas</p>
                <p className="text-3xl font-bold text-candidate-primary">{jobs.length}</p>
              </div>
              <div className="card bg-white">
                <p className="text-gray-600 mb-2">Candidatadas</p>
                <p className="text-3xl font-bold text-green-600">{jobs.filter(j => j.status === 'applied').length}</p>
              </div>
              <div className="card bg-white">
                <p className="text-gray-600 mb-2">Salário Médio</p>
                <p className="text-3xl font-bold text-candidate-secondary">R$ 5.250</p>
              </div>
            </div>


          </div>
        </div>
      </div>
    </main>
  )
}

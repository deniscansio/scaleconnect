'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function CompanyJobsPage() {
  const [showForm, setShowForm] = useState(false)
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Sales Development Representative',
      level: 'Júnior',
      location: 'São Paulo, SP',
      salary: 'R$ 3.000 - R$ 4.500',
      applications: 12,
      status: 'open',
      description: 'Responsável por prospecção e qualificação de leads para o time de vendas',
      requirements: ['Comunicação excelente', 'Proatividade', 'Conhecimento de vendas'],
      createdAt: '2024-03-25',
    },
    {
      id: 2,
      title: 'Account Executive',
      level: 'Pleno',
      location: 'Rio de Janeiro, RJ',
      salary: 'R$ 5.000 - R$ 8.000',
      applications: 8,
      status: 'open',
      description: 'Responsável por fechamento de negócios com clientes',
      requirements: ['Experiência em vendas', 'Negociação', 'Relacionamento com clientes'],
      createdAt: '2024-03-20',
    },
    {
      id: 3,
      title: 'Sales Manager',
      level: 'Sênior',
      location: 'Belo Horizonte, MG',
      salary: 'R$ 8.000 - R$ 12.000',
      applications: 5,
      status: 'closed',
      description: 'Liderança da equipe de vendas e atingimento de metas',
      requirements: ['Liderança', 'Experiência em vendas', 'Gestão de equipes'],
      createdAt: '2024-03-15',
    },
  ])

  const [formData, setFormData] = useState({
    title: '',
    level: 'Pleno',
    salary: '',
    location: '',
    description: '',
    requirements: '',
  })

  const [selectedJob, setSelectedJob] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddJob = () => {
    if (formData.title && formData.salary && formData.location) {
      const newJob = {
        id: Math.max(...jobs.map(j => j.id), 0) + 1,
        ...formData,
        requirements: formData.requirements.split(',').map(r => r.trim()).filter(r => r),
        applications: 0,
        status: 'open',
        createdAt: new Date().toISOString().split('T')[0],
      }
      setJobs([...jobs, newJob])
      setFormData({ title: '', level: 'Pleno', salary: '', location: '', description: '', requirements: '' })
      setShowForm(false)
    }
  }

  const handleDeleteJob = (id: number) => {
    setJobs(jobs.filter(job => job.id !== id))
  }

  const handleCloseJob = (id: number) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, status: 'closed' } : job))
  }

  const handleCancelForm = () => {
    setFormData({ title: '', level: 'Pleno', salary: '', location: '', description: '', requirements: '' })
    setShowForm(false)
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
            <Link href="/empresa/jobs" className="block px-4 py-2 bg-company-primary text-white rounded-lg font-semibold">
              📋 Vagas
            </Link>
            <Link href="/empresa/opportunities" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              💼 Geração de Demanda
            </Link>
            <Link href="/empresa/leads" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
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
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">📋 Gerenciar Vagas</h1>
                <p className="text-gray-600">Publique e gerencie as vagas da sua empresa</p>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  showForm
                    ? 'bg-gray-500 text-white hover:bg-gray-600'
                    : 'bg-company-primary text-white hover:bg-opacity-90'
                }`}
              >
                {showForm ? '✕ Cancelar' : '+ Publicar Vaga'}
              </button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="card bg-white">
                <p className="text-gray-600 mb-2">📋 Total de Vagas</p>
                <p className="text-3xl font-bold text-company-primary">{jobs.length}</p>
              </div>
              <div className="card bg-white">
                <p className="text-gray-600 mb-2">✅ Vagas Abertas</p>
                <p className="text-3xl font-bold text-green-600">{jobs.filter(j => j.status === 'open').length}</p>
              </div>
              <div className="card bg-white">
                <p className="text-gray-600 mb-2">📨 Total de Candidaturas</p>
                <p className="text-3xl font-bold text-blue-600">{jobs.reduce((acc, j) => acc + j.applications, 0)}</p>
              </div>
            </div>

            {/* Form */}
            {showForm && (
              <div className="card bg-white mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Publicar Nova Vaga</h2>
                
                <div className="space-y-6">
                  {/* Row 1 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Título da Vaga</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Ex: Gerente de Vendas"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-company-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Nível</label>
                      <select
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-company-primary"
                      >
                        <option>Júnior</option>
                        <option>Pleno</option>
                        <option>Sênior</option>
                        <option>Especialista</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Faixa Salarial</label>
                      <input
                        type="text"
                        name="salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                        placeholder="Ex: R$ 3.000 - R$ 5.000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-company-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Localização</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Ex: São Paulo, SP ou Remoto"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-company-primary"
                      />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Descrição da Vaga</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Descreva as responsabilidades e desafios da vaga"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-company-primary"
                    />
                  </div>

                  {/* Row 4 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Requisitos (separados por vírgula)</label>
                    <textarea
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleInputChange}
                      placeholder="Ex: Experiência em vendas, Conhecimento de CRM, Liderança"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-company-primary"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-6 border-t">
                    <button
                      onClick={handleAddJob}
                      className="flex-1 px-6 py-3 bg-company-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
                    >
                      ✓ Publicar Vaga
                    </button>
                    <button
                      onClick={handleCancelForm}
                      className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                    >
                      ✕ Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Jobs List */}
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="card bg-white border-l-4 border-company-secondary hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          job.status === 'open'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {job.status === 'open' ? 'Aberta' : 'Fechada'}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{job.description}</p>
                      
                      <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-600">Nível</p>
                          <p className="font-semibold text-gray-900">{job.level}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Salário</p>
                          <p className="font-semibold text-gray-900">{job.salary}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Localização</p>
                          <p className="font-semibold text-gray-900">{job.location}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Candidaturas</p>
                          <p className="font-semibold text-company-primary">{job.applications}</p>
                        </div>
                      </div>

                      {/* Requirements */}
                      <div className="mb-4">
                        <p className="text-xs text-gray-600 mb-2">Requisitos:</p>
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.map((req, idx) => (
                            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t">
                    <button
                      onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                      className="flex-1 px-4 py-2 bg-company-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
                    >
                      👁️ Ver Detalhes
                    </button>
                    <button
                      onClick={() => handleCloseJob(job.id)}
                      disabled={job.status === 'closed'}
                      className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      🔒 Fechar Vaga
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
                    >
                      🗑️ Deletar
                    </button>
                  </div>

                  {/* Expandable Details */}
                  {selectedJob === job.id && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold text-gray-900 mb-3">📊 Estatísticas</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-xs text-gray-600">Total de Candidatos</p>
                          <p className="text-2xl font-bold text-company-primary">{job.applications}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-xs text-gray-600">Publicada em</p>
                          <p className="text-sm font-semibold text-gray-900">{new Date(job.createdAt).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <p className="text-xs text-gray-600">Taxa de Conversão</p>
                          <p className="text-2xl font-bold text-purple-600">{job.applications > 0 ? '8%' : '0%'}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

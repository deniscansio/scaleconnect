'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Competency {
  id: number
  nome: string
}

interface Job {
  id: number
  title: string
  description: string
  level: string
  salaryMin: number | null
  salaryMax: number | null
  location: string
  status: string
  competencies: Competency[]
  createdAt: string
  updatedAt: string
}

export default function CompanyJobsPage() {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([])
  const [allCompetencies, setAllCompetencies] = useState<Competency[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCompetencies, setSelectedCompetencies] = useState<number[]>([])
  const [showCompetenciesModal, setShowCompetenciesModal] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    level: 'PLENO',
    salaryMin: '',
    salaryMax: '',
    location: '',
    description: '',
  })

  const [selectedJob, setSelectedJob] = useState<number | null>(null)

  // Buscar vagas e competências ao carregar a página
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('scaleconnect_token')
        if (!token) {
          router.push('/login')
          return
        }

        // Buscar vagas
        const jobsResponse = await fetch('/api/jobs', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })

        if (jobsResponse.ok) {
          const jobsData = await jobsResponse.json()
          setJobs(jobsData)
        }

        // Buscar competências
        const competenciesResponse = await fetch('/api/competencies')
        if (competenciesResponse.ok) {
          const competenciesData = await competenciesResponse.json()
          setAllCompetencies(competenciesData)
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCompetencyToggle = (competencyId: number) => {
    setSelectedCompetencies(prev =>
      prev.includes(competencyId)
        ? prev.filter(id => id !== competencyId)
        : [...prev, competencyId]
    )
  }

  const handleAddJob = async () => {
    if (!formData.title || !formData.location) {
      alert('Preencha os campos obrigatórios')
      return
    }

    try {
      const token = localStorage.getItem('scaleconnect_token')
      if (!token) {
        router.push('/login')
        return
      }

      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          level: formData.level,
          salaryMin: formData.salaryMin,
          salaryMax: formData.salaryMax,
          location: formData.location,
          competenciesIds: selectedCompetencies,
        }),
      })

      if (response.ok) {
        // Recarregar vagas
        const jobsResponse = await fetch('/api/jobs', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        if (jobsResponse.ok) {
          const jobsData = await jobsResponse.json()
          setJobs(jobsData)
        }

        // Limpar formulário
        setFormData({ title: '', level: 'PLENO', salaryMin: '', salaryMax: '', location: '', description: '' })
        setSelectedCompetencies([])
        setShowForm(false)
      } else {
        alert('Erro ao criar vaga')
      }
    } catch (error) {
      console.error('Erro ao criar vaga:', error)
      alert('Erro ao criar vaga')
    }
  }

  const handleDeleteJob = async (jobId: number) => {
    if (!confirm('Tem certeza que deseja deletar esta vaga?')) return

    try {
      const token = localStorage.getItem('scaleconnect_token')
      if (!token) {
        router.push('/login')
        return
      }

      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setJobs(jobs.filter(job => job.id !== jobId))
      } else {
        alert('Erro ao deletar vaga')
      }
    } catch (error) {
      console.error('Erro ao deletar vaga:', error)
      alert('Erro ao deletar vaga')
    }
  }

  const handleCloseJob = async (jobId: number) => {
    try {
      const token = localStorage.getItem('scaleconnect_token')
      if (!token) {
        router.push('/login')
        return
      }

      const job = jobs.find(j => j.id === jobId)
      if (!job) return

      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'CLOSED',
        }),
      })

      if (response.ok) {
        setJobs(jobs.map(j => j.id === jobId ? { ...j, status: 'CLOSED' } : j))
      } else {
        alert('Erro ao fechar vaga')
      }
    } catch (error) {
      console.error('Erro ao fechar vaga:', error)
      alert('Erro ao fechar vaga')
    }
  }

  const handleCancelForm = () => {
    setFormData({ title: '', level: 'PLENO', salaryMin: '', salaryMax: '', location: '', description: '' })
    setSelectedCompetencies([])
    setShowForm(false)
  }

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return 'A combinar'
    const minStr = min ? `R$ ${min.toLocaleString('pt-BR')}` : ''
    const maxStr = max ? `R$ ${max.toLocaleString('pt-BR')}` : ''
    return `${minStr} - ${maxStr}`.trim().replace(' - ', '')
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-company-light to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Carregando vagas...</p>
        </div>
      </main>
    )
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
                <p className="text-3xl font-bold text-green-600">{jobs.filter(j => j.status === 'OPEN').length}</p>
              </div>
              <div className="card bg-white">
                <p className="text-gray-600 mb-2">📨 Total de Candidaturas</p>
                <p className="text-3xl font-bold text-blue-600">0</p>
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
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Título da Vaga *</label>
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
                        <option value="JUNIOR">Júnior</option>
                        <option value="PLENO">Pleno</option>
                        <option value="SENIOR">Sênior</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Salário Mínimo</label>
                      <input
                        type="number"
                        name="salaryMin"
                        value={formData.salaryMin}
                        onChange={handleInputChange}
                        placeholder="Ex: 3000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-company-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Salário Máximo</label>
                      <input
                        type="number"
                        name="salaryMax"
                        value={formData.salaryMax}
                        onChange={handleInputChange}
                        placeholder="Ex: 5000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-company-primary"
                      />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Localização *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Ex: São Paulo, SP ou Remoto"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-company-primary"
                    />
                  </div>

                  {/* Row 4 */}
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

                  {/* Row 5 - Competências */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Competências Desejadas</label>
                    <button
                      type="button"
                      onClick={() => setShowCompetenciesModal(!showCompetenciesModal)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-left hover:bg-gray-50 transition"
                    >
                      {selectedCompetencies.length > 0
                        ? `${selectedCompetencies.length} competência(s) selecionada(s)`
                        : 'Clique para selecionar competências'}
                    </button>

                    {showCompetenciesModal && (
                      <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50 max-h-60 overflow-y-auto">
                        <div className="grid grid-cols-2 gap-3">
                          {allCompetencies.map((comp) => (
                            <label key={comp.id} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedCompetencies.includes(comp.id)}
                                onChange={() => handleCompetencyToggle(comp.id)}
                                className="w-4 h-4 rounded"
                              />
                              <span className="text-sm text-gray-700">{comp.nome}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedCompetencies.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedCompetencies.map((compId) => {
                          const comp = allCompetencies.find(c => c.id === compId)
                          return (
                            <span key={compId} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                              {comp?.nome}
                            </span>
                          )
                        })}
                      </div>
                    )}
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
                      className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition"
                    >
                      ✕ Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Jobs List */}
            {jobs.length === 0 ? (
              <div className="card bg-white text-center py-12">
                <p className="text-xl text-gray-600 mb-4">Nenhuma vaga publicada ainda</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 bg-company-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
                >
                  + Publicar Primeira Vaga
                </button>
              </div>
            ) : (
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
                            job.status === 'OPEN'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {job.status === 'OPEN' ? 'Aberta' : 'Fechada'}
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
                            <p className="font-semibold text-gray-900">{formatSalary(job.salaryMin, job.salaryMax)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Localização</p>
                            <p className="font-semibold text-gray-900">{job.location}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Publicada em</p>
                            <p className="font-semibold text-gray-900">{new Date(job.createdAt).toLocaleDateString('pt-BR')}</p>
                          </div>
                        </div>

                        {/* Competências */}
                        {job.competencies.length > 0 && (
                          <div className="mb-4">
                            <p className="text-xs text-gray-600 mb-2">Competências Desejadas:</p>
                            <div className="flex flex-wrap gap-2">
                              {job.competencies.map((comp) => (
                                <span key={comp.id} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                  {comp.nome}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
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
                        disabled={job.status === 'CLOSED'}
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
                        <h4 className="font-semibold text-gray-900 mb-3">📊 Detalhes da Vaga</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-xs text-gray-600">ID da Vaga</p>
                            <p className="text-sm font-semibold text-gray-900">#{job.id}</p>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg">
                            <p className="text-xs text-gray-600">Status</p>
                            <p className="text-sm font-semibold text-gray-900">{job.status}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

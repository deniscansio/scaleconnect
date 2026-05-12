'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Competency {
  id: number
  nome: string
}

interface Benefit {
  id: number
  nome: string
  icone: string
}

interface Job {
  id: number
  companyId: number
  companyName: string
  title: string
  description: string
  level: string
  salaryMin: number | null
  salaryMax: number | null
  location: string
  employmentType: string
  workMode: string
  status: string
  competencies: Competency[]
  benefits: Benefit[]
  createdAt: string
  updatedAt: string
}

export default function CandidateJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<number | null>(null)
  const [appliedJobs, setAppliedJobs] = useState<number[]>([])

  // Buscar vagas reais ao carregar a página
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/jobs')
        
        if (response.ok) {
          const data = await response.json()
          setJobs(data)
        } else {
          console.error('Erro ao buscar vagas:', response.statusText)
        }
      } catch (error) {
        console.error('Erro ao buscar vagas:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const getStatusBadge = (jobId: number) => {
    const isApplied = appliedJobs.includes(jobId)
    
    if (isApplied) {
      return (
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
          ✓ Candidatado
        </span>
      )
    }
    
    return (
      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
        Interessado
      </span>
    )
  }

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return 'Salário a combinar'
    if (min && !max) return `R$ ${min.toLocaleString('pt-BR')}`
    if (!min && max) return `até R$ ${max.toLocaleString('pt-BR')}`
    return `R$ ${min.toLocaleString('pt-BR')} - R$ ${max.toLocaleString('pt-BR')}`
  }

  const handleApply = (jobId: number) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId])
      // Aqui você pode adicionar lógica para salvar a candidatura no banco
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-candidate-light to-slate-50">
        <nav className="bg-white shadow-sm border-b-4 border-candidate-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-candidate-primary">ScaleConnect</div>
            <Link href="/candidato/dashboard" className="text-candidate-primary font-semibold hover:underline">
              ← Voltar ao Dashboard
            </Link>
          </div>
        </nav>
        <div className="flex items-center justify-center h-96">
          <p className="text-xl text-gray-600">Carregando vagas...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-candidate-light to-slate-50">
      <nav className="bg-white shadow-sm border-b-4 border-candidate-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-candidate-primary">ScaleConnect</div>
          <Link href="/candidato/dashboard" className="text-candidate-primary font-semibold hover:underline">
            ← Voltar ao Dashboard
          </Link>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-white shadow-md min-h-screen p-6">
          <nav className="space-y-4">
            <Link href="/candidato/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📊 Dashboard
            </Link>
            <Link href="/candidato/jobs" className="block px-4 py-2 bg-candidate-primary text-white rounded-lg font-semibold">
              📋 Vagas
            </Link>
            <Link href="/candidato/opportunities" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              💼 Oportunidades
            </Link>
            <Link href="/candidato/earnings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              💰 Meus Ganhos
            </Link>
            <Link href="/candidato/career-path" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              🚀 Jornada de Sucesso
            </Link>
            <Link href="/candidato/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              👤 Perfil
            </Link>
          </nav>
        </aside>

        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">

            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">📋 Vagas de Emprego</h1>
              <p className="text-gray-600">Explore vagas alinhadas com sua jornada profissional e ganhe com sua carreira</p>
              <p className="text-sm text-gray-500 mt-2">Total de vagas: {jobs.length}</p>
            </div>

            {jobs.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-600 text-lg">Nenhuma vaga disponível no momento</p>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="card bg-white border-l-4 border-candidate-secondary hover:shadow-lg transition cursor-pointer"
                    onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                        <p className="text-candidate-primary font-semibold">{job.companyName}</p>
                        <div className="flex gap-4 mt-2 text-sm text-gray-600">
                          <span>📍 {job.location}</span>
                          <span>💼 {job.employmentType}</span>
                          <span>📊 {job.level}</span>
                          <span>💰 {formatSalary(job.salaryMin, job.salaryMax)}</span>
                        </div>
                      </div>
                      {getStatusBadge(job.id)}
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

                    {/* Competências */}
                    {job.competencies && job.competencies.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Competências necessárias:</p>
                        <div className="flex flex-wrap gap-2">
                          {job.competencies.map((comp) => (
                            <span key={comp.id} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                              {comp.nome}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Benefícios */}
                    {job.benefits && job.benefits.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Benefícios:</p>
                        <div className="flex flex-wrap gap-2">
                          {job.benefits.map((benefit) => (
                            <span key={benefit.id} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                              {benefit.icone} {benefit.nome}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Descrição expandida */}
                    {selectedJob === job.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-gray-700 mb-4">{job.description}</p>
                      </div>
                    )}

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          if (!appliedJobs.includes(job.id)) {
                            handleApply(job.id)
                          }
                        }}
                        disabled={appliedJobs.includes(job.id)}
                        className="flex-1 px-6 py-2 bg-candidate-secondary text-white rounded-lg font-semibold disabled:opacity-50 hover:bg-opacity-90 transition"
                      >
                        {appliedJobs.includes(job.id) ? '✓ Candidatado' : 'Candidatar-se'}
                      </button>
                    </div>
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

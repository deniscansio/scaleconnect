'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Job {
  id: number
  title: string
  jobTitle: string
  description: string
  level: string
  salaryMin: number | null
  salaryMax: number | null
  location: string
  employmentType: string
  workMode: string
  status: string
  competencies: any[]
  benefits: any[]
}

interface Application {
  id: number
  jobId: number
  status: string
}

export default function CandidateJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [appliedJobs, setAppliedJobs] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<number | null>(null)

  // Buscar vagas reais e candidaturas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('scaleconnect_token')
        if (!token) {
          setLoading(false)
          return
        }

        // Buscar vagas públicas
        const jobsResponse = await fetch('/api/jobs/public', {
          headers: { Authorization: `Bearer ${token}` }
        })

        if (jobsResponse.ok) {
          const jobsData = await jobsResponse.json()
          setJobs(jobsData)
        }

        // Buscar candidaturas do candidato
        const applicationsResponse = await fetch('/api/candidate/applications', {
          headers: { Authorization: `Bearer ${token}` }
        })

        if (applicationsResponse.ok) {
          const applicationsData = await applicationsResponse.json()
          setAppliedJobs(applicationsData)
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getJobStatus = (jobId: number) => {
    const application = appliedJobs.find(app => app.jobId === jobId)
    return application ? 'applied' : 'interested'
  }

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { bg: string; text: string; label: string } } = {
      applied: { bg: 'bg-green-100', text: 'text-green-700', label: 'Candidatado' },
      interested: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Interessado' },
      rejected: { bg: 'bg-red-100', text: 'text-red-700', label: 'Rejeitado' },
    }
    const s = statusMap[status] || statusMap.interested
    return (
      <span className={`px-3 py-1 ${s.bg} ${s.text} rounded-full text-sm font-semibold`}>
        {s.label}
      </span>
    )
  }

  const handleApply = async (jobId: number) => {
    try {
      const token = localStorage.getItem('scaleconnect_token')
      if (!token) return

      const response = await fetch('/api/jobs/apply', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jobId })
      })

      if (response.ok) {
        const application = await response.json()
        setAppliedJobs([...appliedJobs, application])
      }
    } catch (error) {
      console.error('Erro ao candidatar:', error)
    }
  }

  if (loading) {
    return <div className="p-8">Carregando...</div>
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
            </div>

            {jobs.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <p className="text-gray-600">Nenhuma vaga disponível no momento.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => {
                  const jobStatus = getJobStatus(job.id)
                  const isApplied = jobStatus === 'applied'
                  const application = appliedJobs.find(app => app.jobId === job.id)

                  return (
                    <div
                      key={job.id}
                      className="card bg-white border-l-4 border-candidate-secondary hover:shadow-lg transition cursor-pointer"
                      onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                          <p className="text-candidate-primary font-semibold">{job.jobTitle}</p>
                          <div className="flex gap-4 mt-2 text-sm text-gray-600 flex-wrap">
                            <span>📍 {job.location}</span>
                            <span>💼 {job.employmentType}</span>
                            {job.salaryMin && job.salaryMax && (
                              <span>💰 R$ {job.salaryMin.toLocaleString()} - R$ {job.salaryMax.toLocaleString()}</span>
                            )}
                          </div>
                        </div>
                        {getStatusBadge(jobStatus)}
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            if (!isApplied) {
                              handleApply(job.id)
                            }
                          }}
                          disabled={isApplied}
                          className="flex-1 px-6 py-2 bg-candidate-secondary text-white rounded-lg font-semibold disabled:opacity-50"
                        >
                          {isApplied ? '✓ Candidatado' : 'Candidatar-se'}
                        </button>
                      </div>

                      {isApplied && application && (
                        <p className="text-sm text-green-700 font-semibold mt-2">
                          ✓ Candidatado em {new Date(application.id).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  )
}

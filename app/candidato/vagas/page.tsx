'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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
  competencies: Competency[]
  benefits: Benefit[]
  createdAt: string
}

export default function CandidateJobsPage() {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [appliedJobs, setAppliedJobs] = useState<number[]>([])

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('scaleconnect_token')
        if (!token) {
          router.push('/login')
          return
        }

        // Buscar vagas abertas
        const response = await fetch('/api/jobs/public', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const jobsData = await response.json()
          setJobs(jobsData.filter((job: Job) => job.status === 'OPEN'))
        }

        // Buscar vagas que o candidato já se candidatou
        const appliedResponse = await fetch('/api/candidate/applications', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })

        if (appliedResponse.ok) {
          const appliedData = await appliedResponse.json()
          setAppliedJobs(appliedData.map((app: any) => app.job_id))
        }
      } catch (error) {
        console.error('Erro ao buscar vagas:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [router])

  const handleApply = async (jobId: number) => {
    try {
      const token = localStorage.getItem('scaleconnect_token')
      if (!token) {
        router.push('/login')
        return
      }

      const response = await fetch('/api/jobs/apply', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobId }),
      })

      if (response.ok) {
        setAppliedJobs([...appliedJobs, jobId])
        alert('Candidatura enviada com sucesso!')
        setShowModal(false)
      } else {
        const error = await response.json()
        alert(error.message || 'Erro ao enviar candidatura')
      }
    } catch (error) {
      alert('Erro ao enviar candidatura')
    }
  }

  if (loading) {
    return <div className="p-8">Carregando vagas...</div>
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🎯 Vagas Disponíveis</h1>
          <p className="text-gray-600">Encontre a oportunidade perfeita para sua carreira</p>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-600">Nenhuma vaga disponível no momento. Volte em breve!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map(job => (
              <div key={job.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-500">{job.jobTitle}</p>
                  </div>
                  {appliedJobs.includes(job.id) && (
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                      ✅ Candidatado
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-600">📍 {job.location}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">💼 {job.employmentType}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">🌐 {job.workMode}</span>
                  </div>
                  {job.salaryMin && job.salaryMax && (
                    <div>
                      <span className="text-gray-600">💰 R$ {job.salaryMin.toLocaleString()} - R$ {job.salaryMax.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                {job.benefits && job.benefits.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {job.benefits.slice(0, 3).map(benefit => (
                        <span key={benefit.id} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {benefit.icone}
                        </span>
                      ))}
                      {job.benefits.length > 3 && (
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                          +{job.benefits.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    setSelectedJob(job)
                    setShowModal(true)
                  }}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                  {appliedJobs.includes(job.id) ? '👁️ Ver Detalhes' : '👁️ Ver Mais'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Detalhes da Vaga */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                <p className="text-gray-600">{selectedJob.jobTitle}</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <span className="font-semibold">📍 Localização:</span> {selectedJob.location}
              </div>
              <div>
                <span className="font-semibold">💼 Vínculo:</span> {selectedJob.employmentType}
              </div>
              <div>
                <span className="font-semibold">🌐 Modalidade:</span> {selectedJob.workMode}
              </div>
              <div>
                <span className="font-semibold">📊 Nível:</span> {selectedJob.level}
              </div>
              {selectedJob.salaryMin && selectedJob.salaryMax && (
                <div className="col-span-2">
                  <span className="font-semibold">💰 Salário:</span> R$ {selectedJob.salaryMin.toLocaleString()} - R$ {selectedJob.salaryMax.toLocaleString()}
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Descrição da Vaga</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{selectedJob.description}</p>
            </div>

            {selectedJob.competencies && selectedJob.competencies.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Competências Necessárias</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.competencies.map(comp => (
                    <span key={comp.id} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                      {comp.nome}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedJob.benefits && selectedJob.benefits.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Benefícios Oferecidos</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.benefits.map(benefit => (
                    <span key={benefit.id} className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                      {benefit.icone} {benefit.nome}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              {!appliedJobs.includes(selectedJob.id) ? (
                <button
                  onClick={() => handleApply(selectedJob.id)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                  ✅ Candidatar
                </button>
              ) : (
                <button
                  disabled
                  className="flex-1 bg-gray-400 text-white font-bold py-2 px-4 rounded-lg cursor-not-allowed"
                >
                  ✅ Já Candidatado
                </button>
              )}
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

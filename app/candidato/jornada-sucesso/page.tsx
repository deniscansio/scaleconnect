'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface Competency {
  id: number
  nome: string
}

interface CandidateProfile {
  id: number
  userId: number
  currentPosition?: string
  currentCompany?: string
  currentSalary?: string
  yearsOfExperience?: number
  fullName?: string
  email?: string
}

interface CompletedCourse {
  id: number
  certificateUrl?: string
  completedAt?: string
  fileName?: string
}

export default function JornadaSucessoPage() {
  const [candidateCompetencies, setCandidateCompetencies] = useState<Competency[]>([])
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [completedCourses, setCompletedCourses] = useState<CompletedCourse[]>([])
  const [uploadingCourseId, setUploadingCourseId] = useState<number | null>(null)
  const [viewingCertificate, setViewingCertificate] = useState<string | null>(null)
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({})

  // Buscar dados do candidato e suas competências
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Obter token do localStorage
        const token = localStorage.getItem('token')
        if (!token) {
          setError('Você precisa estar autenticado')
          setLoading(false)
          return
        }

        // Buscar perfil do candidato
        const profileResponse = await fetch('/api/candidate/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!profileResponse.ok) {
          throw new Error('Erro ao buscar perfil do candidato')
        }

        const profile = await profileResponse.json()
        setCandidateProfile(profile)

        // Buscar competências do candidato
        const competenciesResponse = await fetch('/api/candidate/competencies', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!competenciesResponse.ok) {
          throw new Error('Erro ao buscar competências')
        }

        const competencies = await competenciesResponse.json()
        setCandidateCompetencies(competencies || [])
      } catch (err) {
        console.error('Erro ao buscar dados:', err)
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleFileSelect = (courseId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
    if (!validTypes.includes(file.type)) {
      alert('Por favor, selecione um arquivo PDF ou imagem (JPG/PNG)')
      return
    }

    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      alert('O arquivo não pode exceder 10MB')
      return
    }

    setUploadingCourseId(courseId)

    const reader = new FileReader()
    reader.onload = () => {
      setTimeout(() => {
        if (!completedCourses.find(cc => cc.id === courseId)) {
          setCompletedCourses([
            ...completedCourses,
            {
              id: courseId,
              certificateUrl: reader.result as string,
              completedAt: new Date().toLocaleDateString('pt-BR'),
              fileName: file.name
            }
          ])
        }
        setUploadingCourseId(null)
        event.target.value = ''
      }, 1500)
    }
    reader.readAsDataURL(file)
  }

  const handleUploadClick = (courseId: number) => {
    fileInputRefs.current[courseId]?.click()
  }

  const handleRedirectToCourse = (competencyName: string) => {
    // Redirecionar para página de cursos com a competência como parâmetro
    window.location.href = `/candidato/cursos?competencia=${encodeURIComponent(competencyName)}`
  }

  const isCourseCompleted = (courseId: number) => {
    return completedCourses.some(cc => cc.id === courseId)
  }

  const getCompletedCourseInfo = (courseId: number) => {
    return completedCourses.find(cc => cc.id === courseId)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <nav className="bg-white shadow-sm border-b-4 border-orange-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/candidato/dashboard" className="text-orange-600 font-bold text-lg hover:text-orange-700">
              ← Voltar
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">🚀 Jornada de Sucesso</h1>
            <div className="w-32"></div>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-gray-600 text-lg">Carregando dados...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <nav className="bg-white shadow-sm border-b-4 border-orange-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/candidato/dashboard" className="text-orange-600 font-bold text-lg hover:text-orange-700">
              ← Voltar
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">🚀 Jornada de Sucesso</h1>
            <div className="w-32"></div>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/candidato/dashboard" className="text-orange-600 font-bold text-lg hover:text-orange-700">
            ← Voltar
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">🚀 Jornada de Sucesso</h1>
          <div className="w-32"></div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* SEÇÃO 1: POSIÇÃO ATUAL */}
        {candidateProfile && (
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-8 border-green-500">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xl">
                      ✓
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {candidateProfile.currentPosition || 'Posição não definida'}
                      </h2>
                      <p className="text-gray-600 text-sm">
                        {candidateProfile.currentCompany || 'Empresa não informada'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-orange-600">
                    {candidateProfile.currentSalary ? `R$ ${parseFloat(candidateProfile.currentSalary).toLocaleString('pt-BR')}` : 'Salário não informado'}
                  </div>
                  <div className="text-sm text-green-600 font-semibold mt-1">Perfil Completo</div>
                </div>
              </div>

              {/* Competências Conquistadas */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 mb-3">
                  Competências Adquiridas: ({candidateCompetencies.length})
                </h3>
                {candidateCompetencies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {candidateCompetencies.map((competency) => (
                      <span
                        key={competency.id}
                        className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold border-2 border-green-400"
                      >
                        ✓ {competency.nome}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm italic">Nenhuma competência adicionada ao perfil ainda.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SEÇÃO 2: COMPETÊNCIAS PARA DESENVOLVIMENTO */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">📚 Desenvolva Novas Competências</h2>
          <p className="text-gray-600 mb-8">
            Clique em uma competência para acessar cursos e desenvolver novas habilidades para sua carreira.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {candidateCompetencies.length > 0 ? (
              candidateCompetencies.map((competency) => (
                <button
                  key={competency.id}
                  onClick={() => handleRedirectToCourse(competency.nome)}
                  className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500 hover:shadow-lg transition text-left"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{competency.nome}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Clique para acessar cursos relacionados a esta competência
                  </p>
                  <div className="text-orange-600 font-semibold text-sm">
                    Acessar cursos →
                  </div>
                </button>
              ))
            ) : (
              <div className="col-span-full bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-600 text-lg mb-4">
                  Você ainda não tem competências cadastradas no seu perfil.
                </p>
                <Link
                  href="/candidato/perfil"
                  className="inline-block px-6 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition"
                >
                  Ir para Perfil e Adicionar Competências
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* SEÇÃO 3: PRÓXIMOS PASSOS RECOMENDADOS */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">💼 Próximos Passos Recomendados</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/candidato/afiliado" className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow-lg p-8 border-2 border-orange-300 hover:shadow-xl transition cursor-pointer">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Afiliado</h3>
              <p className="text-gray-700 mb-4">
                Ganhe comissões representando produtos e serviços de empresas parceiras
              </p>
              <div className="text-orange-600 font-bold">Clique para explorar →</div>
            </Link>

            <Link href="/candidato/jobs" className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-lg p-8 border-2 border-blue-300 hover:shadow-xl transition cursor-pointer">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Vagas</h3>
              <p className="text-gray-700 mb-4">
                Encontre vagas alinhadas com sua jornada de sucesso e crescimento profissional
              </p>
              <div className="text-blue-600 font-bold">Clique para explorar →</div>
            </Link>
          </div>
        </div>
      </div>

      {/* MODAL: Visualizar Certificado */}
      {viewingCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b-2 border-orange-500 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-2xl font-bold text-gray-900">Certificado</h3>
              <button
                onClick={() => setViewingCertificate(null)}
                className="text-2xl font-bold text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              {viewingCertificate.startsWith('data:image') ? (
                <img src={viewingCertificate} alt="Certificado" className="w-full h-auto" />
              ) : (
                <iframe src={viewingCertificate} className="w-full h-[600px]" title="Certificado PDF"></iframe>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

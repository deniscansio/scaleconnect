'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { careerPositions, calculateAverageSalary, getPositionByTitle, type CareerPosition } from '../../data/career-positions'
import { careerPath } from '../../data/career-path'

interface CompletedCourse {
  id: number
  certificateUrl?: string
  completedAt?: string
  fileName?: string
}

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

export default function JornadaSucessoPage() {
  const [selectedCareerGoalId, setSelectedCareerGoalId] = useState<number | null>(null)
  const [completedCourses, setCompletedCourses] = useState<CompletedCourse[]>([])
  const [uploadingCourseId, setUploadingCourseId] = useState<number | null>(null)
  const [viewingCertificate, setViewingCertificate] = useState<string | null>(null)
  const [candidateCompetencies, setCandidateCompetencies] = useState<Competency[]>([])
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({})

  // Buscar dados do candidato e suas competências do banco de dados
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('scaleconnect_token')
        if (!token) {
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

        if (profileResponse.ok) {
          const profile = await profileResponse.json()
          setCandidateProfile(profile)
        }

        // Buscar competências do candidato
        const competenciesResponse = await fetch('/api/candidate/competencies', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (competenciesResponse.ok) {
          const competencies = await competenciesResponse.json()
          setCandidateCompetencies(competencies || [])
        }
      } catch (err) {
        console.error('Erro ao buscar dados:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Obter competências desenvolvidas
  const getDevelopedCompetencies = (): Set<string> => {
    const developed = new Set<string>()
    candidateCompetencies.forEach(comp => {
      developed.add(comp.nome)
    })
    return developed
  }

  // Calcular progresso para um cargo
  const getPositionProgress = (position: CareerPosition): number => {
    const requiredCompetencies = position.requiredCompetencies || []
    if (requiredCompetencies.length === 0) return 0

    const developedCompetencies = getDevelopedCompetencies()
    const matchedCompetencies = requiredCompetencies.filter(comp => developedCompetencies.has(comp)).length

    return Math.round((matchedCompetencies / requiredCompetencies.length) * 100)
  }

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

  const handleRedirectToCourse = (url: string) => {
    window.open(url, '_blank')
  }

  const isCourseCompleted = (courseId: number) => {
    return completedCourses.some(cc => cc.id === courseId)
  }

  const getCompletedCourseInfo = (courseId: number) => {
    return completedCourses.find(cc => cc.id === courseId)
  }

  const getCoursesForCompetency = (competency: string) => {
    const allCourses = [...careerPath.courses.free, ...careerPath.courses.paid] as any[]
    return allCourses.filter(course => course.competency === competency)
  }

  // Buscar cargo atual do perfil
  const currentPosition = candidateProfile?.currentPosition 
    ? getPositionByTitle(candidateProfile.currentPosition)
    : null

  // Buscar cargo desejado
  const selectedCareerGoal = selectedCareerGoalId 
    ? careerPositions.find(p => p.id === selectedCareerGoalId)
    : null

  const developedComps = getDevelopedCompetencies()

  // Filtrar cargos (excluir cargo atual)
  const availablePositions = currentPosition
    ? careerPositions.filter(p => p.id !== currentPosition.id)
    : careerPositions

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
          <p className="text-gray-600">Carregando dados...</p>
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
          <h1 className="text-2xl font-bold text-gray-900">🚀 Jornada de Sucesso Profissional</h1>
          <div className="w-32"></div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* SEÇÃO 1: CARGO ATUAL */}
        {currentPosition && (
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-8 border-green-500">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xl">
                      ✓
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Você está aqui!</h2>
                      <p className="text-gray-600 text-lg font-semibold">{currentPosition.title}</p>
                      <p className="text-gray-600 text-sm">{currentPosition.description}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-orange-600">
                    R$ {candidateProfile?.currentSalary 
                      ? parseFloat(candidateProfile.currentSalary).toLocaleString('pt-BR', {minimumFractionDigits: 2})
                      : '0,00'
                    }
                  </div>
                  <div className="text-sm text-green-600 font-semibold mt-1">Seu salário atual</div>
                </div>
              </div>

              {/* Competências do cargo atual */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 mb-3">Competências do seu cargo:</h3>
                <div className="flex flex-wrap gap-2">
                  {currentPosition.requiredCompetencies.map((comp) => {
                    const isCompleted = developedComps.has(comp)
                    return (
                      <span
                        key={comp}
                        className={`px-3 py-1 text-xs rounded-full font-semibold ${
                          isCompleted
                            ? 'bg-green-100 text-green-800 border-2 border-green-400'
                            : 'bg-gray-100 text-gray-700 border-2 border-gray-300'
                        }`}
                      >
                        {isCompleted ? '✓ ' : ''}{comp}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEÇÃO 2: CHAMADA À AÇÃO MOTIVACIONAL */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-3">🎯 Pronto para Evoluir?</h2>
            <p className="text-lg mb-2">
              Escolha seu próximo cargo ou salário e vá em busca das competências necessárias para conseguir seu tão sonhado cargo!
            </p>
            <p className="text-orange-100">
              💡 Lembre-se: você só alcançará o cargo e salário desejado após completar todas as competências necessárias. Comece agora!
            </p>
          </div>
        </div>

        {/* SEÇÃO 3: SELEÇÃO DE CARGO DESEJADO */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Escolha seu próximo cargo</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availablePositions.map((position) => {
              const progress = getPositionProgress(position)
              const isSelected = position.id === selectedCareerGoalId

              return (
                <button
                  key={position.id}
                  onClick={() => setSelectedCareerGoalId(position.id)}
                  className={`p-4 rounded-lg border-2 transition text-left h-full ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-500'
                      : 'border-gray-300 hover:border-orange-500 hover:bg-orange-50'
                  }`}
                >
                  <h3 className="font-bold text-gray-900 mb-2">{position.title}</h3>
                  
                  <p className="text-sm text-gray-600 mb-3">{position.description}</p>
                  
                  <div className="mb-3">
                    <p className="text-orange-600 font-semibold text-sm">
                      R$ {position.salaryMin.toLocaleString('pt-BR')} - R$ {position.salaryMax.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-xs text-gray-500">Média: R$ {calculateAverageSalary(position).toLocaleString('pt-BR')}</p>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-gray-700">Seu progresso</span>
                      <span className="text-xs font-bold text-orange-600">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-orange-400 to-orange-600 h-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600">
                    {position.requiredCompetencies.length} competências necessárias
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* SEÇÃO 4: DETALHES DO CARGO DESEJADO */}
        {selectedCareerGoal && (
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-8 border-orange-500">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedCareerGoal.title}</h2>
                <p className="text-gray-600 text-lg mb-6">{selectedCareerGoal.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                    <p className="text-gray-600 text-sm font-semibold mb-2">Salário Mínimo</p>
                    <p className="text-2xl font-bold text-orange-600">
                      R$ {selectedCareerGoal.salaryMin.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                    <p className="text-gray-600 text-sm font-semibold mb-2">Salário Médio</p>
                    <p className="text-2xl font-bold text-orange-600">
                      R$ {calculateAverageSalary(selectedCareerGoal).toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                    <p className="text-gray-600 text-sm font-semibold mb-2">Salário Máximo</p>
                    <p className="text-2xl font-bold text-orange-600">
                      R$ {selectedCareerGoal.salaryMax.toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>

                {/* Progress bar geral */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold text-gray-900">Seu Progresso para este Cargo</span>
                    <span className="text-2xl font-bold text-orange-600">{getPositionProgress(selectedCareerGoal)}%</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-orange-400 to-orange-600 h-full transition-all duration-500 flex items-center justify-center text-white font-bold text-sm"
                      style={{ width: `${Math.max(getPositionProgress(selectedCareerGoal), 5)}%` }}
                    >
                      {getPositionProgress(selectedCareerGoal) > 15 && `${getPositionProgress(selectedCareerGoal)}%`}
                    </div>
                  </div>
                </div>
              </div>

              {/* COMPETÊNCIAS NECESSÁRIAS - SEÇÃO EXPANDIDA */}
              <div className="bg-gray-50 rounded-lg p-8 border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">📋 Competências Necessárias</h3>
                <p className="text-gray-600 mb-6">
                  Você precisa de <strong>{selectedCareerGoal.requiredCompetencies.length}</strong> competências para este cargo.
                  <strong className="text-green-600 ml-2">
                    {selectedCareerGoal.requiredCompetencies.filter(c => developedComps.has(c)).length} adquiridas
                  </strong>
                  <strong className="text-red-600 ml-2">
                    {selectedCareerGoal.requiredCompetencies.filter(c => !developedComps.has(c)).length} faltando
                  </strong>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {selectedCareerGoal.requiredCompetencies.map((comp) => {
                    const isCompleted = developedComps.has(comp)

                    return isCompleted ? (
                      <div
                        key={comp}
                        className="px-4 py-3 bg-green-100 text-green-800 rounded-lg font-semibold border-2 border-green-400 flex items-center gap-2"
                      >
                        <span className="text-lg">✓</span>
                        <span>{comp}</span>
                      </div>
                    ) : (
                      <button
                        key={comp}
                        onClick={() => {
                          const coursesSection = document.querySelector('[data-courses-section]')
                          if (coursesSection) {
                            coursesSection.scrollIntoView({ behavior: 'smooth' })
                            setTimeout(() => {
                              const competencyElement = document.querySelector(`[data-competency="${comp}"]`)
                              if (competencyElement) {
                                competencyElement.classList.add('ring-2', 'ring-red-500')
                                setTimeout(() => {
                                  competencyElement.classList.remove('ring-2', 'ring-red-500')
                                }, 3000)
                              }
                            }, 300)
                          }
                        }}
                        className="px-4 py-3 bg-red-500 text-white rounded-lg font-semibold border-2 border-red-600 hover:bg-red-600 transition cursor-pointer hover:shadow-md"
                      >
                        {comp}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <p className="text-blue-900 font-semibold">
                    💡 Clique nas competências em vermelho para acessar os cursos e desenvolvê-las!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEÇÃO 5: CURSOS RECOMENDADOS */}
        <div className="mb-12" data-courses-section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎓 Cursos Recomendados para Sua Jornada</h2>

          <div className="space-y-6">
            {careerPath.competencies.map((competency) => {
              const isCompetencyDeveloped = developedComps.has(competency)

              return (
                <div key={competency} data-competency={competency} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500 transition">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    📚 {competency}
                    {isCompetencyDeveloped && <span className="text-green-600 ml-2 text-sm">✓ Desenvolvida</span>}
                  </h3>

                  <div className="space-y-3">
                    {getCoursesForCompetency(competency).map((course: any) => {
                      const isCompleted = isCourseCompleted(course.id)
                      const completedInfo = getCompletedCourseInfo(course.id)

                      return (
                        <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 mb-1">{course.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{course.institution}</p>
                              <div className="flex items-center gap-3 text-sm flex-wrap">
                                <span className="text-gray-600">⏱️ {course.duration}</span>
                                {course.certificate && <span className="text-green-600">✓ Certificado</span>}
                                <span className="font-bold text-orange-600">
                                  {typeof course.value === 'number' ? `R$ ${course.value}` : course.value}
                                </span>
                              </div>
                              {isCompleted && completedInfo && (
                                <div className="text-xs text-green-600 mt-2">
                                  ✓ Concluído em {completedInfo.completedAt} - {completedInfo.fileName}
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2 ml-4">
                              <button
                                onClick={() => handleRedirectToCourse(course.url)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold text-sm whitespace-nowrap"
                              >
                                Acessar
                              </button>
                              {isCompleted ? (
                                <>
                                  <button
                                    disabled
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold text-sm whitespace-nowrap cursor-not-allowed"
                                  >
                                    ✓ Concluído
                                  </button>
                                  {completedInfo?.certificateUrl && (
                                    <button
                                      onClick={() => setViewingCertificate(completedInfo.certificateUrl || null)}
                                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-semibold text-sm whitespace-nowrap"
                                    >
                                      👁️ Ver
                                    </button>
                                  )}
                                </>
                              ) : (
                                <>
                                  <input
                                    ref={(el) => {
                                      if (el) fileInputRefs.current[course.id] = el
                                    }}
                                    type="file"
                                    accept=".pdf,image/jpeg,image/png,image/jpg"
                                    onChange={(e) => handleFileSelect(course.id, e)}
                                    style={{ display: 'none' }}
                                  />
                                  <button
                                    onClick={() => handleUploadClick(course.id)}
                                    disabled={uploadingCourseId === course.id}
                                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-semibold text-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed transition"
                                  >
                                    {uploadingCourseId === course.id ? '⏳ Processando...' : '📤 Upload'}
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Modal de Certificado */}
      {viewingCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold">Certificado</h3>
              <button
                onClick={() => setViewingCertificate(null)}
                className="text-gray-600 hover:text-gray-900 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              {viewingCertificate.startsWith('data:image') ? (
                <img src={viewingCertificate} alt="Certificado" className="w-full" />
              ) : (
                <iframe src={viewingCertificate} className="w-full h-96" />
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { careerPath } from '../../data/career-path'

interface CompletedCourse {
  id: number
  certificateUrl?: string
  completedAt?: string
  fileName?: string
}

export default function JornadaSucessoPage() {
  const [completedCourses, setCompletedCourses] = useState<CompletedCourse[]>([])
  const [uploadingCourseId, setUploadingCourseId] = useState<number | null>(null)
  const [viewingCertificate, setViewingCertificate] = useState<string | null>(null)
  const [selectedCareerGoal, setSelectedCareerGoal] = useState<number>(6)
  const [scrollToCompetency, setScrollToCompetency] = useState<string | null>(null)
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({})
  const competencyRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Simular competências do perfil do candidato (em um cenário real, viriam do backend)
  const candidateProfileCompetencies = new Set([
    'Prospecção Inbound',
    'Negociação Básica',
    'CRM',
    'Comunicação'
  ])

  // Obter competências desenvolvidas (com base em cursos concluídos + perfil)
  const getDevelopedCompetencies = (): Set<string> => {
    const developed = new Set(candidateProfileCompetencies)
    completedCourses.forEach(cc => {
      const course = [...careerPath.courses.free, ...careerPath.courses.paid].find(c => c.id === cc.id) as any
      if (course?.competency) {
        developed.add(course.competency)
      }
    })
    return developed
  }

  // Calcular progresso por cargo (com competências acumuladas)
  const getCargoProgress = (cargoId: number): number => {
    const cargo = careerPath.evolutionPath.find(c => c.id === cargoId)
    if (!cargo) return 0

    const requiredCompetencies = cargo.requiredCompetencies || []
    if (requiredCompetencies.length === 0) return 0

    const developedCompetencies = getDevelopedCompetencies()
    const matchedCompetencies = requiredCompetencies.filter(comp => developedCompetencies.has(comp)).length

    return Math.round((matchedCompetencies / requiredCompetencies.length) * 100)
  }

  // Calcular progresso geral até o cargo desejado
  const getOverallProgress = (): number => {
    let totalCompetencies = 0
    let developedCompetencies = 0

    const targetCargo = careerPath.evolutionPath.find(c => c.id === selectedCareerGoal)
    if (!targetCargo) return 0

    const developedComps = getDevelopedCompetencies()

    for (let i = 0; i < careerPath.evolutionPath.length; i++) {
      const cargo = careerPath.evolutionPath[i]
      const requiredComps = cargo.requiredCompetencies || []
      totalCompetencies += requiredComps.length
      developedCompetencies += requiredComps.filter(comp => developedComps.has(comp)).length

      if (cargo.id === selectedCareerGoal) break
    }

    return totalCompetencies > 0 ? Math.round((developedCompetencies / totalCompetencies) * 100) : 0
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

  const handleCompetencyClick = (competency: string) => {
    setScrollToCompetency(competency)
    setTimeout(() => {
      competencyRefs.current[competency]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
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

  const getMissingCompetencies = (cargoId: number): string[] => {
    const cargo = careerPath.evolutionPath.find(c => c.id === cargoId)
    if (!cargo) return []

    const requiredCompetencies = cargo.requiredCompetencies || []
    const developedCompetencies = getDevelopedCompetencies()

    return requiredCompetencies.filter(comp => !developedCompetencies.has(comp))
  }

  const overallProgress = getOverallProgress()
  const targetCargo = careerPath.evolutionPath.find(c => c.id === selectedCareerGoal)
  const developedComps = getDevelopedCompetencies()

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
                      {careerPath.currentPosition.title}
                    </h2>
                    <p className="text-gray-600 text-sm">{careerPath.currentPosition.description}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-orange-600">
                  R$ {careerPath.currentPosition.salary.toLocaleString('pt-BR')}
                </div>
                <div className="text-2xl font-bold text-green-600 mt-3">VOCÊ ESTÁ AQUI</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Progresso</span>
                <span className="text-lg font-bold text-orange-600">100%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-full w-full flex items-center justify-center text-white font-bold text-sm">
                  100%
                </div>
              </div>
            </div>

            {/* Competências Necessárias */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-3">Competências Necessárias:</h3>
              <div className="flex flex-wrap gap-2">
                {careerPath.currentPosition.competencies.map((competency) => (
                  <span
                    key={competency}
                    className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold border-2 border-green-400"
                  >
                    ✓ {competency}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SEÇÃO 2: MAPA DE EVOLUÇÃO COM BARRAS DE PROGRESSO POR CARGO */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">📈 Seu Caminho para Crescer Profissionalmente</h2>
          <p className="text-gray-600 mb-8">
            Cada cargo exige competências específicas. Veja abaixo o progresso para cada nível salarial. As competências que você já desenvolveu aparecem marcadas.
          </p>

          <div className="space-y-6">
            {careerPath.evolutionPath.map((position, index) => {
              const cargoProgress = getCargoProgress(position.id)
              const isCurrentPosition = index === 0
              const isSelectedGoal = position.id === selectedCareerGoal
              const missingComps = getMissingCompetencies(position.id)

              return (
                <div
                  key={position.id}
                  className={`bg-white rounded-lg shadow-md p-6 border-l-8 transition cursor-pointer ${
                    isCurrentPosition ? 'border-green-500 bg-green-50' : 'border-orange-400'
                  } ${isSelectedGoal ? 'ring-2 ring-orange-500' : ''}`}
                  onClick={() => setSelectedCareerGoal(position.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${isCurrentPosition ? 'bg-green-500' : 'bg-gray-700'}`}>
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{position.title}</h3>
                          <p className="text-sm text-gray-600">{position.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-6">
                      <div className="text-3xl font-bold text-orange-600">
                        R$ {position.salary.toLocaleString('pt-BR')}
                      </div>
                      {isCurrentPosition && (
                        <div className="text-xl font-bold text-green-600 mt-2">VOCÊ ESTÁ AQUI</div>
                      )}
                      {isSelectedGoal && !isCurrentPosition && (
                        <div className="text-xl font-bold text-orange-600 mt-2">🎯 PRÓXIMO OBJETIVO</div>
                      )}
                    </div>
                  </div>

                  {/* Barra de Progresso do Cargo */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-gray-700">Progresso</span>
                      <span className="text-lg font-bold text-orange-600">{cargoProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-orange-400 to-orange-600 h-full transition-all duration-500 flex items-center justify-center text-white font-bold text-xs"
                        style={{ width: `${cargoProgress}%` }}
                      >
                        {cargoProgress > 20 && `${cargoProgress}%`}
                      </div>
                    </div>
                  </div>

                  {/* Competências Desenvolvidas */}
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-gray-700 mb-2">✓ Competências Desenvolvidas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {(position.requiredCompetencies || position.competencies).map((comp) => {
                        const isCompleted = developedComps.has(comp)
                        return isCompleted ? (
                          <span
                            key={comp}
                            className="px-3 py-1 text-xs rounded-full font-semibold bg-green-100 text-green-800 border-2 border-green-400"
                          >
                            ✓ {comp}
                          </span>
                        ) : null
                      })}
                    </div>
                  </div>

                  {/* Competências Necessárias (Clicáveis) */}
                  {missingComps.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-gray-700 mb-2">📚 Competências para Desenvolver:</h4>
                      <div className="flex flex-wrap gap-2">
                        {missingComps.map((comp) => (
                          <button
                            key={comp}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCompetencyClick(comp)
                            }}
                            className="px-3 py-1 text-xs rounded-full font-semibold bg-blue-100 text-blue-800 border-2 border-blue-400 hover:bg-blue-200 transition cursor-pointer"
                          >
                            {comp} →
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* SEÇÃO 3: PROGRESSO GERAL PARA OBJETIVO FINAL */}
        {targetCargo && selectedCareerGoal !== 1 && (
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-8 border-orange-500">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Progresso para Seu Objetivo Final</h2>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold text-gray-900">
                    {targetCargo.title} - R$ {targetCargo.salary.toLocaleString('pt-BR')}
                  </span>
                  <span className="text-2xl font-bold text-orange-600">{overallProgress}%</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-400 to-orange-600 h-full transition-all duration-500 flex items-center justify-center text-white font-bold text-sm"
                    style={{ width: `${Math.max(overallProgress, 5)}%` }}
                  >
                    {overallProgress > 15 && `${overallProgress}%`}
                  </div>
                </div>
              </div>

              <p className="text-gray-600">
                Você precisa desenvolver <strong>{100 - overallProgress}%</strong> das competências necessárias para alcançar seu objetivo de <strong>{targetCargo.title}</strong> e ganhar <strong>R$ {targetCargo.salary.toLocaleString('pt-BR')}</strong>.
              </p>
            </div>
          </div>
        )}

        {/* SEÇÃO 4: CURSOS RECOMENDADOS POR COMPETÊNCIA */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎓 Cursos Recomendados para Sua Jornada</h2>

          <div className="space-y-8">
            {careerPath.competencies.map((competency) => {
              const isCompetencyDeveloped = developedComps.has(competency)
              const courses = getCoursesForCompetency(competency)

              return (
                <div
                  key={competency}
                  ref={(el) => {
                    if (el) competencyRefs.current[competency] = el
                  }}
                  className={`bg-white rounded-lg shadow-md p-6 border-l-4 transition ${
                    scrollToCompetency === competency ? 'border-orange-500 ring-2 ring-orange-300' : 'border-orange-400'
                  }`}
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    📚 {competency}
                    {isCompetencyDeveloped && <span className="text-green-600 ml-2 text-sm">✓ Desenvolvida</span>}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {courses.map((course: any) => {
                      const isCompleted = isCourseCompleted(course.id)
                      const completedInfo = getCompletedCourseInfo(course.id)

                      return (
                        <div key={course.id} className="border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-orange-400 transition flex flex-col h-full bg-gradient-to-br from-white to-gray-50">
                          <div className="flex-1 mb-4">
                            <h4 className="font-bold text-gray-900 mb-2 text-sm line-clamp-2">{course.title}</h4>
                            <p className="text-xs text-gray-600 mb-3 font-semibold">{course.institution}</p>
                            <div className="flex flex-col gap-2 text-xs">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-600">⏱️</span>
                                <span className="text-gray-700">{course.duration}</span>
                              </div>
                              {course.certificate && (
                                <div className="flex items-center gap-2">
                                  <span className="text-green-600">✓</span>
                                  <span className="text-green-600">Certificado</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <span className="text-orange-600 font-bold">
                                  {typeof course.value === 'number' ? `R$ ${course.value}` : course.value}
                                </span>
                              </div>
                            </div>
                            {isCompleted && completedInfo && (
                              <div className="text-xs text-green-600 mt-3 p-2 bg-green-50 rounded">
                                ✓ Concluído em {completedInfo.completedAt}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => handleRedirectToCourse(course.url)}
                              className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold text-xs transition"
                            >
                              Acessar
                            </button>
                            {isCompleted ? (
                              <>
                                <button
                                  disabled
                                  className="w-full px-3 py-2 bg-green-500 text-white rounded-lg font-semibold text-xs cursor-not-allowed"
                                >
                                  ✓ Concluído
                                </button>
                                {completedInfo?.certificateUrl && (
                                  <button
                                    onClick={() => setViewingCertificate(completedInfo.certificateUrl || null)}
                                    className="w-full px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-semibold text-xs transition"
                                  >
                                    👁️ Ver Cert.
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
                                  className="w-full px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-semibold text-xs disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                  {uploadingCourseId === course.id ? '⏳ ...' : '📤 Upload'}
                                </button>
                              </>
                            )}
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

        {/* SEÇÃO 5: PRÓXIMOS PASSOS RECOMENDADOS */}
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

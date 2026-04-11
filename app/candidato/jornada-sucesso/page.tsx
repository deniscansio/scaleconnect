'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { careerPath as careerPathData } from '@/app/data/career-path'
import { companyConfig } from '@/app/config/company'

export default function JornadaSucesso() {
  const [completedCourses, setCompletedCourses] = useState<{ [key: string]: { completedAt: string; certificateUrl: string | null } }>({})
  const [uploadingCourseId, setUploadingCourseId] = useState<string | null>(null)
  const [viewingCertificate, setViewingCertificate] = useState<string | null>(null)
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement }>({})

  // Simular dados do candidato
  const currentCareerLevel = careerPathData.evolutionPath[0]
  const targetCareerLevel = careerPathData.targetPosition

  const isCourseCompleted = (courseId: string) => {
    return courseId in completedCourses
  }

  const getCompletedCourseInfo = (courseId: string) => {
    return completedCourses[courseId] || null
  }

  const handleUploadClick = (courseId: string) => {
    fileInputRefs.current[courseId]?.click()
  }

  const handleFileSelect = (courseId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingCourseId(courseId)
    
    // Simular upload
    setTimeout(() => {
      const reader = new FileReader()
      reader.onload = () => {
        const timestamp = new Date().toLocaleDateString('pt-BR')
        setCompletedCourses(prev => ({
          ...prev,
          [courseId]: {
            completedAt: timestamp,
            certificateUrl: reader.result as string
          }
        }))
        setUploadingCourseId(null)
      }
      reader.readAsDataURL(file)
    }, 1000)
  }

  const handleRedirectToCourse = (url: string) => {
    window.open(url, '_blank')
  }

  const calculateCareerProgress = () => {
    const totalCompetencies = currentCareerLevel.requiredCompetencies.length
    const completedCount = Object.keys(completedCourses).length
    return totalCompetencies > 0 ? Math.round((completedCount / totalCompetencies) * 100) : 0
  }

  const getAllCourses = () => {
    return careerPathData.competencies || []
  }

  const getCompetencyProgress = (competency: string) => {
    const allCourses = [...(careerPathData.courses?.free || []), ...(careerPathData.courses?.paid || [])]
    const coursesForCompetency = allCourses.filter(c => c.competency === competency)
    if (coursesForCompetency.length === 0) return 0

    const completedCount = coursesForCompetency.filter(c => isCourseCompleted(c.id.toString())).length
    return Math.round((completedCount / coursesForCompetency.length) * 100)
  }

  const isCompetencyDeveloped = (competency: string) => {
    return getCompetencyProgress(competency) === 100
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🚀</span>
            <h1 className="text-4xl font-bold text-gray-900">Jornada de Sucesso</h1>
          </div>
          <p className="text-gray-600 text-lg">Seu plano real para crescer profissionalmente</p>
        </div>

        {/* Posição Atual */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border-l-4 border-orange-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-2">📍 SUA POSIÇÃO ATUAL</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentCareerLevel.title}</h2>
              <p className="text-gray-600 mb-4">{currentCareerLevel.description}</p>
              <p className="text-orange-600 text-2xl font-bold">{currentCareerLevel.salary}</p>
              <p className="text-green-600 font-semibold mt-2">✓ Concluído</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-2">🎯 ONDE VOCÊ PODE CHEGAR</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{targetCareerLevel.title}</h2>
              <p className="text-gray-600 mb-4">{targetCareerLevel.description}</p>
              <p className="text-orange-600 text-2xl font-bold">{targetCareerLevel.salary}</p>
              <p className="text-gray-600 font-semibold mt-2">Seu objetivo de carreira</p>
            </div>
          </div>
        </div>

        {/* Progresso Geral */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Progresso de Competências</h3>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-semibold">Progresso Geral</span>
              <span className="text-orange-600 font-bold text-lg">{calculateCareerProgress()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-orange-400 to-orange-600 h-full transition-all duration-500"
                style={{ width: `${calculateCareerProgress()}%` }}
              />
            </div>
            <p className="text-gray-600 text-sm mt-2">
              {Object.keys(completedCourses).length} de {currentCareerLevel.requiredCompetencies.length} competências desenvolvidas
            </p>
          </div>
        </div>

        {/* Mapa de Evolução */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">📈 MAPA DE EVOLUÇÃO</h2>
          
          {/* Cargo Atual Expandido */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-green-500">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                ✓
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900">{currentCareerLevel.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{currentCareerLevel.description}</p>
              </div>
              <div className="text-right">
                <p className="text-orange-600 text-2xl font-bold">{currentCareerLevel.salary}</p>
                <p className="text-green-600 font-semibold text-sm mt-1">✓ Concluído</p>
              </div>
            </div>

            {/* Barra de Progresso do Cargo Atual */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-semibold">Progresso</span>
                <span className="text-orange-600 font-bold">100%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-full w-full" />
              </div>
            </div>

            {/* Competências Necessárias */}
            <div>
              <p className="text-gray-700 font-semibold mb-3">Competências Necessárias:</p>
              <div className="flex flex-wrap gap-2">
                {currentCareerLevel.requiredCompetencies.map((comp, idx) => (
                  <span key={idx} className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                    ✓ {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Próximos Cargos */}
          {careerPathData.evolutionPath.slice(1).map((level, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-gray-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {idx + 2}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900">{level.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{level.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-orange-600 text-2xl font-bold">{level.salary}</p>
                </div>
              </div>

              {/* Barra de Progresso */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-semibold">Progresso</span>
                  <span className="text-orange-600 font-bold">{getCompetencyProgress(level.requiredCompetencies[0])}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-orange-400 to-orange-600 h-full transition-all duration-500"
                    style={{ width: `${getCompetencyProgress(level.requiredCompetencies[0])}%` }}
                  />
                </div>
              </div>

              {/* Competências Necessárias */}
              <div>
                <p className="text-gray-700 font-semibold mb-3">Competências Necessárias:</p>
                <div className="flex flex-wrap gap-2">
                  {level.requiredCompetencies.map((comp, cidx) => {
                    const isDevInCurrentLevel = currentCareerLevel.requiredCompetencies.includes(comp)
                    const isDevInThisLevel = isCompetencyDeveloped(comp)
                    
                    if (isDevInCurrentLevel && isDevInThisLevel) {
                      return (
                        <span key={cidx} className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                          ✓ {comp}
                        </span>
                      )
                    } else {
                      return (
                        <button
                          key={cidx}
                          onClick={() => {
                            const element = document.getElementById(`competency-${comp}`)
                            element?.scrollIntoView({ behavior: 'smooth' })
                          }}
                          className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full hover:bg-blue-200 transition cursor-pointer"
                        >
                          {comp}
                        </button>
                      )
                    }
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Seção de Cursos - Vitrine */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">🎓 Cursos e Treinamentos Disponíveis</h2>
          
          {(() => {
            const allCourses = [...(careerPathData.courses?.free || []), ...(careerPathData.courses?.paid || [])]
            const competencies = Array.from(new Set(allCourses.map(c => c.competency)))
            return competencies.length > 0 && (
            <div id="competency-cursos">
              {competencies.map((competency) => {
                const courses = allCourses.filter(c => c.competency === competency)
                const isDevCompetency = isCompetencyDeveloped(competency)
                
                return (
                  <div key={competency} className="mb-12" id={`competency-${competency}`}>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl">📚</span>
                      <h3 className="text-xl font-bold text-gray-900">
                        {competency}
                        {isDevCompetency && <span className="text-green-600 ml-2 text-sm">✓ Desenvolvida</span>}
                      </h3>
                    </div>

                    {/* Grid de Cursos - Vitrine */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                      {courses.map((course: any) => {
                        const isCompleted = isCourseCompleted(course.id.toString())
                        const completedInfo = getCompletedCourseInfo(course.id.toString())

                        return (
                          <div key={course.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col h-full border border-gray-100">
                            {/* Topo do Card - Icone */}
                            <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-32 flex items-center justify-center text-white text-4xl">
                              🎓
                            </div>
                            
                            {/* Conteudo do Card */}
                            <div className="p-5 flex-1 flex flex-col">
                              {/* Instituicao como Badge */}
                              <div className="mb-3">
                                <span className="inline-block bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                                  {course.institution.split(' ')[0]}
                                </span>
                              </div>
                              
                              {/* Titulo do Curso */}
                              <h4 className="font-bold text-gray-900 mb-4 text-base line-clamp-3">{course.title}</h4>
                              
                              {/* Informacoes do Curso */}
                              <div className="space-y-2 text-sm mb-4 flex-1">
                                <div className="flex items-center gap-2 text-gray-700">
                                  <span>⏱️</span>
                                  <span>{course.duration}</span>
                                </div>
                                {course.certificate && (
                                  <div className="flex items-center gap-2 text-green-600">
                                    <span>✓</span>
                                    <span>Certificado</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-2 text-orange-600 font-bold">
                                  <span>💰</span>
                                  <span>{typeof course.value === 'number' ? `R$ ${course.value}` : course.value}</span>
                                </div>
                              </div>
                              
                              {isCompleted && completedInfo && (
                                <div className="text-xs text-green-600 mb-4 p-2 bg-green-50 rounded-lg border border-green-200">
                                  ✓ Concluído em {completedInfo.completedAt}
                                </div>
                              )}
                            </div>
                            
                            {/* Botoes na Base */}
                            <div className="border-t border-gray-100 p-4 flex flex-col gap-2">
                              <button
                                onClick={() => handleRedirectToCourse(course.url)}
                                className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold text-sm transition"
                              >
                                Acessar
                              </button>
                              {isCompleted ? (
                                <>
                                  <button
                                    disabled
                                    className="w-full px-3 py-2 bg-green-500 text-white rounded-lg font-semibold text-sm cursor-not-allowed"
                                  >
                                    ✓ Concluído
                                  </button>
                                  {completedInfo?.certificateUrl && (
                                    <button
                                      onClick={() => setViewingCertificate(completedInfo.certificateUrl || null)}
                                      className="w-full px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-semibold text-sm transition"
                                    >
                                      👁️ Ver Certificado
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
                                    className="w-full px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition"
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
          )
          })()}
        </div>

        {/* Próximos Passos */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">📋 Próximos Passos para Avançar:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/candidato/jobs" className="p-6 border-2 border-orange-400 rounded-lg hover:bg-orange-50 transition">
              <div className="text-3xl mb-3">📋</div>
              <h4 className="font-bold text-gray-900 mb-2">Candidatar-se a Vagas</h4>
              <p className="text-gray-600 text-sm">Encontre vagas alinhadas com sua jornada</p>
            </Link>
            <Link href="/candidato/opportunities" className="p-6 border-2 border-blue-400 rounded-lg hover:bg-blue-50 transition">
              <div className="text-3xl mb-3">💼</div>
              <h4 className="font-bold text-gray-900 mb-2">Explorar Oportunidades</h4>
              <p className="text-gray-600 text-sm">Ganhe comissões representando produtos e serviços</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Modal de Visualização de Certificado */}
      {viewingCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Certificado</h3>
              <button
                onClick={() => setViewingCertificate(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              {viewingCertificate.startsWith('data:image') ? (
                <img src={viewingCertificate} alt="Certificado" className="w-full" />
              ) : (
                <div className="text-center text-gray-600">
                  <p>Arquivo PDF</p>
                  <p className="text-sm mt-2">Visualização de PDF não suportada neste navegador</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

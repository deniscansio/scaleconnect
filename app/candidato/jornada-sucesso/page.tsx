'use client'

import React, { useState, useRef, useEffect } from 'react'
import { careerPath as careerPathData } from '@/app/data/career-path'

export default function JornadaSucessoPage() {
  const [completedCourses, setCompletedCourses] = useState<Record<string, { completedAt: string; certificateUrl?: string }>>({})
  const [uploadingCourseId, setUploadingCourseId] = useState<number | null>(null)
  const [viewingCertificate, setViewingCertificate] = useState<string | null>(null)
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({})

  // Carregar progresso do localStorage ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem('scaleconnect_completed_courses')
    if (saved) {
      try {
        setCompletedCourses(JSON.parse(saved))
      } catch (e) {
        console.error('Erro ao carregar cursos concluídos', e)
      }
    }
  }, [])

  // Salvar progresso no localStorage sempre que mudar
  useEffect(() => {
    if (Object.keys(completedCourses).length > 0) {
      localStorage.setItem('scaleconnect_completed_courses', JSON.stringify(completedCourses))
    }
  }, [completedCourses])

  const currentCareerLevel = careerPathData.evolutionPath[0] // SDR Junior
  const targetCareerLevel = careerPathData.evolutionPath[careerPathData.evolutionPath.length - 1] // Diretor Comercial

  const isCourseCompleted = (courseId: string) => {
    return !!completedCourses[courseId]
  }

  const getCompletedCourseInfo = (courseId: string) => {
    return completedCourses[courseId]
  }

  const handleFileSelect = (courseId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadingCourseId(courseId)
    
    // Simular upload
    setTimeout(() => {
      const now = new Date().toLocaleDateString('pt-BR')
      const fakeUrl = URL.createObjectURL(file)
      
      setCompletedCourses(prev => ({
        ...prev,
        [courseId.toString()]: {
          completedAt: now,
          certificateUrl: fakeUrl
        }
      }))
      setUploadingCourseId(null)
      alert('Certificado enviado com sucesso! Curso marcado como concluído.')
    }, 1500)
  }

  const handleUploadClick = (courseId: number) => {
    fileInputRefs.current[courseId]?.click()
  }

  const handleRedirectToCourse = (url: string) => {
    window.open(url, '_blank')
  }

  const calculateCareerProgress = () => {
    const totalCompetencies = currentCareerLevel.requiredCompetencies.length
    const completedCount = Object.keys(completedCourses).length
    return totalCompetencies > 0 ? Math.round((completedCount / totalCompetencies) * 100) : 0
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
              <p className="text-orange-600 text-2xl font-bold">R$ {currentCareerLevel.salary.toLocaleString('pt-BR')}</p>
              <p className="text-green-600 font-semibold mt-2">✓ Concluído</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-2">🎯 ONDE VOCÊ PODE CHEGAR</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{targetCareerLevel.title}</h2>
              <p className="text-gray-600 mb-4">{targetCareerLevel.description}</p>
              <p className="text-orange-600 text-2xl font-bold">R$ {targetCareerLevel.salary.toLocaleString('pt-BR')}+</p>
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
                className="bg-orange-500 h-full transition-all duration-500 ease-out"
                style={{ width: `${calculateCareerProgress()}%` }}
              />
            </div>
          </div>
        </div>

        {/* Trilhas de Competências */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">🛠️ Competências Necessárias</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentCareerLevel.requiredCompetencies.map((comp) => {
              const progress = getCompetencyProgress(comp)
              const isDeveloped = progress === 100
              
              return (
                <div key={comp} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{comp}</h4>
                      <p className="text-sm text-gray-500">Competência essencial para {currentCareerLevel.subtitle}</p>
                    </div>
                    {isDeveloped ? (
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">DESENVOLVIDA</span>
                    ) : (
                      <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">EM DESENVOLVIMENTO</span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progresso</span>
                      <span className="font-bold text-orange-600">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {!isDeveloped && (
                    <button 
                      onClick={() => {
                        const element = document.getElementById(`competency-${comp}`)
                        element?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="mt-6 w-full py-2 border-2 border-orange-500 text-orange-500 font-bold rounded-lg hover:bg-orange-50 transition text-sm"
                    >
                      VER CURSOS PARA ESTA COMPETÊNCIA
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Seção de Cursos - Grid Horizontal de Cards Verticais */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">🎓 Cursos e Treinamentos Disponíveis</h2>
          
          {(() => {
            const allCourses = [...(careerPathData.courses?.free || []), ...(careerPathData.courses?.paid || [])]
            const competencies = Array.from(new Set(allCourses.map(c => c.competency)))
            return competencies.length > 0 && (
            <div id="competency-cursos" className="space-y-12">
              {competencies.map((competency) => {
                const courses = allCourses.filter(c => c.competency === competency)
                const isDevCompetency = isCompetencyDeveloped(competency)
                
                return (
                  <div key={competency} id={`competency-${competency}`}>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl">📚</span>
                      <h3 className="text-xl font-bold text-gray-900">
                        {competency}
                        {isDevCompetency && <span className="text-green-600 ml-2 text-sm">✓ Desenvolvida</span>}
                      </h3>
                    </div>

                    {/* Grid de Cards Verticais Lado a Lado */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {courses.map((course: any) => {
                        const isCompleted = isCourseCompleted(course.id.toString())
                        const completedInfo = getCompletedCourseInfo(course.id.toString())

                        return (
                          <div key={course.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100">
                            {/* Topo do Card - Icone/Destaque */}
                            <div className="bg-gradient-to-br from-orange-400 to-orange-600 h-32 flex items-center justify-center text-white text-4xl shrink-0">
                              🎓
                            </div>
                            
                            {/* Conteudo do Card */}
                            <div className="p-5 flex-1 flex flex-col">
                              {/* Instituicao como Badge */}
                              <div className="mb-3">
                                <span className="inline-block bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                  {course.institution}
                                </span>
                              </div>
                              
                              {/* Titulo do Curso */}
                              <h4 className="font-bold text-gray-900 mb-4 text-base line-clamp-2 h-12">{course.title}</h4>
                              
                              {/* Informacoes do Curso */}
                              <div className="space-y-3 text-sm mb-6 flex-1">
                                <div className="flex items-center gap-2 text-gray-700">
                                  <span className="text-orange-500">⏱️</span>
                                  <span>{course.duration}</span>
                                </div>
                                {course.certificate && (
                                  <div className="flex items-center gap-2 text-green-600">
                                    <span className="text-green-500">📜</span>
                                    <span>Certificado Incluso</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-2 text-gray-900 font-bold">
                                  <span className="text-blue-500">💰</span>
                                  <span>{typeof course.value === 'number' ? `R$ ${course.value}` : course.value}</span>
                                </div>
                              </div>
                              
                              {isCompleted && completedInfo && (
                                <div className="text-xs text-green-600 mb-4 p-2 bg-green-50 rounded-lg border border-green-200 text-center">
                                  ✓ Concluído em {completedInfo.completedAt}
                                </div>
                              )}

                              {/* Botoes na Base do Card */}
                              <div className="flex flex-col gap-2 mt-auto">
                                <button
                                  onClick={() => handleRedirectToCourse(course.url)}
                                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold text-sm transition shadow-sm"
                                >
                                  Acessar Curso
                                </button>
                                
                                {isCompleted ? (
                                  <>
                                    {completedInfo?.certificateUrl && (
                                      <button
                                        onClick={() => setViewingCertificate(completedInfo.certificateUrl || null)}
                                        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-bold text-sm transition shadow-sm"
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
                                      className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
                                    >
                                      {uploadingCourseId === course.id ? '⏳ Enviando...' : '📤 Upload Certificado'}
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
          )
          })()}
        </div>

        {/* Próximos Passos */}
        <div className="bg-gray-900 text-white rounded-xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Próximo Objetivo: {careerPathData.evolutionPath[1].title}</h3>
              <p className="text-gray-400">Desenvolva as competências acima para desbloquear seu próximo nível salarial de R$ {careerPathData.evolutionPath[1].salary.toLocaleString('pt-BR')}</p>
            </div>
            <div className="shrink-0">
              <div className="text-center">
                <p className="text-orange-500 font-bold text-4xl mb-1">+{Math.round(((careerPathData.evolutionPath[1].salary / currentCareerLevel.salary) - 1) * 100)}%</p>
                <p className="text-sm text-gray-400 uppercase tracking-wider">Aumento Salarial</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Visualização de Certificado */}
      {viewingCertificate && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Seu Certificado</h3>
              <button 
                onClick={() => setViewingCertificate(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 bg-gray-100 flex items-center justify-center">
              <img 
                src={viewingCertificate} 
                alt="Certificado" 
                className="max-w-full h-auto shadow-2xl"
              />
            </div>
            <div className="p-4 border-t flex justify-end">
              <button 
                onClick={() => setViewingCertificate(null)}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg font-bold"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

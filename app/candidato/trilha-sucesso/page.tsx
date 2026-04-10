'use client'

import { useState } from 'react'
import Link from 'next/link'
import { careerPath } from '../../data/career-path'

export default function TrilhaSucessoPage() {
  const [selectedCompetency, setSelectedCompetency] = useState<string | null>(null)
  const [showCourses, setShowCourses] = useState(false)
  const [completedCourses, setCompletedCourses] = useState<number[]>([])

  // Calcular progresso baseado no peso dos cursos
  const maxWeight = 200 // Peso máximo teórico para 100%
  const currentWeight = completedCourses.reduce((sum, courseId) => {
    const course = [...careerPath.courses.free, ...careerPath.courses.paid].find(c => c.id === courseId)
    return sum + (course?.weight || 0)
  }, 0)
  const currentProgress = Math.min((currentWeight / maxWeight) * 100, 100)

  const handleCompetencyClick = (competency: string) => {
    setSelectedCompetency(competency)
    setShowCourses(true)
  }

  const handleCompleteCourse = (courseId: number) => {
    if (!completedCourses.includes(courseId)) {
      setCompletedCourses([...completedCourses, courseId])
    }
  }

  const getCoursesForCompetency = (competency: string) => {
    const allCourses = [...careerPath.courses.free, ...careerPath.courses.paid] as any[]
    return allCourses.filter(course => course.competency === competency)
  }

  const handleRedirectToCourse = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b-2 border-candidate-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/candidato/dashboard" className="text-candidate-primary font-bold text-xl">
            ← Voltar ao Dashboard
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">🚀 TRILHA DE SUCESSO</h1>
          <p className="text-xl text-gray-600">Seu plano real para crescer profissionalmente</p>
        </div>

        {/* BLOCO 1: POSIÇÃO ATUAL (SDR JUNIOR) */}
        <div className="mb-12">
          <div className="card border-4 border-candidate-primary">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-candidate-primary mb-4">📍 VOCÊ ESTÁ EM</h2>
                <div className="text-4xl font-bold text-gray-900 mb-2">{careerPath.currentPosition.title}</div>
                <div className="text-lg text-gray-600 mb-4">{careerPath.currentPosition.subtitle}</div>
                <div className="text-3xl font-bold text-candidate-primary mb-4">
                  R$ {careerPath.currentPosition.salary.toLocaleString('pt-BR')}
                </div>
                <p className="text-gray-600 mb-6">{careerPath.currentPosition.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">✓ Competências Necessárias:</h3>
                <div className="space-y-2">
                  {careerPath.currentPosition.competencies.map((comp, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-green-500 font-bold">✓</span>
                      <span className="text-gray-700">{comp}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Progresso</h3>
                  <div className="w-full bg-gray-200 rounded-full h-12 overflow-hidden flex items-center justify-center">
                    <div
                      className="bg-gradient-to-r from-candidate-primary to-green-500 h-full transition-all duration-500 flex items-center justify-center text-white font-bold text-lg"
                      style={{ width: `${careerPath.currentPosition.progress}%` }}
                    >
                      {careerPath.currentPosition.progress}%
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Concluído</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BLOCO 2: MAPA DE EVOLUÇÃO */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">📈 MAPA DE EVOLUÇÃO</h2>
          <div className="space-y-4">
            {careerPath.evolutionPath.map((position, index) => (
              <div key={position.id} className={`card ${index === 0 ? 'border-4 border-candidate-primary bg-blue-50' : 'border-2'}`}>
                <div className="flex items-center gap-6">
                  <div className="text-4xl font-bold text-candidate-primary w-12 text-center">{index + 1}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{position.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{position.subtitle}</p>
                    <p className="text-gray-600 mb-2">{position.description}</p>
                    <div className="text-lg font-semibold text-candidate-primary mb-2">
                      R$ {position.salary.toLocaleString('pt-BR')}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {position.competencies.map((comp) => (
                        <span
                          key={comp}
                          className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-200 text-gray-800"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-2">Progresso</div>
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-candidate-primary">{position.progress}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BLOCO 3: COMPETÊNCIAS NECESSÁRIAS */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">💡 COMPETÊNCIAS NECESSÁRIAS</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {careerPath.competencies.map((competency) => (
              <button
                key={competency}
                onClick={() => handleCompetencyClick(competency)}
                className="card text-center py-6 cursor-pointer transition transform hover:scale-105 border-2 border-candidate-primary hover:border-4"
              >
                <div className="text-3xl mb-2">📚</div>
                <div className="font-bold text-gray-900">{competency}</div>
                <div className="text-sm text-gray-600 mt-2">Clique para ver cursos</div>
              </button>
            ))}
          </div>
        </div>

        {/* BARRA DE PROGRESSO GERAL */}
        <div className="card mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 PROGRESSO PARA DIRETOR COMERCIAL</h2>
          <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
            <div
              className="bg-gradient-to-r from-candidate-primary to-green-500 h-full transition-all duration-500 flex items-center justify-center text-white font-bold"
              style={{ width: `${currentProgress}%` }}
            >
              {currentProgress > 10 && `${Math.round(currentProgress)}%`}
            </div>
          </div>
          <p className="text-gray-600 mt-4">
            Você completou <strong>{completedCourses.length}</strong> curso(s). Peso acumulado: <strong>{currentWeight}</strong> / {maxWeight}
          </p>
        </div>

        {/* MODAL DE CURSOS */}
        {showCourses && selectedCompetency && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b-2 border-candidate-primary flex justify-between items-center sticky top-0 bg-white">
                <h3 className="text-2xl font-bold text-gray-900">Cursos para: {selectedCompetency}</h3>
                <button
                  onClick={() => setShowCourses(false)}
                  className="text-2xl font-bold text-gray-600 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                {/* CURSOS GRATUITOS */}
                <h4 className="text-xl font-bold text-green-600 mb-4">🎁 CURSOS GRATUITOS (Peso: 3-5%)</h4>
                <div className="space-y-4 mb-8">
                  {getCoursesForCompetency(selectedCompetency)
                    .filter((course: any) => careerPath.courses.free.includes(course))
                    .map((course: any) => (
                      <div key={course.id} className="card border-2 border-green-200">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h5 className="text-lg font-bold text-gray-900">{course.title}</h5>
                            <p className="text-sm text-gray-600">{course.institution}</p>
                            <p className="text-sm text-gray-600 mt-1">⏱️ {course.duration}</p>
                            <p className="text-sm text-gray-600">
                              {course.certificate ? '✓ Com certificado' : '✗ Sem certificado'}
                            </p>
                            <p className="text-xs text-candidate-primary font-semibold mt-2">Peso: {course.weight}%</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleRedirectToCourse(course.url)}
                              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 whitespace-nowrap"
                            >
                              Acessar Curso
                            </button>
                            <button
                              onClick={() => handleCompleteCourse(course.id)}
                              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                                completedCourses.includes(course.id)
                                  ? 'bg-green-500 text-white'
                                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                              }`}
                            >
                              {completedCourses.includes(course.id) ? '✓ Concluído' : 'Marcar Concluído'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* CURSOS PAGOS */}
                <h4 className="text-xl font-bold text-candidate-primary mb-4">💳 CURSOS PAGOS CERTIFICADOS (Peso: 10-25%)</h4>
                <div className="space-y-4">
                  {getCoursesForCompetency(selectedCompetency)
                    .filter((course: any) => careerPath.courses.paid.includes(course))
                    .map((course: any) => (
                      <div key={course.id} className="card border-2 border-candidate-primary">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h5 className="text-lg font-bold text-gray-900">{course.title}</h5>
                            <p className="text-sm text-gray-600">{course.institution}</p>
                            <p className="text-sm text-gray-600 mt-1">⏱️ {course.duration}</p>
                            <p className="text-sm text-gray-600">✓ Com certificado</p>
                            <p className="text-lg font-bold text-candidate-primary mt-2">
                              {typeof course.value === 'number' ? `R$ ${course.value}` : course.value}
                            </p>
                            <p className="text-xs text-candidate-primary font-semibold mt-2">Peso: {course.weight}%</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleRedirectToCourse(course.url)}
                              className="px-4 py-2 bg-candidate-primary text-white rounded-lg hover:bg-opacity-90 whitespace-nowrap"
                            >
                              Ver Curso
                            </button>
                            <button
                              onClick={() => handleCompleteCourse(course.id)}
                              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                                completedCourses.includes(course.id)
                                  ? 'bg-green-500 text-white'
                                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                              }`}
                            >
                              {completedCourses.includes(course.id) ? '✓ Concluído' : 'Marcar Concluído'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { careerPath } from '../../data/career-path'

export default function TrilhaSucessoPage() {
  const [selectedCompetency, setSelectedCompetency] = useState<string | null>(null)
  const [showCourses, setShowCourses] = useState(false)
  const [completedCompetencies, setCompletedCompetencies] = useState<string[]>([])

  const currentProgress = (completedCompetencies.length / careerPath.competencies.length) * 100

  const handleCompetencyClick = (competency: string) => {
    setSelectedCompetency(competency)
    setShowCourses(true)
  }

  const handleCompleteCourse = (competency: string) => {
    if (!completedCompetencies.includes(competency)) {
      setCompletedCompetencies([...completedCompetencies, competency])
    }
  }

  const getCoursesForCompetency = (competency: string) => {
    const allCourses = [...careerPath.courses.free, ...careerPath.courses.paid] as any[]
    return allCourses.filter(course => course.competency === competency)
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

        {/* BLOCO 1: SUA POSIÇÃO ATUAL */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card border-4 border-candidate-primary">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-candidate-primary mb-4">📍 SUA POSIÇÃO ATUAL</h2>
              <div className="text-4xl font-bold text-gray-900 mb-2">{careerPath.currentPosition.title}</div>
              <div className="text-3xl font-bold text-candidate-primary mb-4">
                R$ {careerPath.currentPosition.salary.toLocaleString('pt-BR')}
              </div>
              <p className="text-gray-600">{careerPath.currentPosition.description}</p>
            </div>
          </div>

          {/* BLOCO 2: ONDE VOCÊ PODE CHEGAR */}
          <div className="card border-4 border-green-500">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">🎯 ONDE VOCÊ PODE CHEGAR</h2>
              <div className="text-4xl font-bold text-gray-900 mb-2">{careerPath.targetPosition.title}</div>
              <div className="text-3xl font-bold text-green-600 mb-4">
                R$ {careerPath.targetPosition.salary.toLocaleString('pt-BR')}+
              </div>
              <p className="text-gray-600">{careerPath.targetPosition.description}</p>
            </div>
          </div>
        </div>

        {/* BLOCO 3: MAPA DE EVOLUÇÃO */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">📈 MAPA DE EVOLUÇÃO</h2>
          <div className="space-y-4">
            {careerPath.evolutionPath.map((position, index) => (
              <div key={position.id} className="card">
                <div className="flex items-center gap-6">
                  <div className="text-4xl font-bold text-candidate-primary w-12 text-center">{index + 1}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{position.title}</h3>
                    <p className="text-gray-600 mb-2">{position.description}</p>
                    <div className="text-lg font-semibold text-candidate-primary mb-2">
                      R$ {position.salary.toLocaleString('pt-BR')}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {position.competencies.map((comp) => (
                        <span
                          key={comp}
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            completedCompetencies.includes(comp)
                              ? 'bg-green-200 text-green-800'
                              : 'bg-gray-200 text-gray-800'
                          }`}
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

        {/* BLOCO 4: COMPETÊNCIAS NECESSÁRIAS */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">💡 COMPETÊNCIAS NECESSÁRIAS</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {careerPath.competencies.map((competency) => (
              <button
                key={competency}
                onClick={() => handleCompetencyClick(competency)}
                className={`card text-center py-6 cursor-pointer transition transform hover:scale-105 ${
                  completedCompetencies.includes(competency)
                    ? 'border-4 border-green-500 bg-green-50'
                    : 'border-2 border-candidate-primary hover:border-4'
                }`}
              >
                <div className="text-3xl mb-2">{completedCompetencies.includes(competency) ? '✅' : '📚'}</div>
                <div className="font-bold text-gray-900">{competency}</div>
                <div className="text-sm text-gray-600 mt-2">
                  {completedCompetencies.includes(competency) ? 'Concluída' : 'Clique para ver cursos'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* BARRA DE PROGRESSO */}
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
            Você completou <strong>{completedCompetencies.length}</strong> de{' '}
            <strong>{careerPath.competencies.length}</strong> competências necessárias.
          </p>
        </div>

        {/* MODAL DE CURSOS */}
        {showCourses && selectedCompetency && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
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
                <h4 className="text-xl font-bold text-green-600 mb-4">🎁 CURSOS GRATUITOS</h4>
                <div className="space-y-4 mb-8">
                  {getCoursesForCompetency(selectedCompetency)
                    .filter((course) => careerPath.courses.free.includes(course))
                    .map((course) => (
                      <div key={course.id} className="card border-2 border-green-200">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="text-lg font-bold text-gray-900">{course.title}</h5>
                            <p className="text-sm text-gray-600">{course.institution}</p>
                          </div>
                          <button
                            onClick={() => handleCompleteCourse(selectedCompetency)}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                          >
                            {completedCompetencies.includes(selectedCompetency) ? '✓ Concluído' : 'Marcar Concluído'}
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">⏱️ {course.duration}</p>
                        <p className="text-sm text-gray-600">
                          {course.certificate ? '✓ Com certificado' : '✗ Sem certificado'}
                        </p>
                      </div>
                    ))}
                </div>

                {/* CURSOS PAGOS */}
                <h4 className="text-xl font-bold text-candidate-primary mb-4">💳 CURSOS PAGOS CERTIFICADOS</h4>
                <div className="space-y-4">
                  {getCoursesForCompetency(selectedCompetency)
                    .filter((course) => careerPath.courses.paid.includes(course))
                    .map((course) => (
                      <div key={course.id} className="card border-2 border-candidate-primary">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="text-lg font-bold text-gray-900">{course.title}</h5>
                            <p className="text-sm text-gray-600">{course.institution}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-candidate-primary">
                              {typeof course.value === 'number' ? `R$ ${course.value}` : course.value}
                            </p>
                            <button className="mt-2 px-4 py-2 bg-candidate-primary text-white rounded-lg hover:bg-opacity-90">
                              Ver Curso
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">⏱️ {course.duration}</p>
                        <p className="text-sm text-gray-600">✓ Com certificado</p>
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

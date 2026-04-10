'use client'

import { useState } from 'react'
import Link from 'next/link'
import { careerPath } from '../../data/career-path'

interface CompletedCourse {
  id: number
  certificateUrl?: string
  completedAt?: string
}

export default function JornadaSucessoPage() {
  const [selectedCompetency, setSelectedCompetency] = useState<string | null>(null)
  const [showCourseModal, setShowCourseModal] = useState(false)
  const [completedCourses, setCompletedCourses] = useState<CompletedCourse[]>([])
  const [uploadingCourseId, setUploadingCourseId] = useState<number | null>(null)

  // Calcular progresso baseado em cursos concluídos
  const totalCompetencies = careerPath.currentPosition.competencies.length
  const completedCompetencies = new Set(
    completedCourses
      .map(cc => {
        const course = [...careerPath.courses.free, ...careerPath.courses.paid].find(c => c.id === cc.id)
        return course?.competency
      })
      .filter(Boolean)
  ).size
  const progressPercentage = Math.round((completedCompetencies / totalCompetencies) * 100)

  const handleCompetencyClick = (competency: string) => {
    setSelectedCompetency(competency)
    setShowCourseModal(true)
  }

  const getCoursesForCompetency = (competency: string) => {
    const allCourses = [...careerPath.courses.free, ...careerPath.courses.paid] as any[]
    return allCourses.filter(course => course.competency === competency)
  }

  const handleCertificateUpload = (courseId: number) => {
    // Simular upload de certificado
    setUploadingCourseId(courseId)
    setTimeout(() => {
      if (!completedCourses.find(cc => cc.id === courseId)) {
        setCompletedCourses([
          ...completedCourses,
          {
            id: courseId,
            certificateUrl: `certificate-${courseId}.pdf`,
            completedAt: new Date().toLocaleDateString('pt-BR')
          }
        ])
      }
      setUploadingCourseId(null)
    }, 1500)
  }

  const handleRedirectToCourse = (url: string) => {
    window.open(url, '_blank')
  }

  const isCourseCompleted = (courseId: number) => {
    return completedCourses.some(cc => cc.id === courseId)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/candidato/dashboard" className="text-orange-600 font-bold text-lg hover:text-orange-700">
            ← Voltar ao Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">🚀 Jornada de Sucesso</h1>
          <div className="w-32"></div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* SEÇÃO 1: POSIÇÃO ATUAL */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-8 border-orange-500">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {careerPath.currentPosition.title}
                  </h2>
                </div>
                <p className="text-gray-600 ml-13">{careerPath.currentPosition.description}</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-orange-600">
                  R$ {careerPath.currentPosition.salary.toLocaleString('pt-BR')}
                </div>
                <div className="text-sm text-green-600 font-semibold mt-1">Concluído</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Progresso</span>
                <span className="text-sm font-bold text-orange-600">100%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-full w-full"></div>
              </div>
            </div>

            {/* Competências Necessárias */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-3">Competências Necessárias:</h3>
              <div className="flex flex-wrap gap-2">
                {careerPath.currentPosition.competencies.map((competency) => (
                  <button
                    key={competency}
                    onClick={() => handleCompetencyClick(competency)}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold hover:bg-blue-200 transition cursor-pointer border-2 border-blue-300"
                  >
                    {competency}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SEÇÃO 2: PRÓXIMOS PASSOS PARA AVANÇAR */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 Próximos Passos para Avançar:</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Fundamentos de Vendas */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-orange-500">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Fundamentos de Vendas</h3>
              <p className="text-sm text-gray-600 mb-4">Aprenda as bases da venda consultiva</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm">✓</div>
                <span className="text-green-600 font-semibold">Concluído</span>
              </div>
            </div>

            {/* Certificação SDR */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-orange-500">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Certificação SDR</h3>
              <p className="text-sm text-gray-600 mb-4">Valide suas habilidades como SDR</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm">✓</div>
                <span className="text-green-600 font-semibold">Concluído</span>
              </div>
            </div>

            {/* 6 meses de experiência */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-orange-500">
              <div className="text-3xl mb-3">💼</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">6 meses de experiência</h3>
              <p className="text-sm text-gray-600 mb-4">Ganhe experiência prática no mercado</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm">✓</div>
                <span className="text-green-600 font-semibold">Concluído</span>
              </div>
            </div>
          </div>
        </div>

        {/* SEÇÃO 3: MAPA DE EVOLUÇÃO DE CARREIRA */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📈 Seu Caminho para Crescer Profissionalmente</h2>
          <p className="text-gray-600 mb-8">
            Trilhe este caminho de aprendizado e qualificação para evoluir de <strong>SDR Junior (R$ 3.500)</strong> até <strong>Diretor Comercial (R$ 25.000+)</strong>. 
            Estude enquanto aguarda uma vaga ou oportunidade melhor!
          </p>

          <div className="space-y-4">
            {careerPath.evolutionPath.map((position, index) => (
              <div
                key={position.id}
                className={`bg-white rounded-lg shadow-md p-6 border-l-8 ${
                  index === 0 ? 'border-green-500 bg-green-50' : 'border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold text-orange-600">{index + 1}</span>
                      <h3 className="text-xl font-bold text-gray-900">{position.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-11 mb-3">{position.description}</p>
                    <div className="flex flex-wrap gap-2 ml-11">
                      {position.competencies.map((comp) => (
                        <span key={comp} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-semibold">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right ml-6">
                    <div className="text-3xl font-bold text-orange-600">
                      R$ {position.salary.toLocaleString('pt-BR')}
                    </div>
                    {index === 0 && <div className="text-xs text-green-600 font-semibold mt-2">Você está aqui</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SEÇÃO 4: CURSOS RECOMENDADOS */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎓 Cursos Recomendados para Sua Jornada</h2>
          
          {/* Competências com progresso */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Progresso de Competências</h3>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Progresso Geral</span>
                <span className="text-sm font-bold text-orange-600">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-orange-400 to-orange-600 h-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                {completedCompetencies} de {totalCompetencies} competências desenvolvidas
              </p>
            </div>
          </div>

          {/* Cursos por competência */}
          <div className="space-y-6">
            {careerPath.competencies.map((competency) => (
              <div key={competency} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  📚 {competency}
                  {completedCourses.some(cc => {
                    const course = [...careerPath.courses.free, ...careerPath.courses.paid].find(c => c.id === cc.id)
                    return course?.competency === competency
                  }) && <span className="text-green-600 ml-2">✓ Em Desenvolvimento</span>}
                </h3>

                <div className="space-y-3">
                  {getCoursesForCompetency(competency).map((course: any) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">{course.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{course.institution}</p>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-gray-600">⏱️ {course.duration}</span>
                            {course.certificate && <span className="text-green-600">✓ Certificado</span>}
                            <span className="font-bold text-orange-600">
                              {typeof course.value === 'number' ? `R$ ${course.value}` : course.value}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleRedirectToCourse(course.url)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold text-sm whitespace-nowrap"
                          >
                            Acessar
                          </button>
                          {isCourseCompleted(course.id) ? (
                            <button
                              disabled
                              className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold text-sm whitespace-nowrap cursor-not-allowed"
                            >
                              ✓ Concluído
                            </button>
                          ) : (
                            <button
                              onClick={() => handleCertificateUpload(course.id)}
                              disabled={uploadingCourseId === course.id}
                              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-semibold text-sm whitespace-nowrap disabled:opacity-50"
                            >
                              {uploadingCourseId === course.id ? '⏳ Processando...' : '📤 Upload Certificado'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SEÇÃO 5: PRÓXIMOS PASSOS RECOMENDADOS */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">💼 Próximos Passos Recomendados</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Explorar Oportunidades */}
            <Link href="/candidato/opportunities" className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow-lg p-8 border-2 border-orange-300 hover:shadow-xl transition cursor-pointer">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Explorar Oportunidades</h3>
              <p className="text-gray-700 mb-4">
                Ganhe comissões representando produtos e serviços de empresas parceiras
              </p>
              <div className="text-orange-600 font-bold">Clique para explorar →</div>
            </Link>

            {/* Candidatar-se a Vagas */}
            <Link href="/candidato/jobs" className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-lg p-8 border-2 border-blue-300 hover:shadow-xl transition cursor-pointer">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Candidatar-se a Vagas</h3>
              <p className="text-gray-700 mb-4">
                Encontre vagas alinhadas com sua jornada de sucesso e crescimento profissional
              </p>
              <div className="text-blue-600 font-bold">Clique para explorar →</div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

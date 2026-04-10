'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function CandidateLearningPage() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Fundamentos de Vendas B2B',
      partner: 'Sales Academy',
      category: 'Vendas',
      type: 'gratuito',
      duration: '4 semanas',
      level: 'Iniciante',
      progress: 100,
      certificate: true,
      certificateDate: '2024-01-15',
      image: '📚',
    },
    {
      id: 2,
      title: 'Técnicas Avançadas de Negociação',
      partner: 'EdTech Solutions',
      category: 'Negociação',
      type: 'pago',
      price: 'R$ 197',
      duration: '6 semanas',
      level: 'Intermediário',
      progress: 75,
      certificate: false,
      image: '🎯',
    },
    {
      id: 3,
      title: 'CRM e Gestão de Leads',
      partner: 'Tech Academy',
      category: 'Ferramentas',
      type: 'gratuito',
      duration: '3 semanas',
      level: 'Intermediário',
      progress: 50,
      certificate: false,
      image: '💻',
    },
    {
      id: 4,
      title: 'Liderança em Vendas',
      partner: 'Business Pro',
      category: 'Liderança',
      type: 'pago',
      price: 'R$ 297',
      duration: '8 semanas',
      level: 'Avançado',
      progress: 0,
      certificate: false,
      image: '👥',
    },
    {
      id: 5,
      title: 'Inbound Sales Methodology',
      partner: 'Sales Academy',
      category: 'Vendas',
      type: 'pago',
      price: 'R$ 247',
      duration: '5 semanas',
      level: 'Intermediário',
      progress: 25,
      certificate: false,
      image: '📊',
    },
  ])

  const [certificates, setCertificates] = useState([
    {
      id: 1,
      title: 'Fundamentos de Vendas B2B',
      partner: 'Sales Academy',
      date: '2024-01-15',
      credentialId: 'SC-2024-001',
      image: '🏆',
    },
  ])

  const [selectedTab, setSelectedTab] = useState('todos')
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)

  const completedCourses = courses.filter(c => c.progress === 100).length
  const inProgressCourses = courses.filter(c => c.progress > 0 && c.progress < 100).length
  const totalHours = courses.reduce((acc, c) => acc + (c.progress / 100 * 20), 0)

  const filteredCourses = selectedTab === 'todos' 
    ? courses 
    : selectedTab === 'concluidos'
    ? courses.filter(c => c.progress === 100)
    : selectedTab === 'em-progresso'
    ? courses.filter(c => c.progress > 0 && c.progress < 100)
    : courses.filter(c => c.progress === 0)

  return (
    <main className="min-h-screen bg-gradient-to-br from-candidate-light to-slate-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b-4 border-candidate-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-candidate-primary">ScaleConnect</div>
          <Link href="/candidato/dashboard" className="text-candidate-primary font-semibold hover:underline">
            ← Voltar ao Dashboard
          </Link>
        </div>
      </nav>

      {/* Sidebar + Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-screen p-6">
          <nav className="space-y-4">
            <Link href="/candidato/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📊 Dashboard
            </Link>
            <Link href="/candidato/jobs" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
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
            <Link href="/candidato/learning" className="block px-4 py-2 bg-candidate-primary text-white rounded-lg font-semibold">
              📚 Aprendizado
            </Link>
            <Link href="/candidato/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              👤 Perfil
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">📚 Painel de Aprendizado</h1>
              <p className="text-gray-600">Desenvolva suas habilidades com cursos de parceiros educacionais e conquiste certificados</p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="card bg-white">
                <p className="text-gray-600 mb-2">📚 Total de Cursos</p>
                <p className="text-3xl font-bold text-candidate-primary">{courses.length}</p>
                <p className="text-sm text-gray-600 mt-2">Disponíveis na plataforma</p>
              </div>
              <div className="card bg-white">
                <p className="text-gray-600 mb-2">✅ Concluídos</p>
                <p className="text-3xl font-bold text-green-600">{completedCourses}</p>
                <p className="text-sm text-gray-600 mt-2">{certificates.length} certificados</p>
              </div>
              <div className="card bg-white">
                <p className="text-gray-600 mb-2">⏳ Em Progresso</p>
                <p className="text-3xl font-bold text-blue-600">{inProgressCourses}</p>
                <p className="text-sm text-gray-600 mt-2">Cursos em andamento</p>
              </div>
              <div className="card bg-white">
                <p className="text-gray-600 mb-2">⏱️ Horas Estudadas</p>
                <p className="text-3xl font-bold text-purple-600">{Math.round(totalHours)}</p>
                <p className="text-sm text-gray-600 mt-2">Horas de aprendizado</p>
              </div>
            </div>

            {/* Certificados Conquistados */}
            {certificates.length > 0 && (
              <div className="card bg-white mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">🏆 Certificados Conquistados</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="p-4 border-2 border-candidate-secondary rounded-lg bg-gradient-to-br from-candidate-light to-white">
                      <div className="text-4xl mb-3">{cert.image}</div>
                      <p className="font-bold text-gray-900 mb-2">{cert.title}</p>
                      <p className="text-sm text-gray-600 mb-2">{cert.partner}</p>
                      <p className="text-xs text-candidate-primary font-semibold mb-3">ID: {cert.credentialId}</p>
                      <p className="text-xs text-gray-600">Conquistado em {new Date(cert.date).toLocaleDateString('pt-BR')}</p>
                      <button className="mt-3 w-full px-3 py-2 bg-candidate-secondary text-white rounded-lg font-semibold hover:bg-opacity-90 text-sm">
                        Ver Certificado
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Curva de Aprendizado */}
            <div className="card bg-white mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📈 Sua Curva de Aprendizado</h2>
              <div className="space-y-4">
                {[
                  { category: 'Vendas', progress: 85, icon: '💼' },
                  { category: 'Negociação', progress: 60, icon: '🤝' },
                  { category: 'Ferramentas', progress: 50, icon: '💻' },
                  { category: 'Liderança', progress: 30, icon: '👥' },
                ].map((item) => (
                  <div key={item.category}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">{item.icon} {item.category}</span>
                      <span className="text-candidate-primary font-bold">{item.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-candidate-primary to-candidate-secondary h-3 rounded-full transition-all"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-4 mb-8 overflow-x-auto">
              <button
                onClick={() => setSelectedTab('todos')}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                  selectedTab === 'todos'
                    ? 'bg-candidate-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Todos ({courses.length})
              </button>
              <button
                onClick={() => setSelectedTab('concluidos')}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                  selectedTab === 'concluidos'
                    ? 'bg-candidate-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Concluídos ({completedCourses})
              </button>
              <button
                onClick={() => setSelectedTab('em-progresso')}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                  selectedTab === 'em-progresso'
                    ? 'bg-candidate-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Em Progresso ({inProgressCourses})
              </button>
              <button
                onClick={() => setSelectedTab('nao-iniciados')}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                  selectedTab === 'nao-iniciados'
                    ? 'bg-candidate-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Não Iniciados ({courses.filter(c => c.progress === 0).length})
              </button>
            </div>

            {/* Courses Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredCourses.map((course) => (
                <div 
                  key={course.id}
                  className="card bg-white border-l-4 border-candidate-secondary hover:shadow-lg transition cursor-pointer"
                  onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-3">
                      <div className="text-4xl">{course.image}</div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                        <p className="text-candidate-primary font-semibold text-sm">{course.partner}</p>
                      </div>
                    </div>
                    {course.certificate && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                        🏆 Certificado
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b">
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-1">Duração</p>
                      <p className="font-semibold text-gray-900">{course.duration}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-1">Nível</p>
                      <p className="font-semibold text-gray-900">{course.level}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-1">Tipo</p>
                      <p className={`font-semibold ${course.type === 'gratuito' ? 'text-green-600' : 'text-blue-600'}`}>
                        {course.type === 'gratuito' ? 'Grátis' : course.price}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-900">Progresso</span>
                      <span className="text-sm font-bold text-candidate-primary">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-candidate-primary to-candidate-secondary h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  {selectedCourse === course.id && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold text-gray-900 mb-3">📖 Sobre o Curso</h4>
                      <p className="text-sm text-gray-700 mb-4">
                        Este curso oferece uma formação completa em {course.title.toLowerCase()}. Desenvolvido por especialistas do mercado, com exercícios práticos e casos reais.
                      </p>
                      <div className="space-y-2 text-sm mb-4">
                        <p><span className="font-semibold">📚 Módulos:</span> 8 módulos</p>
                        <p><span className="font-semibold">📝 Aulas:</span> 32 aulas em vídeo</p>
                        <p><span className="font-semibold">🎯 Projetos:</span> 4 projetos práticos</p>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <button className={`w-full mt-4 px-4 py-2 rounded-lg font-semibold transition ${
                    course.progress === 100
                      ? 'bg-gray-200 text-gray-700 cursor-not-allowed'
                      : course.progress > 0
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-candidate-secondary text-white hover:bg-opacity-90'
                  }`}>
                    {course.progress === 100
                      ? '✓ Concluído'
                      : course.progress > 0
                      ? `Continuar (${course.progress}%)`
                      : 'Começar Agora'}
                  </button>
                </div>
              ))}
            </div>

            {/* Biblioteca de Recursos */}
            <div className="card bg-white mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📖 Biblioteca de Recursos</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-candidate-secondary transition">
                  <div className="text-3xl mb-3">📕</div>
                  <p className="font-semibold text-gray-900 mb-2">Livros Recomendados</p>
                  <p className="text-sm text-gray-600 mb-3">12 livros sobre vendas e negociação</p>
                  <button className="w-full px-3 py-2 bg-candidate-primary text-white rounded-lg font-semibold hover:bg-opacity-90 text-sm">
                    Explorar
                  </button>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-candidate-secondary transition">
                  <div className="text-3xl mb-3">📰</div>
                  <p className="font-semibold text-gray-900 mb-2">Artigos e Blogs</p>
                  <p className="text-sm text-gray-600 mb-3">45 artigos sobre tendências de vendas</p>
                  <button className="w-full px-3 py-2 bg-candidate-primary text-white rounded-lg font-semibold hover:bg-opacity-90 text-sm">
                    Explorar
                  </button>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-candidate-secondary transition">
                  <div className="text-3xl mb-3">🎥</div>
                  <p className="font-semibold text-gray-900 mb-2">Webinars e Palestras</p>
                  <p className="text-sm text-gray-600 mb-3">28 webinars com especialistas</p>
                  <button className="w-full px-3 py-2 bg-candidate-primary text-white rounded-lg font-semibold hover:bg-opacity-90 text-sm">
                    Explorar
                  </button>
                </div>
              </div>
            </div>

            {/* Parceiros Educacionais */}
            <div className="card bg-white mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🤝 Parceiros Educacionais</h2>
              <p className="text-gray-600 mb-6">Confira os parceiros que oferecem cursos e treinamentos na plataforma</p>
              <div className="grid md:grid-cols-4 gap-4">
                {['Sales Academy', 'EdTech Solutions', 'Tech Academy', 'Business Pro'].map((partner) => (
                  <div key={partner} className="p-4 border border-gray-200 rounded-lg hover:border-candidate-secondary transition text-center">
                    <div className="text-4xl mb-3">🏢</div>
                    <p className="font-semibold text-gray-900 mb-2">{partner}</p>
                    <button className="w-full px-3 py-2 bg-candidate-primary text-white rounded-lg font-semibold hover:bg-opacity-90 text-sm">
                      Ver Cursos
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

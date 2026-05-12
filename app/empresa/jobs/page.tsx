'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { careerPositions } from '@/app/data/career-positions'

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
  updatedAt: string
}

export default function CompanyJobsPage() {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([])
  const [allCompetencies, setAllCompetencies] = useState<Competency[]>([])
  const [allBenefits, setAllBenefits] = useState<Benefit[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCompetencies, setSelectedCompetencies] = useState<number[]>([])
  const [selectedBenefits, setSelectedBenefits] = useState<number[]>([])
  const [showCompetenciesModal, setShowCompetenciesModal] = useState(false)
  const [showBenefitsModal, setShowBenefitsModal] = useState(false)
  const [formError, setFormError] = useState('')
  const [jobTitleSearch, setJobTitleSearch] = useState('')
  const [jobTitleSuggestions, setJobTitleSuggestions] = useState<string[]>([])

  const [formData, setFormData] = useState({
    title: '',
    jobTitle: '',
    level: 'PLENO',
    salaryMin: '',
    salaryMax: '',
    state: '',
    city: '',
    description: '',
    employmentType: 'CLT',
    workMode: 'PRESENCIAL',
  })

  const [stateSearch, setStateSearch] = useState('')
  const [citySearch, setCitySearch] = useState('')
  const [stateSuggestions, setStateSuggestions] = useState<string[]>([])
  const [citySuggestions, setCitySuggestions] = useState<string[]>([])

  // Estados brasileiros
  const brazilianStates = [
    'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal',
    'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul',
    'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí',
    'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia',
    'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
  ]

  // Cidades principais por estado (exemplo simplificado)
  const citiesByState: { [key: string]: string[] } = {
    'São Paulo': ['São Paulo', 'Campinas', 'Santos', 'Ribeirão Preto', 'Sorocaba'],
    'Rio de Janeiro': ['Rio de Janeiro', 'Niterói', 'Duque de Caxias', 'São Gonçalo'],
    'Minas Gerais': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora'],
    'Bahia': ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari'],
    'Ceará': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú'],
    'Pernambuco': ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru'],
    'Paraná': ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa'],
    'Rio Grande do Sul': ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Santa Maria'],
    'Santa Catarina': ['Florianópolis', 'Blumenau', 'Joinville', 'Chapecó'],
    'Distrito Federal': ['Brasília'],
    'Goiás': ['Goiânia', 'Anápolis', 'Aparecida de Goiânia'],
    'Mato Grosso do Sul': ['Campo Grande', 'Dourados', 'Três Lagoas'],
    'Mato Grosso': ['Cuiabá', 'Várzea Grande', 'Rondonópolis'],
    'Espírito Santo': ['Vitória', 'Vila Velha', 'Cariacica', 'Linhares'],
    'Amazonas': ['Manaus', 'Itacoatiara', 'Parintins'],
    'Pará': ['Belém', 'Ananindeua', 'Santarém', 'Marabá'],
    'Maranhão': ['São Luís', 'Imperatriz', 'Caxias', 'Timon'],
    'Piauí': ['Teresina', 'Parnaíba', 'Picos'],
    'Paraíba': ['João Pessoa', 'Campina Grande', 'Patos'],
    'Rio Grande do Norte': ['Natal', 'Mossoró', 'Parnamirim'],
    'Alagoas': ['Maceió', 'Rio Largo', 'Arapiraca'],
    'Sergipe': ['Aracaju', 'Nossa Senhora do Socorro'],
    'Rondônia': ['Porto Velho', 'Ariquemes', 'Ji-Paraná'],
    'Acre': ['Rio Branco', 'Cruzeiro do Sul'],
    'Amapá': ['Macapá', 'Santana'],
    'Roraima': ['Boa Vista', 'Rorainópolis'],
    'Tocantins': ['Palmas', 'Araguaína', 'Gurupi']
  }

  const [selectedJob, setSelectedJob] = useState<number | null>(null)

  // Buscar vagas, competências e benefícios ao carregar a página
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('scaleconnect_token')
        if (!token) {
          router.push('/login')
          return
        }

        // Buscar vagas
        const jobsResponse = await fetch('/api/jobs', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })

        if (jobsResponse.ok) {
          const jobsData = await jobsResponse.json()
          setJobs(jobsData)
        }

        // Buscar competências
        const competenciesResponse = await fetch('/api/competencies')
        if (competenciesResponse.ok) {
          const competenciesData = await competenciesResponse.json()
          setAllCompetencies(competenciesData)
        }

        // Buscar benefícios
        const benefitsResponse = await fetch('/api/benefits')
        if (benefitsResponse.ok) {
          const benefitsData = await benefitsResponse.json()
          setAllBenefits(benefitsData)
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  // Atualizar sugestões de cargo
  useEffect(() => {
    if (jobTitleSearch.trim()) {
      const filtered = careerPositions
        .map(p => p.title)
        .filter(title => title.toLowerCase().includes(jobTitleSearch.toLowerCase()))
      setJobTitleSuggestions(filtered)
    } else {
      setJobTitleSuggestions([])
    }
  }, [jobTitleSearch])

  // Atualizar sugestões de estado
  useEffect(() => {
    if (stateSearch.trim()) {
      const filtered = brazilianStates.filter(state =>
        state.toLowerCase().includes(stateSearch.toLowerCase())
      )
      setStateSuggestions(filtered)
    } else {
      setStateSuggestions([])
    }
  }, [stateSearch])

  // Atualizar sugestões de cidade
  useEffect(() => {
    if (formData.state && citySearch.trim()) {
      const cities = citiesByState[formData.state] || []
      const filtered = cities.filter(city =>
        city.toLowerCase().includes(citySearch.toLowerCase())
      )
      setCitySuggestions(filtered)
    } else {
      setCitySuggestions([])
    }
  }, [citySearch, formData.state])

  const handleSubmitJob = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    // Validar campos obrigatórios
    if (!formData.title || !formData.jobTitle || !formData.description || !formData.state || !formData.city || !formData.employmentType || !formData.workMode) {
      setFormError('Todos os campos obrigatórios devem ser preenchidos')
      return
    }

    // Validar mínimo de competências
    if (selectedCompetencies.length < 4) {
      setFormError('Mínimo de 4 competências é obrigatório')
      return
    }

    try {
      const token = localStorage.getItem('scaleconnect_token')
      if (!token) {
        router.push('/login')
        return
      }

      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          jobTitle: formData.jobTitle,
          level: formData.level,
          salaryMin: formData.salaryMin,
          salaryMax: formData.salaryMax,
          state: formData.state,
          city: formData.city,
          description: formData.description,
          employmentType: formData.employmentType,
          workMode: formData.workMode,
          competenciesIds: selectedCompetencies,
          benefitsIds: selectedBenefits,
        }),
      })

      if (response.ok) {
        // Limpar formulário
        setFormData({
          title: '',
          jobTitle: '',
          level: 'PLENO',
          salaryMin: '',
          salaryMax: '',
          state: '',
          city: '',
          description: '',
          employmentType: 'CLT',
          workMode: 'PRESENCIAL',
        })
        setJobTitleSearch('')
        setStateSearch('')
        setCitySearch('')
        setSelectedCompetencies([])
        setSelectedBenefits([])
        setShowForm(false)

        // Recarregar vagas
        const jobsResponse = await fetch('/api/jobs', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        if (jobsResponse.ok) {
          const jobsData = await jobsResponse.json()
          setJobs(jobsData)
        }
      } else {
        const error = await response.json()
        setFormError(error.message || 'Erro ao criar vaga')
      }
    } catch (error) {
      setFormError('Erro ao conectar ao servidor')
    }
  }

  const handleDeleteJob = async (jobId: number) => {
    if (!confirm('Tem certeza que deseja deletar esta vaga?')) return

    try {
      const token = localStorage.getItem('scaleconnect_token')
      if (!token) {
        router.push('/login')
        return
      }

      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setJobs(jobs.filter(j => j.id !== jobId))
      } else {
        alert('Erro ao deletar vaga')
      }
    } catch (error) {
      alert('Erro ao deletar vaga')
    }
  }

  const handleCloseJob = async (jobId: number) => {
    try {
      const token = localStorage.getItem('scaleconnect_token')
      if (!token) {
        router.push('/login')
        return
      }

      const job = jobs.find(j => j.id === jobId)
      if (!job) return

      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: job.status === 'OPEN' ? 'CLOSED' : 'OPEN',
        }),
      })

      if (response.ok) {
        setJobs(jobs.map(j => j.id === jobId ? { ...j, status: job.status === 'OPEN' ? 'CLOSED' : 'OPEN' } : j))
      }
    } catch (error) {
      alert('Erro ao atualizar vaga')
    }
  }

  const toggleCompetency = (competencyId: number) => {
    setSelectedCompetencies(prev =>
      prev.includes(competencyId)
        ? prev.filter(id => id !== competencyId)
        : [...prev, competencyId]
    )
  }

  const toggleBenefit = (benefitId: number) => {
    setSelectedBenefits(prev =>
      prev.includes(benefitId)
        ? prev.filter(id => id !== benefitId)
        : [...prev, benefitId]
    )
  }

  const openCompetenciesModal = () => {
    setShowCompetenciesModal(true)
  }

  const closeCompetenciesModal = () => {
    setShowCompetenciesModal(false)
  }

  const openBenefitsModal = () => {
    setShowBenefitsModal(true)
  }

  const closeBenefitsModal = () => {
    setShowBenefitsModal(false)
  }

  if (loading) {
    return <div className="p-8">Carregando...</div>
  }

  const totalVagas = jobs.length
  const vagasAbertas = jobs.filter(j => j.status === 'OPEN').length
  const [totalCandidaturas, setTotalCandidaturas] = useState(0)

  // Buscar total de candidaturas reais
  useEffect(() => {
    const fetchApplicationsCount = async () => {
      try {
        const token = localStorage.getItem('scaleconnect_token')
        if (!token) return

        const response = await fetch('/api/company/applications-count', {
          headers: { Authorization: `Bearer ${token}` }
        })

        if (response.ok) {
          const data = await response.json()
          setTotalCandidaturas(data.totalApplications || 0)
        }
      } catch (error) {
        console.error('Erro ao buscar candidaturas:', error)
      }
    }

    fetchApplicationsCount()
  }, [jobs])

  const displayTotalCandidaturas = totalCandidaturas

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">📋 Gerenciar Vagas</h1>
            <p className="text-gray-600">Publique e gerencie as vagas da sua empresa</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            + Publicar Vaga
          </button>
        </div>

        {/* Cards de resumo */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-600 text-sm">📋 Total de Vagas</div>
            <div className="text-3xl font-bold text-gray-900">{totalVagas}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-600 text-sm">✅ Vagas Abertas</div>
            <div className="text-3xl font-bold text-green-600">{vagasAbertas}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-600 text-sm">📨 Total de Candidaturas</div>
            <div className="text-3xl font-bold text-blue-600">{displayTotalCandidaturas}</div>
          </div>
        </div>

        {/* Formulário de criação de vaga */}
        {showForm && (
          <div className="bg-white p-8 rounded-lg shadow mb-8">
            <h2 className="text-2xl font-bold mb-6">Criar Nova Vaga</h2>

            {formError && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmitJob} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {/* Título da Vaga */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título da Vaga *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Gerente de Projetos"
                    required
                  />
                </div>

                {/* Cargo (Job Title) com Autocomplete */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cargo *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={jobTitleSearch || formData.jobTitle}
                      onChange={(e) => {
                        setJobTitleSearch(e.target.value)
                        setFormData({ ...formData, jobTitle: e.target.value })
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Digite ou selecione um cargo"
                      required
                      autoComplete="off"
                    />
                    {jobTitleSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {jobTitleSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, jobTitle: suggestion })
                              setJobTitleSearch(suggestion)
                              setJobTitleSuggestions([])
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-blue-50 border-b border-gray-200 last:border-b-0"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Nível */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nível *
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="JUNIOR">Júnior</option>
                    <option value="PLENO">Pleno</option>
                    <option value="SENIOR">Sênior</option>
                  </select>
                </div>

                {/* Tipo de Vínculo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Vínculo *
                  </label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="CLT">CLT</option>
                    <option value="PJ">PJ</option>
                    <option value="AUTONOMO">Autônomo</option>
                  </select>
                </div>

                {/* Modalidade */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Modalidade *
                  </label>
                  <select
                    value={formData.workMode}
                    onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="PRESENCIAL">Presencial</option>
                    <option value="HIBRIDA">Híbrida</option>
                    <option value="REMOTO">Remoto</option>
                  </select>
                </div>

                {/* Estado */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={stateSearch || formData.state}
                      onChange={(e) => {
                        setStateSearch(e.target.value)
                        setFormData({ ...formData, state: e.target.value, city: '' })
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Digite ou selecione um estado"
                      required
                      autoComplete="off"
                    />
                    {stateSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {stateSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, state: suggestion, city: '' })
                              setStateSearch(suggestion)
                              setStateSuggestions([])
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-blue-50 border-b border-gray-200 last:border-b-0"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Cidade */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cidade *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={citySearch || formData.city}
                      onChange={(e) => {
                        setCitySearch(e.target.value)
                        setFormData({ ...formData, city: e.target.value })
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Digite ou selecione uma cidade"
                      required
                      autoComplete="off"
                      disabled={!formData.state}
                    />
                    {citySuggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {citySuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, city: suggestion })
                              setCitySearch(suggestion)
                              setCitySuggestions([])
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-blue-50 border-b border-gray-200 last:border-b-0"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Salário Mínimo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salário Mínimo
                  </label>
                  <input
                    type="number"
                    value={formData.salaryMin}
                    onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: 3000"
                  />
                </div>

                {/* Salário Máximo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salário Máximo
                  </label>
                  <input
                    type="number"
                    value={formData.salaryMax}
                    onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: 5000"
                  />
                </div>
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição da Vaga *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Descreva a vaga, responsabilidades e requisitos"
                  rows={5}
                  required
                />
              </div>

              {/* Competências */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Competências Necessárias * (Mínimo 4)
                </label>
                <button
                  type="button"
                  onClick={openCompetenciesModal}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left hover:bg-gray-50"
                >
                  {selectedCompetencies.length > 0
                    ? `${selectedCompetencies.length} competência(s) selecionada(s)`
                    : 'Selecione as competências'}
                </button>

                {/* Modal de Competências */}
                {showCompetenciesModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
                      <h3 className="text-lg font-bold mb-4">Selecione as Competências</h3>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {allCompetencies.map(comp => (
                          <label key={comp.id} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedCompetencies.includes(comp.id)}
                              onChange={() => toggleCompetency(comp.id)}
                              className="mr-2"
                            />
                            {comp.nome}
                          </label>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={closeCompetenciesModal}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                      >
                        Confirmar
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Benefícios */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Benefícios Oferecidos
                </label>
                <button
                  type="button"
                  onClick={openBenefitsModal}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left hover:bg-gray-50"
                >
                  {selectedBenefits.length > 0
                    ? `${selectedBenefits.length} benefício(s) selecionado(s)`
                    : 'Selecione os benefícios'}
                </button>

                {/* Modal de Benefícios */}
                {showBenefitsModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
                      <h3 className="text-lg font-bold mb-4">Selecione os Benefícios</h3>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {allBenefits.map(benefit => (
                          <label key={benefit.id} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedBenefits.includes(benefit.id)}
                              onChange={() => toggleBenefit(benefit.id)}
                              className="mr-2"
                            />
                            <span>{benefit.icone} {benefit.nome}</span>
                          </label>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={closeBenefitsModal}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                      >
                        Confirmar
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Botões */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Publicar Vaga
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de vagas */}
        <div className="space-y-6">
          {jobs.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <p className="text-gray-600">Nenhuma vaga cadastrada ainda. Clique em "+ Publicar Vaga" para começar!</p>
            </div>
          ) : (
            jobs.map(job => (
              <div key={job.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-500">{job.jobTitle}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${job.status === 'OPEN' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {job.status === 'OPEN' ? 'Aberta' : 'Fechada'}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="font-semibold">Nível:</span> {job.level}
                  </div>
                  <div>
                    <span className="font-semibold">Vínculo:</span> {job.employmentType}
                  </div>
                  <div>
                    <span className="font-semibold">Modalidade:</span> {job.workMode}
                  </div>
                  <div>
                    <span className="font-semibold">Localização:</span> {job.location}
                  </div>
                  {job.salaryMin && job.salaryMax && (
                    <div>
                      <span className="font-semibold">Salário:</span> R$ {job.salaryMin.toLocaleString()} - R$ {job.salaryMax.toLocaleString()}
                    </div>
                  )}
                </div>

                {job.competencies && job.competencies.length > 0 && (
                  <div className="mb-4">
                    <span className="font-semibold text-sm">Competências:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {job.competencies.map(comp => (
                        <span key={comp.id} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                          {comp.nome}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {job.benefits && job.benefits.length > 0 && (
                  <div className="mb-4">
                    <span className="font-semibold text-sm">Benefícios:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {job.benefits.map(benefit => (
                        <span key={benefit.id} className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                          {benefit.icone} {benefit.nome}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => handleCloseJob(job.id)}
                    className={`flex-1 font-bold py-2 px-4 rounded-lg text-white ${job.status === 'OPEN' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}`}
                  >
                    {job.status === 'OPEN' ? '🔒 Fechar Vaga' : '✅ Reabrir Vaga'}
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    🗑️ Deletar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}

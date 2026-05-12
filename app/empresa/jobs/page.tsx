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

interface Candidate {
  id: number
  userId: number
  name: string
  email: string
  phone: string
  currentPosition: string
  currentCompany: string
  yearsOfExperience: number
  state: string
  city: string
  educationLevel: string
  aboutMe: string
  profilePhoto: string
  linkedinUrl: string
}

interface Application {
  applicationId: number
  status: string
  appliedAt: string
  candidate: Candidate
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
  const [totalCandidaturas, setTotalCandidaturas] = useState(0)
  const [showApplicationsModal, setShowApplicationsModal] = useState(false)
  const [selectedJobForApplications, setSelectedJobForApplications] = useState<number | null>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const [applicationsLoading, setApplicationsLoading] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [showCandidateModal, setShowCandidateModal] = useState(false)

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

  const handleViewApplications = async (jobId: number) => {
    try {
      setApplicationsLoading(true)
      const token = localStorage.getItem('scaleconnect_token')
      if (!token) return

      const response = await fetch(`/api/jobs/${jobId}/applications`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.ok) {
        const data = await response.json()
        setApplications(data.applications || [])
        setSelectedJobForApplications(jobId)
        setShowApplicationsModal(true)
      } else {
        alert('Erro ao buscar candidatos')
      }
    } catch (error) {
      console.error('Erro ao buscar candidatos:', error)
      alert('Erro ao buscar candidatos')
    } finally {
      setApplicationsLoading(false)
    }
  }

  const handleViewCandidateProfile = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
    setShowCandidateModal(true)
  }

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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Desenvolvedor Full Stack"
                  />
                </div>

                {/* Cargo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cargo *
                  </label>
                  <input
                    type="text"
                    value={jobTitleSearch}
                    onChange={(e) => setJobTitleSearch(e.target.value)}
                    onBlur={() => {
                      if (jobTitleSuggestions.length === 1) {
                        setFormData({ ...formData, jobTitle: jobTitleSuggestions[0] })
                        setJobTitleSearch('')
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite para buscar..."
                  />
                  {jobTitleSuggestions.length > 0 && (
                    <ul className="border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto">
                      {jobTitleSuggestions.map((suggestion) => (
                        <li
                          key={suggestion}
                          onClick={() => {
                            setFormData({ ...formData, jobTitle: suggestion })
                            setJobTitleSearch('')
                          }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                  {formData.jobTitle && (
                    <p className="text-sm text-green-600 mt-1">✓ {formData.jobTitle}</p>
                  )}
                </div>

                {/* Nível */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nível *
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="JUNIOR">Junior</option>
                    <option value="PLENO">Pleno</option>
                    <option value="SENIOR">Sênior</option>
                  </select>
                </div>

                {/* Vínculo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vínculo *
                  </label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="CLT">CLT</option>
                    <option value="PJ">PJ</option>
                    <option value="TEMPORARIO">Temporário</option>
                    <option value="ESTAGIO">Estágio</option>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="PRESENCIAL">Presencial</option>
                    <option value="REMOTO">Remoto</option>
                    <option value="HIBRIDO">Híbrido</option>
                  </select>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: 6000"
                  />
                </div>

                {/* Estado */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado *
                  </label>
                  <input
                    type="text"
                    value={stateSearch}
                    onChange={(e) => setStateSearch(e.target.value)}
                    onBlur={() => {
                      if (stateSuggestions.length === 1) {
                        setFormData({ ...formData, state: stateSuggestions[0] })
                        setStateSearch('')
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite para buscar..."
                  />
                  {stateSuggestions.length > 0 && (
                    <ul className="border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto">
                      {stateSuggestions.map((suggestion) => (
                        <li
                          key={suggestion}
                          onClick={() => {
                            setFormData({ ...formData, state: suggestion, city: '' })
                            setStateSearch('')
                          }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                  {formData.state && (
                    <p className="text-sm text-green-600 mt-1">✓ {formData.state}</p>
                  )}
                </div>

                {/* Cidade */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    onBlur={() => {
                      if (citySuggestions.length === 1) {
                        setFormData({ ...formData, city: citySuggestions[0] })
                        setCitySearch('')
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite para buscar..."
                    disabled={!formData.state}
                  />
                  {citySuggestions.length > 0 && (
                    <ul className="border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto">
                      {citySuggestions.map((suggestion) => (
                        <li
                          key={suggestion}
                          onClick={() => {
                            setFormData({ ...formData, city: suggestion })
                            setCitySearch('')
                          }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                  {formData.city && (
                    <p className="text-sm text-green-600 mt-1">✓ {formData.city}</p>
                  )}
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={5}
                  placeholder="Descreva a vaga, responsabilidades, requisitos, etc..."
                />
              </div>

              {/* Competências */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Competências Necessárias *
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
                    onClick={() => handleViewApplications(job.id)}
                    disabled={applicationsLoading}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
                  >
                    👥 Ver Candidatos
                  </button>
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

        {/* Modal de Candidatos */}
        {showApplicationsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-96 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">👥 Candidatos ({applications.length})</h3>
                <button
                  onClick={() => setShowApplicationsModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {applications.length === 0 ? (
                <p className="text-gray-600">Nenhum candidato para esta vaga ainda.</p>
              ) : (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.applicationId} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900">{app.candidate.name}</h4>
                          <p className="text-sm text-gray-600">{app.candidate.email}</p>
                          <p className="text-sm text-gray-600">{app.candidate.currentPosition} em {app.candidate.currentCompany}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            Candidatou-se em: {new Date(app.appliedAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            app.status === 'APPLIED' ? 'bg-blue-100 text-blue-800' :
                            app.status === 'REVIEWING' ? 'bg-yellow-100 text-yellow-800' :
                            app.status === 'INTERVIEW' ? 'bg-purple-100 text-purple-800' :
                            app.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {app.status === 'APPLIED' ? 'Candidatado' :
                             app.status === 'REVIEWING' ? 'Analisando' :
                             app.status === 'INTERVIEW' ? 'Entrevista' :
                             app.status === 'REJECTED' ? 'Rejeitado' :
                             'Contratado'}
                          </span>
                          <button
                            onClick={() => handleViewCandidateProfile(app.candidate)}
                            className="block mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm"
                          >
                            Ver Perfil
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal de Perfil do Candidato */}
        {showCandidateModal && selectedCandidate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">👤 Perfil do Candidato</h3>
                <button
                  onClick={() => setShowCandidateModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="font-semibold">Nome:</span> {selectedCandidate.name}
                </div>
                <div>
                  <span className="font-semibold">Email:</span> {selectedCandidate.email}
                </div>
                <div>
                  <span className="font-semibold">Telefone:</span> {selectedCandidate.phone || 'Não informado'}
                </div>
                <div>
                  <span className="font-semibold">Cargo Atual:</span> {selectedCandidate.currentPosition || 'Não informado'}
                </div>
                <div>
                  <span className="font-semibold">Empresa Atual:</span> {selectedCandidate.currentCompany || 'Não informado'}
                </div>
                <div>
                  <span className="font-semibold">Anos de Experiência:</span> {selectedCandidate.yearsOfExperience || 0}
                </div>
                <div>
                  <span className="font-semibold">Localização:</span> {selectedCandidate.city}, {selectedCandidate.state}
                </div>
                <div>
                  <span className="font-semibold">Nível de Educação:</span> {selectedCandidate.educationLevel || 'Não informado'}
                </div>
                <div>
                  <span className="font-semibold">Sobre:</span>
                  <p className="text-gray-600 mt-2">{selectedCandidate.aboutMe || 'Não informado'}</p>
                </div>
                {selectedCandidate.linkedinUrl && (
                  <div>
                    <a href={selectedCandidate.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      🔗 LinkedIn
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

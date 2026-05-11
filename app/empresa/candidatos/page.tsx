'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import axios from 'axios'

interface Candidate {
  id: number
  fullName: string
  email: string
  currentPosition: string
  state: string
  city: string
  age: string
  educationLevel: string
  aboutMe: string
  profilePhoto: string
}

export default function CandidatosPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null)

  // Filtros
  const [filters, setFilters] = useState({
    state: '',
    city: '',
    ageMin: '',
    ageMax: '',
    educationLevel: '',
    keyword: ''
  })

  // Buscar candidatos
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('scaleconnect_token')
        if (!token) {
          setLoading(false)
          return
        }

        const response = await axios.get('/api/empresa/candidatos', {
          headers: { Authorization: `Bearer ${token}` }
        })

        setCandidates(response.data || [])
        setFilteredCandidates(response.data || [])
      } catch (err) {
        console.error('Erro ao buscar candidatos:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCandidates()
  }, [])

  // Aplicar filtros com debounce
  const applyFilters = useCallback(() => {
    let filtered = candidates

    // Filtro por Estado
    if (filters.state) {
      filtered = filtered.filter(c => c.state === filters.state)
    }

    // Filtro por Cidade
    if (filters.city) {
      filtered = filtered.filter(c => 
        c.city.toLowerCase().includes(filters.city.toLowerCase())
      )
    }

    // Filtro por Idade
    if (filters.ageMin) {
      filtered = filtered.filter(c => {
        const age = parseInt(c.age || '0')
        return age >= parseInt(filters.ageMin)
      })
    }

    if (filters.ageMax) {
      filtered = filtered.filter(c => {
        const age = parseInt(c.age || '0')
        return age <= parseInt(filters.ageMax)
      })
    }

    // Filtro por Nível de Estudo
    if (filters.educationLevel) {
      filtered = filtered.filter(c => c.educationLevel === filters.educationLevel)
    }

    // Filtro por Palavra-chave no campo "Sobre mim"
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase()
      filtered = filtered.filter(c =>
        c.aboutMe.toLowerCase().includes(keyword) ||
        c.currentPosition.toLowerCase().includes(keyword) ||
        c.fullName.toLowerCase().includes(keyword)
      )
    }

    setFilteredCandidates(filtered)
  }, [candidates, filters])

  // Debounce para filtros
  useEffect(() => {
    if (searchTimeout) clearTimeout(searchTimeout)

    const timeout = setTimeout(() => {
      applyFilters()
    }, 300)

    setSearchTimeout(timeout)

    return () => clearTimeout(timeout)
  }, [filters, applyFilters])

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({
      state: '',
      city: '',
      ageMin: '',
      ageMax: '',
      educationLevel: '',
      keyword: ''
    })
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
        <nav className="bg-white shadow-sm border-b-4 border-blue-600">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">ScaleConnect</div>
            <Link href="/empresa/dashboard" className="text-blue-600 font-semibold hover:text-blue-800">← Dashboard</Link>
          </div>
        </nav>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-xl font-semibold text-gray-600 animate-pulse">Carregando candidatos...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      <nav className="bg-gradient-to-r from-[#1a3a52] to-[#2d5a7b] shadow-lg border-b-4 border-[#FF9500]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">ScaleConnect</div>
          <Link href="/empresa/dashboard" className="text-white font-semibold hover:text-[#FF9500] transition">← Dashboard</Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#1a3a52] mb-2">🔍 Buscar Candidatos</h1>
        <p className="text-gray-600 mb-8">Encontre o candidato ideal usando os filtros abaixo</p>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-l-4 border-[#FF9500]">
          <h2 className="text-xl font-bold text-[#1a3a52] mb-6">Filtros de Busca</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <select
                value={filters.state}
                onChange={(e) => handleFilterChange('state', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition"
              >
                <option value="">Todos os estados</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </select>
            </div>

            {/* Cidade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
              <input
                type="text"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                placeholder="Ex: São Paulo"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition"
              />
            </div>

            {/* Idade Mínima */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Idade Mínima</label>
              <input
                type="number"
                value={filters.ageMin}
                onChange={(e) => handleFilterChange('ageMin', e.target.value)}
                placeholder="Ex: 25"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition"
              />
            </div>

            {/* Idade Máxima */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Idade Máxima</label>
              <input
                type="number"
                value={filters.ageMax}
                onChange={(e) => handleFilterChange('ageMax', e.target.value)}
                placeholder="Ex: 45"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition"
              />
            </div>

            {/* Nível de Estudo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nível de Estudo</label>
              <select
                value={filters.educationLevel}
                onChange={(e) => handleFilterChange('educationLevel', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition"
              >
                <option value="">Todos os níveis</option>
                <option value="Ensino Fundamental">Ensino Fundamental</option>
                <option value="Ensino Médio">Ensino Médio</option>
                <option value="Técnico">Técnico</option>
                <option value="Graduação">Graduação</option>
                <option value="Pós-graduação">Pós-graduação</option>
                <option value="Mestrado">Mestrado</option>
                <option value="Doutorado">Doutorado</option>
              </select>
            </div>

            {/* Palavra-chave */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Palavra-chave</label>
              <input
                type="text"
                value={filters.keyword}
                onChange={(e) => handleFilterChange('keyword', e.target.value)}
                placeholder="Ex: agronegócio, SaaS, vendas"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition"
              />
            </div>
          </div>

          <button
            onClick={resetFilters}
            className="px-6 py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition"
          >
            🔄 Limpar Filtros
          </button>
        </div>

        {/* Resultados */}
        <div>
          <h2 className="text-2xl font-bold text-[#1a3a52] mb-4">
            Resultados: <span className="text-[#FF9500]">{filteredCandidates.length}</span> candidato(s)
          </h2>

          {filteredCandidates.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center border-l-4 border-[#FF9500]">
              <p className="text-gray-600 text-lg">Nenhum candidato encontrado com esses filtros.</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-6 py-2 bg-[#FF9500] text-white rounded-lg font-semibold hover:bg-[#e68a00] transition"
              >
                Limpar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCandidates.map((candidate) => (
                <div key={candidate.id} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#FF9500] hover:shadow-xl transition">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={candidate.profilePhoto || '/default-profile.jpg'}
                      alt={candidate.fullName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                      onError={(e) => (e.currentTarget.src = '/default-profile.jpg')}
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{candidate.fullName}</h3>
                      <p className="text-sm text-[#FF9500] font-semibold">{candidate.currentPosition}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <p><strong>📍 Localização:</strong> {candidate.city}, {candidate.state}</p>
                    <p><strong>🎂 Idade:</strong> {candidate.age} anos</p>
                    <p><strong>🎓 Estudo:</strong> {candidate.educationLevel}</p>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-3 mb-4 border-l-4 border-[#FF9500]">
                    <p className="text-xs font-semibold text-gray-700 mb-1">Sobre:</p>
                    <p className="text-sm text-gray-700 line-clamp-3">{candidate.aboutMe || 'Sem informações'}</p>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-[#1a3a52] text-white rounded-lg font-semibold hover:bg-[#2d5a7b] transition shadow-md">
                      Ver Perfil
                    </button>
                    <button className="flex-1 px-4 py-2 bg-[#FF9500] text-white rounded-lg font-semibold hover:bg-[#e68a00] transition shadow-md">
                      Contatar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

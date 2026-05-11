'use client'

import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

interface Competency {
  id: number
  nome: string
}

interface CompetenciesSelectorProps {
  selectedCompetencies: Competency[]
  onCompetenciesChange: (competencies: Competency[]) => void
  isEditing: boolean
}

export default function CompetenciesSelector({
  selectedCompetencies,
  onCompetenciesChange,
  isEditing
}: CompetenciesSelectorProps) {
  const [allCompetencies, setAllCompetencies] = useState<Competency[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCompetencies, setFilteredCompetencies] = useState<Competency[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Load all competencies on mount
  useEffect(() => {
    const loadCompetencies = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get('/api/competencies')
        setAllCompetencies(response.data)
        setError('')
      } catch (err) {
        console.error('Erro ao carregar competências:', err)
        setError('Erro ao carregar competências')
      } finally {
        setIsLoading(false)
      }
    }

    loadCompetencies()
  }, [])

  // Filter competencies based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCompetencies([])
      return
    }

    const filtered = allCompetencies.filter(comp => {
      // Don't show already selected competencies
      const isSelected = selectedCompetencies.some(s => s.id === comp.id)
      return !isSelected && comp.nome.toLowerCase().includes(searchTerm.toLowerCase())
    })

    setFilteredCompetencies(filtered)
  }, [searchTerm, allCompetencies, selectedCompetencies])

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleAddCompetency = (competency: Competency) => {
    if (!selectedCompetencies.some(s => s.id === competency.id)) {
      onCompetenciesChange([...selectedCompetencies, competency])
      setSearchTerm('')
      setShowSuggestions(false)
    }
  }

  const handleRemoveCompetency = (competencyId: number) => {
    onCompetenciesChange(selectedCompetencies.filter(c => c.id !== competencyId))
  }

  const isMinimumMet = selectedCompetencies.length >= 4

  if (!isEditing) {
    return (
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Competências</label>
        <div className="flex flex-wrap gap-2">
          {selectedCompetencies.length === 0 ? (
            <p className="text-gray-500 text-sm">Nenhuma competência selecionada</p>
          ) : (
            selectedCompetencies.map(comp => (
              <span
                key={comp.id}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium"
              >
                ✓ {comp.nome}
              </span>
            ))
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Competências
          <span className="text-red-500 ml-1">*</span>
          <span className="text-xs text-gray-500 ml-2">
            (Mínimo 4 competências)
          </span>
        </label>

        {/* Search Input */}
        <div className="relative">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Buscar competência..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            disabled={!isEditing}
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
          />

          {/* Suggestions Dropdown */}
          {showSuggestions && searchTerm.trim() && (
            <div
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto"
            >
              {isLoading ? (
                <div className="p-4 text-center text-gray-500">Carregando...</div>
              ) : filteredCompetencies.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  Nenhuma competência encontrada
                </div>
              ) : (
                filteredCompetencies.map(comp => (
                  <button
                    key={comp.id}
                    onClick={() => handleAddCompetency(comp)}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors"
                  >
                    {comp.nome}
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}

        {/* Validation Message */}
        {selectedCompetencies.length < 4 && selectedCompetencies.length > 0 && (
          <p className="text-orange-600 text-sm mt-2">
            ⚠️ Adicione mais {4 - selectedCompetencies.length} competência(s)
          </p>
        )}

        {selectedCompetencies.length === 0 && (
          <p className="text-red-600 text-sm mt-2">
            ❌ Selecione no mínimo 4 competências
          </p>
        )}
      </div>

      {/* Selected Competencies */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">
          Competências selecionadas ({selectedCompetencies.length}/∞)
        </p>
        <div className="flex flex-wrap gap-2">
          {selectedCompetencies.length === 0 ? (
            <p className="text-gray-500 text-sm italic">Nenhuma competência selecionada ainda</p>
          ) : (
            selectedCompetencies.map(comp => (
              <div
                key={comp.id}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-green-100 text-green-800 font-medium border-2 border-green-400 shadow-sm hover:shadow-md transition-shadow"
              >
                <span>✓ {comp.nome}</span>
                <button
                  onClick={() => handleRemoveCompetency(comp.id)}
                  className="ml-1 text-green-700 hover:text-green-900 font-bold text-lg leading-none"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Status Indicator */}
      <div className={`p-3 rounded-lg text-sm font-medium ${
        isMinimumMet
          ? 'bg-green-100 text-green-800 border border-green-300'
          : 'bg-red-100 text-red-800 border border-red-300'
      }`}>
        {isMinimumMet ? (
          '✅ Você tem competências suficientes para salvar'
        ) : (
          `❌ Adicione no mínimo 4 competências para completar seu perfil`
        )}
      </div>
    </div>
  )
}

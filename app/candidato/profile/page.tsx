'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CompetenciesSelector from '@/app/components/CompetenciesSelector'
import { careerPositions } from '@/app/data/career-positions'

interface Competency {
  id: number
  nome: string
}

export default function CandidateProfilePage() {
  const [profile, setProfile] = useState({
    fullName: '',
    age: '',
    gender: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    profilePhoto: '/default-profile.jpg',
    currentPosition: '',
    currentCompany: '',
    currentSalary: '',
    yearsOfExperience: '',
    state: '',
    city: '',
    educationLevel: '',
    aboutMe: '',
    bio: '',
    skills: [] as string[],
  })

  const [competencies, setCompetencies] = useState<Competency[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(profile)
  const [editCompetencies, setEditCompetencies] = useState<Competency[]>([])
  const [photoPreview, setPhotoPreview] = useState(profile.profilePhoto)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('scaleconnect_token')
        if (!token) { setIsLoading(false); return }

        const response = await axios.get('/api/candidate/profile', {
          headers: { Authorization: `Bearer ${token}` }
        })

        if (response.data) {
          const dbProfile = response.data
          const mergedProfile = {
            ...profile,
            ...dbProfile,
            skills: typeof dbProfile.skills === 'string'
              ? JSON.parse(dbProfile.skills || '[]')
              : dbProfile.skills || [],
          }
          setProfile(mergedProfile)
          setEditData(mergedProfile)
          setPhotoPreview(mergedProfile.profilePhoto || '/default-profile.jpg')
        }

        // Load candidate competencies
        const competenciesResponse = await axios.get('/api/candidate/competencies', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setCompetencies(competenciesResponse.data || [])
        setEditCompetencies(competenciesResponse.data || [])
      } catch (e) {
        console.error('Erro ao carregar perfil', e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProfile()
  }, [])

  // ✅ ÚNICA MUDANÇA: comprime a imagem antes de converter para Base64
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const MAX_WIDTH = 400
    const QUALITY = 0.75

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const scale = Math.min(1, MAX_WIDTH / img.width)
        canvas.width = img.width * scale
        canvas.height = img.height * scale
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        const compressed = canvas.toDataURL('image/jpeg', QUALITY)
        setPhotoPreview(compressed)
        setEditData(prev => ({ ...prev, profilePhoto: compressed }))
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    try {
      setSaveError('')
      setIsSaving(true)
      const token = localStorage.getItem('scaleconnect_token')
      if (!token) { alert('Você precisa estar logado.'); return }

      // Validate minimum competencies
      if (editCompetencies.length < 4) {
        setSaveError('Adicione no mínimo 4 competências para completar seu perfil.')
        setIsSaving(false)
        return
      }

      // Save profile data
      await axios.post('/api/candidate/profile', {
        ...editData,
        skills: JSON.stringify(editData.skills)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      // Save competencies
      await axios.post('/api/candidate/competencies', {
        competencyIds: editCompetencies.map(c => c.id)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setProfile(editData)
      setCompetencies(editCompetencies)
      setIsEditing(false)
      alert('✅ Perfil salvo com sucesso!')
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || 'Erro ao salvar perfil.'
      setSaveError(errorMessage)
      alert('❌ ' + errorMessage)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold animate-pulse">Carregando seu perfil...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">

      <nav className="bg-gradient-to-r from-[#1a3a52] to-[#2d5a7b] shadow-lg border-b-4 border-[#FF9500]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">ScaleConnect</div>
          <Link href="/candidato/dashboard" className="text-white font-semibold hover:text-[#FF9500] transition">← Dashboard</Link>
        </div>
      </nav>

      <div className="flex">

        <aside className="w-64 bg-white shadow-md min-h-screen p-6 border-r border-gray-200">
          <nav className="space-y-3 flex flex-col">
            <Link href="/candidato/dashboard" className="text-gray-700 hover:text-blue-600 hover:font-semibold transition">📊 Dashboard</Link>
            <Link href="/candidato/jobs" className="text-gray-700 hover:text-blue-600 hover:font-semibold transition">📋 Vagas</Link>
            <Link href="/candidato/opportunities" className="text-gray-700 hover:text-blue-600 hover:font-semibold transition">💼 Afiliado</Link>
            <Link href="/candidato/earnings" className="text-gray-700 hover:text-blue-600 hover:font-semibold transition">💰 Ganhos</Link>
            <Link href="/candidato/profile" className="font-bold text-blue-600 border-l-4 border-blue-600 pl-2">👤 Perfil</Link>
          </nav>
        </aside>

        <div className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">

            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-[#1a3a52]">👤 Meu Perfil</h1>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  isEditing
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-[#FF9500] text-white hover:bg-[#e68a00]'
                }`}
              >
                {isEditing ? '✕ Cancelar' : '✎ Editar Perfil'}
              </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-xl space-y-6 border-l-4 border-[#FF9500]">

              {/* Profile Photo Section */}
              <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
                <img
                  src={photoPreview}
                  alt="Foto de perfil"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow-md"
                  onError={(e) => (e.currentTarget.src = '/default-profile.jpg')}
                />
                {isEditing && (
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alterar foto de perfil</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handlePhotoChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="text-xs text-gray-500 mt-2">JPG ou PNG. Será comprimido automaticamente.</p>
                  </div>
                )}
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome completo</label>
                  {isEditing ? (
                    <input 
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition" 
                      value={editData.fullName}
                      onChange={(e) => setEditData({ ...editData, fullName: e.target.value })} 
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.fullName || '—'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                  <p className="text-gray-800 font-medium">{profile.email || '—'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                  {isEditing ? (
                    <input 
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition" 
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })} 
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.phone || '—'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Idade</label>
                  {isEditing ? (
                    <input 
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition" 
                      value={editData.age}
                      onChange={(e) => setEditData({ ...editData, age: e.target.value })} 
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.age || '—'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cargo atual</label>
                  {isEditing ? (
                    <select 
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition" 
                      value={editData.currentPosition}
                      onChange={(e) => setEditData({ ...editData, currentPosition: e.target.value })}
                    >
                      <option value="">Selecione seu cargo</option>
                      {careerPositions.map((position) => (
                        <option key={position.id} value={position.title}>
                          {position.title}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.currentPosition || '—'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salário atual / Último salário</label>
                  {isEditing ? (
                    <input 
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition" 
                      type="number"
                      placeholder="Ex: 3500"
                      value={editData.currentSalary}
                      onChange={(e) => setEditData({ ...editData, currentSalary: e.target.value })} 
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.currentSalary ? `R$ ${parseFloat(profile.currentSalary).toLocaleString('pt-BR')}` : '—'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Empresa atual</label>
                  {isEditing ? (
                    <input 
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition" 
                      value={editData.currentCompany}
                      onChange={(e) => setEditData({ ...editData, currentCompany: e.target.value })} 
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.currentCompany || '—'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Anos de experiência</label>
                  {isEditing ? (
                    <input 
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition" 
                      value={editData.yearsOfExperience}
                      onChange={(e) => setEditData({ ...editData, yearsOfExperience: e.target.value })} 
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.yearsOfExperience || '—'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                  {isEditing ? (
                    <input 
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition" 
                      value={editData.linkedinUrl}
                      onChange={(e) => setEditData({ ...editData, linkedinUrl: e.target.value })} 
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.linkedinUrl || '—'}</p>
                  )}
                </div>

              </div>

              {/* Location and Education Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-6 pb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  {isEditing ? (
                    <select 
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition" 
                      value={editData.state}
                      onChange={(e) => setEditData({ ...editData, state: e.target.value })}
                    >
                      <option value="">Selecione seu estado</option>
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
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.state || '—'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
                  {isEditing ? (
                    <input 
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition" 
                      value={editData.city}
                      onChange={(e) => setEditData({ ...editData, city: e.target.value })} 
                      placeholder="Ex: São Paulo"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.city || '—'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nível de Estudo</label>
                  {isEditing ? (
                    <select 
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition" 
                      value={editData.educationLevel}
                      onChange={(e) => setEditData({ ...editData, educationLevel: e.target.value })}
                    >
                      <option value="">Selecione seu nível de estudo</option>
                      <option value="Ensino Fundamental">Ensino Fundamental</option>
                      <option value="Ensino Médio">Ensino Médio</option>
                      <option value="Técnico">Técnico</option>
                      <option value="Graduação">Graduação</option>
                      <option value="Pós-graduação">Pós-graduação</option>
                      <option value="Mestrado">Mestrado</option>
                      <option value="Doutorado">Doutorado</option>
                    </select>
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.educationLevel || '—'}</p>
                  )}
                </div>
              </div>

              {/* About Me Section */}
              <div className="border-t border-gray-200 pt-6 pb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📝 Sobre Você
                </label>
                <p className="text-xs text-gray-600 mb-3">
                  Resuma suas experiências de forma clara e objetiva. Seja direto: mencione suas últimas funções, expertise e palavras-chave que definem seu perfil. Recrutadores buscam candidatos que se comunicam bem e mostram valor rapidamente. (Máximo 500 caracteres)
                </p>
                {isEditing ? (
                  <div>
                    <textarea 
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition" 
                      rows={3} 
                      maxLength={500}
                      value={editData.aboutMe}
                      onChange={(e) => setEditData({ ...editData, aboutMe: e.target.value })} 
                      placeholder="Ex: Vendedor Interno - 3 anos em televendas B2B, prospecção ativa, fechamento de vendas. Experiência em SaaS, geração de leads qualificados. Excel avançado, CRM."
                    />
                    <p className="text-xs text-gray-500 mt-1">{editData.aboutMe.length}/500 caracteres</p>
                  </div>
                ) : (
                  <p className="text-gray-800 whitespace-pre-wrap bg-gray-50 p-3 rounded-lg">{profile.aboutMe || '—'}</p>
                )}
              </div>



              {/* Competencies Section */}
              <div className="border-t border-gray-200 pt-6">
                <CompetenciesSelector
                  selectedCompetencies={isEditing ? editCompetencies : competencies}
                  onCompetenciesChange={setEditCompetencies}
                  isEditing={isEditing}
                />
              </div>

              {/* Error Message */}
              {saveError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                  {saveError}
                </div>
              )}

              {/* Save Button */}
              {isEditing && (
                <div className="border-t border-gray-200 pt-6 flex gap-4">
                  <button
                    onClick={handleSave}
                    disabled={isSaving || editCompetencies.length < 4}
                    className="flex-1 bg-[#2ecc71] text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#27ae60] transition-all shadow-md"
                  >
                    {isSaving ? '💾 Salvando...' : '✓ Salvar Perfil'}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-500 transition-all"
                  >
                    Cancelar
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

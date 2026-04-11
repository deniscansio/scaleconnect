'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

export default function CandidateProfilePage() {
  const [profile, setProfile] = useState({
    fullName: 'João Silva',
    age: 28,
    gender: 'M',
    email: 'joao@email.com',
    phone: '(11) 98765-4321',
    linkedinUrl: 'https://linkedin.com/in/joaosilva',
    profilePhoto: 'https://ui-avatars.com/api/?name=Joao+Silva&background=F97316&color=fff&size=128',
    currentPosition: 'Sales Development Representative',
    currentCompany: 'Tech Solutions',
    currentSalary: 4500,
    yearsOfExperience: 3,
    bio: 'Profissional apaixonado por vendas com foco em prospecção e geração de leads. Busco oportunidades de crescimento profissional e geração de renda.',
    skills: ['Prospecção', 'Negociação', 'CRM', 'Comunicação', 'Vendas B2B', 'Geração de Leads'],
    certifications: [
      { name: 'Certificação SDR', issuer: 'ScaleConnect', date: '15/01/2024' },
      { name: 'Google Analytics', issuer: 'Google', date: '20/11/2023' },
    ],
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(profile)
  const [photoPreview, setPhotoPreview] = useState(profile.profilePhoto)
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Carregar dados do localStorage ao iniciar
  useEffect(() => {
    const savedProfile = localStorage.getItem('scaleconnect_candidate_profile')
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile)
        setProfile(parsed)
        setEditData(parsed)
        setPhotoPreview(parsed.profilePhoto)
      } catch (e) {
        console.error('Erro ao carregar perfil', e)
      }
    }
  }, [])

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        setPhotoPreview(base64)
        setEditData({ ...editData, profilePhoto: base64 })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    // Validação básica
    if (!editData.fullName || !editData.currentSalary || !editData.email) {
      alert('Por favor, preencha todos os campos obrigatórios (Nome, Email e Salário Atual).')
      return
    }

    setIsSaving(true)
    
    // Simular salvamento
    setTimeout(() => {
      setProfile(editData)
      localStorage.setItem('scaleconnect_candidate_profile', JSON.stringify(editData))
      setIsEditing(false)
      setIsSaving(false)
      alert('Perfil atualizado com sucesso!')
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header Simplificado */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-600">ScaleConnect</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm font-medium text-gray-500">DConnection Group</span>
          </div>
          <Link href="/candidato/dashboard" className="text-orange-600 font-semibold hover:text-orange-700 transition flex items-center gap-1">
            <span>←</span> Voltar ao Painel
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-orange-500 to-orange-600"></div>
          
          {/* Profile Info Section */}
          <div className="px-8 pb-8 relative">
            {/* Avatar */}
            <div className="absolute -top-16 left-8">
              <div className="relative group">
                <img
                  src={photoPreview}
                  alt="Foto de Perfil"
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-md bg-gray-100"
                />
                {isEditing && (
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <span className="text-sm font-bold">Alterar Foto</span>
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex justify-end pt-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition shadow-sm"
                >
                  ✏️ Editar Perfil
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition shadow-sm disabled:opacity-50"
                  >
                    {isSaving ? 'Salvando...' : '💾 Salvar'}
                  </button>
                </div>
              )}
            </div>

            {/* Name and Basic Info */}
            <div className="mt-10">
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nome Completo *</label>
                      <input
                        type="text"
                        value={editData.fullName}
                        onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Cargo Atual</label>
                      <input
                        type="text"
                        value={editData.currentPosition}
                        onChange={(e) => setEditData({ ...editData, currentPosition: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Empresa Atual</label>
                      <input
                        type="text"
                        value={editData.currentCompany}
                        onChange={(e) => setEditData({ ...editData, currentCompany: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Idade</label>
                        <input
                          type="number"
                          value={editData.age}
                          onChange={(e) => setEditData({ ...editData, age: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Gênero</label>
                        <select
                          value={editData.gender}
                          onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                        >
                          <option value="M">Masculino</option>
                          <option value="F">Feminino</option>
                          <option value="O">Outro</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{profile.fullName}</h1>
                  <p className="text-lg text-orange-600 font-semibold">{profile.currentPosition} na {profile.currentCompany}</p>
                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">🎂 {profile.age} anos</span>
                    <span className="flex items-center gap-1">⚧ {profile.gender === 'M' ? 'Masculino' : profile.gender === 'F' ? 'Feminino' : 'Outro'}</span>
                    <span className="flex items-center gap-1">📍 São Paulo, Brasil</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contact & Salary */}
          <div className="lg:col-span-1 space-y-8">
            {/* Salary Card - CRITICAL REQUIREMENT */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">💰</span>
                <h3 className="font-bold text-gray-900">Salário Atual</h3>
              </div>
              {isEditing ? (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Valor Mensal (R$) *</label>
                  <input
                    type="number"
                    value={editData.currentSalary}
                    onChange={(e) => setEditData({ ...editData, currentSalary: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none font-bold text-orange-600"
                    required
                  />
                  <p className="text-[10px] text-gray-400 mt-2 italic">* Campo obrigatório para conexão com empresas.</p>
                </div>
              ) : (
                <div>
                  <p className="text-3xl font-bold text-orange-600">R$ {profile.currentSalary.toLocaleString('pt-BR')}</p>
                  <p className="text-xs text-gray-500 mt-1">Este valor é visível apenas para empresas parceiras.</p>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Contato</h3>
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">E-mail *</label>
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">WhatsApp</label>
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">LinkedIn URL</label>
                      <input
                        type="url"
                        value={editData.linkedinUrl}
                        onChange={(e) => setEditData({ ...editData, linkedinUrl: e.target.value })}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">📧</span>
                      <span className="text-gray-700">{profile.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">📱</span>
                      <span className="text-gray-700">{profile.phone}</span>
                    </div>
                    <a 
                      href={profile.linkedinUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-blue-600 hover:underline"
                    >
                      <span className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">in</span>
                      <span>Ver Perfil no LinkedIn</span>
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Bio & Skills */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio Section */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">Sobre Mim</h3>
              {isEditing ? (
                <textarea
                  value={editData.bio}
                  onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-gray-700 leading-relaxed"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
              )}
            </div>

            {/* Skills Section */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-6 text-xl">Habilidades e Competências</h3>
              <div className="flex flex-wrap gap-3">
                {profile.skills.map((skill, idx) => (
                  <span key={idx} className="px-4 py-2 bg-orange-50 text-orange-700 rounded-xl font-bold text-sm border border-orange-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications Section */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-6 text-xl">🏆 Certificações</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.certifications.map((cert, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-xl shrink-0">
                      📜
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{cert.name}</p>
                      <p className="text-xs text-gray-500">{cert.issuer} • {cert.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 p-6 bg-orange-600 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div>
            <h4 className="text-xl font-bold mb-1">Pronto para o próximo nível?</h4>
            <p className="text-orange-100 text-sm">Sua jornada de sucesso está apenas começando. Continue evoluindo!</p>
          </div>
          <Link 
            href="/candidato/jornada-sucesso" 
            className="px-8 py-3 bg-white text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition shadow-md whitespace-nowrap"
          >
            Ver Minha Jornada 🚀
          </Link>
        </div>
      </div>
    </main>
  )
}

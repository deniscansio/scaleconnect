'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'

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
    careerGoal: '',
    bio: '',
    skills: [],
    certifications: [],
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(profile)
  const [photoPreview, setPhotoPreview] = useState(profile.profilePhoto)
  const [isLoading, setIsLoading] = useState(true)

  // Carregar dados do backend ao iniciar
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('scaleconnect_token')
        if (!token) {
          setIsLoading(false)
          return
        }

        const response = await axios.get('/api/candidate/profile', {
          headers: { Authorization: `Bearer ${token}` }
        })

        if (response.data && response.data.id) {
          const dbProfile = response.data
          const mergedProfile = {
            ...profile,
            ...dbProfile,
            skills: typeof dbProfile.skills === 'string' ? JSON.parse(dbProfile.skills) : (dbProfile.skills || [])
          }
          setProfile(mergedProfile)
          setEditData(mergedProfile)
          setPhotoPreview(mergedProfile.profilePhoto || '/default-profile.jpg')
        }
      } catch (e) {
        console.error('Erro ao carregar perfil do servidor', e)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
        setEditData({ ...editData, profilePhoto: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('scaleconnect_token')
      if (!token) {
        alert('Você precisa estar logado para salvar o perfil.')
        return
      }

      const dataToSave = {
        ...editData,
        skills: JSON.stringify(editData.skills)
      }

      await axios.post('/api/candidate/profile', dataToSave, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setProfile(editData)
      setIsEditing(false)
      alert('Perfil salvo com sucesso!')
    } catch (e) {
      console.error('Erro ao salvar perfil', e)
      alert('Erro ao salvar perfil. Tente novamente.')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold text-candidate-primary animate-pulse">Carregando seu perfil...</div>
      </div>
    )
  }

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
              💼 Afiliado
            </Link>
            <Link href="/candidato/earnings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              💰 Meus Ganhos
            </Link>
            <Link href="/candidato/jornada-sucesso" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              🚀 Jornada de Sucesso
            </Link>
            <Link href="/candidato/profile" className="block px-4 py-2 bg-candidate-primary text-white rounded-lg font-semibold">
              👤 Perfil
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">👤 Meu Perfil Profissional</h1>
                <p className="text-gray-600">Preencha seus dados para que as empresas possam encontrá-lo</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-3 bg-candidate-primary text-white rounded-lg font-semibold hover:bg-opacity-90"
              >
                {isEditing ? 'Cancelar' : '✏️ Editar Perfil'}
              </button>
            </div>

            {/* Profile Card */}
            <div className="card bg-white mb-8 shadow-lg rounded-xl overflow-hidden">
              {/* Header Section with Avatar */}
              <div className="bg-gradient-to-r from-candidate-primary to-candidate-secondary h-32 mb-16 relative">
                <div className="absolute -bottom-12 left-6">
                  <div className="relative">
                    <img
                      src={photoPreview.startsWith('/') ? `https://ui-avatars.com/api/?name=${profile.fullName ? profile.fullName.replace(' ', '+' ) : 'Candidato'}&background=F97316&color=fff&size=128` : photoPreview}
                      alt="Foto de Perfil"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg bg-gray-200"
                    />
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-candidate-primary hover:bg-opacity-90 text-white p-2 rounded-full cursor-pointer shadow-lg">
                        📷
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="p-6">
                <div className="mb-8">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
                          <input
                            type="text"
                            value={editData.fullName}
                            onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-candidate-primary"
                            placeholder="Digite seu nome"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Idade</label>
                          <input
                            type="number"
                            value={editData.age}
                            onChange={(e) => setEditData({ ...editData, age: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-candidate-primary"
                            placeholder="Ex: 28"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Gênero</label>
                          <select
                            value={editData.gender}
                            onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-candidate-primary"
                          >
                            <option value="">Selecione...</option>
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                            <option value="O">Outro</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            value={editData.email}
                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-candidate-primary"
                            placeholder="seu@email.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
                          <input
                            type="tel"
                            value={editData.phone}
                            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-candidate-primary"
                            placeholder="(11) 98765-4321"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn URL</label>
                        <input
                          type="url"
                          value={editData.linkedinUrl}
                          onChange={(e) => setEditData({ ...editData, linkedinUrl: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-candidate-primary"
                          placeholder="https://linkedin.com/in/seu-perfil"
                        />
                      </div>
                    </div>
                   ) : (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{profile.fullName || 'Nome não preenchido'}</h2>
                      <p className="text-gray-600 mb-4">{profile.currentPosition || 'Cargo não preenchido'} • {profile.currentCompany || 'Empresa não preenchida'}</p>
                      <p className="text-gray-700">{profile.bio || 'Biografia não preenchida'}</p>
                    </div>
                  )}
                </div>

                {/* Professional Info */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Informações Profissionais</h3>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Cargo Atual</label>
                          <input
                            type="text"
                            value={editData.currentPosition}
                            onChange={(e) => setEditData({ ...editData, currentPosition: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-candidate-primary"
                            placeholder="Ex: Sales Manager"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Empresa Atual</label>
                          <input
                            type="text"
                            value={editData.currentCompany}
                            onChange={(e) => setEditData({ ...editData, currentCompany: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-candidate-primary"
                            placeholder="Ex: Tech Solutions"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Salário Atual (R$)</label>
                          <input
                            type="number"
                            value={editData.currentSalary}
                            onChange={(e) => setEditData({ ...editData, currentSalary: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-candidate-primary"
                            placeholder="Ex: 5000"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Anos de Experiência</label>
                          <input
                            type="number"
                            value={editData.yearsOfExperience}
                            onChange={(e) => setEditData({ ...editData, yearsOfExperience: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-candidate-primary"
                            placeholder="Ex: 5"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Objetivo de Carreira</label>
                        <textarea
                          value={editData.careerGoal}
                          onChange={(e) => setEditData({ ...editData, careerGoal: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-candidate-primary"
                          placeholder="Descreva seus objetivos profissionais"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Biografia Profissional</label>
                        <textarea
                          value={editData.bio}
                          onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-candidate-primary"
                          placeholder="Fale sobre sua experiência e habilidades"
                          rows={4}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-600">Cargo Atual</p>
                        <p className="font-semibold text-gray-900">{profile.currentPosition || 'Não preenchido'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Empresa</p>
                        <p className="font-semibold text-gray-900">{profile.currentCompany || 'Não preenchido'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Salário Atual</p>
                        <p className="font-semibold text-gray-900">R$ {profile.currentSalary ? profile.currentSalary.toLocaleString('pt-BR') : 'Não preenchido'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Anos de Experiência</p>
                        <p className="font-semibold text-gray-900">{profile.yearsOfExperience || 'Não preenchido'}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="border-t border-gray-200 pt-6 mt-6 flex gap-4">
                    <button
                      onClick={handleSave}
                      className="flex-1 py-3 bg-candidate-primary text-white rounded-lg font-semibold hover:bg-opacity-90"
                    >
                      💾 Salvar Perfil
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 py-3 bg-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-400"
                    >
                      ✕ Cancelar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

  );
}

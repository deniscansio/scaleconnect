'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function CandidateProfilePage() {
  const [profile, setProfile] = useState({
    fullName: 'João Silva',
    age: 28,
    gender: 'M',
    email: 'joao@email.com',
    phone: '(11) 98765-4321',
    linkedinUrl: 'https://linkedin.com/in/joaosilva',
    profilePhoto: '/default-profile.jpg',
    currentPosition: 'Sales Development Representative',
    currentCompany: 'Tech Solutions',
    currentSalary: 4500,
    yearsOfExperience: 3,
    careerGoal: 'Tornar-me um Sales Manager em 2 anos',
    bio: 'Profissional apaixonado por vendas com foco em prospecção e geração de leads. Busco oportunidades de crescimento profissional e geração de renda.',
    skills: ['Prospecção', 'Negociação', 'CRM', 'Comunicação', 'Vendas B2B', 'Geração de Leads'],
    certifications: [
      { name: 'Certificação SDR', issuer: 'ScaleConnect', date: '2024-01-15' },
      { name: 'Google Analytics', issuer: 'Google', date: '2023-11-20' },
    ],
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
          // Mesclar dados do banco com o estado inicial (para manter campos que podem estar vazios)
          const mergedProfile = {
            ...profile,
            ...dbProfile,
            // Converter skills de string JSON para array se necessário
            skills: typeof dbProfile.skills === 'string' ? JSON.parse(dbProfile.skills) : profile.skills
          }
          setProfile(mergedProfile)
          setEditData(mergedProfile)
          setPhotoPreview(mergedProfile.profilePhoto)
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

      // Preparar dados para o banco (converter skills para string JSON)
      const dataToSave = {
        ...editData,
        skills: JSON.stringify(editData.skills)
      }

      await axios.post('/api/candidate/profile', dataToSave, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setProfile(editData)
      setIsEditing(false)
      alert('Perfil salvo com sucesso no servidor!')
    } catch (e) {
      console.error('Erro ao salvar perfil no servidor', e)
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
                <p className="text-gray-600">Seu perfil é visível para empresas que buscam profissionais como você</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-3 bg-candidate-primary text-white rounded-lg font-semibold hover:bg-opacity-90"
              >
                {isEditing ? 'Cancelar' : '✏️ Editar Perfil'}
              </button>
            </div>

            {/* LinkedIn-Style Profile Card */}
            <div className="card bg-white mb-8 shadow-lg rounded-xl overflow-hidden">
              {/* Header Section with Avatar */}
              <div className="bg-gradient-to-r from-candidate-primary to-candidate-secondary h-32 mb-16 relative">
                <div className="absolute -bottom-12 left-6">
                  <div className="relative">
                    <img
                      src={photoPreview.startsWith('/') ? `https://ui-avatars.com/api/?name=${profile.fullName.replace(' ', '+')}&background=F97316&color=fff&size=128` : photoPreview}
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
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Idade</label>
                          <input
                            type="number"
                            value={editData.age}
                            onChange={(e) => setEditData({ ...editData, age: parseInt(e.target.value) })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-candidate-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Gênero</label>
                          <select
                            value={editData.gender}
                            onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-candidate-primary"
                          >
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
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
                          <input
                            type="tel"
                            value={editData.phone}
                            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-candidate-primary"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-3xl font-bold text-gray-900">{profile.fullName}</h2>
                      <p className="text-lg text-candidate-primary font-semibold mt-1">{profile.currentPosition} • {profile.yearsOfExperience} anos</p>
                      <p className="text-gray-600 mt-2">{profile.currentCompany}</p>
                      <div className="flex gap-4 mt-3 text-sm text-gray-600">
                        <span>👤 {profile.age} anos</span>
                        <span>⚧ {profile.gender === 'M' ? 'Masculino' : 'Feminino'}</span>
                        <span>📧 {profile.email}</span>
                        <span>📱 {profile.phone}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* LinkedIn URL */}
                <div className="mb-8 pb-8 border-b">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">🔗 Link do LinkedIn</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={editData.linkedinUrl}
                      onChange={(e) => setEditData({ ...editData, linkedinUrl: e.target.value })}
                      placeholder="https://linkedin.com/in/seu-perfil"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-candidate-primary"
                    />
                  ) : (
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-candidate-primary hover:underline font-semibold"
                    >
                      {profile.linkedinUrl}
                    </a>
                  )}
                </div>

                {/* Salary Highlight */}
                <div className="bg-gradient-to-r from-candidate-primary to-candidate-secondary text-white p-6 rounded-lg mb-8">
                  <p className="text-sm opacity-90 mb-2">💰 Salário Atual <span className="text-red-300">*</span> (Obrigatório)</p>
                  {isEditing ? (
                    <div>
                      <label className="block text-sm font-semibold mb-2">Quanto você ganha atualmente? (R$)</label>
                      <input
                        type="number"
                        value={editData.currentSalary}
                        onChange={(e) => setEditData({ ...editData, currentSalary: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-candidate-primary text-gray-900"
                        required
                      />
                    </div>
                  ) : (
                    <p className="text-3xl font-bold">R$ {profile.currentSalary.toLocaleString('pt-BR')}</p>
                  )}
                </div>

                {/* Bio */}
                <div className="mb-8 pb-8 border-b">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Resumo Profissional</label>
                  {isEditing ? (
                    <textarea
                      value={editData.bio}
                      onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-candidate-primary h-24"
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                  )}
                </div>

                {/* Skills */}
                <div className="mb-8 pb-8 border-b">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Habilidades</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, idx) => (
                      <span key={idx} className="px-4 py-2 bg-candidate-light text-candidate-primary rounded-full font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">🏆 Certificações</h3>
                  <div className="space-y-3">
                    {profile.certifications.map((cert, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-2xl">✓</span>
                        <div>
                          <p className="font-semibold text-gray-900">{cert.name}</p>
                          <p className="text-sm text-gray-600">{cert.issuer}</p>
                          <p className="text-xs text-gray-500">Obtido em {cert.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex gap-4 pt-8 border-t">
                    <button
                      onClick={handleSave}
                      className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
                    >
                      💾 Salvar Alterações
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400"
                    >
                      🔄 Cancelar
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border-l-4 border-candidate-primary p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>ℹ️ Informação importante:</strong> Seu salário atual é <strong>obrigatório</strong> e será usado para conectá-lo com as melhores oportunidades. 
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

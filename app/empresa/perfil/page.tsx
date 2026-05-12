'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface CompanyProfile {
  id?: number
  companyName?: string
  cnpj?: string
  segment?: string
  employees?: string
  website?: string
  email?: string
  phone?: string
  address?: string
  about?: string
}

export default function CompanyProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<CompanyProfile>({})
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<CompanyProfile>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [saveSuccess, setSaveSuccess] = useState('')

  // Buscar perfil ao carregar
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('scaleconnect_token')
        if (!token) {
          router.push('/login')
          return
        }

        const response = await axios.get('/api/company/profile', {
          headers: { Authorization: `Bearer ${token}` }
        })

        setProfile(response.data)
        setEditData(response.data)
      } catch (error: any) {
        console.log('Perfil não encontrado, criar novo')
        setProfile({})
        setEditData({})
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [router])

  const handleSave = async () => {
    try {
      setSaveError('')
      setSaveSuccess('')
      setIsSaving(true)

      // Validar campos obrigatórios
      if (!editData.cnpj || !editData.email || !editData.phone) {
        setSaveError('CNPJ, Email e Telefone são obrigatórios')
        setIsSaving(false)
        return
      }

      const token = localStorage.getItem('scaleconnect_token')
      if (!token) {
        router.push('/login')
        return
      }

      await axios.post('/api/company/profile', editData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setProfile(editData)
      setIsEditing(false)
      setSaveSuccess('✅ Perfil salvo com sucesso!')
      setTimeout(() => setSaveSuccess(''), 3000)
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erro ao salvar perfil'
      setSaveError(errorMessage)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold animate-pulse">Carregando perfil...</div>
      </div>
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

      <div className="flex">
        <aside className="w-64 bg-white shadow-md min-h-screen p-6 border-r border-gray-200">
          <nav className="space-y-3 flex flex-col">
            <Link href="/empresa/dashboard" className="text-gray-700 hover:text-blue-600 hover:font-semibold transition">📊 Dashboard</Link>
            <Link href="/empresa/jobs" className="text-gray-700 hover:text-blue-600 hover:font-semibold transition">📋 Vagas</Link>
            <Link href="/empresa/perfil" className="font-bold text-blue-600 border-l-4 border-blue-600 pl-2">⚙️ Perfil</Link>
          </nav>
        </aside>

        <div className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-[#1a3a52]">⚙️ Perfil da Empresa</h1>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  isEditing
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-[#FF9500] text-white hover:bg-[#e68a00]'
                }`}
              >
                {isEditing ? '✕ Cancelar' : '✏️ Editar'}
              </button>
            </div>

            {saveSuccess && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                {saveSuccess}
              </div>
            )}

            {saveError && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {saveError}
              </div>
            )}

            <div className="bg-white p-8 rounded-xl shadow-xl space-y-6 border-l-4 border-[#FF9500]">
              {/* Logo Section */}
              <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                  🏢
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Logo da Empresa</p>
                  <p className="text-gray-500 text-xs mt-1">Será adicionado em breve</p>
                </div>
              </div>

              {/* Company Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Empresa</label>
                  {isEditing ? (
                    <input
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition"
                      value={editData.companyName || ''}
                      onChange={(e) => setEditData({ ...editData, companyName: e.target.value })}
                      placeholder="Ex: Tech Solutions"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.companyName || '—'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CNPJ *</label>
                  {isEditing ? (
                    <input
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition"
                      value={editData.cnpj || ''}
                      onChange={(e) => setEditData({ ...editData, cnpj: e.target.value })}
                      placeholder="Ex: 12.345.678/0001-90"
                      required
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.cnpj || '—'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  {isEditing ? (
                    <input
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition"
                      type="email"
                      value={editData.email || ''}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      placeholder="Ex: contato@empresa.com.br"
                      required
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.email || '—'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefone *</label>
                  {isEditing ? (
                    <input
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition"
                      value={editData.phone || ''}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      placeholder="Ex: (11) 3000-0000"
                      required
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.phone || '—'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Segmento</label>
                  {isEditing ? (
                    <input
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition"
                      value={editData.segment || ''}
                      onChange={(e) => setEditData({ ...editData, segment: e.target.value })}
                      placeholder="Ex: Tecnologia / SaaS"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.segment || '—'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Número de Funcionários</label>
                  {isEditing ? (
                    <input
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition"
                      value={editData.employees || ''}
                      onChange={(e) => setEditData({ ...editData, employees: e.target.value })}
                      placeholder="Ex: 50-100"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.employees || '—'}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  {isEditing ? (
                    <input
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition"
                      value={editData.website || ''}
                      onChange={(e) => setEditData({ ...editData, website: e.target.value })}
                      placeholder="Ex: www.empresa.com.br"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.website || '—'}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
                  {isEditing ? (
                    <input
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition"
                      value={editData.address || ''}
                      onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                      placeholder="Ex: Av. Paulista, 1000 - São Paulo, SP"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{profile.address || '—'}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sobre a Empresa</label>
                  {isEditing ? (
                    <textarea
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF9500] transition"
                      rows={4}
                      value={editData.about || ''}
                      onChange={(e) => setEditData({ ...editData, about: e.target.value })}
                      placeholder="Descreva sua empresa..."
                    />
                  ) : (
                    <p className="text-gray-800 whitespace-pre-wrap bg-gray-50 p-3 rounded-lg">{profile.about || '—'}</p>
                  )}
                </div>
              </div>

              {/* Buttons */}
              {isEditing && (
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 bg-[#FF9500] text-white py-3 rounded-lg font-semibold hover:bg-[#e68a00] transition disabled:opacity-50"
                  >
                    {isSaving ? 'Salvando...' : '✓ Salvar Alterações'}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false)
                      setEditData(profile)
                    }}
                    className="flex-1 bg-gray-400 text-white py-3 rounded-lg font-semibold hover:bg-gray-500 transition"
                  >
                    ✕ Cancelar
                  </button>
                </div>
              )}

              <p className="text-xs text-gray-500 mt-4">
                * Campos obrigatórios
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

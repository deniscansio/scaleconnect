'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function AdminCandidateDetailPage() {
  const params = useParams()
  const id = params.id
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/admin/candidates/${id}`)
        if (!response.ok) throw new Error('Falha ao buscar perfil')
        const data = await response.json()
        setProfile(data)
      } catch (error) {
        console.error('Erro:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [id])

  if (loading) return <div className="min-h-screen bg-gray-900 text-white p-8">Carregando perfil...</div>
  if (!profile) return <div className="min-h-screen bg-gray-900 text-white p-8">Candidato não encontrado.</div>

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <Link href="/admin/candidates" className="text-yellow-400 hover:underline">
            ← Voltar para lista
          </Link>
          <h1 className="text-3xl font-bold text-white">Perfil do Candidato</h1>
        </div>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex items-center gap-6 mb-8 border-b pb-8">
              <img
                src={profile.profilePhoto || '/default-profile.jpg'}
                alt="Foto"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{profile.fullName}</h2>
                <p className="text-gray-500">{profile.email}</p>
                <span className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  profile.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {profile.isActive ? 'Conta Ativa' : 'Conta Bloqueada'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">Telefone</label>
                <p className="text-gray-900 font-medium">{profile.phone || '—'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Idade</label>
                <p className="text-gray-900 font-medium">{profile.age || '—'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Cargo Atual</label>
                <p className="text-gray-900 font-medium">{profile.currentPosition || '—'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Empresa Atual</label>
                <p className="text-gray-900 font-medium">{profile.currentCompany || '—'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Anos de Experiência</label>
                <p className="text-gray-900 font-medium">{profile.yearsOfExperience || '—'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">LinkedIn</label>
                {profile.linkedinUrl ? (
                  <a href={profile.linkedinUrl} target="_blank" className="text-blue-600 hover:underline block">
                    Ver LinkedIn
                  </a>
                ) : <p className="text-gray-900 font-medium">—</p>}
              </div>
            </div>

            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-500 mb-2">Bio</label>
              <div className="bg-gray-50 p-4 rounded-lg text-gray-700 whitespace-pre-wrap">
                {profile.bio || 'Nenhuma bio cadastrada.'}
              </div>
            </div>

            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-500 mb-2">Habilidades</label>
              <div className="flex flex-wrap gap-2">
                {profile.skills ? profile.skills.split(',').map((skill: string, i: number) => (
                  <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm">
                    {skill.trim()}
                  </span>
                )) : <p className="text-gray-400">Nenhuma habilidade listada.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

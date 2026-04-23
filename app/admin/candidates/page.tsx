'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function AdminCandidatesPage() {
  const [candidates, setCandidates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('Todos')

  const fetchCandidates = async () => {
    try {
      const response = await fetch('/api/admin/candidates')
      if (!response.ok) throw new Error('Falha ao buscar dados')
      const data = await response.json()
      setCandidates(data)
    } catch (error) {
      console.error('Erro ao buscar candidatos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCandidates()
  }, [])

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = (candidate.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'Todos' || candidate.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleToggleBlock = async (id: number, currentStatus: string) => {
    const isBlocking = currentStatus === 'Ativo'
    const confirmMsg = isBlocking 
      ? 'Tem certeza que deseja BLOQUEAR este candidato?' 
      : 'Deseja ATIVAR este candidato?'
    
    if (!confirm(confirmMsg)) return

    try {
      const response = await fetch(`/api/admin/candidates/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isBlocking })
      })

      if (response.ok) {
        // Recarrega a lista para garantir sincronia com o banco
        fetchCandidates()
      } else {
        alert('Erro ao atualizar status no servidor')
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro na comunicação com o servidor')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Navigation */}
      <nav className="bg-black shadow-lg border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-yellow-400">🔐 ScaleConnect Admin</div>
          <div className="flex gap-4">
            <Link href="/login" className="text-white font-semibold hover:text-yellow-400">
              Logout
            </Link>
          </div>
        </div>
      </nav>

      {/* Sidebar + Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 bg-gray-950 shadow-lg min-h-screen p-6 border-r border-gray-700">
          <nav className="space-y-4">
            <Link href="/admin/dashboard" className="block px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg">
              📊 Dashboard
            </Link>
            <Link href="/admin/companies" className="block px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg">
              🏢 Gerenciar Empresas
            </Link>
            <Link href="/admin/candidates" className="block px-4 py-3 bg-yellow-400 text-black rounded-lg font-semibold">
              👥 Gerenciar Candidatos
            </Link>
            <Link href="/admin/partners" className="block px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg">
              🎓 Gerenciar Parceiros
            </Link>
            <Link href="/admin/subscriptions" className="block px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg">
              💳 Assinaturas
            </Link>
            <Link href="/admin/payments" className="block px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg">
              💰 Pagamentos
            </Link>
            <Link href="/admin/analytics" className="block px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg">
              📈 Analytics
            </Link>
            <Link href="/admin/settings" className="block px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg">
              ⚙️ Configurações
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">👥 Gerenciar Candidatos</h1>
              <p className="text-gray-400">
                {loading ? 'Carregando candidatos...' : `Total de ${candidates.length} candidatos cadastrados`}
              </p>
            </div>

            {/* Filters */}
            <div className="mb-6 flex gap-4">
              <input
                type="text"
                placeholder="Buscar candidato..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-yellow-400 outline-none"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-yellow-400 outline-none"
              >
                <option>Todos</option>
                <option>Ativo</option>
                <option>Bloqueado</option>
              </select>
            </div>

            {/* Candidates Table */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              {loading ? (
                <div className="p-12 text-center text-gray-400 animate-pulse">Buscando dados no TiDB...</div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-900 border-b border-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-gray-300 font-semibold">Nome</th>
                      <th className="px-6 py-4 text-left text-gray-300 font-semibold">Email</th>
                      <th className="px-6 py-4 text-left text-gray-300 font-semibold">Status</th>
                      <th className="px-6 py-4 text-left text-gray-300 font-semibold">Data de Entrada</th>
                      <th className="px-6 py-4 text-left text-gray-300 font-semibold text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCandidates.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Nenhum candidato encontrado.</td>
                      </tr>
                    ) : (
                      filteredCandidates.map((candidate) => (
                        <tr key={candidate.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                          <td className="px-6 py-4 text-white font-semibold">{candidate.name}</td>
                          <td className="px-6 py-4 text-gray-300">{candidate.email}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              candidate.status === 'Ativo' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'
                            }`}>
                              {candidate.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-300">{candidate.joinDate}</td>
                          <td className="px-6 py-4 flex justify-center gap-3">
                            <button
                              onClick={() => handleToggleBlock(candidate.id, candidate.status)}
                              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition shadow-sm ${
                                candidate.status === 'Ativo' 
                                  ? 'bg-red-600 text-white hover:bg-red-700' 
                                  : 'bg-green-600 text-white hover:bg-green-700'
                              }`}
                            >
                              {candidate.status === 'Ativo' ? 'Bloquear' : 'Ativar'}
                            </button>
                            <Link 
                              href={`/admin/candidates/${candidate.id}`}
                              className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition shadow-sm"
                            >
                              Ver Perfil
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

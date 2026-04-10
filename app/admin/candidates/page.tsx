'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function AdminCandidatesPage() {
  const [candidates, setCandidates] = useState([
    { id: 1, name: 'João Silva', email: 'joao@email.com', status: 'Ativo', joinDate: '2024-01-20', earnings: 'R$ 2.500', level: 'MID' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', status: 'Ativo', joinDate: '2024-02-15', earnings: 'R$ 5.800', level: 'SENIOR' },
    { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', status: 'Inativo', joinDate: '2024-03-05', earnings: 'R$ 1.200', level: 'JUNIOR' },
    { id: 4, name: 'Ana Oliveira', email: 'ana@email.com', status: 'Ativo', joinDate: '2024-03-20', earnings: 'R$ 3.450', level: 'MID' },
    { id: 5, name: 'Carlos Mendes', email: 'carlos@email.com', status: 'Pendente', joinDate: '2024-04-01', earnings: 'R$ 0', level: 'JUNIOR' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('Todos')

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'Todos' || candidate.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleBlockCandidate = (id: number) => {
    setCandidates(candidates.map(c => c.id === id ? { ...c, status: 'Bloqueado' } : c))
  }

  const handleActivateCandidate = (id: number) => {
    setCandidates(candidates.map(c => c.id === id ? { ...c, status: 'Ativo' } : c))
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
              <p className="text-gray-400">Total de {candidates.length} candidatos cadastrados</p>
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
                <option>Inativo</option>
                <option>Bloqueado</option>
                <option>Pendente</option>
              </select>
            </div>

            {/* Candidates Table */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-900 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Nome</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Email</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Nível</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Data de Entrada</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Ganhos</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.map((candidate) => (
                    <tr key={candidate.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                      <td className="px-6 py-4 text-white font-semibold">{candidate.name}</td>
                      <td className="px-6 py-4 text-gray-300">{candidate.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          candidate.status === 'Ativo' ? 'bg-green-500 text-white' :
                          candidate.status === 'Inativo' ? 'bg-gray-500 text-white' :
                          candidate.status === 'Bloqueado' ? 'bg-red-500 text-white' :
                          'bg-yellow-500 text-black'
                        }`}>
                          {candidate.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{candidate.level}</td>
                      <td className="px-6 py-4 text-gray-300">{candidate.joinDate}</td>
                      <td className="px-6 py-4 text-yellow-400 font-semibold">{candidate.earnings}</td>
                      <td className="px-6 py-4 flex gap-2">
                        {candidate.status === 'Inativo' && (
                          <button
                            onClick={() => handleActivateCandidate(candidate.id)}
                            className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                          >
                            Ativar
                          </button>
                        )}
                        {candidate.status === 'Ativo' && (
                          <button
                            onClick={() => handleBlockCandidate(candidate.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                          >
                            Bloquear
                          </button>
                        )}
                        <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">
                          Ver Perfil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

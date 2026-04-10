'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function CompanyProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [company, setCompany] = useState({
    name: 'Tech Innovations Brasil',
    cnpj: '12.345.678/0001-90',
    razaoSocial: 'Tech Innovations Brasil Ltda',
    nomeFantasia: 'Tech Innovations',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    email: 'contato@techinnovations.com.br',
    phone: '(11) 3000-0000',
    website: 'www.techinnovations.com.br',
    employees: '50-100',
    segment: 'Tecnologia / SaaS',
    description: 'Empresa líder em soluções de software para gestão empresarial',
    logo: '🏢',
  })

  const [formData, setFormData] = useState(company)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setCompany(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(company)
    setIsEditing(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-company-light to-slate-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b-4 border-company-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-company-primary">ScaleConnect</div>
          <Link href="/empresa/dashboard" className="text-company-primary font-semibold hover:underline">
            ← Voltar ao Dashboard
          </Link>
        </div>
      </nav>

      {/* Sidebar + Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-screen p-6">
          <nav className="space-y-4">
            <Link href="/empresa/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📊 Dashboard
            </Link>
            <Link href="/empresa/jobs" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📋 Vagas
            </Link>
            <Link href="/empresa/opportunities" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              💼 Geração de Demanda
            </Link>
            <Link href="/empresa/leads" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📞 CRM de Leads
            </Link>
            <Link href="/empresa/metrics" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📈 Métricas
            </Link>
            <Link href="/empresa/billing" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              💳 Faturamento
            </Link>
            <Link href="/empresa/profile" className="block px-4 py-2 bg-company-primary text-white rounded-lg font-semibold">
              ⚙️ Perfil da Empresa
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">⚙️ Perfil da Empresa</h1>
                <p className="text-gray-600">Gerencie as informações da sua empresa</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  isEditing
                    ? 'bg-gray-500 text-white hover:bg-gray-600'
                    : 'bg-company-primary text-white hover:bg-opacity-90'
                }`}
              >
                {isEditing ? '✕ Cancelar' : '✏️ Editar'}
              </button>
            </div>

            {/* Company Info Card */}
            <div className="card bg-white mb-8">
              <div className="flex items-start gap-6 mb-8 pb-8 border-b">
                <div className="text-6xl">{company.logo}</div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{company.nomeFantasia}</h2>
                  <p className="text-gray-600 mb-4">{company.razaoSocial}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">CNPJ</p>
                      <p className="font-semibold text-gray-900">{company.cnpj}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Segmento</p>
                      <p className="font-semibold text-gray-900">{company.segment}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Funcionários</p>
                      <p className="font-semibold text-gray-900">{company.employees}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Website</p>
                      <p className="font-semibold text-company-primary">{company.website}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid md:grid-cols-3 gap-6 mb-8 pb-8 border-b">
                <div>
                  <p className="text-sm text-gray-600 mb-2">📧 Email</p>
                  <p className="font-semibold text-gray-900">{company.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">📞 Telefone</p>
                  <p className="font-semibold text-gray-900">{company.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">📍 Endereço</p>
                  <p className="font-semibold text-gray-900">{company.address}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Sobre a Empresa</p>
                <p className="text-gray-900">{company.description}</p>
              </div>
            </div>

            {/* Edit Form */}
            {isEditing && (
              <div className="card bg-white">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Editar Informações</h3>
                
                <div className="space-y-6">
                  {/* Row 1 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Nome Fantasia</label>
                      <input
                        type="text"
                        name="nomeFantasia"
                        value={formData.nomeFantasia}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-company-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Razão Social</label>
                      <input
                        type="text"
                        name="razaoSocial"
                        value={formData.razaoSocial}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-company-primary"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">CNPJ</label>
                      <input
                        type="text"
                        name="cnpj"
                        value={formData.cnpj}
                        onChange={handleChange}
                        placeholder="XX.XXX.XXX/0001-XX"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-company-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Segmento</label>
                      <select
                        name="segment"
                        value={formData.segment}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-company-primary"
                      >
                        <option>Tecnologia / SaaS</option>
                        <option>Consultoria</option>
                        <option>Educação</option>
                        <option>Varejo</option>
                        <option>Serviços Financeiros</option>
                        <option>Outro</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Número de Funcionários</label>
                      <select
                        name="employees"
                        value={formData.employees}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-company-primary"
                      >
                        <option>1-10</option>
                        <option>11-50</option>
                        <option>50-100</option>
                        <option>100-500</option>
                        <option>500+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Website</label>
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-company-primary"
                      />
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-company-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Telefone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-company-primary"
                      />
                    </div>
                  </div>

                  {/* Row 5 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Endereço</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-company-primary"
                    />
                  </div>

                  {/* Row 6 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Sobre a Empresa</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-company-primary"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-6 border-t">
                    <button
                      onClick={handleSave}
                      className="flex-1 px-6 py-3 bg-company-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
                    >
                      ✓ Salvar Alterações
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                    >
                      ✕ Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

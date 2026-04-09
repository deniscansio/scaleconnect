'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [saved, setSaved] = useState(false)

  const [settings, setSettings] = useState({
    // General
    companyName: 'ScaleConnect',
    companyNameFantasy: 'ScaleConnect - Plataforma SaaS',
    cnpj: '12.345.678/0001-90',
    legalName: 'ScaleConnect Tecnologia LTDA',
    
    // Contact
    email: 'contato@scaleconnect.com.br',
    phone: '(11) 98765-4321',
    website: 'www.scaleconnect.com.br',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    
    // Legal
    copyright: '© 2024 ScaleConnect. Todos os direitos reservados.',
    privacyUrl: 'https://scaleconnect.com.br/privacidade',
    termsUrl: 'https://scaleconnect.com.br/termos',
    supportEmail: 'suporte@scaleconnect.com.br',
    
    // Payment
    stripeKey: 'sk_live_xxxxxxxxxxxxxx',
    pagSeguroToken: 'xxxxxxxxxxxxx',
    platformFee: '15',
    
    // Email
    smtpServer: 'smtp.gmail.com',
    smtpPort: '587',
    smtpEmail: 'noreply@scaleconnect.com.br',
    smtpPassword: '••••••••••',
  })

  const handleInputChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Navigation */}
      <nav className="bg-black shadow-lg border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-yellow-400">🔐 ScaleConnect Admin</div>
          <Link href="/admin/dashboard" className="text-white font-semibold hover:text-yellow-400">
            ← Voltar ao Dashboard
          </Link>
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
            <Link href="/admin/candidates" className="block px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg">
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
            <Link href="/admin/settings" className="block px-4 py-3 bg-yellow-400 text-black rounded-lg font-semibold">
              ⚙️ Configurações
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">⚙️ Configurações da Plataforma</h1>
              <p className="text-gray-400">Gerencie as informações e configurações da ScaleConnect</p>
            </div>

            {/* Success Message */}
            {saved && (
              <div className="mb-6 p-4 bg-green-900 border border-green-700 text-green-200 rounded-lg">
                ✅ Configurações salvas com sucesso!
              </div>
            )}

            {/* Tabs */}
            <div className="flex gap-2 mb-8 border-b border-gray-700 overflow-x-auto">
              <button
                onClick={() => setActiveTab('general')}
                className={`px-6 py-3 font-semibold border-b-4 transition whitespace-nowrap ${
                  activeTab === 'general'
                    ? 'border-yellow-400 text-yellow-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                📋 Geral
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`px-6 py-3 font-semibold border-b-4 transition whitespace-nowrap ${
                  activeTab === 'contact'
                    ? 'border-yellow-400 text-yellow-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                📞 Contato
              </button>
              <button
                onClick={() => setActiveTab('legal')}
                className={`px-6 py-3 font-semibold border-b-4 transition whitespace-nowrap ${
                  activeTab === 'legal'
                    ? 'border-yellow-400 text-yellow-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                ⚖️ Legal
              </button>
              <button
                onClick={() => setActiveTab('payment')}
                className={`px-6 py-3 font-semibold border-b-4 transition whitespace-nowrap ${
                  activeTab === 'payment'
                    ? 'border-yellow-400 text-yellow-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                💳 Pagamentos
              </button>
              <button
                onClick={() => setActiveTab('email')}
                className={`px-6 py-3 font-semibold border-b-4 transition whitespace-nowrap ${
                  activeTab === 'email'
                    ? 'border-yellow-400 text-yellow-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                📧 Email
              </button>
            </div>

            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Informações Gerais</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Nome da Empresa</label>
                    <input
                      type="text"
                      value={settings.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Nome Fantasia</label>
                    <input
                      type="text"
                      value={settings.companyNameFantasy}
                      onChange={(e) => handleInputChange('companyNameFantasy', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">CNPJ</label>
                    <input
                      type="text"
                      value={settings.cnpj}
                      onChange={(e) => handleInputChange('cnpj', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Razão Social</label>
                    <input
                      type="text"
                      value={settings.legalName}
                      onChange={(e) => handleInputChange('legalName', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Endereço</label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Contact Settings */}
            {activeTab === 'contact' && (
              <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Informações de Contato</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Email Principal</label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Telefone</label>
                    <input
                      type="tel"
                      value={settings.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Website</label>
                    <input
                      type="url"
                      value={settings.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Email de Suporte</label>
                    <input
                      type="email"
                      value={settings.supportEmail}
                      onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Legal Settings */}
            {activeTab === 'legal' && (
              <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Informações Legais</h2>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Direitos Autorais</label>
                  <input
                    type="text"
                    value={settings.copyright}
                    onChange={(e) => handleInputChange('copyright', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">URL Política de Privacidade</label>
                    <input
                      type="url"
                      value={settings.privacyUrl}
                      onChange={(e) => handleInputChange('privacyUrl', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">URL Termos de Serviço</label>
                    <input
                      type="url"
                      value={settings.termsUrl}
                      onChange={(e) => handleInputChange('termsUrl', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Payment Settings */}
            {activeTab === 'payment' && (
              <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Configurações de Pagamento</h2>
                
                <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg mb-6">
                  <p className="text-yellow-200 text-sm">⚠️ Guarde suas chaves de API com segurança. Nunca compartilhe com terceiros.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Chave Stripe</label>
                    <input
                      type="password"
                      value={settings.stripeKey}
                      onChange={(e) => handleInputChange('stripeKey', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Token PagSeguro</label>
                    <input
                      type="password"
                      value={settings.pagSeguroToken}
                      onChange={(e) => handleInputChange('pagSeguroToken', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Taxa da Plataforma (%)</label>
                  <input
                    type="number"
                    value={settings.platformFee}
                    onChange={(e) => handleInputChange('platformFee', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none"
                  />
                  <p className="text-xs text-gray-400 mt-2">Percentual cobrado em cada transação (padrão: 15%)</p>
                </div>
              </div>
            )}

            {/* Email Settings */}
            {activeTab === 'email' && (
              <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Configurações de Email</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Servidor SMTP</label>
                    <input
                      type="text"
                      value={settings.smtpServer}
                      onChange={(e) => handleInputChange('smtpServer', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Porta SMTP</label>
                    <input
                      type="number"
                      value={settings.smtpPort}
                      onChange={(e) => handleInputChange('smtpPort', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Email SMTP</label>
                    <input
                      type="email"
                      value={settings.smtpEmail}
                      onChange={(e) => handleInputChange('smtpEmail', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Senha SMTP</label>
                    <input
                      type="password"
                      value={settings.smtpPassword}
                      onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleSave}
                className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition"
              >
                💾 Salvar Configurações
              </button>
              <button className="px-8 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition">
                🔄 Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

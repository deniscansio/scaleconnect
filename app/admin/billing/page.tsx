'use client';

import { useState } from 'react';

export default function AdminBillingPage() {
  const [billingData] = useState({
    monthlyRevenue: 24925,
    totalCompanies: 25,
    activeSubscriptions: 23,
    pendingPayments: 2,
    totalEarnings: 124625,
    
    companies: [
      {
        id: 1,
        name: 'Tech Solutions',
        plan: 'Growth',
        price: 997,
        users: 5,
        maxUsers: 10,
        status: 'Ativo',
        paymentStatus: 'Pago',
        nextBillingDate: '2024-05-01',
        joinDate: '2024-01-15',
        stripeCustomerId: 'cus_123456',
      },
      {
        id: 2,
        name: 'Digital Marketing Pro',
        plan: 'Scale',
        price: 1997,
        users: 12,
        maxUsers: 999,
        status: 'Ativo',
        paymentStatus: 'Pago',
        nextBillingDate: '2024-05-02',
        joinDate: '2023-11-20',
        stripeCustomerId: 'cus_234567',
      },
      {
        id: 3,
        name: 'Sales Force Inc',
        plan: 'Basic',
        price: 497,
        users: 2,
        maxUsers: 3,
        status: 'Ativo',
        paymentStatus: 'Pendente',
        nextBillingDate: '2024-04-28',
        joinDate: '2024-02-01',
        stripeCustomerId: 'cus_345678',
      },
      {
        id: 4,
        name: 'Enterprise Corp',
        plan: 'Scale',
        price: 1997,
        users: 25,
        maxUsers: 999,
        status: 'Bloqueado',
        paymentStatus: 'Atrasado',
        nextBillingDate: '2024-04-15',
        joinDate: '2023-09-10',
        stripeCustomerId: 'cus_456789',
      },
    ],

    revenueHistory: [
      { month: 'Janeiro', revenue: 4970, companies: 10 },
      { month: 'Fevereiro', revenue: 9970, companies: 15 },
      { month: 'Março', revenue: 14955, companies: 20 },
      { month: 'Abril', revenue: 24925, companies: 25 },
    ],

    stripeConfig: {
      apiKey: 'sk_test_51234567890abcdef',
      webhookSecret: 'whsec_1234567890abcdef',
      isConfigured: true,
    },
  });

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">💳 Faturamento e Assinaturas</h1>
          <p className="text-gray-400">Gerencie receitas, assinaturas e pagamentos da plataforma</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Monthly Revenue */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 text-white shadow-lg">
            <p className="text-sm opacity-90 mb-2">💰 Receita Mensal</p>
            <p className="text-3xl font-bold">R$ {billingData.monthlyRevenue.toLocaleString('pt-BR')}</p>
            <p className="text-xs opacity-75 mt-2">+15% vs mês anterior</p>
          </div>

          {/* Total Earnings */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white shadow-lg">
            <p className="text-sm opacity-90 mb-2">📊 Ganhos Totais</p>
            <p className="text-3xl font-bold">R$ {billingData.totalEarnings.toLocaleString('pt-BR')}</p>
            <p className="text-xs opacity-75 mt-2">Desde o início</p>
          </div>

          {/* Active Subscriptions */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-6 text-white shadow-lg">
            <p className="text-sm opacity-90 mb-2">✅ Assinaturas Ativas</p>
            <p className="text-3xl font-bold">{billingData.activeSubscriptions}/{billingData.totalCompanies}</p>
            <p className="text-xs opacity-75 mt-2">{billingData.totalCompanies - billingData.activeSubscriptions} pendentes</p>
          </div>

          {/* Pending Payments */}
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg p-6 text-white shadow-lg">
            <p className="text-sm opacity-90 mb-2">⚠️ Pagamentos Pendentes</p>
            <p className="text-3xl font-bold">{billingData.pendingPayments}</p>
            <p className="text-xs opacity-75 mt-2">Ação necessária</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'overview'
                ? 'text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            📈 Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('companies')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'companies'
                ? 'text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🏢 Empresas
          </button>
          <button
            onClick={() => setActiveTab('stripe')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'stripe'
                ? 'text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🔐 Stripe
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Revenue Chart */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-6">📊 Receita por Mês</h2>
              <div className="space-y-4">
                {billingData.revenueHistory.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-24 text-gray-400">{item.month}</div>
                    <div className="flex-1 bg-gray-700 rounded-full h-8 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-green-500 to-green-600 h-full flex items-center justify-end pr-4"
                        style={{ width: `${(item.revenue / 25000) * 100}%` }}
                      >
                        <span className="text-white font-semibold text-sm">R$ {item.revenue.toLocaleString('pt-BR')}</span>
                      </div>
                    </div>
                    <div className="w-32 text-right text-gray-400">{item.companies} empresas</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">📦 Plano Basic</h3>
                <p className="text-3xl font-bold text-blue-400 mb-2">R$ 497/mês</p>
                <p className="text-gray-400">8 empresas ativas</p>
                <p className="text-sm text-gray-500 mt-2">Até 3 usuários</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">📦 Plano Growth</h3>
                <p className="text-3xl font-bold text-purple-400 mb-2">R$ 997/mês</p>
                <p className="text-gray-400">12 empresas ativas</p>
                <p className="text-sm text-gray-500 mt-2">Até 10 usuários</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">📦 Plano Scale</h3>
                <p className="text-3xl font-bold text-green-400 mb-2">R$ 1.997/mês</p>
                <p className="text-gray-400">5 empresas ativas</p>
                <p className="text-sm text-gray-500 mt-2">Usuários ilimitados</p>
              </div>
            </div>
          </div>
        )}

        {/* Companies Tab */}
        {activeTab === 'companies' && (
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-semibold">Empresa</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Plano</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Preço</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Usuários</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Pagamento</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Próx. Cobrança</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {billingData.companies.map((company) => (
                    <tr key={company.id} className="hover:bg-gray-750 transition">
                      <td className="px-6 py-4 text-white font-semibold">{company.name}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          company.plan === 'Basic' ? 'bg-blue-900 text-blue-200' :
                          company.plan === 'Growth' ? 'bg-purple-900 text-purple-200' :
                          'bg-green-900 text-green-200'
                        }`}>
                          {company.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white">R$ {company.price.toLocaleString('pt-BR')}</td>
                      <td className="px-6 py-4 text-white">
                        {company.users}/{company.maxUsers === 999 ? '∞' : company.maxUsers}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          company.status === 'Ativo' ? 'bg-green-900 text-green-200' :
                          'bg-red-900 text-red-200'
                        }`}>
                          {company.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          company.paymentStatus === 'Pago' ? 'bg-green-900 text-green-200' :
                          company.paymentStatus === 'Pendente' ? 'bg-yellow-900 text-yellow-200' :
                          'bg-red-900 text-red-200'
                        }`}>
                          {company.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{company.nextBillingDate}</td>
                      <td className="px-6 py-4">
                        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold">
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Stripe Tab */}
        {activeTab === 'stripe' && (
          <div className="space-y-6">
            {/* Stripe Status */}
            <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6 border border-purple-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">🔐 Configuração Stripe</h2>
                <span className={`px-4 py-2 rounded-full font-semibold ${
                  billingData.stripeConfig.isConfigured
                    ? 'bg-green-600 text-white'
                    : 'bg-red-600 text-white'
                }`}>
                  {billingData.stripeConfig.isConfigured ? '✅ Conectado' : '❌ Não Configurado'}
                </span>
              </div>
              <p className="text-gray-300">
                Stripe é integrado para cobrar automaticamente as assinaturas das empresas.
              </p>
            </div>

            {/* Stripe Keys */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">🔑 Chaves de API</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Chave Secreta (Secret Key)</label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={billingData.stripeConfig.apiKey}
                      readOnly
                      className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
                      📋 Copiar
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Webhook Secret</label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={billingData.stripeConfig.webhookSecret}
                      readOnly
                      className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
                      📋 Copiar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stripe Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">✅ Recursos Habilitados</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> Cobrança automática mensal
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> Cartão de crédito
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> Webhooks de pagamento
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> Reembolsos automáticos
                  </li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">📞 Suporte Stripe</h3>
                <p className="text-gray-300 mb-4">
                  Para configurar ou atualizar suas chaves Stripe, acesse:
                </p>
                <a
                  href="https://dashboard.stripe.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  🔗 Ir para Stripe Dashboard
                </a>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">💳 Métodos de Pagamento</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-700 rounded-lg p-4 text-center">
                  <p className="text-2xl mb-2">💳</p>
                  <p className="font-semibold text-white">Cartão de Crédito</p>
                  <p className="text-sm text-gray-400">Visa, Mastercard, Amex</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 text-center">
                  <p className="text-2xl mb-2">🏦</p>
                  <p className="font-semibold text-white">Débito Bancário</p>
                  <p className="text-sm text-gray-400">ACH (USA), SEPA (EU)</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 text-center">
                  <p className="text-2xl mb-2">💰</p>
                  <p className="font-semibold text-white">Wallets</p>
                  <p className="text-sm text-gray-400">Apple Pay, Google Pay</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

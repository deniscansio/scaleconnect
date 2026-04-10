'use client';

import { useState } from 'react';

export default function CompanySubscriptionPage() {
  const [currentPlan] = useState({
    name: 'Growth',
    price: 997,
    billingCycle: 'monthly',
    nextBillingDate: '2024-05-02',
    status: 'Ativo',
    features: {
      maxUsers: 10,
      maxJobs: 20,
      maxLeads: 200,
      maxOpportunities: 5,
      supportLevel: 'Email',
      analytics: true,
      customBranding: false,
    },
  });

  const [currentUsers] = useState([
    { id: 1, name: 'Maria Silva', email: 'maria@company.com', role: 'Gerente RH', status: 'Ativo', joinDate: '2024-01-15' },
    { id: 2, name: 'João Santos', email: 'joao@company.com', role: 'Vendedor', status: 'Ativo', joinDate: '2024-01-20' },
    { id: 3, name: 'Pedro Costa', email: 'pedro@company.com', role: 'Vendedor', status: 'Ativo', joinDate: '2024-02-01' },
    { id: 4, name: 'Ana Oliveira', email: 'ana@company.com', role: 'Analista', status: 'Ativo', joinDate: '2024-02-10' },
    { id: 5, name: 'Carlos Mendes', email: 'carlos@company.com', role: 'Vendedor', status: 'Inativo', joinDate: '2024-02-15' },
  ]);

  const [plans] = useState([
    {
      name: 'Basic',
      price: 497,
      users: 3,
      jobs: 5,
      leads: 50,
      opportunities: 2,
      support: 'Email',
      description: 'Ideal para pequenas equipes',
    },
    {
      name: 'Growth',
      price: 997,
      users: 10,
      jobs: 20,
      leads: 200,
      opportunities: 5,
      support: 'Email + Chat',
      description: 'Ideal para equipes em crescimento',
      current: true,
    },
    {
      name: 'Scale',
      price: 1997,
      users: 999,
      jobs: 999,
      leads: 999,
      opportunities: 999,
      support: 'Prioritário 24/7',
      description: 'Ideal para empresas grandes',
    },
  ]);

  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Vendedor' });

  const usersUsed = currentUsers.filter(u => u.status === 'Ativo').length;
  const usersPercentage = (usersUsed / currentPlan.features.maxUsers) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-company-light to-slate-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b-4 border-company-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-company-primary">ScaleConnect</div>
          <div className="text-gray-600">Empresa Dashboard</div>
        </div>
      </nav>

      {/* Sidebar + Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-screen p-6">
          <nav className="space-y-4">
            <a href="/empresa/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📊 Dashboard
            </a>
            <a href="/empresa/jobs" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📋 Vagas
            </a>
            <a href="/empresa/leads" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📞 CRM de Leads
            </a>
            <a href="/empresa/opportunities" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              💼 Representação
            </a>
            <a href="/empresa/subscription" className="block px-4 py-2 bg-company-primary text-white rounded-lg font-semibold">
              💳 Assinatura
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">💳 Sua Assinatura</h1>
              <p className="text-gray-600">Gerencie seu plano, usuários e faturamento</p>
            </div>

            {/* Current Plan Card */}
            <div className="bg-gradient-to-r from-company-primary to-company-secondary text-white rounded-lg p-8 mb-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-sm opacity-90 mb-2">Plano Atual</p>
                  <p className="text-4xl font-bold">{currentPlan.name}</p>
                  <p className="text-sm opacity-75 mt-2">R$ {currentPlan.price}/mês</p>
                </div>
                <div>
                  <p className="text-sm opacity-90 mb-2">Status</p>
                  <p className="text-2xl font-bold">✅ {currentPlan.status}</p>
                  <p className="text-sm opacity-75 mt-2">Próxima cobrança: {currentPlan.nextBillingDate}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90 mb-2">Usuários</p>
                  <p className="text-2xl font-bold">{usersUsed}/{currentPlan.features.maxUsers}</p>
                  <p className="text-sm opacity-75 mt-2">{currentPlan.features.maxUsers - usersUsed} disponíveis</p>
                </div>
              </div>
            </div>

            {/* Usage Bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-gray-900">Usuários</p>
                  <p className="text-sm text-gray-600">{usersUsed}/{currentPlan.features.maxUsers}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full transition ${
                      usersPercentage > 90 ? 'bg-red-500' :
                      usersPercentage > 70 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(usersPercentage, 100)}%` }}
                  />
                </div>
                {usersPercentage > 90 && (
                  <p className="text-sm text-red-600 mt-2">⚠️ Limite próximo! Considere fazer upgrade.</p>
                )}
              </div>

              <div className="bg-white rounded-lg p-6 shadow">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-gray-900">Vagas Publicadas</p>
                  <p className="text-sm text-gray-600">3/{currentPlan.features.maxJobs}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: '15%' }}
                  />
                </div>
              </div>
            </div>

            {/* Users Management */}
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="border-b p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">👥 Gerenciar Usuários</h2>
                <button
                  onClick={() => setShowAddUser(!showAddUser)}
                  className="px-6 py-2 bg-company-primary text-white rounded-lg font-semibold hover:bg-opacity-90"
                >
                  ➕ Adicionar Usuário
                </button>
              </div>

              {showAddUser && (
                <div className="p-6 bg-gray-50 border-b">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Nome completo"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-company-primary"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-company-primary"
                    />
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-company-primary"
                    >
                      <option value="Gerente RH">Gerente RH</option>
                      <option value="Vendedor">Vendedor</option>
                      <option value="Analista">Analista</option>
                      <option value="Gerente Comercial">Gerente Comercial</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">
                      ✅ Convidar
                    </button>
                    <button
                      onClick={() => setShowAddUser(false)}
                      className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400"
                    >
                      ❌ Cancelar
                    </button>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nome</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Função</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Entrada</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {currentUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 text-gray-600">{user.email}</td>
                        <td className="px-6 py-4 text-gray-600">{user.role}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            user.status === 'Ativo'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{user.joinDate}</td>
                        <td className="px-6 py-4">
                          <button className="text-red-600 hover:text-red-800 font-semibold">Remover</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Plans Comparison */}
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📦 Comparar Planos</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-6 py-3 text-left font-semibold text-gray-900">Recurso</th>
                      {plans.map((plan) => (
                        <th key={plan.name} className="px-6 py-3 text-center font-semibold text-gray-900">
                          {plan.name}
                          {plan.current && <p className="text-sm text-company-primary">✓ Atual</p>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-6 py-3 font-semibold text-gray-900">Preço/Mês</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="px-6 py-3 text-center text-gray-600">
                          R$ {plan.price.toLocaleString('pt-BR')}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-semibold text-gray-900">Usuários</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="px-6 py-3 text-center text-gray-600">
                          {plan.users === 999 ? 'Ilimitado' : plan.users}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-semibold text-gray-900">Vagas</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="px-6 py-3 text-center text-gray-600">
                          {plan.jobs === 999 ? 'Ilimitado' : plan.jobs}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-semibold text-gray-900">Leads</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="px-6 py-3 text-center text-gray-600">
                          {plan.leads === 999 ? 'Ilimitado' : plan.leads}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-semibold text-gray-900">Suporte</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="px-6 py-3 text-center text-gray-600">
                          {plan.support}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-3 font-semibold text-gray-900">Ação</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="px-6 py-3 text-center">
                          {plan.current ? (
                            <span className="text-gray-600">Plano Atual</span>
                          ) : (
                            <button className="px-4 py-2 bg-company-primary text-white rounded-lg font-semibold hover:bg-opacity-90">
                              {plan.price > currentPlan.price ? 'Fazer Upgrade' : 'Fazer Downgrade'}
                            </button>
                          )}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

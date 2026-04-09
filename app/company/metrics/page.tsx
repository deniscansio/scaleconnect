'use client'

import Link from 'next/link'

export default function CompanyMetricsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-company-light to-slate-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b-4 border-company-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-company-primary">ScaleConnect</div>
          <Link href="/company/dashboard" className="text-company-primary font-semibold hover:underline">
            ← Voltar ao Dashboard
          </Link>
        </div>
      </nav>

      {/* Sidebar + Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-screen p-6">
          <nav className="space-y-4">
            <Link href="/company/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📊 Dashboard
            </Link>
            <Link href="/company/jobs" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📋 Vagas
            </Link>
            <Link href="/company/opportunities" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              💼 Oportunidades
            </Link>
            <Link href="/company/leads" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📞 Leads
            </Link>
            <Link href="/company/meetings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📅 Reuniões
            </Link>
            <Link href="/company/metrics" className="block px-4 py-2 bg-company-primary text-white rounded-lg font-semibold">
              📈 Métricas
            </Link>
            <Link href="/company/billing" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              💳 Faturamento
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">📈 Métricas e Analytics</h1>

            {/* KPI Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
                <p className="text-gray-600 mb-2">Leads Gerados</p>
                <p className="text-4xl font-bold text-blue-600">156</p>
                <p className="text-sm text-gray-600 mt-2">↑ 12% vs mês anterior</p>
              </div>
              <div className="card bg-gradient-to-br from-green-50 to-green-100">
                <p className="text-gray-600 mb-2">Reuniões Agendadas</p>
                <p className="text-4xl font-bold text-green-600">42</p>
                <p className="text-sm text-gray-600 mt-2">↑ 8% vs mês anterior</p>
              </div>
              <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
                <p className="text-gray-600 mb-2">Vendas Fechadas</p>
                <p className="text-4xl font-bold text-purple-600">18</p>
                <p className="text-sm text-gray-600 mt-2">↑ 25% vs mês anterior</p>
              </div>
              <div className="card bg-gradient-to-br from-orange-50 to-orange-100">
                <p className="text-gray-600 mb-2">Taxa de Conversão</p>
                <p className="text-4xl font-bold text-orange-600">11.5%</p>
                <p className="text-sm text-gray-600 mt-2">↑ 2.3% vs mês anterior</p>
              </div>
            </div>

            {/* Charts Placeholder */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="card bg-white">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Leads por Fonte</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Gráfico em desenvolvimento</p>
                </div>
              </div>
              <div className="card bg-white">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Performance por Oportunidade</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Gráfico em desenvolvimento</p>
                </div>
              </div>
            </div>

            {/* Detailed Metrics */}
            <div className="card bg-white">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Métricas Detalhadas</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Métrica</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Valor</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Variação</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Meta</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">Leads Qualificados</td>
                      <td className="px-6 py-4 text-gray-700">89</td>
                      <td className="px-6 py-4"><span className="text-green-600 font-semibold">↑ 15%</span></td>
                      <td className="px-6 py-4 text-gray-700">80</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">Tempo Médio de Resposta</td>
                      <td className="px-6 py-4 text-gray-700">2.3h</td>
                      <td className="px-6 py-4"><span className="text-green-600 font-semibold">↓ 8%</span></td>
                      <td className="px-6 py-4 text-gray-700">3h</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">Taxa de Fechamento</td>
                      <td className="px-6 py-4 text-gray-700">28.5%</td>
                      <td className="px-6 py-4"><span className="text-green-600 font-semibold">↑ 5%</span></td>
                      <td className="px-6 py-4 text-gray-700">25%</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">Valor Médio por Venda</td>
                      <td className="px-6 py-4 text-gray-700">R$ 15.500</td>
                      <td className="px-6 py-4"><span className="text-green-600 font-semibold">↑ 12%</span></td>
                      <td className="px-6 py-4 text-gray-700">R$ 14.000</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">ROI da Plataforma</td>
                      <td className="px-6 py-4 text-gray-700">320%</td>
                      <td className="px-6 py-4"><span className="text-green-600 font-semibold">↑ 45%</span></td>
                      <td className="px-6 py-4 text-gray-700">250%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

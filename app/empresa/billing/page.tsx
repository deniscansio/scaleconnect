'use client'

import Link from 'next/link'

export default function CompanyBillingPage() {
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
            <Link href="/company/metrics" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              📈 Métricas
            </Link>
            <Link href="/company/billing" className="block px-4 py-2 bg-company-primary text-white rounded-lg font-semibold">
              💳 Faturamento
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">💳 Faturamento e Plano</h1>

            {/* Current Plan */}
            <div className="card bg-gradient-to-r from-company-primary to-company-secondary text-white mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-company-light opacity-80 mb-2">Seu Plano Atual</p>
                  <h2 className="text-4xl font-bold mb-4">Growth</h2>
                  <p className="text-2xl font-bold mb-2">R$ 997<span className="text-lg opacity-80">/mês</span></p>
                  <p className="text-company-light opacity-80">Próxima renovação em 15 dias (15 de Abril de 2024)</p>
                </div>
                <div className="text-right">
                  <button className="px-6 py-3 bg-white text-company-primary rounded-lg font-semibold hover:bg-opacity-90 mb-3">
                    Fazer Upgrade
                  </button>
                  <button className="block px-6 py-2 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:bg-opacity-10">
                    Cancelar Plano
                  </button>
                </div>
              </div>
            </div>

            {/* Plan Comparison */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Comparar Planos</h3>
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg overflow-hidden shadow-md">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Funcionalidade</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Basic</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Growth (Atual)</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Scale</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-6 py-4 font-semibold text-gray-900">Preço</td>
                      <td className="px-6 py-4 text-center text-gray-700">R$ 497/mês</td>
                      <td className="px-6 py-4 text-center text-company-primary font-bold">R$ 997/mês</td>
                      <td className="px-6 py-4 text-center text-gray-700">R$ 1.997/mês</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-semibold text-gray-900">Publicação de Vagas</td>
                      <td className="px-6 py-4 text-center">✓</td>
                      <td className="px-6 py-4 text-center">✓</td>
                      <td className="px-6 py-4 text-center">✓</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-semibold text-gray-900">Acesso a Candidatos</td>
                      <td className="px-6 py-4 text-center">Limitado</td>
                      <td className="px-6 py-4 text-center">✓ Completo</td>
                      <td className="px-6 py-4 text-center">✓ Completo</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-semibold text-gray-900">Oportunidades Comerciais</td>
                      <td className="px-6 py-4 text-center">Simples</td>
                      <td className="px-6 py-4 text-center">✓ Avançado</td>
                      <td className="px-6 py-4 text-center">✓ Avançado</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-semibold text-gray-900">Campanhas de Leads</td>
                      <td className="px-6 py-4 text-center">-</td>
                      <td className="px-6 py-4 text-center">✓</td>
                      <td className="px-6 py-4 text-center">✓</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-semibold text-gray-900">Dashboard de Performance</td>
                      <td className="px-6 py-4 text-center">-</td>
                      <td className="px-6 py-4 text-center">✓</td>
                      <td className="px-6 py-4 text-center">✓</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-semibold text-gray-900">Prioridade</td>
                      <td className="px-6 py-4 text-center">-</td>
                      <td className="px-6 py-4 text-center">-</td>
                      <td className="px-6 py-4 text-center">✓ Prioritário</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-semibold text-gray-900">Rede Ativa de Leads</td>
                      <td className="px-6 py-4 text-center">-</td>
                      <td className="px-6 py-4 text-center">-</td>
                      <td className="px-6 py-4 text-center">✓</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-semibold text-gray-900">Suporte Estratégico</td>
                      <td className="px-6 py-4 text-center">-</td>
                      <td className="px-6 py-4 text-center">-</td>
                      <td className="px-6 py-4 text-center">✓</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-semibold text-gray-900">Compra de Leads</td>
                      <td className="px-6 py-4 text-center">-</td>
                      <td className="px-6 py-4 text-center">-</td>
                      <td className="px-6 py-4 text-center">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Invoices */}
            <div className="card bg-white">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Faturas Recentes</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-semibold text-gray-900">Fatura #2024-03</p>
                    <p className="text-sm text-gray-600">31 de Março de 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">R$ 997,00</p>
                    <p className="text-sm text-green-600">✓ Pago</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-semibold text-gray-900">Fatura #2024-02</p>
                    <p className="text-sm text-gray-600">28 de Fevereiro de 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">R$ 997,00</p>
                    <p className="text-sm text-green-600">✓ Pago</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-semibold text-gray-900">Fatura #2024-01</p>
                    <p className="text-sm text-gray-600">31 de Janeiro de 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">R$ 997,00</p>
                    <p className="text-sm text-green-600">✓ Pago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

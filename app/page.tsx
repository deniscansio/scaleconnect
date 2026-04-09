import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-candidate-primary">ScaleConnect</div>
          <div className="flex gap-4">
            <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-gray-900">
              Entrar
            </Link>
            <Link href="/signup" className="px-4 py-2 bg-candidate-primary text-white rounded-lg hover:bg-opacity-90">
              Cadastrar
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Conecte Crescimento Profissional com Oportunidades Reais
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            ScaleConnect une candidatos, empresas e parceiros educacionais em um ecossistema de vendas, aprendizado e geração de renda.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup?type=candidate" className="px-8 py-3 bg-candidate-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition">
              Sou Candidato
            </Link>
            <Link href="/signup?type=company" className="px-8 py-3 bg-company-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition">
              Sou Empresa
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="card">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-2">Para Candidatos</h3>
            <p className="text-gray-600">
              Encontre vagas, oportunidades de vendas, trilhas de carreira e ganhe comissões por leads e vendas.
            </p>
          </div>

          <div className="card">
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-xl font-bold mb-2">Para Empresas</h3>
            <p className="text-gray-600">
              Publique vagas, crie oportunidades comerciais, gerencie leads e métricas em um só lugar.
            </p>
          </div>

          <div className="card">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">Para Parceiros</h3>
            <p className="text-gray-600">
              Publique cursos, certificações e apareça nas trilhas de carreira dos nossos candidatos.
            </p>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mt-20">
          <h2 className="section-title text-center">Planos para Empresas</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-2">Basic</h3>
              <p className="text-3xl font-bold text-company-primary mb-4">
                R$ 497<span className="text-lg text-gray-600">/mês</span>
              </p>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li>✓ Publicação de vagas</li>
                <li>✓ Acesso limitado a candidatos</li>
                <li>✓ Oportunidades comerciais simples</li>
              </ul>
              <button className="w-full py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Escolher</button>
            </div>

            <div className="card border-2 border-company-primary">
              <div className="bg-company-primary text-white px-4 py-2 rounded-lg mb-4 inline-block">Popular</div>
              <h3 className="text-2xl font-bold mb-2">Growth</h3>
              <p className="text-3xl font-bold text-company-primary mb-4">
                R$ 997<span className="text-lg text-gray-600">/mês</span>
              </p>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li>✓ Tudo do Basic</li>
                <li>✓ Acesso a profissionais para vendas</li>
                <li>✓ Campanhas de geração de leads</li>
                <li>✓ Dashboard de performance</li>
              </ul>
              <button className="w-full py-2 bg-company-primary text-white rounded-lg hover:bg-opacity-90">Escolher</button>
            </div>

            <div className="card border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-2">Scale</h3>
              <p className="text-3xl font-bold text-company-primary mb-4">
                R$ 1.997<span className="text-lg text-gray-600">/mês</span>
              </p>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li>✓ Tudo do Growth</li>
                <li>✓ Prioridade na plataforma</li>
                <li>✓ Acesso a rede ativa de leads</li>
                <li>✓ Suporte estratégico</li>
                <li>✓ Compra de leads qualificados</li>
              </ul>
              <button className="w-full py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Escolher</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 ScaleConnect. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  )
}

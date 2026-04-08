# ScaleConnect - Plataforma SaaS de Vendas e Carreira

Plataforma SaaS que conecta candidatos, empresas e parceiros educacionais em um ecossistema de vendas, aprendizado e geração de renda.

## 🎯 Visão Geral

ScaleConnect une:
- **LinkedIn** (networking profissional)
- **Gupy** (gestão de vagas)
- **Hotmart** (educação e certificações)
- **CRM de vendas** (gestão de leads)

Tudo em uma plataforma focada em crescimento profissional e geração de receita.

## 👥 Tipos de Usuários

### 1. **Candidatos (Profissionais de Vendas)**
- Perfil profissional com experiência, habilidades e objetivos
- Busca de vagas de emprego
- Acesso a oportunidades comerciais (vendas/leads)
- Visualização de comissões
- Trilha de carreira personalizada
- Dashboard com progresso, ganhos e oportunidades

### 2. **Empresas**
- Publicação de vagas de emprego
- Criação de oportunidades comerciais
- Definição de comissões por venda/lead
- Recebimento de leads e reuniões agendadas
- Visualização de candidatos interessados
- Dashboard com métricas (leads, reuniões, vendas, candidatos)
- CRM simples de leads
- Agenda de reuniões

### 3. **Parceiros Educacionais**
- Publicação de cursos, treinamentos e certificações
- Conteúdos gratuitos e pagos
- Emissão de certificados
- Aparição nas trilhas de carreira
- Recebimento de alunos interessados

### 4. **Admin (ScaleConnect)**
- Gestão de usuários
- Aprovação de empresas e parceiros
- Gestão de planos de assinatura
- Métricas gerais da plataforma
- Gestão de conteúdos, trilhas e categorias
- Controle financeiro e assinaturas

## 💰 Modelo de Monetização

### Planos para Empresas

| Plano | Preço | Funcionalidades |
|-------|-------|-----------------|
| **Basic** | R$ 497/mês | Publicação de vagas, Acesso limitado a candidatos, Oportunidades simples |
| **Growth** | R$ 997/mês | Tudo do Basic + Acesso a profissionais, Campanhas de leads, Dashboard de performance |
| **Scale** | R$ 1.997/mês | Tudo do Growth + Prioridade, Acesso a rede ativa, Suporte estratégico, Compra de leads |

## 🏗️ Arquitetura

### Stack Tecnológico

**Frontend:**
- Next.js 14 (React full-stack)
- TypeScript
- Tailwind CSS
- React Hook Form
- Zustand (state management)

**Backend:**
- Next.js API Routes
- Node.js
- Express.js (opcional)

**Database:**
- PostgreSQL
- Prisma ORM

**Autenticação:**
- JWT (JSON Web Tokens)
- NextAuth.js (opcional)
- OAuth (Google, Apple)

**Pagamentos:**
- Stripe (assinaturas)
- PagSeguro (alternativa)

**Hospedagem:**
- Vercel (recomendado para Next.js)
- AWS/DigitalOcean (alternativas)

## 🎨 Paleta de Cores

### Candidatos
- **Primária**: Azul Marinho (#001F3F)
- **Secundária**: Laranja (#FF8C00)
- **Acentos**: Laranja Claro (#FFB84D)

### Empresas
- **Primária**: Laranja (#FF8C00)
- **Secundária**: Azul Marinho (#001F3F)
- **Acentos**: Azul Escuro (#0033CC)

### Admin
- **Primária**: Preto (#000000)
- **Secundária**: Branco (#FFFFFF)
- **Acentos**: Cinza (#666666)

## 📋 Funcionalidades Principais

### Sistema de Trilha de Carreira
O candidato evolui com base em:
- Cursos completados
- Experiências profissionais
- Certificações obtidas
- Vagas preenchidas
- Oportunidades comerciais realizadas

### Dashboard de Candidatos
- Progresso de carreira
- Ganhos totais e comissões
- Oportunidades ativas
- Vagas recomendadas
- Histórico de atividades

### Dashboard de Empresas
- Métricas de performance
- Gestão de leads
- Agenda de reuniões
- Análise de ROI
- Gestão de candidatos

## 🚀 MVP (Minimum Viable Product)

### Fase 1: Autenticação e Onboarding
- [x] Login/Signup
- [x] Seleção de tipo de usuário
- [x] Onboarding personalizado
- [ ] OAuth (Google, Apple)

### Fase 2: Dashboard de Candidatos
- [x] Dashboard principal
- [ ] Busca de vagas
- [ ] Busca de oportunidades
- [ ] Histórico de ganhos
- [ ] Trilha de carreira

### Fase 3: Dashboard de Empresas
- [x] Dashboard principal
- [ ] Publicação de vagas
- [ ] Criação de oportunidades
- [ ] Gestão de leads
- [ ] Agenda de reuniões

### Fase 4: Sistema de Pagamentos
- [ ] Integração Stripe
- [ ] Gestão de assinaturas
- [ ] Pagamento de comissões
- [ ] Relatórios financeiros

### Fase 5: Admin
- [ ] Dashboard de admin
- [ ] Gestão de usuários
- [ ] Aprovação de empresas
- [ ] Métricas gerais

## 📊 Banco de Dados

### Principais Tabelas

```
Users
├── CandidateProfile
├── CompanyProfile
├── PartnerProfile
└── AdminProfile

JobPostings
├── JobApplications
└── Commissions

SalesOpportunities
├── OpportunityApplications
└── Commissions

Leads
Meetings
Courses
Certifications
Subscriptions
Notifications
```

## 🔐 Segurança

- Senhas com hash bcrypt
- JWT para autenticação
- HTTPS obrigatório
- Rate limiting
- Validação de entrada
- CORS configurado
- Proteção CSRF

## 📱 Responsividade

- Mobile-first design
- Desktop otimizado
- Tablet compatível
- PWA ready

## 🧪 Testes

- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Testes E2E
- [ ] Testes de performance

## 📈 Roadmap

### Q1 2024
- MVP com autenticação e dashboards básicos
- Integração com Stripe
- Primeiros usuários beta

### Q2 2024
- Sistema de trilha de carreira completo
- Integração com parceiros educacionais
- Mobile app (React Native)

### Q3 2024
- Marketplace de cursos
- Sistema de recomendação com IA
- Análise preditiva de vendas

### Q4 2024
- Integração com CRM externos
- API pública
- Webhooks e automações

## 🛠️ Setup Local

### Pré-requisitos
- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <repo-url>
cd scaleconnect-saas

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Configure o banco de dados
npx prisma migrate dev

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`

## 📝 Credenciais de Teste

### Candidato
- Email: `candidato@test.com`
- Senha: `123456`

### Empresa
- Email: `empresa@test.com`
- Senha: `123456`

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato através de support@scaleconnect.com

## 📄 Licença

MIT License - veja LICENSE.md para detalhes

---

**ScaleConnect** - Conectando Crescimento Profissional com Oportunidades Reais

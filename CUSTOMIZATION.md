# Guia de Customização - ScaleConnect

Este guia mostra como editar, personalizar e customizar a plataforma ScaleConnect (logo, marca, cores, textos, etc).

## 📋 Índice

1. [Personalizar Cores](#personalizar-cores)
2. [Alterar Logo e Marca](#alterar-logo-e-marca)
3. [Editar Textos e Conteúdo](#editar-textos-e-conteúdo)
4. [Customizar Paletas por Tipo de Usuário](#customizar-paletas-por-tipo-de-usuário)
5. [Adicionar Novas Páginas](#adicionar-novas-páginas)
6. [Integrar Banco de Dados Real](#integrar-banco-de-dados-real)

---

## 🎨 Personalizar Cores

As cores da plataforma estão definidas em **`tailwind.config.js`**. Para alterar as cores:

### Arquivo: `tailwind.config.js`

```javascript
colors: {
  // Paleta Candidatos (Azul Marinho + Laranja)
  candidate: {
    primary: '#001F3F',    // Azul Marinho - ALTERE AQUI
    secondary: '#FF8C00',  // Laranja - ALTERE AQUI
    light: '#E8F4F8',
    dark: '#000A1A',
    accent: '#FFB84D',
  },
  // Paleta Empresas (Laranja + Azul Marinho)
  company: {
    primary: '#FF8C00',    // Laranja - ALTERE AQUI
    secondary: '#001F3F',  // Azul Marinho - ALTERE AQUI
    light: '#FFF5E6',
    dark: '#4D2600',
    accent: '#0033CC',
  },
  // Paleta Admin (Preto + Branco)
  admin: {
    primary: '#000000',    // Preto - ALTERE AQUI
    secondary: '#FFFFFF',  // Branco - ALTERE AQUI
    light: '#F5F5F5',
    dark: '#1A1A1A',
    accent: '#666666',
  },
}
```

### Exemplo de Mudança

Para mudar o azul marinho para um azul mais claro:

```javascript
candidate: {
  primary: '#0066FF',  // Novo azul
  // ... resto das cores
}
```

Depois reinicie o servidor:
```bash
npm run dev
```

---

## 🏢 Alterar Logo e Marca

### 1. Adicionar Logo

Coloque sua logo em: `public/logo.png` (ou `public/logo.svg`)

### 2. Usar Logo nas Páginas

Abra qualquer página (ex: `app/page.tsx`) e altere:

```tsx
// Antes
<div className="text-2xl font-bold text-candidate-primary">ScaleConnect</div>

// Depois
<img src="/logo.png" alt="ScaleConnect" className="h-8" />
```

### 3. Alterar Nome da Empresa

Procure por "ScaleConnect" em todos os arquivos e substitua pelo seu nome. Arquivos principais:

- `app/page.tsx` (landing page)
- `app/layout.tsx` (metadata)
- `README.md`

---

## ✏️ Editar Textos e Conteúdo

### Landing Page

Arquivo: `app/page.tsx`

```tsx
// Altere o título
<h1 className="text-5xl font-bold text-gray-900 mb-4">
  Seu Novo Título Aqui
</h1>

// Altere a descrição
<p className="text-xl text-gray-600 mb-8">
  Sua nova descrição aqui
</p>
```

### Dashboard de Candidatos

Arquivo: `app/candidate/dashboard/page.tsx`

```tsx
// Altere a mensagem de boas-vindas
<h1 className="text-4xl font-bold text-gray-900 mb-2">
  Olá, {user?.fullName?.split(' ')[0]}! 👋
</h1>
```

### Dashboard de Empresas

Arquivo: `app/company/dashboard/page.tsx`

---

## 🎭 Customizar Paletas por Tipo de Usuário

Cada tipo de usuário tem sua própria paleta de cores. Para customizar:

### Candidatos

Arquivo: `app/candidate/dashboard/page.tsx`

```tsx
// Classe CSS para usar cores de candidato
className="bg-candidate-primary text-white"
className="border-b-4 border-candidate-primary"
```

### Empresas

Arquivo: `app/company/dashboard/page.tsx`

```tsx
// Classe CSS para usar cores de empresa
className="bg-company-primary text-white"
className="border-b-4 border-company-primary"
```

### Admin

Arquivo: `app/admin/dashboard/page.tsx` (a ser criado)

```tsx
// Classe CSS para usar cores de admin
className="bg-admin-primary text-white"
className="border-b-4 border-admin-primary"
```

---

## ➕ Adicionar Novas Páginas

### Exemplo: Criar Página de Reuniões do Candidato

1. Crie o arquivo: `app/candidate/meetings/page.tsx`

```tsx
'use client'

import Link from 'next/link'

export default function CandidateMeetingsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-candidate-light to-slate-50">
      {/* Copie a estrutura de outra página e adapte */}
      <h1>Minhas Reuniões</h1>
    </main>
  )
}
```

2. Adicione o link no sidebar (ex: `app/candidate/dashboard/page.tsx`):

```tsx
<Link href="/candidate/meetings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
  📅 Reuniões
</Link>
```

---

## 🗄️ Integrar Banco de Dados Real

Atualmente, os dados são simulados em memória. Para usar um banco de dados real:

### 1. Configurar PostgreSQL

```bash
# Instale PostgreSQL localmente ou use um serviço em nuvem (Heroku, AWS RDS, etc)

# Configure a URL do banco em .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/scaleconnect"
```

### 2. Executar Migrações Prisma

```bash
# Gere o cliente Prisma
npx prisma generate

# Execute as migrações
npx prisma migrate dev --name init

# (Opcional) Abra o Prisma Studio para gerenciar dados
npx prisma studio
```

### 3. Atualizar APIs para Usar Prisma

Arquivo: `app/api/auth/login/route.ts`

```typescript
// Antes (mock)
const user = users.find((u) => u.email === email)

// Depois (com Prisma)
import { prisma } from '@/lib/prisma'

const user = await prisma.user.findUnique({
  where: { email },
})
```

### 4. Criar Prisma Client

Arquivo: `lib/prisma.ts`

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

---

## 🔧 Variáveis de Ambiente

Arquivo: `.env.local`

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/scaleconnect"

# JWT
JWT_SECRET="sua-chave-secreta-super-segura"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# NextAuth
NEXTAUTH_SECRET="outra-chave-secreta"
NEXTAUTH_URL="http://localhost:3001"

# API
NEXT_PUBLIC_API_URL="http://localhost:3001/api"
```

---

## 📱 Estrutura de Pastas

```
scaleconnect-saas/
├── app/
│   ├── (auth)/              # Páginas de autenticação
│   ├── candidate/           # Páginas do candidato
│   ├── company/             # Páginas da empresa
│   ├── admin/               # Páginas do admin (a criar)
│   ├── api/                 # APIs e endpoints
│   ├── layout.tsx           # Layout raiz
│   ├── page.tsx             # Landing page
│   └── globals.css          # Estilos globais
├── components/              # Componentes reutilizáveis
├── lib/                     # Utilitários e helpers
├── prisma/
│   └── schema.prisma        # Schema do banco de dados
├── public/                  # Arquivos estáticos (logo, favicon)
├── tailwind.config.js       # Configuração Tailwind
├── tsconfig.json            # Configuração TypeScript
├── package.json             # Dependências
└── README.md                # Documentação
```

---

## 🚀 Próximas Etapas

1. **Integrar Stripe** — Sistema de assinaturas funcional
2. **Conectar PostgreSQL** — Persistência de dados
3. **Criar Admin Dashboard** — Gestão de usuários e planos
4. **Implementar OAuth** — Login com Google/Apple
5. **Deploy** — Colocar em produção (Vercel, Netlify, etc)

---

## 💡 Dicas

- Use `npm run dev` para iniciar o servidor em modo desenvolvimento
- Use `npm run build` para compilar para produção
- Use `npm run lint` para verificar erros de código
- Sempre teste as mudanças localmente antes de fazer deploy
- Mantenha as cores consistentes entre as páginas

---

## 📞 Suporte

Para dúvidas sobre customização, consulte a documentação do Next.js, Tailwind CSS e Prisma.

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)

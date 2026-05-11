# 🎯 Sistema de Competências - Guia de Implementação

## Visão Geral

Este documento descreve como o sistema de competências foi implementado na plataforma ScaleConnect. O sistema permite que candidatos selecionem suas competências profissionais durante a edição do perfil.

## ✨ Características Principais

### 1. **Seleção de Competências**
- ✓ Autocomplete inteligente com busca em tempo real
- ✓ Sugestões automáticas enquanto o usuário digita
- ✓ Múltiplas seleções sem limite máximo
- ✓ Remoção fácil de competências selecionadas

### 2. **Design Visual**
- **Botões Verdes**: Competências SELECIONADAS (quando o candidato clica)
- **Cores Variadas**: Sugestões de competências disponíveis (azul, laranja, etc.)
- **Paleta da Plataforma**: Azul Marinho (#001F3F) e Laranja (#FF8C00)
- **Responsivo**: Funciona perfeitamente em mobile e desktop

### 3. **Validação**
- Mínimo obrigatório: **4 competências**
- Mensagem de erro clara: "Adicione no mínimo 4 competências para completar seu perfil."
- Bloqueio de salvamento se validação falhar
- Indicador visual do status (verde/vermelho)

### 4. **Banco de Dados**
- **Tabela `competencies`**: Lista de todas as competências disponíveis
- **Tabela `candidato_competencias`**: Relacionamento entre candidatos e competências
- **171 competências** pré-carregadas no banco

## 📁 Arquivos Criados/Modificados

### Backend

#### 1. **`lib/db/schema/competencies.ts`** (NOVO)
Define as tabelas Drizzle ORM para competências:
```typescript
- competencies: id, nome, created_at, updated_at
- candidato_competencias: id, candidato_id, competencia_id, created_at
```

#### 2. **`lib/db/index.ts`** (MODIFICADO)
Importa o schema de competências para o banco de dados.

#### 3. **`drizzle/0001_competencies.sql`** (NOVO)
Script SQL para criar as tabelas e popular com 171 competências iniciais.

#### 4. **`app/api/competencies/route.ts`** (NOVO)
**GET** `/api/competencies?search=termo`
- Lista todas as competências
- Suporta busca por nome (case-insensitive)
- Retorna ordenado alfabeticamente

#### 5. **`app/api/candidate/competencies/route.ts`** (NOVO)
**GET** `/api/candidate/competencies`
- Retorna competências do candidato logado
- Requer autenticação (JWT)

**POST** `/api/candidate/competencies`
- Salva as competências selecionadas
- Valida mínimo de 4 competências
- Requer autenticação (JWT)

### Frontend

#### 6. **`app/components/CompetenciesSelector.tsx`** (NOVO)
Componente React reutilizável para seleção de competências:
- Autocomplete com sugestões em tempo real
- Botões verdes para competências selecionadas
- Validação visual
- Responsivo e acessível

#### 7. **`app/candidato/profile/page.tsx`** (MODIFICADO)
Integração do componente CompetenciesSelector no perfil do candidato:
- Carrega competências ao abrir o perfil
- Permite edição com validação
- Salva competências junto com outros dados do perfil

### Scripts

#### 8. **`scripts/migrate-competencies.ts`** (NOVO)
Script para executar a migração do banco de dados.

## 🚀 Como Fazer Deploy

### Passo 1: Executar a Migração do Banco de Dados

```bash
# Opção 1: Usando ts-node (se instalado)
npx ts-node scripts/migrate-competencies.ts

# Opção 2: Executar o SQL diretamente no TiDB Cloud
# Acesse: https://tidbcloud.com/tidbs/10475891080146818008/sqleditor
# Cole o conteúdo de: drizzle/0001_competencies.sql
# Clique em "Run"
```

### Passo 2: Fazer Push para o GitHub

```bash
cd /home/ubuntu/scaleconnect
git add -A
git commit -m "feat: Implementar sistema de competências com seleção, validação e UI visual"
git push origin main
```

### Passo 3: Deploy Automático na Vercel

1. Acesse: https://vercel.com/deniscansio-9373s-projects
2. O deploy deve iniciar automaticamente quando o push chegar ao GitHub
3. Aguarde a conclusão (geralmente 2-5 minutos)
4. Acesse: https://scaleconnect.vercel.app/candidato/profile

## 📊 Lista de Competências (171 no Total)

As seguintes competências foram pré-carregadas no banco:

- Comunicação, Comunicação verbal, Comunicação escrita
- Inteligência emocional, Liderança, Trabalho em equipe
- Gestão de conflitos, Organização, Proatividade
- Resiliência, Adaptabilidade, Criatividade
- Pensamento analítico, Pensamento crítico
- Gestão de tempo, Gestão de prioridades
- Negociação, Persuasão, Storytelling
- Relacionamento interpessoal, Senso de urgência, Empatia
- Ownership, Perfil Hunter, Perfil Farmer
- Visão estratégica, Foco em resultados
- Resolução de problemas, Tomada de decisão
- Flexibilidade, Aprendizado contínuo
- Colaboração, Comprometimento, Responsabilidade
- Autogestão, Trabalho sob pressão
- Gestão de pessoas, Gestão de equipes, Motivação
- Planejamento, Planejamento estratégico
- Atendimento ao cliente, Perfil executor
- Perfil analítico, Perfil comunicativo, Perfil comercial
- Gestão de crise, Facilidade de aprendizado
- Alta performance, Multitarefas, Visão de negócio
- Capacidade de inovação, Inteligência comercial
- Relacionamento com clientes, Cultura de feedback
- Perfil competitivo, Perfil estratégico, Perfil operacional
- Perfil processual, Perfil disciplinado, Perfil organizado
- Perfil influenciador, Perfil persuasivo, Perfil relacional
- Perfil técnico, Perfil resiliente, Perfil dinâmico
- Perfil detalhista, Perfil colaborativo
- Perfil independente, Perfil autônomo, Autonomia
- Senso de dono, Espírito empreendedor
- Mentalidade comercial, Capacidade de execução
- Capacidade de liderança, Capacidade de influência
- Capacidade de argumentação, Capacidade de convencimento
- Capacidade de aprendizado rápido
- Perfil externo, Perfil interno, Perfil híbrido
- Perfil corporativo, Perfil hands-on
- Comunicação assertiva, Comunicação consultiva
- Facilidade em networking, Facilidade em apresentações
- Facilidade em vendas
- Perfil orientado a metas, Perfil orientado a performance

## 🎨 Paleta de Cores Utilizada

### Candidatos (Padrão)
- **Primária**: Azul Marinho (#001F3F)
- **Secundária**: Laranja (#FF8C00)
- **Acentos**: Laranja Claro (#FFB84D)
- **Competências Selecionadas**: Verde (#22c55e)

### Componentes
- **Botões Verdes**: Competências ativas/selecionadas
- **Bordas Azuis**: Inputs e focos
- **Fundo Branco**: Cards e containers
- **Texto Cinza**: Labels e descrições

## 🔧 Testes Recomendados

### Teste 1: Adicionar Competências
1. Acesse: https://scaleconnect.vercel.app/candidato/profile
2. Clique em "Editar Perfil"
3. Na seção "Competências", busque por "Comunicação"
4. Clique em uma competência da lista
5. Verifique se aparece um botão verde com ✓

### Teste 2: Validação Mínima
1. Selecione apenas 3 competências
2. Tente clicar em "Salvar Perfil"
3. Verifique se aparece mensagem de erro
4. Adicione a 4ª competência
5. Agora o botão "Salvar" deve estar ativo

### Teste 3: Remover Competência
1. Clique no × no botão verde de uma competência
2. Verifique se é removida da lista

### Teste 4: Busca e Autocomplete
1. Digite "liderança" no campo de busca
2. Verifique se aparecem sugestões relevantes
3. Teste com outras palavras-chave

## 📱 Responsividade

O componente foi desenvolvido com:
- ✓ Mobile-first design
- ✓ Flex layout responsivo
- ✓ Sugestões adaptáveis ao tamanho da tela
- ✓ Botões com tamanho adequado para toque

## 🔐 Segurança

- ✓ Validação no backend (mínimo 4 competências)
- ✓ Autenticação JWT obrigatória
- ✓ Sanitização de entrada de busca
- ✓ Proteção contra duplicatas

## 📞 Suporte

Para dúvidas ou melhorias, consulte:
- Documentação do projeto: README.md
- Issues do GitHub: https://github.com/deniscansio/scaleconnect/issues

---

**Data de Implementação**: 11 de Maio de 2026
**Versão**: 1.0.0
**Status**: ✅ Pronto para Produção

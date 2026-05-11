// Estrutura de cargos com competências necessárias
// Salários baseados em pesquisa de mercado 2024

export interface CareerPosition {
  id: number
  title: string
  description: string
  salaryMin: number
  salaryMax: number
  requiredCompetencies: string[]
}

export const careerPositions: CareerPosition[] = [
  {
    id: 1,
    title: 'Telemarketing / Operador',
    description: 'Profissional responsável por contatos telefônicos, qualificação de leads e agendamentos',
    salaryMin: 1600,
    salaryMax: 2500,
    requiredCompetencies: [
      'Comunicação Verbal',
      'Escuta Ativa',
      'Cold Call',
      'Qualificação de Leads',
      'Organização',
      'Gestão de Tempo',
      'Proatividade',
      'Empatia'
    ]
  },
  {
    id: 2,
    title: 'LDR (Lead Development Rep)',
    description: 'Especialista em qualificação e desenvolvimento de leads para o time de vendas',
    salaryMin: 2000,
    salaryMax: 3800,
    requiredCompetencies: [
      'Qualificação de Leads',
      'Cold Call',
      'Comunicação Verbal',
      'CRM',
      'Geração de Leads',
      'Follow-up',
      'Organização',
      'Proatividade',
      'Resiliência'
    ]
  },
  {
    id: 3,
    title: 'Vendedor Interno',
    description: 'Profissional que realiza vendas por telefone ou chat, trabalhando com leads qualificados',
    salaryMin: 2000,
    salaryMax: 4000,
    requiredCompetencies: [
      'Inside Sales',
      'Negociação',
      'Comunicação Verbal',
      'CRM',
      'Fechamento de Vendas',
      'Follow-up',
      'Empatia',
      'Resiliência',
      'Organização'
    ]
  },
  {
    id: 4,
    title: 'SDR (Sales Development Representative)',
    description: 'Especialista em prospecção inbound e qualificação de oportunidades',
    salaryMin: 2800,
    salaryMax: 7000,
    requiredCompetencies: [
      'Prospecção Inbound',
      'Negociação',
      'CRM',
      'Comunicação',
      'Cold Call',
      'Qualificação de Leads',
      'Follow-up',
      'Resiliência',
      'Organização'
    ]
  },
  {
    id: 5,
    title: 'Representante Comercial',
    description: 'Profissional responsável por representar a empresa e desenvolver relacionamentos comerciais',
    salaryMin: 2500,
    salaryMax: 5500,
    requiredCompetencies: [
      'Relacionamento Interpessoal',
      'Negociação Comercial',
      'Comunicação Assertiva',
      'Prospecção B2B',
      'Gestão de Carteira',
      'Follow-up',
      'Empatia',
      'Adaptabilidade',
      'Resiliência'
    ]
  },
  {
    id: 6,
    title: 'Vendedor Externo',
    description: 'Profissional que realiza vendas em campo, visitando clientes e prospects',
    salaryMin: 2500,
    salaryMax: 5000,
    requiredCompetencies: [
      'Vendas B2B',
      'Negociação Comercial',
      'Relacionamento Interpessoal',
      'Prospecção Outbound',
      'Gestão de Carteira',
      'Comunicação Assertiva',
      'Resiliência',
      'Adaptabilidade',
      'Senso de Urgência'
    ]
  },
  {
    id: 7,
    title: 'BDR (Business Development Representative)',
    description: 'Especialista em prospecção outbound e geração de demanda',
    salaryMin: 3000,
    salaryMax: 8500,
    requiredCompetencies: [
      'Prospecção Outbound',
      'Negociação Comercial',
      'CRM Avançado',
      'Comunicação Verbal',
      'Cold Call',
      'Cadência de Prospecção',
      'Resiliência',
      'Proatividade',
      'Senso de Urgência'
    ]
  },
  {
    id: 8,
    title: 'Consultor Comercial',
    description: 'Profissional que oferece consultoria comercial e soluções customizadas',
    salaryMin: 3000,
    salaryMax: 6000,
    requiredCompetencies: [
      'Vendas Consultivas',
      'Negociação Comercial',
      'Análise de Indicadores',
      'Comunicação Assertiva',
      'Inteligência Comercial',
      'Relacionamento Interpessoal',
      'Pensamento Analítico',
      'Resiliência',
      'Empatia'
    ]
  },
  {
    id: 9,
    title: 'Closer',
    description: 'Especialista em fechamento de vendas complexas e de alto valor',
    salaryMin: 4000,
    salaryMax: 12000,
    requiredCompetencies: [
      'Fechamento de Vendas',
      'Negociação Comercial',
      'Vendas Consultivas',
      'Spin Selling',
      'Rapport Comercial',
      'Comunicação Assertiva',
      'Inteligência Emocional',
      'Resiliência',
      'Capacidade de Convencimento'
    ]
  },
  {
    id: 10,
    title: 'Executivo de Vendas / AE',
    description: 'Profissional responsável por fechar vendas e gerenciar relacionamentos comerciais',
    salaryMin: 5000,
    salaryMax: 12000,
    requiredCompetencies: [
      'Vendas Consultivas',
      'Negociação Comercial',
      'Gestão de Contas',
      'Análise de Indicadores',
      'CRM Avançado',
      'Excel Avançado',
      'Comunicação Assertiva',
      'Relacionamento Interpessoal',
      'Inteligência Comercial'
    ]
  },
  {
    id: 11,
    title: 'Farmer / Account Manager',
    description: 'Especialista em retenção de clientes e desenvolvimento de contas existentes',
    salaryMin: 5000,
    salaryMax: 10000,
    requiredCompetencies: [
      'Gestão de Contas',
      'Customer Success',
      'Retenção de Clientes',
      'Upsell',
      'Cross-sell',
      'Relacionamento Interpessoal',
      'Comunicação Assertiva',
      'Análise de Indicadores',
      'Empatia'
    ]
  },
  {
    id: 12,
    title: 'Executivo de Contas',
    description: 'Profissional sênior responsável por contas estratégicas e relacionamentos de alto valor',
    salaryMin: 6000,
    salaryMax: 15000,
    requiredCompetencies: [
      'Gestão de Contas',
      'Vendas Consultivas',
      'Negociação Comercial',
      'Customer Success',
      'Análise de Indicadores',
      'Excel Avançado',
      'Comunicação Assertiva',
      'Inteligência Comercial',
      'Relacionamento Interpessoal'
    ]
  },
  {
    id: 13,
    title: 'Gerente de Contas / KAM',
    description: 'Key Account Manager - Gerencia contas-chave e relacionamentos estratégicos',
    salaryMin: 7000,
    salaryMax: 18000,
    requiredCompetencies: [
      'Gestão de Contas',
      'Liderança',
      'Negociação Comercial',
      'Análise de Indicadores',
      'Planejamento Comercial',
      'Comunicação Assertiva',
      'Inteligência Comercial',
      'Visão de Negócio',
      'Relacionamento Interpessoal'
    ]
  },
  {
    id: 14,
    title: 'Team Leader Comercial',
    description: 'Liderança de pequenos times comerciais e supervisão de atividades',
    salaryMin: 5000,
    salaryMax: 9000,
    requiredCompetencies: [
      'Liderança',
      'Gestão de Equipes',
      'Gestão de Performance',
      'Coaching Comercial',
      'Comunicação Assertiva',
      'Gestão de Conflitos',
      'Motivação de Equipe',
      'Planejamento Comercial',
      'Cultura de Feedback'
    ]
  },
  {
    id: 15,
    title: 'Supervisor Comercial',
    description: 'Supervisão de equipes comerciais e garantia de cumprimento de metas',
    salaryMin: 6000,
    salaryMax: 12000,
    requiredCompetencies: [
      'Liderança',
      'Gestão de Equipes',
      'Gestão de Performance',
      'Análise de Indicadores',
      'Coaching Comercial',
      'Comunicação Assertiva',
      'Gestão de Conflitos',
      'Planejamento Comercial',
      'Motivação de Equipe'
    ]
  },
  {
    id: 16,
    title: 'Coordenador Comercial',
    description: 'Coordenação de atividades comerciais e suporte operacional',
    salaryMin: 8000,
    salaryMax: 15000,
    requiredCompetencies: [
      'Gestão de Equipes',
      'Organização',
      'Gestão de Tempo',
      'Análise de Indicadores',
      'CRM Avançado',
      'Excel Avançado',
      'Comunicação Assertiva',
      'Planejamento Comercial',
      'Proatividade'
    ]
  },
  {
    id: 17,
    title: 'Gerente Comercial / Vendas',
    description: 'Gestão estratégica de vendas, metas e desenvolvimento de equipes',
    salaryMin: 10000,
    salaryMax: 25000,
    requiredCompetencies: [
      'Gestão Comercial',
      'Liderança',
      'Gestão de Equipes',
      'Gestão de Performance',
      'Planejamento Comercial',
      'Análise de Indicadores',
      'Estratégia Comercial',
      'Visão de Negócio',
      'Coaching Comercial'
    ]
  },
  {
    id: 18,
    title: 'Head Comercial / Head de Vendas',
    description: 'Liderança executiva de toda a operação comercial e de vendas',
    salaryMin: 18000,
    salaryMax: 35000,
    requiredCompetencies: [
      'Liderança',
      'Gestão Comercial',
      'Estratégia Comercial',
      'Planejamento Estratégico',
      'Visão de Negócio',
      'Gestão de Equipes',
      'Análise de Indicadores',
      'Inteligência Comercial',
      'Tomada de Decisão'
    ]
  },
  {
    id: 19,
    title: 'Diretor Comercial / Sales Director',
    description: 'Direção estratégica de vendas, responsável por crescimento e rentabilidade',
    salaryMin: 25000,
    salaryMax: 60000,
    requiredCompetencies: [
      'Gestão Comercial',
      'Liderança',
      'Estratégia Comercial',
      'Planejamento Estratégico',
      'Visão de Negócio',
      'Tomada de Decisão',
      'Inteligência Comercial',
      'Gestão de Equipes',
      'Negociação Comercial'
    ]
  }
]

// Função auxiliar para calcular salário médio
export const calculateAverageSalary = (position: CareerPosition): number => {
  return Math.round((position.salaryMin + position.salaryMax) / 2)
}

// Função auxiliar para buscar cargo por ID
export const getPositionById = (id: number): CareerPosition | undefined => {
  return careerPositions.find(p => p.id === id)
}

// Função auxiliar para buscar cargo por título
export const getPositionByTitle = (title: string): CareerPosition | undefined => {
  return careerPositions.find(p => p.title.toLowerCase() === title.toLowerCase())
}

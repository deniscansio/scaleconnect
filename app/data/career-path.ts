// Dados da Trilha de Sucesso com Barras de Progresso por Cargo
export const careerPath = {
  currentPosition: {
    title: 'SDR - Sales Development Representative',
    subtitle: 'SDR Junior',
    salary: 3500,
    progress: 100,
    description: 'Profissional iniciante em vendas focado em prospecção INBOUND',
    competencies: ['Prospecção Inbound', 'Negociação Básica', 'CRM', 'Comunicação'],
    type: 'SDR'
  },
  targetPosition: {
    title: 'Diretor Comercial',
    salary: 25000,
    description: 'Seu objetivo de carreira'
  },
  evolutionPath: [
    {
      id: 1,
      title: 'SDR - Sales Development Representative',
      subtitle: 'SDR Junior',
      salary: 3500,
      progress: 100,
      competencies: ['Prospecção Inbound', 'Negociação Básica', 'CRM', 'Comunicação'],
      description: 'Profissional iniciante em vendas focado em prospecção INBOUND',
      type: 'SDR',
      requiredCompetencies: ['Prospecção Inbound', 'Negociação Básica', 'CRM', 'Comunicação']
    },
    {
      id: 2,
      title: 'BDR - Business Development Representative',
      subtitle: 'Business Development Representative',
      salary: 4500,
      progress: 0,
      competencies: ['Prospecção Ativa (Outbound)', 'Negociação Avançada', 'CRM Avançado', 'Comunicação Executiva', 'Prospecting Outbound'],
      description: 'Especialista em prospecção OUTBOUND e geração de demanda',
      type: 'BDR',
      requiredCompetencies: ['Prospecção Ativa (Outbound)', 'Negociação Avançada', 'CRM Avançado', 'Comunicação Executiva']
    },
    {
      id: 3,
      title: 'AE - Account Executive',
      subtitle: 'Executivo de Contas',
      salary: 8000,
      progress: 0,
      competencies: ['Vendas Consultivas', 'Gestão de Contas', 'Negociação Estratégica', 'Excel Avançado', 'Análise de Dados'],
      description: 'Especialista em fechamento de negócios e gestão de contas',
      type: 'AE',
      requiredCompetencies: ['Vendas Consultivas', 'Gestão de Contas', 'Negociação Estratégica', 'Excel Avançado', 'Análise de Dados']
    },
    {
      id: 4,
      title: 'Sales Manager',
      subtitle: 'Gerente de Vendas',
      salary: 12000,
      progress: 0,
      competencies: ['Liderança de Equipes', 'Gestão de Performance', 'Estratégia Comercial', 'Coaching de Vendas', 'Previsão de Receita'],
      description: 'Liderança de equipes comerciais',
      type: 'Manager',
      requiredCompetencies: ['Liderança de Equipes', 'Gestão de Performance', 'Estratégia Comercial', 'Coaching de Vendas']
    },
    {
      id: 5,
      title: 'Sales Director',
      subtitle: 'Diretor de Vendas',
      salary: 18000,
      progress: 0,
      competencies: ['Gestão Estratégica', 'Liderança Executiva', 'Planejamento Comercial', 'Inglês Fluente', 'Gestão Financeira'],
      description: 'Gestão estratégica de vendas',
      type: 'Director',
      requiredCompetencies: ['Gestão Estratégica', 'Liderança Executiva', 'Planejamento Comercial', 'Inglês Fluente']
    },
    {
      id: 6,
      title: 'Diretor Comercial',
      subtitle: 'Chief Commercial Officer',
      salary: 25000,
      progress: 0,
      competencies: ['Visão Estratégica', 'Liderança Transformacional', 'Gestão de Portfólio', 'Negociação de Contratos', 'Inovação Comercial'],
      description: 'Liderança executiva',
      type: 'CCO',
      requiredCompetencies: ['Visão Estratégica', 'Liderança Transformacional', 'Gestão de Portfólio', 'Negociação de Contratos']
    }
  ],
  competencies: [
    'Prospecção Inbound',
    'Prospecção Ativa (Outbound)',
    'Negociação Básica',
    'Negociação Avançada',
    'CRM',
    'CRM Avançado',
    'Comunicação',
    'Comunicação Executiva',
    'Vendas Consultivas',
    'Gestão de Contas',
    'Excel Avançado',
    'Liderança de Equipes',
    'Inglês Fluente'
  ],
  courses: {
    free: [
      {
        id: 1,
        institution: 'Fundação Getulio Vargas – FGV',
        title: 'Técnicas de Negociação',
        value: 'Gratuito',
        certificate: true,
        competency: 'Negociação Básica',
        duration: '20h',
        weight: 5,
        url: 'https://www.fgv.br'
      },
      {
        id: 2,
        institution: 'Sebrae',
        title: 'Comunicação Empresarial',
        value: 'Gratuito',
        certificate: true,
        competency: 'Comunicação',
        duration: '15h',
        weight: 5,
        url: 'https://www.sebrae.com.br'
      },
      {
        id: 3,
        institution: 'Escola Conquer',
        title: 'Excel para Negócios',
        value: 'Gratuito/Promoção',
        certificate: false,
        competency: 'Excel Avançado',
        duration: '10h',
        weight: 3,
        url: 'https://www.escolaconquer.com.br'
      }
    ],
    paid: [
      {
        id: 4,
        institution: 'Fundação Getulio Vargas – FGV',
        title: 'Gestão Comercial Avançada',
        value: 399,
        certificate: true,
        competency: 'Liderança de Equipes',
        duration: '40h',
        weight: 15,
        url: 'https://www.fgv.br'
      },
      {
        id: 5,
        institution: 'ESPM',
        title: 'Vendas Consultivas',
        value: 890,
        certificate: true,
        competency: 'Vendas Consultivas',
        duration: '30h',
        weight: 20,
        url: 'https://www.espm.br'
      },
      {
        id: 6,
        institution: 'G4 Educação',
        title: 'Alta Performance em Prospecção Outbound',
        value: 1490,
        certificate: true,
        competency: 'Prospecção Ativa (Outbound)',
        duration: '50h',
        weight: 25,
        url: 'https://www.g4educacao.com.br'
      },
      {
        id: 7,
        institution: 'Rock University',
        title: 'Geração de Demanda',
        value: 297,
        certificate: true,
        competency: 'Prospecting Outbound',
        duration: '25h',
        weight: 12,
        url: 'https://www.rockuniversity.com.br'
      },
      {
        id: 8,
        institution: 'Alura',
        title: 'CRM e Pipeline Comercial',
        value: 39,
        certificate: true,
        competency: 'CRM Avançado',
        duration: '20h',
        weight: 10,
        url: 'https://www.alura.com.br'
      },
      {
        id: 9,
        institution: 'Cultura Inglesa / CNA Corporate',
        title: 'Inglês Business Sales',
        value: 'Sob consulta',
        certificate: true,
        competency: 'Inglês Fluente',
        duration: '60h',
        weight: 18,
        url: 'https://www.culturainglesa.com.br'
      }
    ]
  }
}

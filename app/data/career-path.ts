// Dados da Trilha de Sucesso
export const careerPath = {
  currentPosition: {
    title: 'SDR - Sales Development Representative',
    subtitle: 'SDR Junior',
    salary: 3500,
    progress: 100,
    description: 'Profissional iniciante em vendas focado em prospecção',
    competencies: ['Prospecção', 'Negociação Básica', 'CRM', 'Comunicação']
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
      competencies: ['Prospecção', 'Negociação Básica', 'CRM', 'Comunicação'],
      description: 'Profissional iniciante em vendas focado em prospecção'
    },
    {
      id: 2,
      title: 'SDR Pleno',
      subtitle: 'Sales Development Representative',
      salary: 5500,
      progress: 20,
      competencies: ['Prospecção Avançada', 'Negociação', 'CRM Avançado', 'Comunicação Executiva', 'Pipeline Management'],
      description: 'Desenvolvimento de habilidades comerciais avançadas'
    },
    {
      id: 3,
      title: 'AE - Account Executive',
      subtitle: 'Executivo de Contas',
      salary: 8000,
      progress: 40,
      competencies: ['Vendas Consultivas', 'Gestão de Contas', 'Negociação Estratégica', 'Excel Avançado', 'Análise de Dados'],
      description: 'Especialista em fechamento de negócios'
    },
    {
      id: 4,
      title: 'Sales Manager',
      subtitle: 'Gerente de Vendas',
      salary: 12000,
      progress: 60,
      competencies: ['Liderança de Equipes', 'Gestão de Performance', 'Estratégia Comercial', 'Coaching de Vendas', 'Previsão de Receita'],
      description: 'Liderança de equipes comerciais'
    },
    {
      id: 5,
      title: 'Sales Director',
      subtitle: 'Diretor de Vendas',
      salary: 18000,
      progress: 80,
      competencies: ['Gestão Estratégica', 'Liderança Executiva', 'Planejamento Comercial', 'Inglês Fluente', 'Gestão Financeira'],
      description: 'Gestão estratégica de vendas'
    },
    {
      id: 6,
      title: 'Diretor Comercial',
      subtitle: 'Chief Commercial Officer',
      salary: 25000,
      progress: 100,
      competencies: ['Visão Estratégica', 'Liderança Transformacional', 'Gestão de Portfólio', 'Negociação de Contratos', 'Inovação Comercial'],
      description: 'Liderança executiva'
    }
  ],
  competencies: [
    'Prospecção',
    'Negociação Básica',
    'CRM',
    'Comunicação',
    'Pipeline Management',
    'Vendas Consultivas',
    'Excel Avançado',
    'Liderança Comercial'
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
        competency: 'Liderança Comercial',
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
        title: 'Alta Performance em Vendas',
        value: 1490,
        certificate: true,
        competency: 'Prospecção',
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
        competency: 'Pipeline Management',
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
        competency: 'CRM',
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
        competency: 'Comunicação',
        duration: '60h',
        weight: 18,
        url: 'https://www.culturainglesa.com.br'
      }
    ]
  }
}

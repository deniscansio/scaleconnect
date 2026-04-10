// Dados da Trilha de Sucesso
export const careerPath = {
  currentPosition: {
    title: 'Executivo Comercial Jr',
    salary: 3500,
    description: 'Sua posição atual no mercado'
  },
  targetPosition: {
    title: 'Diretor Comercial',
    salary: 25000,
    description: 'Seu objetivo de carreira'
  },
  evolutionPath: [
    {
      id: 1,
      title: 'Executivo Comercial Jr',
      salary: 3500,
      progress: 0,
      competencies: ['Prospecção Comercial', 'CRM', 'Comunicação'],
      description: 'Início da carreira comercial'
    },
    {
      id: 2,
      title: 'Executivo Pleno',
      salary: 6000,
      progress: 20,
      competencies: ['Prospecção Comercial', 'CRM', 'Excel', 'Comunicação', 'Negociação'],
      description: 'Desenvolvimento de habilidades comerciais'
    },
    {
      id: 3,
      title: 'Executivo Sênior',
      salary: 9500,
      progress: 40,
      competencies: ['Prospecção Comercial', 'CRM', 'Excel', 'Comunicação', 'Negociação', 'Geração de Demanda'],
      description: 'Experiência consolidada'
    },
    {
      id: 4,
      title: 'Coordenador Comercial',
      salary: 12000,
      progress: 60,
      competencies: ['Prospecção Comercial', 'CRM', 'Excel', 'Comunicação', 'Negociação', 'Geração de Demanda', 'Liderança Comercial'],
      description: 'Liderança de equipes'
    },
    {
      id: 5,
      title: 'Gerente Comercial',
      salary: 18000,
      progress: 80,
      competencies: ['Prospecção Comercial', 'CRM', 'Excel', 'Comunicação', 'Negociação', 'Geração de Demanda', 'Liderança Comercial', 'Inglês para Negócios'],
      description: 'Gestão estratégica'
    },
    {
      id: 6,
      title: 'Diretor Comercial',
      salary: 25000,
      progress: 100,
      competencies: ['Prospecção Comercial', 'CRM', 'Excel', 'Comunicação', 'Negociação', 'Geração de Demanda', 'Liderança Comercial', 'Inglês para Negócios'],
      description: 'Liderança executiva'
    }
  ],
  competencies: [
    'Prospecção Comercial',
    'CRM',
    'Excel',
    'Comunicação',
    'Negociação',
    'Geração de Demanda',
    'Inglês para Negócios',
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
        competency: 'Negociação',
        duration: '20h'
      },
      {
        id: 2,
        institution: 'Sebrae',
        title: 'Comunicação Empresarial',
        value: 'Gratuito',
        certificate: true,
        competency: 'Comunicação',
        duration: '15h'
      },
      {
        id: 3,
        institution: 'Escola Conquer',
        title: 'Excel para Negócios',
        value: 'Gratuito/Promoção',
        certificate: false,
        competency: 'Excel',
        duration: '10h'
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
        duration: '40h'
      },
      {
        id: 5,
        institution: 'ESPM',
        title: 'Vendas Consultivas',
        value: 890,
        certificate: true,
        competency: 'Negociação',
        duration: '30h'
      },
      {
        id: 6,
        institution: 'G4 Educação',
        title: 'Alta Performance em Vendas',
        value: 1490,
        certificate: true,
        competency: 'Prospecção Comercial',
        duration: '50h'
      },
      {
        id: 7,
        institution: 'Rock University',
        title: 'Geração de Demanda',
        value: 297,
        certificate: true,
        competency: 'Geração de Demanda',
        duration: '25h'
      },
      {
        id: 8,
        institution: 'Alura',
        title: 'CRM e Pipeline Comercial',
        value: 39,
        certificate: true,
        competency: 'CRM',
        duration: '20h'
      },
      {
        id: 9,
        institution: 'Cultura Inglesa / CNA Corporate',
        title: 'Inglês Business Sales',
        value: 'Sob consulta',
        certificate: true,
        competency: 'Inglês para Negócios',
        duration: '60h'
      }
    ]
  }
}

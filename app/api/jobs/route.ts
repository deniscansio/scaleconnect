export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import mysql from 'mysql2/promise'
import jwt from 'jsonwebtoken'

// Função para parsear a URL de conexão do TiDB Cloud
function parseConnectionString(connectionString: string) {
  if (!connectionString) {
    throw new Error('DATABASE_URL não está configurada');
  }

  const url = new URL(connectionString);
  
  const user = decodeURIComponent(url.username);
  const password = decodeURIComponent(url.password);
  const host = url.hostname;
  const port = parseInt(url.port || '3306', 10);
  const database = url.pathname.replace('/', '');

  return {
    host,
    port,
    user,
    password,
    database,
  };
}

// Criar pool global (reutilizado em todas as requisições)
let pool: mysql.Pool | null = null;

function getPool() {
  if (!pool) {
    const connectionConfig = parseConnectionString(process.env.DATABASE_URL || '');
    
    pool = mysql.createPool({
      host: connectionConfig.host,
      port: connectionConfig.port,
      user: connectionConfig.user,
      password: connectionConfig.password,
      database: connectionConfig.database,
      connectionLimit: 10,
      ssl: {
        rejectUnauthorized: true
      },
      waitForConnections: true,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
  }
  return pool;
}

function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'scaleconnect-secret-2026') as any
    return decoded
  } catch (error) {
    return null
  }
}

export async function GET(request: NextRequest) {
  let connection: any = null
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    // Obter parâmetros de filtro opcionais
    const searchParams = request.nextUrl.searchParams
    const state = searchParams.get('state')
    const city = searchParams.get('city')
    const level = searchParams.get('level')
    const keyword = searchParams.get('keyword')

    // Obter conexão do pool
    const pool = getPool()
    connection = await pool.getConnection()

    let companyId: number | null = null
    let isAuthenticated = false

    // Verificar autenticação (opcional)
    if (token) {
      const payload = verifyToken(token)
      if (payload && payload.id) {
        companyId = payload.id as number
        isAuthenticated = true
      }
    }

    // Construir query base
    let query = `
      SELECT 
        jp.id,
        jp.company_id,
        jp.title,
        jp.description,
        jp.level,
        jp.salary_min,
        jp.salary_max,
        jp.location,
        jp.employment_type,
        jp.work_mode,
        jp.status,
        jp.created_at,
        jp.updated_at,
        u.full_name as company_name,
        u.company_name as company_display_name
      FROM job_postings jp
      INNER JOIN users u ON jp.company_id = u.id
      WHERE 1=1
    `

    const params: any[] = []

    // Se autenticado, retorna APENAS vagas da empresa
    // Se não autenticado, retorna TODAS as vagas abertas
    if (isAuthenticated && companyId) {
      query += ` AND jp.company_id = ?`
      params.push(companyId)
    } else {
      query += ` AND jp.status = 'OPEN'`
    }

    // Adicionar filtros opcionais
    if (state) {
      query += ` AND jp.location LIKE ?`
      params.push(`%${state}%`)
    }

    if (city) {
      query += ` AND jp.location LIKE ?`
      params.push(`%${city}%`)
    }

    if (level) {
      query += ` AND jp.level = ?`
      params.push(level)
    }

    if (keyword) {
      query += ` AND (jp.title LIKE ? OR jp.description LIKE ?)`
      params.push(`%${keyword}%`, `%${keyword}%`)
    }

    query += ` ORDER BY jp.created_at DESC`

    // Executar query
    const [jobs] = await connection.execute(query, params) as any

    // Para cada vaga, buscar as competências e benefícios
    const jobsWithDetails = await Promise.all(
      jobs.map(async (job: any) => {
        const [competencies] = await connection.execute(
          `SELECT c.id, c.nome FROM competencies c
           INNER JOIN job_competencies jc ON c.id = jc.competencia_id
           WHERE jc.job_id = ?`,
          [job.id]
        ) as any

        const [benefits] = await connection.execute(
          `SELECT b.id, b.nome, b.icone FROM benefits b
           INNER JOIN job_benefits jb ON b.id = jb.benefit_id
           WHERE jb.job_id = ?`,
          [job.id]
        ) as any

        return {
          id: job.id,
          companyId: job.company_id,
          companyName: job.company_display_name || job.company_name,
          title: job.title,
          jobTitle: job.title,
          description: job.description,
          level: job.level,
          salaryMin: job.salary_min,
          salaryMax: job.salary_max,
          location: job.location,
          employmentType: job.employment_type,
          workMode: job.work_mode,
          status: job.status,
          competencies,
          benefits,
          createdAt: job.created_at,
          updatedAt: job.updated_at,
        }
      })
    )

    return NextResponse.json(jobsWithDetails)
  } catch (error) {
    console.error('Erro ao buscar vagas:', error)
    return NextResponse.json(
      { message: 'Erro ao buscar vagas', error: String(error) },
      { status: 500 }
    )
  } finally {
    if (connection) await connection.release()
  }
}

export async function POST(request: NextRequest) {
  let connection: any = null
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { message: 'Token não fornecido' },
        { status: 401 }
      )
    }

    const payload = verifyToken(token)
    if (!payload || !payload.id) {
      console.error('Token inválido:', payload)
      return NextResponse.json(
        { message: 'Token inválido' },
        { status: 401 }
      )
    }

    const companyId = payload.id as number
    const body = await request.json()

    const { title, jobTitle, description, level, salaryMin, salaryMax, state, city, employmentType, workMode, competenciesIds, benefitsIds } = body

    console.log('POST /api/jobs - Dados recebidos:', { title, jobTitle, state, city, employmentType, workMode, competenciesIds: competenciesIds?.length, companyId })

    // Validar campos obrigatórios
    if (!title || !jobTitle || !description || !state || !city || !employmentType || !workMode) {
      console.log('Campos obrigatórios faltando')
      return NextResponse.json(
        { message: 'Todos os campos obrigatórios devem ser preenchidos' },
        { status: 400 }
      )
    }

    // Validar mínimo de competências
    if (!competenciesIds || !Array.isArray(competenciesIds) || competenciesIds.length < 4) {
      console.log('Competências inválidas:', competenciesIds?.length)
      return NextResponse.json(
        { message: 'Mínimo de 4 competências é obrigatório' },
        { status: 400 }
      )
    }

    // Obter conexão do pool
    const pool = getPool()
    connection = await pool.getConnection()

    // Criar a vaga
    const location = `${city}, ${state}`
    console.log('Criando vaga com:', { companyId, title, location })
    
    const [result] = await connection.execute(
      `INSERT INTO job_postings (company_id, title, job_title, description, level, salary_min, salary_max, location, employment_type, work_mode, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'OPEN')`,
      [
        companyId,
        title,
        jobTitle,
        description,
        level || 'PLENO',
        salaryMin ? parseFloat(String(salaryMin)) : null,
        salaryMax ? parseFloat(String(salaryMax)) : null,
        location,
        employmentType,
        workMode,
      ]
    ) as any

    const jobId = result.insertId
    console.log('Vaga criada com ID:', jobId)

    // Adicionar competências
    if (competenciesIds && Array.isArray(competenciesIds) && competenciesIds.length > 0) {
      console.log('Adicionando', competenciesIds.length, 'competências')
      for (const competenciaId of competenciesIds) {
        try {
          await connection.execute(
            'INSERT INTO job_competencies (job_id, competencia_id) VALUES (?, ?)',
            [jobId, competenciaId]
          )
        } catch (err: any) {
          console.error('Erro ao adicionar competência:', competenciaId, err?.message)
        }
      }
    }

    // Adicionar benefícios
    if (benefitsIds && Array.isArray(benefitsIds) && benefitsIds.length > 0) {
      console.log('Adicionando', benefitsIds.length, 'benefícios')
      for (const benefitId of benefitsIds) {
        try {
          await connection.execute(
            'INSERT INTO job_benefits (job_id, benefit_id) VALUES (?, ?)',
            [jobId, benefitId]
          )
        } catch (err: any) {
          console.error('Erro ao adicionar benefício:', benefitId, err?.message)
        }
      }
    }

    console.log('Vaga criada com sucesso')
    return NextResponse.json(
      { message: 'Vaga criada com sucesso', jobId },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Erro ao criar vaga:', error?.message || error)
    return NextResponse.json(
      { message: 'Erro ao criar vaga', error: error?.message || 'Erro desconhecido' },
      { status: 500 }
    )
  } finally {
    if (connection) await connection.release()
  }
}

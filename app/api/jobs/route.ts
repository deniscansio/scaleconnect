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
    
    // Se tem token, retorna APENAS vagas da empresa
    // Se não tem token, retorna TODAS as vagas (para candidatos)
    
    if (token) {
      // COM AUTENTICAÇÃO - Vagas da empresa
      const payload = verifyToken(token)
      if (!payload || !payload.id) {
        return NextResponse.json(
          { message: 'Token inválido' },
          { status: 401 }
        )
      }

      const companyId = payload.id as number
      connection = await getPool().getConnection()

      // Buscar vagas da empresa
      const [jobs] = await connection.execute(
        `SELECT id, company_id, title, job_title, description, level, salary_min, salary_max, location, employment_type, work_mode, status, created_at, updated_at 
         FROM job_postings 
         WHERE company_id = ? 
         ORDER BY created_at DESC`,
        [companyId]
      ) as any

      // Para cada vaga, buscar competências e benefícios
      const jobsWithDetails = await Promise.all(
        (jobs || []).map(async (job: any) => {
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
            title: job.title,
            jobTitle: job.job_title,
            description: job.description,
            level: job.level,
            salaryMin: job.salary_min,
            salaryMax: job.salary_max,
            location: job.location,
            employmentType: job.employment_type,
            workMode: job.work_mode,
            status: job.status,
            competencies: competencies || [],
            benefits: benefits || [],
            createdAt: job.created_at,
            updatedAt: job.updated_at,
          }
        })
      )

      return NextResponse.json(jobsWithDetails)
    } else {
      // SEM AUTENTICAÇÃO - Todas as vagas abertas (para candidatos)
      connection = await getPool().getConnection()

      // Buscar TODAS as vagas abertas
      const [jobs] = await connection.execute(
        `SELECT jp.id, jp.company_id, jp.title, jp.job_title, jp.description, jp.level, jp.salary_min, jp.salary_max, jp.location, jp.employment_type, jp.work_mode, jp.status, jp.created_at, jp.updated_at, u.full_name as company_name
         FROM job_postings jp
         INNER JOIN users u ON jp.company_id = u.id
         WHERE jp.status = 'OPEN'
         ORDER BY jp.created_at DESC`
      ) as any

      // Para cada vaga, buscar competências e benefícios
      const jobsWithDetails = await Promise.all(
        (jobs || []).map(async (job: any) => {
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
            companyName: job.company_name,
            title: job.title,
            jobTitle: job.job_title,
            description: job.description,
            level: job.level,
            salaryMin: job.salary_min,
            salaryMax: job.salary_max,
            location: job.location,
            employmentType: job.employment_type,
            workMode: job.work_mode,
            status: job.status,
            competencies: competencies || [],
            benefits: benefits || [],
            createdAt: job.created_at,
            updatedAt: job.updated_at,
          }
        })
      )

      return NextResponse.json(jobsWithDetails)
    }
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
      return NextResponse.json(
        { message: 'Token inválido' },
        { status: 401 }
      )
    }

    const companyId = payload.id as number
    const body = await request.json()
    const { title, jobTitle, level, salaryMin, salaryMax, state, city, description, employmentType, workMode, competenciesIds, benefitsIds } = body

    connection = await getPool().getConnection()

    // Inserir vaga
    const [result] = await connection.execute(
      `INSERT INTO job_postings (company_id, title, job_title, description, level, salary_min, salary_max, location, employment_type, work_mode, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [companyId, title, jobTitle, description, level, salaryMin || null, salaryMax || null, `${city}, ${state}`, employmentType, workMode, 'OPEN']
    ) as any

    const jobId = result.insertId

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

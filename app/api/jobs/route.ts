import { NextRequest, NextResponse } from 'next/server'
import mysql from 'mysql2/promise'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'scaleconnect-super-secret-key-2026')

async function verifyToken(token: string) {
  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload
  } catch (error) {
    return null
  }
}

async function getConnection() {
  return await mysql.createConnection({
    uri: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: true
    }
  })
}

export async function GET(request: NextRequest) {
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

    const payload = await verifyToken(token)
    if (!payload || !payload.userId) {
      return NextResponse.json(
        { message: 'Token inválido' },
        { status: 401 }
      )
    }

    const companyId = payload.userId as number
    connection = await getConnection()

    // Buscar vagas
    const [jobs] = await connection.execute(
      'SELECT id, company_id, title, job_title, description, level, salary_min, salary_max, location, employment_type, work_mode, status, created_at, updated_at FROM job_postings WHERE company_id = ?',
      [companyId]
    ) as any

    // Para cada vaga, buscar as competências
    const jobsWithCompetencies = await Promise.all(
      jobs.map(async (job: any) => {
        const [competencies] = await connection.execute(
          `SELECT c.id, c.nome FROM competencies c
           INNER JOIN job_competencies jc ON c.id = jc.competencia_id
           WHERE jc.job_id = ?`,
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
          competencies,
          createdAt: job.created_at,
          updatedAt: job.updated_at,
        }
      })
    )

    return NextResponse.json(jobsWithCompetencies)
  } catch (error) {
    console.error('Erro ao buscar vagas:', error)
    return NextResponse.json(
      { message: 'Erro ao buscar vagas' },
      { status: 500 }
    )
  } finally {
    if (connection) await connection.end()
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

    const payload = await verifyToken(token)
    if (!payload || !payload.userId) {
      return NextResponse.json(
        { message: 'Token inválido' },
        { status: 401 }
      )
    }

    const companyId = payload.userId as number
    const body = await request.json()

    const { title, jobTitle, description, level, salaryMin, salaryMax, location, employmentType, workMode, competenciesIds } = body

    // Validar campos obrigatórios
    if (!title || !jobTitle || !description || !location || !employmentType || !workMode) {
      return NextResponse.json(
        { message: 'Todos os campos obrigatórios devem ser preenchidos' },
        { status: 400 }
      )
    }

    // Validar mínimo de competências
    if (!competenciesIds || !Array.isArray(competenciesIds) || competenciesIds.length < 4) {
      return NextResponse.json(
        { message: 'Mínimo de 4 competências é obrigatório' },
        { status: 400 }
      )
    }

    connection = await getConnection()

    // Criar a vaga
    const [result] = await connection.execute(
      `INSERT INTO job_postings (company_id, title, job_title, description, level, salary_min, salary_max, location, employment_type, work_mode, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'OPEN')`,
      [
        companyId,
        title,
        jobTitle,
        description,
        level || 'PLENO',
        salaryMin ? parseFloat(salaryMin) : null,
        salaryMax ? parseFloat(salaryMax) : null,
        location,
        employmentType,
        workMode,
      ]
    ) as any

    const jobId = result.insertId

    // Adicionar competências se fornecidas
    if (competenciesIds && Array.isArray(competenciesIds) && competenciesIds.length > 0) {
      for (const competenciaId of competenciesIds) {
        await connection.execute(
          'INSERT INTO job_competencies (job_id, competencia_id) VALUES (?, ?)',
          [jobId, competenciaId]
        )
      }
    }

    return NextResponse.json(
      { message: 'Vaga criada com sucesso', jobId },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erro ao criar vaga:', error)
    return NextResponse.json(
      { message: 'Erro ao criar vaga' },
      { status: 500 }
    )
  } finally {
    if (connection) await connection.end()
  }
}

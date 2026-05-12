import { NextRequest, NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

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
    connection = await getConnection()

    // Buscar todas as vagas abertas
    const [jobs] = await connection.execute(
      'SELECT id, company_id, title, job_title, description, level, salary_min, salary_max, location, employment_type, work_mode, status, created_at, updated_at FROM job_postings WHERE status = "OPEN" ORDER BY created_at DESC'
    ) as any

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
      { message: 'Erro ao buscar vagas' },
      { status: 500 }
    )
  } finally {
    if (connection) await connection.end()
  }
}

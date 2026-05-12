export const dynamic = 'force-dynamic'
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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let connection: any = null
  try {
    const jobId = parseInt(params.id)
    connection = await getConnection()

    const [jobs] = await connection.execute(
      'SELECT id, company_id, title, job_title, description, level, salary_min, salary_max, location, employment_type, work_mode, status, created_at, updated_at FROM job_postings WHERE id = ?',
      [jobId]
    ) as any

    if (jobs.length === 0) {
      return NextResponse.json(
        { message: 'Vaga não encontrada' },
        { status: 404 }
      )
    }

    const job = jobs[0]

    // Buscar competências da vaga
    const [competencies] = await connection.execute(
      `SELECT c.id, c.nome FROM competencies c
       INNER JOIN job_competencies jc ON c.id = jc.competencia_id
       WHERE jc.job_id = ?`,
      [jobId]
    ) as any

    // Buscar benefícios da vaga
    const [benefits] = await connection.execute(
      `SELECT b.id, b.nome, b.icone FROM benefits b
       INNER JOIN job_benefits jb ON b.id = jb.benefit_id
       WHERE jb.job_id = ?`,
      [jobId]
    ) as any

    return NextResponse.json({
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
    })
  } catch (error) {
    console.error('Erro ao buscar vaga:', error)
    return NextResponse.json(
      { message: 'Erro ao buscar vaga' },
      { status: 500 }
    )
  } finally {
    if (connection) await connection.end()
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    if (!payload || !payload.id) {
      return NextResponse.json(
        { message: 'Token inválido' },
        { status: 401 }
      )
    }

    const companyId = payload.id as number
    const jobId = parseInt(params.id)
    connection = await getConnection()

    // Verificar se a vaga pertence à empresa
    const [jobs] = await connection.execute(
      'SELECT id FROM job_postings WHERE id = ? AND company_id = ?',
      [jobId, companyId]
    ) as any

    if (jobs.length === 0) {
      return NextResponse.json(
        { message: 'Vaga não encontrada ou sem permissão' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { title, description, level, salaryMin, salaryMax, location, status, competenciesIds, benefitsIds } = body

    // Atualizar vaga
    await connection.execute(
      `UPDATE job_postings SET 
        title = COALESCE(?, title),
        description = COALESCE(?, description),
        level = COALESCE(?, level),
        salary_min = COALESCE(?, salary_min),
        salary_max = COALESCE(?, salary_max),
        location = COALESCE(?, location),
        status = COALESCE(?, status)
       WHERE id = ?`,
      [
        title || null,
        description || null,
        level || null,
        salaryMin ? parseFloat(salaryMin) : null,
        salaryMax ? parseFloat(salaryMax) : null,
        location || null,
        status || null,
        jobId,
      ]
    )

    // Atualizar competências se fornecidas
    if (competenciesIds && Array.isArray(competenciesIds)) {
      // Remover competências antigas
      await connection.execute('DELETE FROM job_competencies WHERE job_id = ?', [jobId])

      // Adicionar novas competências
      if (competenciesIds.length > 0) {
        for (const competenciaId of competenciesIds) {
          await connection.execute(
            'INSERT INTO job_competencies (job_id, competencia_id) VALUES (?, ?)',
            [jobId, competenciaId]
          )
        }
      }
    }

    // Atualizar benefícios se fornecidos
    if (benefitsIds && Array.isArray(benefitsIds)) {
      // Remover benefícios antigos
      await connection.execute('DELETE FROM job_benefits WHERE job_id = ?', [jobId])

      // Adicionar novos benefícios
      if (benefitsIds.length > 0) {
        for (const benefitId of benefitsIds) {
          await connection.execute(
            'INSERT INTO job_benefits (job_id, benefit_id) VALUES (?, ?)',
            [jobId, benefitId]
          )
        }
      }
    }

    return NextResponse.json({ message: 'Vaga atualizada com sucesso' })
  } catch (error) {
    console.error('Erro ao atualizar vaga:', error)
    return NextResponse.json(
      { message: 'Erro ao atualizar vaga' },
      { status: 500 }
    )
  } finally {
    if (connection) await connection.end()
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    if (!payload || !payload.id) {
      return NextResponse.json(
        { message: 'Token inválido' },
        { status: 401 }
      )
    }

    const companyId = payload.id as number
    const jobId = parseInt(params.id)
    connection = await getConnection()

    // Verificar se a vaga pertence à empresa
    const [jobs] = await connection.execute(
      'SELECT id FROM job_postings WHERE id = ? AND company_id = ?',
      [jobId, companyId]
    ) as any

    if (jobs.length === 0) {
      return NextResponse.json(
        { message: 'Vaga não encontrada ou sem permissão' },
        { status: 404 }
      )
    }

    // Deletar vaga (competências serão deletadas em cascata)
    await connection.execute('DELETE FROM job_postings WHERE id = ?', [jobId])

    return NextResponse.json({ message: 'Vaga deletada com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar vaga:', error)
    return NextResponse.json(
      { message: 'Erro ao deletar vaga' },
      { status: 500 }
    )
  } finally {
    if (connection) await connection.end()
  }
}

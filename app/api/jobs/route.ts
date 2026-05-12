import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { jobPostings, jobCompetencies } from '@/lib/db/schema/jobs'
import { competencies } from '@/lib/db/schema/competencies'
import { eq } from 'drizzle-orm'
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

export async function GET(request: NextRequest) {
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

    // Buscar todas as vagas da empresa
    const jobs = await db.query.jobPostings.findMany({
      where: eq(jobPostings.companyId, companyId),
    })

    // Para cada vaga, buscar as competências
    const jobsWithCompetencies = await Promise.all(
      jobs.map(async (job) => {
        const jobComps = await db
          .select({
            id: competencies.id,
            nome: competencies.nome,
          })
          .from(jobCompetencies)
          .innerJoin(competencies, eq(jobCompetencies.competenciaId, competencies.id))
          .where(eq(jobCompetencies.jobId, job.id))

        return {
          ...job,
          competencies: jobComps,
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
  }
}

export async function POST(request: NextRequest) {
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

    const { title, description, level, salaryMin, salaryMax, location, competenciesIds } = body

    if (!title || !description || !location) {
      return NextResponse.json(
        { message: 'Campos obrigatórios faltando' },
        { status: 400 }
      )
    }

    // Criar a vaga
    const insertResult = await db.insert(jobPostings).values({
      companyId: Number(companyId),
      title,
      description,
      level: (level || 'PLENO') as 'JUNIOR' | 'PLENO' | 'SENIOR',
      salaryMin: salaryMin ? parseFloat(salaryMin) : null,
      salaryMax: salaryMax ? parseFloat(salaryMax) : null,
      location,
      status: 'OPEN' as 'OPEN' | 'CLOSED',
    })

    // Buscar o ID da vaga inserida
    const jobs = await db.query.jobPostings.findMany({
      where: (table) => table.companyId.eq(Number(companyId)),
      orderBy: (table) => [table.id],
      limit: 1,
    })
    
    const jobId = jobs[jobs.length - 1]?.id

    // Adicionar competências se fornecidas
    if (competenciesIds && Array.isArray(competenciesIds) && competenciesIds.length > 0) {
      await Promise.all(
        competenciesIds.map((competenciaId) =>
          db.insert(jobCompetencies).values({
            jobId: Number(jobId),
            competenciaId,
          })
        )
      )
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
  }
}

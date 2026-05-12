import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { jobPostings, jobCompetencies } from '@/lib/db/schema/jobs'
import { competencies } from '@/lib/db/schema/competencies'
import { eq, and } from 'drizzle-orm'
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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const jobId = parseInt(params.id)

    const job = await db.query.jobPostings.findFirst({
      where: eq(jobPostings.id, jobId),
    })

    if (!job) {
      return NextResponse.json(
        { message: 'Vaga não encontrada' },
        { status: 404 }
      )
    }

    // Buscar competências da vaga
    const jobComps = await db
      .select({
        id: competencies.id,
        nome: competencies.nome,
      })
      .from(jobCompetencies)
      .innerJoin(competencies, eq(jobCompetencies.competenciaId, competencies.id))
      .where(eq(jobCompetencies.jobId, jobId))

    return NextResponse.json({
      ...job,
      competencies: jobComps,
    })
  } catch (error) {
    console.error('Erro ao buscar vaga:', error)
    return NextResponse.json(
      { message: 'Erro ao buscar vaga' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const jobId = parseInt(params.id)

    // Verificar se a vaga pertence à empresa
    const job = await db.query.jobPostings.findFirst({
      where: and(
        eq(jobPostings.id, jobId),
        eq(jobPostings.companyId, companyId)
      ),
    })

    if (!job) {
      return NextResponse.json(
        { message: 'Vaga não encontrada ou sem permissão' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { title, description, level, salaryMin, salaryMax, location, status, competenciesIds } = body

    // Atualizar vaga
    const updateData: any = {
      title: title || job.title,
      description: description || job.description,
      level: level || job.level,
      location: location || job.location,
      status: status || job.status,
    }

    if (salaryMin !== undefined) {
      updateData.salaryMin = salaryMin ? parseFloat(salaryMin) : null
    }
    if (salaryMax !== undefined) {
      updateData.salaryMax = salaryMax ? parseFloat(salaryMax) : null
    }

    await db
      .update(jobPostings)
      .set(updateData)
      .where(eq(jobPostings.id, jobId))

    // Atualizar competências se fornecidas
    if (competenciesIds && Array.isArray(competenciesIds)) {
      // Remover competências antigas
      await db.delete(jobCompetencies).where(eq(jobCompetencies.jobId, jobId))

      // Adicionar novas competências
      if (competenciesIds.length > 0) {
        await Promise.all(
          competenciesIds.map((competenciaId) =>
            db.insert(jobCompetencies).values({
              jobId,
              competenciaId,
            })
          )
        )
      }
    }

    return NextResponse.json({ message: 'Vaga atualizada com sucesso' })
  } catch (error) {
    console.error('Erro ao atualizar vaga:', error)
    return NextResponse.json(
      { message: 'Erro ao atualizar vaga' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const jobId = parseInt(params.id)

    // Verificar se a vaga pertence à empresa
    const job = await db.query.jobPostings.findFirst({
      where: and(
        eq(jobPostings.id, jobId),
        eq(jobPostings.companyId, companyId)
      ),
    })

    if (!job) {
      return NextResponse.json(
        { message: 'Vaga não encontrada ou sem permissão' },
        { status: 404 }
      )
    }

    // Deletar vaga (competências serão deletadas em cascata)
    await db.delete(jobPostings).where(eq(jobPostings.id, jobId))

    return NextResponse.json({ message: 'Vaga deletada com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar vaga:', error)
    return NextResponse.json(
      { message: 'Erro ao deletar vaga' },
      { status: 500 }
    )
  }
}

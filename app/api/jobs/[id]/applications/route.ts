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

export async function GET(
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

    const payload = verifyToken(token)
    if (!payload || !payload.id) {
      return NextResponse.json(
        { message: 'Token inválido' },
        { status: 401 }
      )
    }

    const companyId = payload.id as number
    const jobId = parseInt(params.id, 10)

    if (!jobId || isNaN(jobId)) {
      return NextResponse.json(
        { message: 'ID da vaga inválido' },
        { status: 400 }
      )
    }

    // Obter conexão do pool
    const poolInstance = getPool()
    connection = await poolInstance.getConnection()

    // Passo 1: Validar que a vaga pertence à empresa
    const [jobs] = await connection.execute(
      'SELECT id, company_id FROM job_postings WHERE id = ?',
      [jobId]
    ) as any

    if (!jobs || jobs.length === 0) {
      return NextResponse.json(
        { message: 'Vaga não encontrada' },
        { status: 404 }
      )
    }

    if (jobs[0].company_id !== companyId) {
      return NextResponse.json(
        { message: 'Você não tem permissão para ver os candidatos desta vaga' },
        { status: 403 }
      )
    }

    // Passo 2: Buscar candidatos que se candidataram
    const [applications] = await connection.execute(
      `SELECT 
        ja.id as applicationId,
        ja.status,
        ja.created_at as appliedAt,
        cp.id as candidateId,
        cp.user_id,
        u.full_name as candidateName,
        u.email as candidateEmail,
        cp.phone,
        cp.current_position,
        cp.current_company,
        cp.years_of_experience,
        cp.state,
        cp.city,
        cp.education_level,
        cp.about_me,
        cp.profile_photo,
        cp.linkedin_url
      FROM job_applications ja
      INNER JOIN candidate_profiles cp ON ja.candidate_id = cp.id
      INNER JOIN users u ON cp.user_id = u.id
      WHERE ja.job_id = ?
      ORDER BY ja.created_at DESC`,
      [jobId]
    ) as any

    // Formatar resposta
    const formattedApplications = (applications || []).map((app: any) => ({
      applicationId: app.applicationId,
      status: app.status,
      appliedAt: app.appliedAt,
      candidate: {
        id: app.candidateId,
        userId: app.user_id,
        name: app.candidateName,
        email: app.candidateEmail,
        phone: app.phone,
        currentPosition: app.current_position,
        currentCompany: app.current_company,
        yearsOfExperience: app.years_of_experience,
        state: app.state,
        city: app.city,
        educationLevel: app.education_level,
        aboutMe: app.about_me,
        profilePhoto: app.profile_photo,
        linkedinUrl: app.linkedin_url,
      }
    }))

    return NextResponse.json({
      jobId,
      totalApplications: formattedApplications.length,
      applications: formattedApplications
    })
  } catch (error) {
    console.error('Erro ao buscar candidatos:', error)
    return NextResponse.json(
      { message: 'Erro ao buscar candidatos', error: String(error) },
      { status: 500 }
    )
  } finally {
    if (connection) await connection.release()
  }
}

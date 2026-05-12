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

    const userId = payload.id as number
    
    // Obter jobId do body
    const body = await request.json()
    const jobId = body.jobId

    if (!jobId || isNaN(parseInt(jobId, 10))) {
      return NextResponse.json(
        { message: 'ID da vaga inválido' },
        { status: 400 }
      )
    }

    // Obter conexão do pool
    const pool = getPool()
    connection = await pool.getConnection()

    // Passo 1: Buscar candidateProfiles.id usando userId
    const [candidateProfiles] = await connection.execute(
      'SELECT id FROM candidate_profiles WHERE user_id = ?',
      [userId]
    ) as any

    if (!candidateProfiles || candidateProfiles.length === 0) {
      return NextResponse.json(
        { message: 'Perfil de candidato não encontrado. Complete seu perfil primeiro.' },
        { status: 404 }
      )
    }

    const candidateId = candidateProfiles[0].id

    // Passo 2: Validar se a vaga existe
    const [jobs] = await connection.execute(
      'SELECT id FROM job_postings WHERE id = ?',
      [jobId]
    ) as any

    if (!jobs || jobs.length === 0) {
      return NextResponse.json(
        { message: 'Vaga não encontrada' },
        { status: 404 }
      )
    }

    // Passo 3: Verificar se já se candidatou (unique constraint)
    const [existingApplication] = await connection.execute(
      'SELECT id FROM job_applications WHERE job_id = ? AND candidate_id = ?',
      [jobId, candidateId]
    ) as any

    if (existingApplication && existingApplication.length > 0) {
      return NextResponse.json(
        { message: 'Você já se candidatou para esta vaga' },
        { status: 409 }
      )
    }

    // Passo 4: Inserir candidatura
    const [result] = await connection.execute(
      'INSERT INTO job_applications (job_id, candidate_id, status) VALUES (?, ?, ?)',
      [jobId, candidateId, 'APPLIED']
    ) as any

    console.log('Candidatura criada com sucesso:', { jobId, candidateId, applicationId: result.insertId })

    return NextResponse.json(
      {
        message: 'Candidatura realizada com sucesso!',
        applicationId: result.insertId,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erro ao candidatar:', error)
    return NextResponse.json(
      { message: 'Erro ao realizar candidatura', error: String(error) },
      { status: 500 }
    )
  } finally {
    if (connection) await connection.release()
  }
}

import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as userSchema from './schema/users';
import * as competenciesSchema from './schema/competencies';
import * as jobsSchema from './schema/jobs';

const schema = { ...userSchema, ...competenciesSchema, ...jobsSchema };

// Função para parsear a URL de conexão do TiDB Cloud
function parseConnectionString(connectionString: string) {
  if (!connectionString) {
    throw new Error('DATABASE_URL não está configurada');
  }

  // Formato: mysql://user:password@host:port/database?ssl={"rejectUnauthorized":true}
  const url = new URL(connectionString);
  
  // Extrair componentes da URL
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

// Configuração de conexão com o banco de dados MySQL (TiDB Cloud)
const connectionConfig = parseConnectionString(process.env.DATABASE_URL || '');

const connection = mysql.createPool({
  ...connectionConfig,
  connectionLimit: 10, // IMPORTANTE: Limita conexões para não travar o banco
  ssl: {
    rejectUnauthorized: true
  },
  waitForConnections: true,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0,
});

export const db = drizzle(connection, { schema, mode: 'default' });

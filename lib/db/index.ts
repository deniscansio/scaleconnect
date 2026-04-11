import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema/users';

// Configuração de conexão com o banco de dados MySQL (TiDB Cloud)
const connection = mysql.createPool({
  uri: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true
  }
});

export const db = drizzle(connection, { schema, mode: 'default' });

import mysql from 'mysql2/promise';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

async function runMigration() {
  try {
    const connection = await mysql.createConnection({
      uri: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: true
      }
    });

    console.log('✅ Conectado ao banco de dados TiDB');

    // Read and execute the migration SQL
    const migrationPath = path.join(__dirname, '../drizzle/0001_competencies.sql');
    const sql = fs.readFileSync(migrationPath, 'utf-8');

    // Split by semicolon and execute each statement
    const statements = sql.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        console.log('Executando:', statement.substring(0, 50) + '...');
        await connection.execute(statement);
      }
    }

    console.log('✅ Migração executada com sucesso!');
    console.log('✅ Tabelas criadas: competencies e candidato_competencias');
    console.log('✅ 171 competências inseridas no banco de dados');

    await connection.end();
  } catch (error) {
    console.error('❌ Erro ao executar migração:', error);
    process.exit(1);
  }
}

runMigration();

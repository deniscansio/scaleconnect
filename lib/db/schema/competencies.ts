import { mysqlTable, serial, varchar, timestamp, int } from 'drizzle-orm/mysql-core'

export const competencies = mysqlTable('competencies', {
  id: serial('id').primaryKey(),
  nome: varchar('nome', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
})

export const candidatoCompetencias = mysqlTable('candidato_competencias', {
  id: serial('id').primaryKey(),
  candidatoId: int('candidato_id').notNull(),
  competenciaId: int('competencia_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

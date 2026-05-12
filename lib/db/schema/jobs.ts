import { mysqlTable, int, varchar, text, timestamp, decimal, mysqlEnum, uniqueIndex } from 'drizzle-orm/mysql-core'
import { users } from './users'
import { competencies } from './competencies'
import { candidateProfiles } from './users'

export const jobLevelEnum = mysqlEnum('level', ['JUNIOR', 'PLENO', 'SENIOR'])
export const jobStatusEnum = mysqlEnum('status', ['OPEN', 'CLOSED'])
export const applicationStatusEnum = mysqlEnum('status', ['APPLIED', 'REVIEWING', 'INTERVIEW', 'REJECTED', 'HIRED'])

export const jobPostings = mysqlTable('job_postings', {
  id: int('id').primaryKey().autoincrement(),
  companyId: int('company_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  level: jobLevelEnum.notNull().default('PLENO'),
  salaryMin: decimal('salary_min', { precision: 10, scale: 2 }),
  salaryMax: decimal('salary_max', { precision: 10, scale: 2 }),
  location: varchar('location', { length: 255 }).notNull(),
  status: jobStatusEnum.notNull().default('OPEN'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  companyIdIdx: uniqueIndex('idx_company_id').on(table.companyId),
  statusIdx: uniqueIndex('idx_status').on(table.status),
}))

export const jobCompetencies = mysqlTable('job_competencies', {
  id: int('id').primaryKey().autoincrement(),
  jobId: int('job_id').notNull().references(() => jobPostings.id, { onDelete: 'cascade' }),
  competenciaId: int('competencia_id').notNull().references(() => competencies.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  uniqueJobCompetencia: uniqueIndex('unique_job_competencia').on(table.jobId, table.competenciaId),
  jobIdIdx: uniqueIndex('idx_job_id').on(table.jobId),
  competenciaIdIdx: uniqueIndex('idx_competencia_id').on(table.competenciaId),
}))

export const jobApplications = mysqlTable('job_applications', {
  id: int('id').primaryKey().autoincrement(),
  jobId: int('job_id').notNull().references(() => jobPostings.id, { onDelete: 'cascade' }),
  candidateId: int('candidate_id').notNull().references(() => candidateProfiles.id, { onDelete: 'cascade' }),
  status: applicationStatusEnum.notNull().default('APPLIED'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  uniqueJobCandidate: uniqueIndex('unique_job_candidate').on(table.jobId, table.candidateId),
  jobIdIdx: uniqueIndex('idx_job_id').on(table.jobId),
  candidateIdIdx: uniqueIndex('idx_candidate_id').on(table.candidateId),
  statusIdx: uniqueIndex('idx_status').on(table.status),
}))

import { mysqlTable, serial, varchar, text, timestamp, decimal, mysqlEnum, int } from 'drizzle-orm/mysql-core'

export const userTypeEnum = mysqlEnum('user_type', [
  'CANDIDATE',
  'COMPANY',
  'ADMIN',
])

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  userType: userTypeEnum.notNull().default('CANDIDATE'),
  companyName: varchar('company_name', { length: 255 }),
  isActive: int('is_active').default(1),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
})

export const candidateProfiles = mysqlTable('candidate_profiles', {
  id: serial('id').primaryKey(),
  userId: int('user_id').references(() => users.id),
  age: int('age'),
  gender: varchar('gender', { length: 20 }),
  phone: varchar('phone', { length: 20 }),
  linkedinUrl: varchar('linkedin_url', { length: 255 }),
  profilePhoto: text('profile_photo'),
  currentPosition: varchar('current_position', { length: 255 }),
  currentCompany: varchar('current_company', { length: 255 }),
  currentSalary: decimal('current_salary', { precision: 10, scale: 2 }),
  yearsOfExperience: int('years_of_experience'),
  state: varchar('state', { length: 50 }),
  city: varchar('city', { length: 100 }),
  educationLevel: varchar('education_level', { length: 100 }),
  aboutMe: text('about_me'),
  bio: text('bio'),
  skills: text('skills'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
})

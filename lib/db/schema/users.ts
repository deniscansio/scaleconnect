import { mysqlTable, serial, varchar, text, timestamp, decimal, mysqlEnum } from 'drizzle-orm/mysql-core';

export const userTypeEnum = mysqlEnum('user_type', ['CANDIDATE', 'COMPANY', 'ADMIN']);

export const users = mysqlTable('User', {
  id: serial('id').primaryKey(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
import { mysqlTable, serial, varchar, text, timestamp, decimal, mysqlEnum } from 'drizzle-orm/mysql-core';

export const userTypeEnum = mysqlEnum('user_type', ['CANDIDATE', 'COMPANY', 'ADMIN']);

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  userType: userTypeEnum.notNull().default('CANDIDATE'),
  companyName: varchar('company_name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const candidateProfiles = mysqlTable('candidate_profiles', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').references(() => users.id),
  age: serial('age'),
  gender: varchar('gender', { length: 20 }),
  phone: varchar('phone', { length: 20 }),
  linkedinUrl: varchar('linkedin_url', { length: 255 }),
  profilePhoto: text('profile_photo'),
  currentPosition: varchar('current_position', { length: 255 }),
  currentCompany: varchar('current_company', { length: 255 }),
  currentSalary: decimal('current_salary', { precision: 10, scale: 2 }),
  yearsOfExperience: serial('years_of_experience'),
  bio: text('bio'),
  skills: text('skills'), // JSON stringified array
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

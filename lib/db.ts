import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

// Define interfaces that match NextAuth's expected types
export interface User {
  id: string
  email: string
  name: string
  password?: string
  role: 'USER' | 'GOVT_OFFICIAL' | 'ANALYST'
  firstName: string
  lastName: string
  phone: string
  organization: string
  designation: string
  emailVerified: boolean
  image: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Account {
  id: string
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refreshToken: string | null
  accessToken: string | null
  expiresAt: number | null
  tokenType: string | null
  scope: string | null
  idToken: string | null
  sessionState: string | null
}

export interface Session {
  id: string
  sessionToken: string
  userId: string
  expires: Date
  ipAddress: string | null
  userAgent: string | null
  createdAt: Date
  updatedAt: Date
}

export interface VerificationToken {
  id: string
  identifier: string
  token: string
  expires: Date
  createdAt: Date
  updatedAt: Date
}

export interface Database {
  user: User
  account: Account
  session: Session
  verification: VerificationToken
}

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  })
})

export const db = new Kysely<Database>({
  dialect,
})
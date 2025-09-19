// import 'server-only'

import { betterAuth } from "better-auth"
import { db } from './db'
import { admin, organization, twoFactor } from "better-auth/plugins"
import bcrypt from 'bcryptjs'

// Simple in-memory adapter implementation
const memoryAdapter = {
  async createUser(data: any) {
    const id = Math.random().toString(36).substr(2, 9)
    const user = { id, ...data, createdAt: new Date(), updatedAt: new Date() }
    return user
  },
  async getUser(id: string) {
    return null // For demo purposes
  },
  async getUserByEmail(email: string) {
    return null // For demo purposes
  },
  async updateUser(id: string, data: any) {
    return null // For demo purposes
  },
  async deleteUser(id: string) {
    return null // For demo purposes
  },
  async createSession(data: any) {
    return { id: Math.random().toString(36).substr(2, 9), ...data }
  },
  async getSessionAndUser(sessionToken: string) {
    return null // For demo purposes
  },
  async updateSession(sessionToken: string, data: any) {
    return null // For demo purposes
  },
  async deleteSession(sessionToken: string) {
    return null // For demo purposes
  },
}

export const auth = betterAuth({
  database: {
    db,
    type: 'postgres'
  },
  plugins: [
    organization(),
    twoFactor(),
    admin()
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
    async hashPassword(password: string) {
      return bcrypt.hash(password, 12)
    },
    async verifyPassword(password: string, hash: string) {
      return bcrypt.compare(password, hash)
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  user: {
    fields: {
      email: 'email',
      name: 'name',
      role: 'role',
    },
    additionalFields: {
      role: {
        type: 'string',
        required: true
      },
      firstName: {
        type: 'string',
        required: false,
      },
      lastName: {
        type: 'string',
        required: false,
      },
      phone: {
        type: 'string',
        required: false,
      },
      organization: {
        type: 'string',
        required: false,
      },
      designation: {
        type: 'string',
        required: false,
      },
    },
  },
})
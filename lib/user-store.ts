// Simple in-memory user store for demonstration
// In production, this would be replaced with actual database operations

interface UserData {
  id: string
  email: string
  name: string
  role: string
  firstName: string
  lastName: string
  phone: string
  organization: string
  designation: string
  createdAt: string
  updatedAt: string
}

class UserStore {
  private users: Map<string, UserData> = new Map()

  createUser(userData: Omit<UserData, 'id' | 'createdAt' | 'updatedAt'>): UserData {
    const user: UserData = {
      id: Math.random().toString(36).substr(2, 9),
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.users.set(user.id, user)
    return user
  }

  getUser(id: string): UserData | null {
    return this.users.get(id) || null
  }

  getUserByEmail(email: string): UserData | null {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user
      }
    }
    return null
  }

  updateUser(id: string, updates: Partial<UserData>): UserData | null {
    const user = this.users.get(id)
    if (!user) return null

    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString()
    }
    this.users.set(id, updatedUser)
    return updatedUser
  }
}

export const userStore = new UserStore()
'use client'

import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL: undefined,
      })

      if (result.error) {
        setError('Invalid credentials')
        return
      }

      if (result.data) {
        // Get user session to determine redirect based on role
        const { data: session } = await authClient.getSession()

        // Since Better Auth might not include the role in the session immediately,
        // we'll use a default role and redirect accordingly
        // The role should be properly set in the session after the PATCH request completes
        const userRole = session?.user?.role || 'USER' // Default to USER if role not available

        switch (userRole) {
          case 'GOVT_OFFICIAL':
            router.push('/dashboard')
            break
          case 'ANALYST':
            router.push('/analytics')
            break
          default:
            router.push('/')
        }
      }
    } catch (err) {
      setError('An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}

export async function registerUser(formData: {
  firstName: string
  lastName: string
  email: string
  phone: string
  organization: string
  designation: string
  role: string
  password: string
}) {
  try {
    // First, create the user with Better Auth
    const result = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: `${formData.firstName} ${formData.lastName}`,
      // @ts-expect-error: Role is not a known property of signUp.email
      role: formData.role,
      image: undefined,
      callbackURL: undefined
    })

    if (result.error) {
      throw new Error(result.error.message || 'Registration failed')
    }

    // After successful signup, create/update the user with additional fields including role
    if (result.data?.user?.id) {
      try {
        const updateResponse = await fetch('/api/users', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: result.data.user.id,
            role: formData.role,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            organization: formData.organization,
            designation: formData.designation,
          }),
        })

        if (!updateResponse.ok) {
          console.warn('Failed to update user role, but user was created successfully')
        } else {
          const updateData = await updateResponse.json()
          console.log('User role updated successfully:', updateData)
        }
      } catch (updateError) {
        console.warn('Error updating user role, but user was created successfully:', updateError)
      }
    }

    return result.data
  } catch (error) {
    throw error
  }
}
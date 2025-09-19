import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      organization,
      designation,
      role,
      password,
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !organization || !designation || !role || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await db
      .selectFrom('user')
      .select('email')
      .where('email', '=', email)
      .executeTakeFirst()

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Generate user ID
    const userId = uuidv4()

    // Create user
    await db
      .insertInto('user')
      .values({
        id: userId,
        email,
        name: `${firstName} ${lastName}`,
        password: hashedPassword,
        role: role as 'USER' | 'GOVT_OFFICIAL' | 'ANALYST',
        firstName,
        lastName,
        phone,
        organization,
        designation,
        emailVerified: false,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .execute()

    // Determine redirect URL based on role
    let redirectUrl = '/'
    switch (role) {
      case 'GOVT_OFFICIAL':
        redirectUrl = '/dashboard'
        break
      case 'ANALYST':
        redirectUrl = '/analytics'
        break
      default:
        redirectUrl = '/'
    }

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      redirectUrl,
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
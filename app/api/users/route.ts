import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { userId, role, firstName, lastName, phone, organization, designation } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Check if user exists first
    const existingUser = await db
      .selectFrom('user')
      .select(['id', 'email', 'name'])
      .where('id', '=', userId)
      .executeTakeFirst()

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Build update object dynamically
    const updateData: any = {
      updatedAt: new Date()
    }

    if (role) updateData.role = role
    if (firstName) updateData.firstName = firstName
    if (lastName) updateData.lastName = lastName
    if (phone) updateData.phone = phone
    if (organization) updateData.organization = organization
    if (designation) updateData.designation = designation

    // Update name if first or last name changed
    if (firstName || lastName) {
      const currentName = existingUser.name.split(' ')
      const currentFirstName = currentName[0] || ''
      const currentLastName = currentName.slice(1).join(' ') || ''

      updateData.name = `${firstName || currentFirstName} ${lastName || currentLastName}`.trim()
    }

    // Update user in database
    await db
      .updateTable('user')
      .set(updateData)
      .where('id', '=', userId)
      .execute()

    // Fetch the updated user
    const updatedUser = await db
      .selectFrom('user')
      .select([
        'id',
        'email',
        'name',
        'role',
        'firstName',
        'lastName',
        'phone',
        'organization',
        'designation',
        'emailVerified',
        'image',
        'createdAt',
        'updatedAt'
      ])
      .where('id', '=', userId)
      .executeTakeFirst()

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint to fetch user by ID
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const email = searchParams.get('email')

    if (!userId && !email) {
      return NextResponse.json(
        { error: 'User ID or email is required' },
        { status: 400 }
      )
    }

    let user = null
    let query = db
      .selectFrom('user')
      .select([
        'id',
        'email',
        'name',
        'role',
        'firstName',
        'lastName',
        'phone',
        'organization',
        'designation',
        'emailVerified',
        'image',
        'createdAt',
        'updatedAt'
      ])

    if (userId) {
      user = await query.where('id', '=', userId).executeTakeFirst()
    } else if (email) {
      user = await query.where('email', '=', email).executeTakeFirst()
    }

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: user
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
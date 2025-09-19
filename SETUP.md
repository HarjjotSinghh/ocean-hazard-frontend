# Authentication & Role-Based Access Setup Guide

This guide explains how to set up and run the authentication system with role-based access control for the Ocean Hazard Reporting Platform.

## Prerequisites

1. **Node.js** (v18 or higher)
2. **PostgreSQL** (v14 or higher)
3. **Bun** package manager (recommended)

## Installation

1. Install dependencies:
   ```bash
   bun install
   ```

2. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

3. Configure your PostgreSQL connection in `.env.local`:
   ```env
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_DATABASE=ocean_hazard
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=your_password

   NEXTAUTH_SECRET=your-nextauth-secret-here
   NEXTAUTH_URL=http://localhost:3000
   ```

## Database Setup

1. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE ocean_hazard;
   ```

2. Run the database migration:
   ```bash
   bun run lib/migrations/run-migration.ts
   ```

## Running the Application

1. Start the development server:
   ```bash
   bun run dev
   ```

2. Open http://localhost:3000 in your browser

## User Roles & Access

### 1. Default User (USER)
- **Access**: Home page, report submission
- **Redirect after login**: `/` (home page)
- **Features**: Basic citizen reporting capabilities

### 2. Government Official (GOVT_OFFICIAL)
- **Access**: Dashboard, analytics, report verification
- **Redirect after login**: `/dashboard`
- **Features**: Full dashboard access, report management, analytics

### 3. Analyst (ANALYST)
- **Access**: Analytics dashboard, global insights
- **Redirect after login**: `/analytics`
- **Features**: Advanced analytics, data visualization, social media insights

## Protected Routes

The following routes are protected by role-based access:

- `/dashboard` - Accessible by GOVT_OFFICIAL, ANALYST, and USER roles
- `/analytics` - Accessible by ANALYST and GOVT_OFFICIAL roles
- `/admin` - Accessible by ADMIN role (future implementation)

## Authentication Flow

1. **Signup**: Users register with role selection
2. **Login**: Credentials-based authentication
3. **Session Management**: JWT-based sessions
4. **Role-based Redirects**: Automatic redirection based on user role
5. **Route Protection**: Middleware enforces access control

## API Endpoints

- `/api/auth/[...nextauth]` - NextAuth.js authentication
- `/api/auth/register` - User registration
- `/api/auth/session` - Session management

## Database Schema

The system uses the following tables:

- `users` - User accounts with roles
- `accounts` - OAuth account linkage
- `sessions` - User sessions
- `verification_tokens` - Email verification tokens

## Security Features

- Password hashing with bcryptjs
- JWT-based session management
- Role-based access control
- Input validation
- SQL injection prevention
- XSS protection

## Testing

Test the different user roles:

1. **Default User**: Signup as USER role → redirects to home page
2. **Government Official**: Signup as GOVT_OFFICIAL → redirects to dashboard
3. **Analyst**: Signup as ANALYST → redirects to analytics

## Troubleshooting

1. **Database Connection**: Verify PostgreSQL is running and credentials are correct
2. **Migration Issues**: Ensure database exists and user has proper permissions
3. **Authentication Issues**: Check NEXTAUTH_SECRET and NEXTAUTH_URL
4. **Role Access**: Verify user roles in database if redirects don't work

## Environment Variables

Required variables:

```env
# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=ocean_hazard
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password

# Authentication
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3000
```

## Next Steps

1. Set up PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Test user registration and login
5. Verify role-based redirects work correctly
6. Test protected route access
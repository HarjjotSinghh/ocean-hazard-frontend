-- Better Auth Plugins Migration
-- This migration adds tables and columns for organization, admin, and 2FA plugins

-- User table modifications for admin plugin
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "role" VARCHAR(255) DEFAULT 'user';
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "banned" BOOLEAN DEFAULT FALSE;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "banReason" VARCHAR(255);
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "banExpires" TIMESTAMP;

-- User table modifications for 2FA plugin
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "twoFactorEnabled" BOOLEAN DEFAULT FALSE;

-- Session table modifications
ALTER TABLE "session" ADD COLUMN IF NOT EXISTS "activeOrganizationId" VARCHAR(255);
ALTER TABLE "session" ADD COLUMN IF NOT EXISTS "activeTeamId" VARCHAR(255);
ALTER TABLE "session" ADD COLUMN IF NOT EXISTS "impersonatedBy" VARCHAR(255);

-- Organization tables
CREATE TABLE IF NOT EXISTS "organization" (
    "id" VARCHAR(255) PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL UNIQUE,
    "logo" VARCHAR(255),
    "metadata" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "member" (
    "id" VARCHAR(255) PRIMARY KEY,
    "userId" VARCHAR(255) NOT NULL,
    "organizationId" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE,
    FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "invitation" (
    "id" VARCHAR(255) PRIMARY KEY,
    "email" VARCHAR(255) NOT NULL,
    "inviterId" VARCHAR(255) NOT NULL,
    "organizationId" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL DEFAULT 'pending',
    "expiresAt" TIMESTAMP,
    "teamId" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("inviterId") REFERENCES "user"("id") ON DELETE CASCADE,
    FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE
);

-- Team tables
CREATE TABLE IF NOT EXISTS "team" (
    "id" VARCHAR(255) PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "organizationId" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "teamMember" (
    "id" VARCHAR(255) PRIMARY KEY,
    "teamId" VARCHAR(255) NOT NULL,
    "userId" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE,
    FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE
);

-- Two Factor Authentication table
CREATE TABLE IF NOT EXISTS "twoFactor" (
    "id" VARCHAR(255) PRIMARY KEY,
    "userId" VARCHAR(255) NOT NULL UNIQUE,
    "secret" VARCHAR(255) NOT NULL,
    "backupCodes" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS "idx_member_userId" ON "member"("userId");
CREATE INDEX IF NOT EXISTS "idx_member_organizationId" ON "member"("organizationId");
CREATE INDEX IF NOT EXISTS "idx_invitation_email" ON "invitation"("email");
CREATE INDEX IF NOT EXISTS "idx_invitation_organizationId" ON "invitation"("organizationId");
CREATE INDEX IF NOT EXISTS "idx_invitation_status" ON "invitation"("status");
CREATE INDEX IF NOT EXISTS "idx_team_organizationId" ON "team"("organizationId");
CREATE INDEX IF NOT EXISTS "idx_teamMember_teamId" ON "teamMember"("teamId");
CREATE INDEX IF NOT EXISTS "idx_teamMember_userId" ON "teamMember"("userId");
CREATE INDEX IF NOT EXISTS "idx_twoFactor_userId" ON "twoFactor"("userId");

-- Add unique constraint for organization slug
ALTER TABLE "organization" ADD CONSTRAINT "uq_organization_slug" UNIQUE ("slug");

-- Add unique constraint for team names within organization
ALTER TABLE "team" ADD CONSTRAINT "uq_team_name_organization" UNIQUE ("name", "organizationId");

-- Add unique constraint for user in organization (one membership per user per org)
ALTER TABLE "member" ADD CONSTRAINT "uq_member_user_organization" UNIQUE ("userId", "organizationId");

-- Add unique constraint for user in team (one membership per user per team)
ALTER TABLE "teamMember" ADD CONSTRAINT "uq_teamMember_user_team" UNIQUE ("userId", "teamId");

-- Add foreign key constraint for invitation teamId after team table exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'team') THEN
        ALTER TABLE "invitation" ADD CONSTRAINT "fk_invitation_teamId"
        FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE SET NULL;
    END IF;
END $$;
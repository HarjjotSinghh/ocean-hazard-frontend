-- Better Auth Schema for PostgreSQL
-- Based on existing migration structure with Better Auth requirements

-- User table
CREATE TABLE "user" (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password TEXT,
  role TEXT DEFAULT 'USER' NOT NULL,
  firstName TEXT,
  lastName TEXT,
  phone TEXT,
  organization TEXT,
  designation TEXT,
  emailVerified BOOLEAN DEFAULT FALSE,
  twoFactorEnabled BOOLEAN DEFAULT FALSE,
  image TEXT,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Account table
CREATE TABLE account (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  providerId TEXT NOT NULL,
  accountId TEXT NOT NULL,
  refreshToken TEXT,
  accessToken TEXT,
  expiresAt INTEGER,
  tokenType TEXT,
  scope TEXT,
  idToken TEXT,
  sessionState TEXT,
  UNIQUE(provider, providerAccountId)
);

-- Session table
CREATE TABLE session (
  id TEXT PRIMARY KEY,
  sessionToken TEXT UNIQUE NOT NULL,
  userId TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  expires TIMESTAMP WITH TIME ZONE NOT NULL,
  ipAddress TEXT,
  userAgent TEXT,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Verification table
CREATE TABLE verification (
  id TEXT PRIMARY KEY,
  identifier TEXT NOT NULL,
  token TEXT NOT NULL,
  expires TIMESTAMP WITH TIME ZONE NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_user_email ON "user"(email);
CREATE INDEX idx_user_role ON "user"(role);
CREATE INDEX idx_account_user_id ON account(userId);
CREATE INDEX idx_session_user_id ON session(userId);
CREATE INDEX idx_session_token ON session(sessionToken);
CREATE INDEX idx_verification_identifier ON verification(identifier);
CREATE INDEX idx_verification_token ON verification(token);

-- Update triggers for timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_updated_at BEFORE UPDATE ON "user"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
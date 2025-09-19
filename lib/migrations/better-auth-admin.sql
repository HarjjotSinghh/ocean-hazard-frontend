-- Add new fields to user table
ALTER TABLE "user"
ADD COLUMN banned BOOLEAN DEFAULT FALSE,
ADD COLUMN banReason TEXT,
ADD COLUMN banExpires TIMESTAMP;

-- Add impersonatedBy field to session table
ALTER TABLE session
ADD COLUMN impersonatedBy VARCHAR(255);

-- Add indexes for performance
-- CREATE INDEX idx_user_role ON "user"(role);
CREATE INDEX idx_user_banned ON "user"(banned);
CREATE INDEX idx_session_impersonatedBy ON session(impersonatedBy);

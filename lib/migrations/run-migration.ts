import { Pool } from 'pg'
import fs from 'fs'
import path from 'path'

// Use direct database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
})

async function runMigration() {
  const migrationPath = path.join(__dirname, 'better-auth-plugins.sql')
  const migrationSQL = fs.readFileSync(migrationPath, 'utf8')

  try {
    console.log('Running migration...')
    await pool.query(migrationSQL)
    console.log('Migration completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
    throw error
  } finally {
    await pool.end()
  }
}

if (require.main === module) {
  runMigration().catch(console.error)
}

export { runMigration }
const { Pool } = require('pg')
require('dotenv').config()

// Use env variables instead of hard coding
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

module.exports = pool

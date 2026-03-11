// const pool = require('./pool')
const { Client } = require('pg')
const { argv } = require('node:process')

const SQL = `
-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255) UNIQUE NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    isMember BOOLEAN NOT NULL DEFAULT false,
    isAdmin BOOLEAN NOT NULL DEFAULT false
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    dateAdded TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    authorId INTEGER NOT NULL,
    CONSTRAINT fk_user
		  FOREIGN KEY (authorId)
			REFERENCES users (id)
			ON DELETE CASCADE
);
`



/* Create tables in db */
async function main() {
  console.log('Creating tables...')
  // Access db (public connection) url passed as a command line argument
  const client = new Client({
    connectionString: argv[2],
  })
  await client.connect()
  await client.query(SQL)
  await client.end()
  console.log('done')
}

main()


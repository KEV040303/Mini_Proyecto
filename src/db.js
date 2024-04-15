import { createPool } from 'mysql2/promise'
import { DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } from './config.js'

export const pool = createPool({
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT
})

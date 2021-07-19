import pg from 'pg';
const { Pool } = pg;

let localPoolConfig = {
  user: 'areej',
  password: '1234',
  host: 'localhost',
  port: '5432',
  database: 'simpletwitterdb'
};

const poolConfig = process.env.DATABASE_URL ? {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
} : localPoolConfig;

const pool = new Pool(poolConfig);
export default pool;

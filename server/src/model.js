const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ||
    `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

const initDatabase = async () => {
  try {
    const connTest = await pool.query('SELECT NOW()');
    console.log('PostgreSQL: Connected at', connTest.rows[0].now);

    await pool.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS visitors (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        business VARCHAR(200),
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(200),
        area VARCHAR(100),
        use_case VARCHAR(20) CHECK (use_case IN ('home','business')),
        connected_at TIMESTAMPTZ DEFAULT now(),
        session_id UUID
      );
    `);

    console.log('PostgreSQL: tables verified/created');
  } catch (err) {
    console.error('===== DATABASE INIT ERROR =====');
    console.error('Message:', err.message);
    console.error('Code:', err.code);
    console.error('================================');
  }
};

const createVisitor = async ({ firstName, lastName, business, phone, email, area, useCase }) => {
  const query = `
    INSERT INTO visitors (first_name, last_name, business, phone, email, area, use_case)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id, first_name, last_name, business, phone, email, area, use_case, connected_at;
  `;
  const values = [firstName, lastName, business, phone, email, area, useCase];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error('===== DB INSERT ERROR =====');
    console.error('Message:', err.message);
    console.error('Detail:', err.detail);
    console.error('Code:', err.code);
    console.error('Values:', values);
    console.error('===========================');
    throw err;
  }
};

const getVisitors = async () => {
  const result = await pool.query('SELECT * FROM visitors ORDER BY connected_at DESC LIMIT 100;');
  return result.rows;
};

// Removed getHotspots and getHotspotCredentials

module.exports = {
  initDatabase,
  createVisitor,
  getVisitors
};
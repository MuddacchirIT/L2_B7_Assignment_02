import { Pool } from "pg";
import config from "../config";
export const pool = new Pool({
  connectionString: config.connectionString,
});
export const initDB = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY, 
      name VARCHAR(255), 
      email VARCHAR(255) UNIQUE NOT NULL, 
      password TEXT NOT NULL, 
      role VARCHAR(20) DEFAULT 'user', 
      is_active BOOLEAN DEFAULT true, 
      created_at TIMESTAMP DEFAULT NOW(), 
      updated_at TIMESTAMP DEFAULT NOW()
    )`);
    await pool.query(`CREATE TABLE IF NOT EXISTS issues (
      id SERIAL PRIMARY KEY,
      reporter_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      title TEXT, description TEXT,
      type VARCHAR(255) NOT NULL,
      status VARCHAR(20) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )`);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Error initializing the database:", err);
  }
};

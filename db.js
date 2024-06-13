// db.js
const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Use encryption
    enableArithAbort: true // Required for recent versions of SQL Server
  }
};

let pool;

const connectToDatabase = async () => {
  if (!pool) {
    try {
      pool = await sql.connect(dbConfig);
      console.log('Connected to SQL Server');
    } catch (err) {
      console.error('Database connection failed:', err);
      throw err;
    }
  }
  return pool;
};

module.exports = {
  connectToDatabase
};

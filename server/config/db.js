require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

module.exports = pool;

pool
  .connect()
  .then(() => console.log("Підключено до бази даних PostgreSQL"))
  .catch((err) => console.error("Помилка підключення до БД:", err));

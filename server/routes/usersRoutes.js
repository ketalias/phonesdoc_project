const express = require("express");
const pool = require("../models/db");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, email, name, phone, created_at FROM users"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Помилка при отриманні користувачів" });
  }
});

router.post("/register", async (req, res) => {
  const { email, password, name, phone } = req.body;
  const password_hash = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      "INSERT INTO users (email, password_hash, name, phone) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, password_hash, name, phone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/:userId/cart", async (req, res) => {
  const { product_id, quantity } = req.body;
  const { userId } = req.params;
  try {
    const result = await pool.query(
      "INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
      [userId, product_id, quantity || 1]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/:userId/wishlist", async (req, res) => {
  const { product_id } = req.body;
  const { userId } = req.params;
  try {
    const result = await pool.query(
      "INSERT INTO wishlist_items (user_id, product_id) VALUES ($1, $2) RETURNING *",
      [userId, product_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:userId/cart", async (req, res) => {
  const { userId } = req.params;
  const result = await pool.query(
    "SELECT * FROM cart_items WHERE user_id = $1",
    [userId]
  );
  res.json(result.rows);
});

router.get("/:userId/wishlist", async (req, res) => {
  const { userId } = req.params;
  const result = await pool.query(
    "SELECT * FROM wishlist_items WHERE user_id = $1",
    [userId]
  );
  res.json(result.rows);
});

module.exports = router;

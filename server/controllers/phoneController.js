const pool = require("../models/db");

exports.getPhones = async (req, res) => {
  const userId = req.user.id; // отримуємо user_id з автентифікації
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;

  try {
    const phonesResult = await pool.query(
      `SELECT * FROM phones WHERE user_id = $1 ORDER BY id LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM phones WHERE user_id = $1`,
      [userId]
    );
    const total = parseInt(countResult.rows[0].count);

    res.json({
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      data: phonesResult.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPhone = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM phones WHERE id = $1 AND user_id = $2",
      [id, userId]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPhone = async (req, res) => {
  const userId = req.user.id;
  const {
    fullname,
    brand,
    release_year,
    color,
    has_bluetooth,
    has_infrared,
    price,
    photo_url,
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO phones (fullname, brand, release_year, color, has_bluetooth, has_infrared, price, photo_url, user_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        fullname,
        brand,
        release_year,
        color,
        has_bluetooth,
        has_infrared,
        price,
        photo_url,
        userId,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePhone = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const {
    fullname,
    brand,
    release_year,
    color,
    has_bluetooth,
    has_infrared,
    price,
    photo_url,
  } = req.body;
  try {
    const result = await pool.query(
      `UPDATE phones SET fullname=$1, brand=$2, release_year=$3, color=$4,
       has_bluetooth=$5, has_infrared=$6, price=$7, photo_url=$8
       WHERE id=$9 AND user_id=$10 RETURNING *`,
      [
        fullname,
        brand,
        release_year,
        color,
        has_bluetooth,
        has_infrared,
        price,
        photo_url,
        id,
        userId,
      ]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePhone = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM phones WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, userId]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

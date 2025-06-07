const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserByUsername, createUser } = require('../models/userModel');

require('dotenv').config();

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Невірний логін або пароль' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Невірний логін або пароль' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Серверна помилка' });
  }
};

const register = async (req, res) => {
  const { username, password, role = 'user' } = req.body;

  try {
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Користувач вже існує' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({ username, password: hashedPassword, role });

    res.status(201).json({ id: newUser.id, username: newUser.username, role: newUser.role });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Серверна помилка' });
  }
};

module.exports = {
  login,
  register
};

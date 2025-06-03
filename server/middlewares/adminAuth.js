module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === 'Bearer 123456') {
    next();
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
};

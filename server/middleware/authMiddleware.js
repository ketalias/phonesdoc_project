const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "secret123";

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const payload = jwt.verify(token, SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    res.sendStatus(403);
  }
};

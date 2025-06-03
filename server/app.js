require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const phoneRoutes = require("./routes/phoneRoutes");
const usersRoutes = require("./routes/usersRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(
  cors({
    origin: ["http://localhost:8080", "https://phones-ecomerce.netlify.app"],
  })
);

app.use(express.json());
app.use("/api/phones", phoneRoutes);
app.use("/api/users", usersRoutes);

app.use("/api/auth", authRoutes);

module.exports = app;

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const phoneRoutes = require("./routes/phoneRoutes");

app.use(cors({
  origin: 'http://localhost:8080'
}));

app.use(express.json());
app.use("/api/phones", phoneRoutes);

module.exports = app;

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const phoneRoutes = require("./routes/phoneRoutes");

const allowedOrigins = [
  "http://localhost:8080",
  "https://phones-ecomerce.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Phones API is running!");
});

app.use("/api/phones", phoneRoutes);

module.exports = app;

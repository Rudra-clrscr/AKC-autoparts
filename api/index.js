const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ✅ Health check */
app.get("/", (req, res) => {
  res.status(200).send("✅ Express serverless function is working");
});

/* ✅ API test */
app.get("/api/test", (req, res) => {
  res.json({ success: true });
});

module.exports = app;

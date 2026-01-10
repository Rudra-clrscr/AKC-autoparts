const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ✅ Correct view engine setup for Vercel */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../backend/views"));

/* ✅ Test route */
app.get("/api", (req, res) => {
  res.send("Express is running on Vercel");
});

/* ✅ Root render */
app.get("/", (req, res) => {
  res.render("index");
});

/* ✅ Routes */
const routes = require("../backend/routes");
app.use("/", routes);

/* ✅ Safe fallback */
app.use((req, res) => {
  res.status(404).render("index");
});

module.exports = app;

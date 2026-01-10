const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "backend", "views"));

app.get("/", (req, res) => {
  res.render("index");
});

const routes = require("../backend/routes");
app.use("/", routes);

app.use((req, res) => {
  res.status(404).render("index");
});

module.exports = app;

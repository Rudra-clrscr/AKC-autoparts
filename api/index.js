const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ✅ Root route – MUST NOT use res.render */
app.get("/", (req, res) => {
  res.send(`
    <h1>AKC Autoparts API is running</h1>
    <p>Backend deployed successfully on Vercel.</p>
  `);
});

/* ✅ Backend routes */
const routes = require("../backend/routes");
app.use("/api", routes);

/* ✅ Fallback */
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;

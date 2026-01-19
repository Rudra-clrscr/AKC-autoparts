const fs = require("fs");
const path = require("path");

module.exports = (req, res, next) => {
  const lang = req.cookies.lang || "en";

  const filePath = path.join(__dirname, "../language", `${lang}.json`);

  let translations = {};

  try {
    translations = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    console.log("Language file missing:", filePath);
  }

  res.locals.t = translations;
  res.locals.t.test = "🔥 LANGUAGE WORKING";

  res.locals.lang = lang;

  next();
};

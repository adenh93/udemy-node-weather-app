require("dotenv").config();
const path = require("path");
const express = require("express");

const publicDir = path.join(__dirname, "../public");

const app = express();
app.use(express.static(publicDir));

app.get("/weather", (req, res) => {
  res.send({ location: "Melbourne, Victoria, Australia", forecast: "Sunny" });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

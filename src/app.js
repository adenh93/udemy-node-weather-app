require("dotenv").config();
const path = require("path");
const express = require("express");

const publicDir = path.join(__dirname, "../public");

const app = express();
app.set("view engine", "hbs");
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Aden Herold"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Aden Herold"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    help: "This is a help message."
  });
});

app.get("/weather", (req, res) => {
  res.send({ location: "Melbourne, Victoria, Australia", forecast: "Sunny" });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

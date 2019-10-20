require("dotenv").config();
const path = require("path");
const express = require("express");
const hbs = require("hbs");

// Define paths for Express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About"
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

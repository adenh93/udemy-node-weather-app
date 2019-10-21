require("dotenv").config();
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

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

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404: Help article not found",
    message: "The help article you requested was not found!"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address."
    });
  }

  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }

    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        });
      }

      res.json({
        address: req.query.address,
        location,
        forecast: forecastData
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404: Page not found",
    message: "The page you requested was not found!"
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

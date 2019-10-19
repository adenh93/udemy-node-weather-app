require("dotenv").config();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const location = process.argv[2];

if (!location) {
  return console.log("No location was provided as a command line argument!");
}

geocode(location, (err, data) => {
  if (err) {
    return console.log(err);
  }

  const { lat, long, location } = data;
  forecast(lat, long, (err, forecastData) => {
    if (err) {
      return console.log(err);
    }

    console.log(location);
    console.log(forecastData);
  });
});

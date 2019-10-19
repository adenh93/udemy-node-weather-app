require("dotenv").config();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

geocode("Philadelphia", (err, data) => {
  console.log(err);
  console.log(data);
});

forecast(-75.7088, 44.1545, (err, data) => {
  console.log(err);
  console.log(data);
});

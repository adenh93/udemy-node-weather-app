require("dotenv").config();
const request = require("request");

const darkSkySecret = process.env.DARK_SKY_SECRET;
const mapSecret = process.env.MAP_SECRET;

const latLong = "37.8267,-122.4233";
const exclude = "minutely,hourly,alerts,flags";
const weatherUrl = `https://api.darksky.net/forecast/${darkSkySecret}/${latLong}?exclude=${exclude}&units=si`;
const locationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${mapSecret}`;

request({ url: locationUrl, json: true }, (err, res) => {
  if (err) {
    console.log("Unable to connect to Mapbox API");
  } else if (!res.body.features.length) {
    console.log("No location results found with the search term");
  } else {
    const { center } = res.body.features[0];
    console.log(...center);
  }
});

request({ url: weatherUrl, json: true }, (err, res) => {
  if (err) {
    console.log("Unable to connect to DarkSky API");
  } else if (res.body.error) {
    console.log("Unable to find location");
  } else {
    const { timezone, currently, daily } = res.body;
    const { temperature, precipProbability } = currently;
    const { summary } = daily.data[0];

    console.log(`Weather details for ${timezone}:`);
    console.log(
      `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`
    );
  }
});

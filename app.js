require("dotenv").config();
const request = require("request");
const secret = process.env.SECRET_KEY;

const latLong = "37.8267,-122.4233";
const exclude = "minutely,hourly,alerts,flags";
const url = `https://api.darksky.net/forecast/${secret}/${latLong}?exclude=${exclude}&units=si`;

request({ url, json: true }, (err, res) => {
  const { timezone, currently, daily } = res.body;
  const { temperature, precipProbability } = currently;
  const { summary } = daily.data[0];

  console.log(`Weather details for ${timezone}:`);
  console.log(
    `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`
  );
});

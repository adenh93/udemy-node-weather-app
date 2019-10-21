const request = require("request");

const darkSkySecret = process.env.DARK_SKY_SECRET;
const exclude = "minutely,hourly,alerts,flags";

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/${darkSkySecret}/${lat},${long}?exclude=${exclude}&units=si`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to DarkSky API", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { currently, daily } = body;
      const { temperature, precipProbability } = currently;
      const { summary } = daily.data[0];

      callback(
        undefined,
        `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;

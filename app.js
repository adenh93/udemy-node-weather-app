require("dotenv").config();
const request = require("request");
const secret = process.env.SECRET_KEY;

const url = `https://api.darksky.net/forecast/${secret}/37.8267,-122.4233`;

request({ url }, (err, res) => {
  const { currently } = JSON.parse(res.body);
  console.log(currently);
});

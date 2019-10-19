const request = require("request");

const mapSecret = process.env.MAP_SECRET;

const geocode = (location, callback) => {
  const encodedLocation = encodeURIComponent(location);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedLocation}.json?access_token=${mapSecret}`;
  request({ url, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect to location services!", null);
    } else if (!res.body.features.length) {
      callback("No location results found with the search term.", null);
    } else {
      const { center, place_name } = res.body.features[0];
      callback(null, { location: place_name, coordinates: [...center] });
    }
  });
};

module.exports = geocode;

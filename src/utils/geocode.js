const request = require("request");

const mapSecret = process.env.MAP_SECRET;

const geocode = (location, callback) => {
  const encodedLocation = encodeURIComponent(location);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedLocation}.json?access_token=${mapSecret}`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to location services!", undefined);
    } else if (!body.features.length) {
      callback("No location results found with the search term.", undefined);
    } else {
      const { center, place_name } = body.features[0];
      callback(undefined, {
        location: place_name,
        lat: center[1],
        long: center[0]
      });
    }
  });
};

module.exports = geocode;

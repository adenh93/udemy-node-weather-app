console.log("Client side javascript file has loaded");

fetch("http://localhost:3000/weather?address=darwin").then(response => {
  response.json().then(({ error, forecast, location }) => {
    if (error) {
      return console.log(error);
    }
    console.log(`${location}\n${forecast}`);
  });
});

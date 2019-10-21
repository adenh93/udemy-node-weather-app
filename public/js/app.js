const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  searchForecast(search.value);
});

const searchForecast = address =>
  fetch(`http://localhost:3000/weather?address=${address}`).then(response =>
    response.json().then(({ error, forecast, location }) => {
      if (error) {
        return console.log(error);
      }
      console.log(`${location}\n${forecast}`);
    })
  );

function displayTemperature(response) {
  console.log(response.data);
  let currentTemperature = document.querySelector("#temperature-number");
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.city;
  let feelsLike = document.querySelector("#sensation");
  feelsLike.innerHTML = `Feels like ${Math.round(
    response.data.temperature.feels_like
  )}°C`;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  let currentWindSpeed = document.querySelector("#wind");
  currentWindSpeed.innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} m/s`;
}

let apiKey = "6efaaef1baet493f7b254do70ae07eb3";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query={Caracas}&key=${apiKey}&unit={metric}`;

axios.get(apiUrl).then(displayTemperature);

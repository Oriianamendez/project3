function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hour}:${minutes}`;
}

function displayTemperature(response) {
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
  let currentDate = document.querySelector("#date-and-hour");
  currentDate.innerHTML = formatDate(response.data.time * 1000);
}

let apiKey = "6efaaef1baet493f7b254do70ae07eb3";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query={Caracas}&key=${apiKey}&unit={metric}`;

axios.get(apiUrl).then(displayTemperature);

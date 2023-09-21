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
  celsiusTemperature = response.data.temperature.current;

  let currentTemperature = document.querySelector("#temperature-number");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
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
  let currentCondition = document.querySelector("#condition");
  currentCondition.innerHTML = response.data.condition.description;
  let currentDate = document.querySelector("#date-and-hour");
  currentDate.innerHTML = formatDate(response.data.time * 1000);
  let currentIcon = document.querySelector("#icon");
  currentIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  currentIcon.setAttribute("alt", response.data.condition.description);
}

function search(city) {
  let apiKey = "6efaaef1baet493f7b254do70ae07eb3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit={metric}`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let currentCityInput = document.querySelector("#city-input");
  search(currentCityInput.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temperature-number");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentTemperature = document.querySelector("#temperature-number");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Caracas");

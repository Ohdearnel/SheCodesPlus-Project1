//current time and day function
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let weekday = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${weekday}, ${hours}:${minutes}`;
}

//search box function

function showCityWeather(response) {
  console.log(response);
  document.querySelector("#place-name").innerHTML = response.data.city;

  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  document.querySelector("#body-temperature").innerHTML = `${Math.round(
    response.data.temperature.current
  )}°c`;

  document.querySelector("#current-time").innerHTML = formatDate(
    response.data.time * 1000
  );

  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;

  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );

  document
    .querySelector("#main-icon")
    .setAttribute("src", `${response.data.condition.icon_url}`);

  document
    .querySelector("#main-icon")
    .setAttribute("alt", `${response.data.condition.description}`);

  celsiusTemperature = response.data.temperature.current;
}

function searchCity(city) {
  let apiKey = "f65b33ot2ea727d4e0e7bcb38f9d0783";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityWeather);
}

function citySearchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function showFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#body-temperature");
  let fahrenheit = (celsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = `${Math.round(fahrenheit)}°f`;
}

function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#body-temperature");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°c`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySearchSubmit);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

searchCity("Manchester");

//current location function

function searchLocation(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `f65b33ot2ea727d4e0e7bcb38f9d0783`;
  let weatherApiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(weatherApiUrl).then(showCityWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

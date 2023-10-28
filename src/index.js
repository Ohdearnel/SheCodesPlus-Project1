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

//forecast function
function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = date.getDay(days);

  return days[day];
}

function displayForecast(response) {
  console.log(response);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  //let forecastMax = response.data.daily[0].temperature.maximum;
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastMax = forecastDay.temperature.maximum;
      forecastMin = forecastDay.temperature.minimum;
      console.log(forecastMax, index);
      console.log(forecastMin, index);

      forecastHTML =
        forecastHTML +
        `
          <div class="col-3">
            <div class="card">
              <div class="card-body">
                <div class="dayCast weather-forecast-date">
                  ${formatForecastDate(forecastDay.time)}
                </div>
                <img
                  src= ${forecastDay.condition.icon_url}
                  alt= ${forecastDay.condition.icon}
                  id="forecast-icon"
                  class="forecastIcon"
                  width="40"
                />
                <div class="weather-forecast-temperature">
                <span class="forecast-max">
                  <span class="weather-forecast-temperature-max" >${Math.round(
                    forecastDay.temperature.maximum
                  )}°c</span>
                  </span
                  ><strong> | </strong <span class ="forecast-min"><span class="weather-forecast-temperature-min" >${Math.round(
                    forecastDay.temperature.minimum
                  )}°c</span>
                  </span>
              </div>
                </div>
            </div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let lat = coordinates.latitude;
  let lon = coordinates.longitude;
  let apiKey = `f65b33ot2ea727d4e0e7bcb38f9d0783`;
  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;

  axios.get(forecastApiUrl).then(displayForecast);
}

//search box function

function showCityWeather(response) {
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

  getForecast(response.data.coordinates);
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

  document.querySelector("forecast-max").innerHTML = `${Math.round(
    (forecastMax * 9) / 5 + 32
  )}°f`;
  document.querySelector("forecast-min").innerHTML = `${Math.round(
    (forecastMin * 9) / 5 + 32
  )}°f`;
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

let forecastMax = null;
let forecastMin = null;

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

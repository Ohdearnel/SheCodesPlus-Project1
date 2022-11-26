//current time and day function
function whatsTheTime(date) {
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

let theTime = document.querySelector("#current-time");
let now = new Date();

theTime.innerHTML = whatsTheTime(now);

//search box function

function showCityWeather(response) {
  console.log(response);
  document.querySelector("#place-name").innerHTML = response.data.name;
  document.querySelector("#body-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#mainHighs").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#mainLows").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityWeather);
}

function citySearchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySearchSubmit);

searchCity("Manchester");

//current location function

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `502dc8f7ae36e57af1974e18d16a86f8`;
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(weatherApiUrl).then(showCityWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature-value");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-weather-city");
  let descriptionElement = document.querySelector(
    "#current-weather-description"
  );
  let humidityElement = document.querySelector("#current-weather-humidity");
  let windElement = document.querySelector("#current-weather-wind");
  let timeElement = document.querySelector("#current-weather-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#current-temperature-icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formateDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;

  getForecast(response.data.city);
}

function formateDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "e5oac898bt8daf3ab3ac1e487a30176e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function searchFormSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "e5oac898bt8daf3ab3ac1e487a30176e";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForcast);
}

function displayForcast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="forecast-temperature-day">
            <div class="forecast-temperature-date">${formatDay(day.time)}</div>
            <img src="${
              day.condition.icon_url
            }" class="forecast-temperature-icon"/>
            <div class="forecast-temperature-values">
              <div class="forecast-temperature-value">
                <strong>${Math.round(day.temperature.maximum)}°</strong>
              </div>
              <div class="forecast-temperature-value">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast-temperature");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchFormSubmit);

searchCity("Melbourne");

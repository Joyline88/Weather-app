function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;

  let cityName = searchInputElement.value;

  let apiKey = "614da01b5d0f9a133d480bc1a5ef2d21";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  console.log("Fetching data from:", apiUrl);

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        displayWeather(data);
      } else {
        console.error("Error:", data.message);
        alert("City not found. Please try again.");
      }
    })
    .catch((error) => console.error("Error:", error));
}

function displayWeather(data) {
  let cityName = data.name;
  let temperature = Math.round(data.main.temp);
  let description = data.weather[0].description;
  let weatherElement = document.querySelector("#current-weather");

  weatherElement.innerHTML = ` ${temperature}`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
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

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

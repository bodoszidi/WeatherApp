function updateWeather(response) {
    if (response.data.hasOwnProperty("status")) {
        alert(response.data.message);
        return;
    }

    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#weather-app-city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    timeElement.innerHTML = formatDate(date);
    temperatureElement.innerHTML = Math.round(temperature);
    getForecast(response.data.city);
}

function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
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

    return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "fbe0f372ad6btocdfb0c2b3e5a4f5432";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();

    let searchInput = document.querySelector("#search-form-input");

    searchCity(searchInput.value);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}

// you need to call getForecast() somewhere and pass in the city like you do with searchCity()
function getForecast(city) {
    let apiKey = "fbe0f372ad6btocdfb0c2b3e5a4f5432";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    let forecastHtml = "";

    console.log('res', response);
    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
            forecastHtml += `<div class="weather-forecast">
                        <div class="weather-forecast-day">
                            <div class="weather-forecast-date">${formatDay(
                                day.time
                            )}</div>
                            <div class="weather-forecast-icon">
                            <img src="${day.condition.icon_url}" />
                            </div>
                            <div class="weather-forecast-temps">
                                <div class="weather-forecast-temp">
                                <strong>${Math.round(
                                    day.temperature.maximum
                                )}º</strong>
                                </div>
                                <div class="weather-forecast-temp">
                                <strong>${Math.round(
                                    day.temperature.minimum
                                )}º</strong>
                                </div>
                            </div>
                        </div>
                    </div>`;
        }
    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("London");

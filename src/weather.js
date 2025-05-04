function updateWeather(response) {
    let temperatureElement = document.querySelector("#temperature")
    let temperature = response.data.temperature.current;    
    let cityElement = document.querySelector("#weather-app-city");
    cityElement.innerHTML = response.data.city;

    temperatureElement.innerHTML = Math.round(temperature);
}

function searchCity(city){

let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(updateWeather)
}

function handleSearchSubmit (event) {
    event.preventDefault();

    let searchInput = document.querySelector("#search-form-input");

    searchCity(searchInput.value)
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit)
searchCity("London");
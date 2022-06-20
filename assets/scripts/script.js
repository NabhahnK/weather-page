const openWeatherAPI = "https://api.openweathermap.org/data/2.5/onecall?";
const openWeatherMapAPI = "http://api.openweathermap.org/geo/1.0/direct?q=";
const apiKey = "752a7c69c2f675bacc2d0b896d1432e5";
let userInput = document.querySelector("#cityname");
let submitBtn = document.getElementById("submitBtn");

function getLL(city) {
    let apiCall = openWeatherMapAPI + city + "&appid=" + apiKey;
    console.log(apiCall);
    fetch(apiCall)
        .then(response => response.json())
        .then(function(data) {
            console.log(data);
            localStorage.setItem("lat", data[0].lat);
        })
}

function getWeather() {
    if (!userInput.value) {
        alert("Please, Enter a City name.");
        return
    }
    console.log("test");
    getLL(userInput.value);
}

submitBtn.addEventListener("click", getWeather);
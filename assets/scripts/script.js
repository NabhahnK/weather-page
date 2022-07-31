const openWeatherAPI = "https://api.openweathermap.org/data/2.5/onecall?";
const openWeatherMapAPI = "http://api.openweathermap.org/geo/1.0/direct?q=";
const apiKey = "752a7c69c2f675bacc2d0b896d1432e5";
let userInput = document.querySelector("#cityname");
let submitBtn = document.getElementById("submitBtn");
let history = document.getElementById("history");

function createBtns() {
    if (localStorage.length > 0) {
        //Items are stored in local storage
    } else {
        //Local storage is empty
    }
}

function getLL(city) {
    let apiCall = openWeatherMapAPI + city + "&appid=" + apiKey;
    // console.log(apiCall);
    localStorage.setItem(city, city);
    fetch(apiCall)
        .then(response => response.json())
        .then(function (data) {
            // console.log(data);
            localStorage.setItem("lat", data[0].lat);
            // console.log(localStorage.getItem("lat"));
            localStorage.setItem("lon", data[0].lon);
            // console.log(localStorage.getItem("lon"));
        })
}

function getWeatherData() {
    let apiCall = openWeatherAPI + "lat=" + localStorage.getItem("lat") + "&lon=" + localStorage.getItem("lon") + "&appid=" + apiKey;
    console.log(apiCall);
    fetch(apiCall)
        .then(response => response.json())
        .then(function (data) {
            console.log(data);
        })
}

function ini() {
    if (!userInput.value) {
        alert("Please, Enter a City name.");
        return
    }
    getLL(userInput.value);
    getWeatherData();
}

submitBtn.addEventListener("click", ini);
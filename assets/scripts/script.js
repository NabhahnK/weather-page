// Sets needed variables
const openWeatherAPI = "https://api.openweathermap.org/data/2.5/onecall?";
const openWeatherMapAPI = "http://api.openweathermap.org/geo/1.0/direct?q=";
const apiKey = "752a7c69c2f675bacc2d0b896d1432e5";
let userInput = document.querySelector("#cityname");
let submitBtn = document.getElementById("submitBtn");
const cityAndDate = document.querySelector("#city-date");
const temp = document.querySelector("#curr-temp");
const humm = document.querySelector("#curr-hum");
const uv = document.querySelector("#curr-uv");
const wind = document.querySelector("#curr-wind");
const history = document.getElementById("history");

// Creates the Btns for previous searched citys
function createBtns() {
    history.innerHTML = "";
    if (localStorage.length > 0) {
        //Items are stored in local storage
        for (let i = 0; i < localStorage.length; i++) {
            // Runs if the key is not lan or log
            let name = localStorage.key(i);

            if (name != "lat" && name != "lon" && name != "cityData") {
                console.log(localStorage.getItem(localStorage.key(i)));

                const btn = document.createElement("button");

                btn.innerHTML = localStorage.key(i);

                document.getElementById("history").appendChild(btn);
            }
            // console.log(localStorage.getItem(localStorage.key(i)));
        }
    } else {
        //Local storage is empty
        return;
    }
}

async function fillHTML(data) {
    // return;
    // call in html variables to fill on the top
    // Fill in day w
    // cityAndDate.innerHTM;
    let dataV2 = data
    temp.innerHTML = await "Temp: " + dataV2.current.temp;
    await console.log(dataV2.current.wind_speed);
    humm.textContent = await "Humidity: " + dataV2.current.humidity;
    uv.textContent = await "UV: " + dataV2.current.uvi;
    wind.textContent = "Wind: " + dataV2.current.wind_speed;
    // Loop to make and fill cards
}

// Gets the lan and log using the city name
function getLL(city) {
    let apiCall = openWeatherMapAPI + city + "&appid=" + apiKey;
    // console.log(apiCall);
    localStorage.setItem(city, city);
    createBtns()
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

// Gets the weather using the lan and log
function getWeatherData() {
    let apiCall = openWeatherAPI + "lat=" + localStorage.getItem("lat") + "&lon=" + localStorage.getItem("lon") + "&appid=" + apiKey;
    console.log(apiCall);
    fetch(apiCall)
        .then(response => response.json())
        .then(function (data) {
            fillHTML(data);
            console.log(data);
            // localStorage.setItem("cityData", data);
        })
}

// Runs when search is clicked
function ini(event) {
    event.preventDefault();
    if (!userInput.value) {
        alert("Please, Enter a City name.");
        return
    }
    getLL(userInput.value);
    getWeatherData();
}

createBtns()
submitBtn.addEventListener("click", ini);
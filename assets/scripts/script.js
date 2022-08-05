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
const fiveDay = document.querySelector("#five-day");
const history = document.getElementById("history");

// Creates the Btns for previous searched citys
function createBtns() {
    history.innerHTML = "";
    if (localStorage.length > 0) {
        //Items are stored in local storage
        for (let i = 0; i < localStorage.length; i++) {
            // Runs if the key is not lan or log
            let name = localStorage.key(i);

            if (name != "lat" && name != "lon" && name != "cityData" && name != "currentCall") {
                // console.log(localStorage.getItem(localStorage.key(i)));

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

function makeCard(data) {
    // Loop to make and fill cards
    for(let i = 0; i < 5; i++) {
        let card = document.createElement("div");
        let date = document.createElement("h3");
        let img = document.createElement("img");
        let cardTemp = document.createElement("p");
        let cardWind = document.createElement("p");
        let cardHum = document.createElement("p");

        let index = (i + 1);
        let cardDate = new Date(data.daily[index].dt*1000);

        date.textContent = (cardDate.getMonth()+1) + "/" + cardDate.getDate() + "/" + cardDate.getFullYear();
        img.src = "http://openweathermap.org/img/wn/" + data.daily[index].weather[0].icon + "@2x.png";
        cardTemp.textContent = "Temp: " + data.daily[index].temp.day;
        cardWind.textContent = "Wind: " + data.daily[index].wind_speed;
        cardHum.textContent = "Humidity: " + data.daily[index].humidity;

        card.appendChild(date);
        card.appendChild(img);
        card.appendChild(cardTemp);
        card.appendChild(cardWind);
        card.appendChild(cardHum);
        fiveDay.appendChild(card);
    }
}

async function fillHTML(data) {
    // Fill in day w
    let date = new Date(data.current.dt*1000);
    cityAndDate.textContent = localStorage.getItem("currentCall") + " " + (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
    let dataV2 = data
    temp.innerHTML = await "Temp: " + dataV2.current.temp;
    humm.textContent = await "Humidity: " + dataV2.current.humidity;
    uv.textContent = await "UV: " + dataV2.current.uvi;
    wind.textContent = await "Wind: " + dataV2.current.wind_speed;
    makeCard(dataV2);
}

// Gets the lan and log using the city name
function getLL(city) {
    let apiCall = openWeatherMapAPI + city + "&appid=" + apiKey;
    // console.log(apiCall);
    localStorage.setItem(city, city);
    localStorage.setItem("currentCall", city);
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
    let apiCall = openWeatherAPI + "lat=" + localStorage.getItem("lat") + "&lon=" + localStorage.getItem("lon") + "&appid=" + apiKey + "&units=imperial";
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

function iniHistory(event) {
    let target = event.target;

    if(target.tagName != "BUTTON") {return}
    getLL(target.textContent);
    getWeatherData();
}

createBtns()
submitBtn.addEventListener("click", ini);
history.addEventListener("click", iniHistory);
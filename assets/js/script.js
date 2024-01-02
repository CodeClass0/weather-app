
var key = "51dbff39a74a875476aed42c85a1e68b";
var currentTemp = document.querySelector(".cardCurrent-temp");
var currentWind = document.querySelector(".cardCurrent-wind");
var currentHumidity = document.querySelector(".cardCurrent-humidity");
var currentDate = document.querySelector(".cardCurrent-date");

function buildCurrentWeatherObject(city){
    var citySearch = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid=" + key;

    var currentWeatherObject = {
        location: "",
        temp: 0,
        wind: 0,
        humidity: 0,
    };

    fetch (citySearch)
    .then((response) => response.json())
    .then((data)=>{
        //we now have an object with lat/lon.
        const lat = data[0].lat;
        const lon = data[0].lon;
        const location = data[0].name;
        const currentWeatherCall = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + key;

        fetch (currentWeatherCall)
        .then((response) => response.json())
        .then((data)=>{
            currentDate.textContent = location + " (" + dayjs().format("MM/DD/YYYY") + ")";
            currentWeatherObject.temp = Math.round(((data.main.temp - 273.15)* (9/5)+32) * 100)/100;
            console.log("Temperature: " + currentWeatherObject.temp + "°F");
            currentTemp.textContent = "Temperature: " + currentWeatherObject.temp + "°F";
            currentWeatherObject.wind =  data.wind.speed;
            console.log ("Wind: " + currentWeatherObject.wind + " MPH");
            currentWind.textContent = "Wind: " + currentWeatherObject.wind + " MPH";
            currentWeatherObject.humidity = data.main.humidity;
            console.log ("Humidity: " + currentWeatherObject.humidity + " %");
            currentHumidity.textContent = "Humidity: " + currentWeatherObject.humidity + " %";
        })
    })
}

var searchedText = "charlotte";
buildCurrentWeatherObject(searchedText);
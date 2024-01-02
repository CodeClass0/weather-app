
var key = "51dbff39a74a875476aed42c85a1e68b";
var currentTemp = document.querySelector(".cardCurrent-temp");
var currentWind = document.querySelector(".cardCurrent-wind");
var currentHumidity = document.querySelector(".cardCurrent-humidity");
var currentDate = document.querySelector(".cardCurrent-date");

var title1 = document.querySelector(".card1-title");
var date1 = document.querySelector(".card1-date");
var temp1 = document.querySelector(".card1-temp");
var wind1 = document.querySelector(".card1-wind");

var title2 = document.querySelector(".card2-title");
var date2 = document.querySelector(".card2-date");
var temp2 = document.querySelector(".card2-temp");
var wind2 = document.querySelector(".card2-wind");

var title3 = document.querySelector(".card3-title");
var date3 = document.querySelector(".card3-date");
var temp3 = document.querySelector(".card3-temp");
var wind3 = document.querySelector(".card3-wind");

var title4 = document.querySelector(".card4-title");
var date4 = document.querySelector(".card4-date");
var temp4 = document.querySelector(".card4-temp");
var wind4 = document.querySelector(".card4-wind");

var title5 = document.querySelector(".card5-title");
var date5 = document.querySelector(".card5-date");
var temp5 = document.querySelector(".card5-temp");
var wind5 = document.querySelector(".card5-wind");


function buildCurrentWeather(city){
    var citySearch = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid=" + key;
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
            var temp = Math.round(((data.main.temp - 273.15)* (9/5)+32) * 100)/100;
            console.log("Temperature: " + temp + "°F");
            currentTemp.textContent = "Temperature: " + temp + "°F";
            console.log ("Wind: " + data.wind.speed + " MPH");
            currentWind.textContent = "Wind: " + data.wind.speed + " MPH";
            console.log ("Humidity: " + data.main.humidity + " %");
            currentHumidity.textContent = "Humidity: " + data.main.humidity + " %";
        })
    })
}

function buildForecast(city){
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
        const forecastCall = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + key;

        fetch (forecastCall)
        .then((response) => response.json())
        .then((data)=>{

            console.log(data);

            for (var i = 0; i<5; i++){
                //console.log(data[i].name);
                console.log(data.list[i].main.temp);
                console.log(data.list[i].wind.speed);
                console.log(data.list[i].main.humidity);
            }




            // currentDate.textContent = location + " (" + dayjs().format("MM/DD/YYYY") + ")";
            // currentWeatherObject.temp = Math.round(((data.main.temp - 273.15)* (9/5)+32) * 100)/100;
            // console.log("Temperature: " + currentWeatherObject.temp + "°F");
            // currentTemp.textContent = "Temperature: " + currentWeatherObject.temp + "°F";
            // currentWeatherObject.wind =  data.wind.speed;
            // console.log ("Wind: " + currentWeatherObject.wind + " MPH");
            // currentWind.textContent = "Wind: " + currentWeatherObject.wind + " MPH";
            // currentWeatherObject.humidity = data.main.humidity;
            // console.log ("Humidity: " + currentWeatherObject.humidity + " %");
            // currentHumidity.textContent = "Humidity: " + currentWeatherObject.humidity + " %";
        })
    })
}


var searchedText = "charlotte";
buildCurrentWeather(searchedText);
buildForecast(searchedText);
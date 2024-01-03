//Global variables
var key = "51dbff39a74a875476aed42c85a1e68b";
var currentTemp = document.querySelector(".cardCurrent-temp");
var currentWind = document.querySelector(".cardCurrent-wind");
var currentHumidity = document.querySelector(".cardCurrent-humidity");
var currentDate = document.querySelector(".cardCurrent-date");
var currentIcon = document.querySelector(".cardCurrent-ico");
let retArray = JSON.parse(localStorage.getItem("key"));


//objects for populating the cards for the 5-day
cardObj1 = {
    title: document.querySelector(".card1-title"),
    Date: document.querySelector(".card1-date"),
    temp: document.querySelector(".card1-temp"),
    wind: document.querySelector(".card1-wind"),
    humidity: document.querySelector(".card1-humidity"),
    icon: document.querySelector(".card1-ico"),
};
cardObj2 = {
    title: document.querySelector(".card2-title"),
    Date: document.querySelector(".card2-date"),
    temp: document.querySelector(".card2-temp"),
    wind: document.querySelector(".card2-wind"),
    humidity: document.querySelector(".card2-humidity"),
    icon: document.querySelector(".card2-ico"),
};
cardObj3 = {
    title: document.querySelector(".card3-title"),
    Date: document.querySelector(".card3-date"),
    temp: document.querySelector(".card3-temp"),
    wind: document.querySelector(".card3-wind"),
    humidity: document.querySelector(".card3-humidity"),
    icon: document.querySelector(".card3-ico"),
};
cardObj4 = {
    title: document.querySelector(".card4-title"),
    Date: document.querySelector(".card4-date"),
    temp: document.querySelector(".card4-temp"),
    wind: document.querySelector(".card4-wind"),
    humidity: document.querySelector(".card4-humidity"),
    icon: document.querySelector(".card4-ico"), 
};
cardObj5 = {
    title: document.querySelector(".card5-title"),
    Date: document.querySelector(".card5-date"),
    temp: document.querySelector(".card5-temp"),
    wind: document.querySelector(".card5-wind"),
    humidity: document.querySelector(".card5-humidity"),
    icon: document.querySelector(".card5-ico"),
};

//array of 5-day objects
var cardArray = [cardObj1,cardObj2,cardObj3,cardObj4,cardObj5];



//call current weather API
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
            // console.log(data);
            currentDate.textContent = location + " (" + dayjs().format("MM/DD/YYYY") + ")";
            var temp = Math.round(((data.main.temp - 273.15)* (9/5)+32) * 100)/100;
            // console.log("Temperature: " + temp + "°F");
            currentTemp.textContent = "Temperature: " + temp + "°F";
            // console.log ("Wind: " + data.wind.speed + " MPH");
            currentWind.textContent = "Wind: " + data.wind.speed + " MPH";
            // console.log ("Humidity: " + data.main.humidity + " %");
            currentHumidity.textContent = "Humidity: " + data.main.humidity + " %";
            // console.log(data.weather.icon);
            var url = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            $('.cardCurrent-ico').attr('src',url);
        })
    })
}

//call five-day API
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

            // console.log(data);

            for (var i = 0; i<5; i++){
                cardArray[i].title.textContent = dayjs().add(i+1, "day").format("MM/DD/YYYY");
                var tempConvert = "Temperature: "+  Math.round(((data.list[i].main.temp - 273.15)* (9/5)+32) * 100)/100 + "°F";
                cardArray[i].temp.textContent=tempConvert;
                // console.log(data.list[i].main.temp);
                cardArray[i].wind.textContent= "Wind: " + data.list[i].wind.speed + " MPH";
                // console.log(data.list[i].wind.speed);
                cardArray[i].humidity.textContent= "Humidity: " + data.list[i].main.humidity + "%";
                // console.log(data.list[i].main.humidity);
                var url = "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";
                $(".card" + (i+1) + "-ico").attr('src',url);
                // console.log(data.list[i].weather[0].icon);
            }
        })
    })
}

function searchFromList(city){
    buildCurrentWeather(city);
    buildForecast(city);
}



$(".btnSubmit").on('click', function(e){
    e.preventDefault();
    
    var citySearch = $(".form-control").val().trim(); 
    buildCurrentWeather(citySearch); 
    buildForecast(citySearch);

    let retArray = JSON.parse(localStorage.getItem("key"));

    if (retArray == null){
        var array = [];
        array[0] = citySearch;
        localStorage.setItem("key", JSON.stringify(array));
        $(".list-group").attr("style","visibility: visible;");
        var recentItem = document.createElement("a");
        recentItem.className = "list-group-item list-group-item-action";
        recentItem.ariaCurrent = true;
        recentItem.text = citySearch;
        document.querySelector(".list-group").appendChild(recentItem);
    } else if (retArray !== null){
        retArray.push(citySearch);
        var newString = JSON.stringify(retArray);
        localStorage.setItem("key",newString);
        var recentItem = document.createElement("a");
        recentItem.className = "list-group-item list-group-item-action";
        recentItem.ariaCurrent = true;
        recentItem.text = retArray[i];
        document.querySelector(".list-group").appendChild(recentItem);
    
    }
})




//on load, check if any items are in recent history via local storage
//if so, load them and get data for the last city searched. 
//if not, use Charlotte as a default city.

if (retArray !== null){
    
    buildCurrentWeather(retArray.slice(-1));
    buildForecast(retArray.slice(-1));

    $(".list-group").attr("style","visibility: visible;");
    for (var i = 0; i < retArray.length; i++){
        var recentItem = document.createElement("a");
        recentItem.className = "list-group-item list-group-item-action";
        recentItem.ariaCurrent = true;
        recentItem.text = retArray[i];
        document.querySelector(".list-group").appendChild(recentItem);
    }

} else if (retArray == null){
    var defaultSearch = "charlotte";
    buildCurrentWeather(defaultSearch);
    buildForecast(defaultSearch);
}


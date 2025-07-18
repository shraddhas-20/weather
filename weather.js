const  apiKey = "d35c13c0701e281bbf8130a2764bc329";
const  apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const  picapiKey = "QFpLRa69ma5A8phLRJ0HcAvBtJN4SH3ToFmFQ4NkOtkGVEvEHLpuHC40";
const  picapiUrl = "https://api.unsplash.com/search/photos?query=";

const searchBox = document.querySelector(".searchbar input");
const searchBtn = document.querySelector(".searchbar button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiUrl + city+ `&appid=${apiKey}`);
    
    if(response.status == 404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
        return;
    }
    const data = await response.json();
    

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".feel").innerHTML = "Feels like : " + Math.round(data.main.feels_like) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    document.querySelector(".pressure").innerHTML = "Pressure : " + Math.round(data.main.pressure) + "Pa";

    const weather = data.weather[0].main;
    if (weather == "Clouds") weatherIcon.src = "images/clouds.png";
    else if (weather == "Clear") weatherIcon.src = "images/clear.png";
    else if (weather == "Rain") weatherIcon.src = "images/rain.png";
    else if (weather == "Drizzle") weatherIcon.src = "images/drizzle.png";
    else if (weather == "Mist") weatherIcon.src = "images/mist.png";

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

async function checkCityName(city){
    const response = await fetch(picapiUrl + city + `&client_id=${picapiKey}`);
   
    const pictureData = await response.json();
        document.querySelector(".background").style.background= `url(${pictureData.results[0].urls.regular})`;

    return pictureData;
    
}

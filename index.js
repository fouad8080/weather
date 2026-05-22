const cityinput=document.getElementById("cityInput");
const cityName=document.getElementById("cityName");
const temperature=document.getElementById("temperature");
const description=document.getElementById("description");
const humidity=document.getElementById("humidity");
const weatherEmoji=document.getElementById("weatherEmoji");
const windSpeed=document.getElementById("windSpeed");
const errorMessage=document.getElementById("errorMessage");
const weatherForm=document.getElementById("weatherForm")
const api_key="e2acc5d75a05c66c6b2d5b51976097db";




async function getweatherdata(){
    weatherForm.style.visibility="visible";
    errorMessage.textContent="";
    errorMessage.style.visibility="hidden";
    const city= cityinput.value;
    if (city!==""){
        try{
            const data = await getweather(city);
            dispalyinfo(data);
        }
        catch(error){
            displayerror("error fetching weather data")
        }
    }
    else{
        displayerror("please enter  a city")
    }
}


async function getweather(city) {
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=imperial`);
        if (!response.ok){
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(error){
        throw error;
    }
}

function dispalyinfo(data){
    cityName.textContent=data.name;
    temperature.textContent = `Temperature: ${((data.main.temp-32)*(5/9)).toFixed(1) } °C`;
    description.textContent = `Description: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} mph`;
    displayimoji(data.weather[0].id);

}
function displayimoji(weatherId){
    if (weatherId >= 200 && weatherId < 300) {
        weatherEmoji.textContent = "⛈️";
        document.body.style.backgroundImage = "url(images/lighty.jpg)";
    } else if (weatherId >= 300 && weatherId < 500) {
        weatherEmoji.textContent = "🌧️";
        document.body.style.backgroundImage = "url(images/rainsky.webp)";
    } else if (weatherId >= 500 && weatherId < 600) {
        weatherEmoji.textContent = "🌦️";
        document.body.style.backgroundImage = "url(images/few clouds.jpg)";
    } else if (weatherId >= 600 && weatherId < 700) {
        weatherEmoji.textContent = "❄️";
        document.body.style.backgroundImage = "url(images/snowy.jpg)";
    } else if (weatherId >= 700 && weatherId < 800) {
        weatherEmoji.textContent = "🌫️";
        document.body.style.backgroundImage = "url(images/windy.jpg)";
    } else if (weatherId === 800) {
        weatherEmoji.textContent = "☀️";
        document.body.style.backgroundImage = "url(images/suny.jpg)";
    } else if (weatherId > 800 && weatherId < 900) {
        weatherEmoji.textContent = "☁️";
        document.body.style.backgroundImage = "url(images/cloudy.jpg)";
    } else {
        weatherEmoji.textContent = "";
    }   
}
function displayerror(message){
    errorMessage.textContent=message;
    errorMessage.style.visibility="visible";
    weatherForm.style.height="87dvh";
}

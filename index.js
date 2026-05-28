const cityinput=document.getElementById("cityInput");
const cityName=document.getElementById("cityName");
const temperature=document.getElementById("temperature");
const description=document.getElementById("description");
const humidity=document.getElementById("humidity");
const weatherEmoji=document.getElementById("weatherEmoji");
const windSpeed=document.getElementById("windSpeed");
const errorMessage=document.getElementById("errorMessage");
const weatherForm=document.getElementById("weatherForm")
const loaderWrapper=document.querySelector(".loader-wrapper");
const api_key="e2acc5d75a05c66c6b2d5b51976097db";
const showday=document.getElementById("days");


const day3=document.getElementById("day3");
const day4=document.getElementById("day4");
const day5=document.getElementById("day5");




async function getweatherdata(day=0){
    weatherForm.style.visibility="visible";
    errorMessage.textContent="";
    const city= cityinput.value;
    if (city!==""){
        try{
            const data = await getweather(city);
           
            dispalyinfo(city,data[Object.keys(data)[day]][0]);
            console.log(Object.keys(data));
             day3.textContent=Object.keys(data)[2];
            day4.textContent=Object.keys(data)[3];
            day5.textContent=Object.keys(data)[4];
            showday.style.visibility="visible";
        }
        catch(error){
            displayerror("error fetching weather data")
        }
    }
    else{
        displayerror("please enter a city")
    }
}



async function getweather(city) {
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&units=imperial`);
            if (!response.ok){
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const days={}
        data.list.forEach( item => {
        const date = item.dt_txt.split(" ")[0];
        if (!days[date]) days[date] = [];
        days[date].push(item);
        console.log(days[date]);
    });
        return days;
    }
    catch(error){
        throw error;
    }
}



function dispalyinfo(city,data){
    cityName.textContent=city;
    temperature.textContent = `Temperature: ${((data.main.temp-32)*(5/9)).toFixed(1) } °C`;
    description.textContent = `Description: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} mph`;
    displayimoji(data.weather[0].id);
}
function displayimoji(weatherId){
    if (weatherId >= 200 && weatherId < 300) {
        weatherEmoji.textContent = "⛈️";
        document.body.style.backgroundImage = "url(images/lighty.webp)";
    } else if (weatherId >= 300 && weatherId < 500) {
        weatherEmoji.textContent = "🌧️";
        document.body.style.backgroundImage = "url(images/rainsky.webp)";
    } else if (weatherId >= 500 && weatherId < 600) {
        weatherEmoji.textContent = "🌦️";
        document.body.style.backgroundImage = "url(images/few.webp)";
    } else if (weatherId >= 600 && weatherId < 700) {
        weatherEmoji.textContent = "❄️";
        document.body.style.backgroundImage = "url(images/snowy.webp)";
    } else if (weatherId >= 700 && weatherId < 800) {
        weatherEmoji.textContent = "🌫️";
        document.body.style.backgroundImage = "url(images/windy.webp)";
    } else if (weatherId === 800) {
        weatherEmoji.textContent = "☀️";
        document.body.style.backgroundImage = "url(images/suny.webp)";
    } else if (weatherId > 800 && weatherId < 900) {
        weatherEmoji.textContent = "☁️";
        document.body.style.backgroundImage = "url(images/cloudy.webp)";
    } else {
        weatherEmoji.textContent = "";
    }   
}
function displayerror(message){
    errorMessage.textContent=message;
    errorMessage.style.visibility="visible";
    temperature.style.visibility="hidden";
    description.style.visibility="hidden";
    humidity.style.visibility="hidden";
    windSpeed.style.visibility="hidden";
    weatherEmoji.style.visibility="hidden";
    cityName.style.visibility="hidden";
    weatherForm.style.height="87dvh";
}

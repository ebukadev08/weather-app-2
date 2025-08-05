const date = document.getElementById('date')
const city = document.getElementById('city')
const temp = document.getElementById('temp')
const tempImg = document.getElementById('tempImg')
const description = document.getElementById('description')
const tempMax = document.getElementById('tempMax')
const tempMin = document.getElementById('tempMin')
const app = document.getElementById('app')

const months = ['january', 'february', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let dateObj = new Date()
let month = months[dateObj.getUTCMonth()]
let day = dateObj.getUTCDate();
let year = dateObj.getFullYear()

date.innerHTML = `${month} ${day} ${year}`;

const getWeather = async () => {
    try {
        const cityName = document.getElementById('searchBarInput').value.trim()
        if(!cityName){
            alert("Please enter a city name.")
            return;
        }
        const weatherDataFetch = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=42997260aacf6d19e414fbcd5c483168&units=metric`, {
            headers: {
                Accept: "application/json"
            }
        })
        const weatherData = await weatherDataFetch.json()
        if (weatherData.cod !== 200) {
            alert(`City not found: ${weatherData.message}`);
            return;
        }
        console.log(weatherData)
        city.innerHTML = `${weatherData.name}`;
        description.innerHTML = `${weatherData.weather[0].main}`;
        tempImg.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
        temp.innerHTML = `<h2>${Math.round(weatherData.main.temp)}°C</h2>`;
        tempMax.innerHTML = `${weatherData.main.temp_max}°C`;
        tempMin.innerHTML = `${weatherData.main.temp_min}°C`
    } catch (error) {
        console.error("Weather fetch error:", error)
    }
}

const WEATHER_API = '';
const getWeatherBtn = document.getElementById('get-weather-btn');

function displayWeather(data) {
    //Data Container
    const weatherDataContainer = document.getElementById('weather-data-container');
    weatherDataContainer.classList.add('open');
    weatherDataContainer.innerHTML = '';

    // Weather Input
    const weatherInput = document.getElementById('weather-input');
    weatherInput.style.display = 'none';

    //Weather Button
    getWeatherBtn.style.display = 'none';

    //City Name
    const cityName = document.createElement('h2');
    cityName.classList.add('city-title');
    cityName.textContent = data.name;
    weatherDataContainer.append(cityName);

    // Sky
    const sky = document.createElement('img');
    sky.classList.add('sky-icon');
    
    if(data.weather[0].description === 'few clouds' || 'cloudy' || 'partly cloudy') {
        sky.src = 'images/partly-cloudy.png';
    } else if (data.weather[0].description === 'rain' || 'light rain' || 'heavy rain') {
        sky.src = 'images/rain.png';
    } else if (data.weather[0].description === 'fog' || 'light fog' || 'heavy fog') {
        sky.src = 'images/fog.png';
    } else if (data.weather[0].description === 'sunny' || 'sun') {
        sky.src = 'images/sunny.png';
    } else if (data.weather[0].description === 'thunder' || 'thunder storm' || 'storm' || 'lightning') {
        sky.src = 'images/thunder.png';
    } else if (data.weather[0].description === 'snowing' || 'light snow' || 'heavy snow' || 'blizzard') {
        sky.src = 'images/snow.png';
    } else {
        const skyText = document.createElement('p');
        skyText.textContent = `Skies: ${data.weather[0].description}`;
        weatherDataContainer.append(skyText);
    }
    weatherDataContainer.append(sky)

    // Acutal Temperature & Feels Like Temperature
    const temperature = document.createElement('p');
    temperature.classList.add('temperature');
    temperature.textContent = `${Math.floor(data.main.temp)}°F | ${Math.floor(data.main.feels_like)}°F`;
    weatherDataContainer.append(temperature)

    //Humidity
    const humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)}%`
    weatherDataContainer.append(humidity);

    //Wind
    const wind = document.createElement('p');
    wind.textContent = `Wind: ${Math.floor(data.wind.speed)}mph`;
    weatherDataContainer.append(wind);
}

getWeatherBtn.addEventListener('click', () => {
    const cityInput = document.getElementById('weather-input');
    const city = cityInput.value;

    fetchWeatherData(city);

    cityInput.value = '';

})

async function fetchWeatherData(city) {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${WEATHER_API}`)
    const locationData = await response.json();
    try {
        if(locationData.length === 0) {
            const errorMessage = 'City not found';
            console.error(errorMessage);
        }
    
        const { lat, lon } = locationData[0];
        console.log(`Coordinates for ${city}: `, lat, lon);
    
        const coordinateResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API}&units=imperial`)

        const weatherData = await coordinateResponse.json();
        try {
                console.log('Weather Data: ', weatherData);
                displayWeather(weatherData)
        }
        catch (error) {
            console.error('Error:', error);
        }
    } 
    catch (error) {
        console.error('Error:', error);
    }
    
}

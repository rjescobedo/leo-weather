const WEATHER_API = '';


const getWeatherBtn = document.getElementById('get-weather-btn');
getWeatherBtn.addEventListener('click', () => {
    const cityInput = document.getElementById('weather-input');
    const city = cityInput.value;

    fetchWeatherData(city);

    cityInput.value = '';

})

function fetchWeatherData(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${WEATHER_API}`)
        .then(response => response.json())
        .then(locationData => {
            if(locationData.length === 0) {
                const errorMessage = 'City not found';
                console.error(errorMessage);
            }

            const { lat, lon } = locationData[0];
            console.log(`Coordinates for ${city}: `, lat, lon);

            return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API}&units=imperial`)
        })
        .then(response => response.json())
        .then(weatherData => {
            console.log('Weather Data: ', weatherData);
            displayWeather(weatherData)
        })
        .catch(error => {
            console.error('Error: ', error)
        })
}

function displayWeather(data) {
    //Data Container
    const weatherDataContainer = document.getElementById('weather-data-container');
    weatherDataContainer.innerHTML = '';

    //City Name
    const cityName = document.createElement('h2');
    cityName.textContent = data.name;
    weatherDataContainer.append(cityName);

    // Acutal Temperature
    const temperature = document.createElement('p');
    temperature.textContent = `Temperature: ${data.main.temp}°F`;
    weatherDataContainer.append(temperature)

    // Feels Like Temperature
    const feelsLike = document.createElement('p');
    feelsLike.textContent = `Feels Like: ${data.main.feels_like}°F`;
    weatherDataContainer.append(feelsLike)

    // Sky
    const sky = document.createElement('p');
    sky.textContent = `Skies: ${data.weather[0].description}`;
    weatherDataContainer.append(sky)

    //Humidity
    const humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${data.main.humidity}%`
    weatherDataContainer.append(humidity);

    //Wind
    const wind = document.createElement('p');
    wind.textContent = `Wind: ${data.wind.speed}`;
    weatherDataContainer.append(wind);
}
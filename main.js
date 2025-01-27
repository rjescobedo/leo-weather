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
    const weatherIconCode = data.weather[0].icon;
    sky.src = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`
    sky.classList.add('sky-icon');
    weatherDataContainer.append(sky)

    //Log the weather description for debugging
    const skyDescription = document.createElement('p')
    const skyData = data.weather[0].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');;
    skyDescription.textContent = `${skyData}`;
    weatherDataContainer.append(skyDescription);

    // Temperature
    const temperature = document.createElement('h3');
    temperature.classList.add('temperature');
    temperature.textContent = `${Math.floor(data.main.temp)}°F`;
    weatherDataContainer.append(temperature)
    
    // Temp - low and high
    const minMaxTemp = document.createElement('h4');
    minMaxTemp.classList.add('min-max-temp');
    minMaxTemp.textContent = `${Math.floor(data.main.temp_min)}°F | ${Math.floor(data.main.temp_max)}°F`;
    weatherDataContainer.append(minMaxTemp);

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
        
        const error = document.getElementById('error');
        error.innerHTML = '';
        if(locationData.length === 0) {
            const errorMessage = 'City not found';
            console.error(errorMessage);

            error.style.display = 'block';
            error.innerHTML = errorMessage;
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

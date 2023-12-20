document.getElementById('search-btn').addEventListener('click', function () {
    const cityInput = document.getElementById('city-input').value.trim();

    if (!cityInput) {
        alert('Please enter a city.');
        return;
    }

    const API_KEY = "8ad40c1dc5e615494c90ad627dab8561";
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API_KEY}&units=metric`;

    fetch(WEATHER_API_URL)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weather-info');

            if (data.cod !== '404') {
                const iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

                weatherInfo.innerHTML = `
                    <h3>Weather in ${data.name}, ${data.sys.country}</h3>
                    <img id="weather-icon" src="${iconUrl}" alt="Weather Icon">
                    <p>Temperature: ${data.main.temp} &deg;C</p>
                    <p>Description: ${data.weather[0].description}</p>
                    <p>Wind: ${data.wind.speed} m/s</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                `;
            } else {
                weatherInfo.innerHTML = `<p>City not found. Please enter a valid city.</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again later.');
        });
});
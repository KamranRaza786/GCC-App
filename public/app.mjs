// app.mjs

// Function to update the current time
function updateCurrentTime() {
  const currentTimeElement = document.getElementById('current-time');
  const now = new Date();
  const currentTimeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  currentTimeElement.textContent = `Current Time: ${currentTimeString}`;
}

// Function to get weather data for a specific city
async function getWeatherData(city) {
  try {
    const response = await fetch(`/weather/${city}`);
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Weather data not found.');
  }
}

// Function to update the weather display for the default city
async function updateDefaultCityWeather() {
  const defaultCity = 'Karachi,Pakistan';
  try {
    const weatherData = await getWeatherData(defaultCity);
    // Update the weather display here based on your index.html structure
    document.getElementById('location').textContent = `${weatherData.name}, ${weatherData.sys.country}`;
    document.getElementById('temperature').textContent = `${weatherData.main.temp}°C`;
    document.getElementById('description').textContent = weatherData.weather[0].description;
    document.getElementById('feels-like').textContent = `Feels Like: ${weatherData.main.feels_like}°C`;
    document.getElementById('temp-min').textContent = `Min Temp: ${weatherData.main.temp_min}°C`;
    document.getElementById('temp-max').textContent = `Max Temp: ${weatherData.main.temp_max}°C`;
    document.getElementById('pressure').textContent = `Pressure: ${weatherData.main.pressure} hPa`;
    document.getElementById('humidity').textContent = `Humidity: ${weatherData.main.humidity}%`;
    document.getElementById('sea-level').textContent = `Sea Level: ${weatherData.main.sea_level || '-'} hPa`;
    document.getElementById('grnd-level').textContent = `Ground Level: ${weatherData.main.grnd_level || '-'} hPa`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${weatherData.wind.speed} m/s`;
    document.getElementById('degree').textContent = `Wind Degree: ${weatherData.wind.deg}°`;
    document.getElementById('sunrise').textContent = `Sunrise: ${getTimeFromUnixTimestamp(weatherData.sys.sunrise)}`;
    document.getElementById('sunset').textContent = `Sunset: ${getTimeFromUnixTimestamp(weatherData.sys.sunset)}`;
    document.getElementById('wind-gust').textContent = `Wind Gust: ${weatherData.wind.gust || '-'} m/s`;
    document.getElementById('rain').textContent = `Rain: ${weatherData.rain?.['1h'] || '0'} mm`;
    document.getElementById('clouds').textContent = `Cloudiness: ${weatherData.clouds.all}%`;
    document.getElementById('timezone').textContent = `Timezone: ${weatherData.timezone}`;
    const iconCode = weatherData.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
    const weatherIcon = document.createElement('img');
    weatherIcon.src = iconUrl;
    document.getElementById('weather-icon').innerHTML = '';
    document.getElementById('weather-icon').appendChild(weatherIcon);
  } catch (error) {
    console.error('Error updating default city weather:', error);
  }
}

// Function to fetch weather data for the 10 major cities in Pakistan
async function fetchWeatherFor10Cities() {
  const majorCities = ['Jhang', 'Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Hyderabad,pk', 'Gujranwala', 'Peshawar', 'Islamabad', 'Quetta'];
  try {
    for (const city of majorCities) {
      const weatherData = await getWeatherData(city);
      createWeatherRow(city, weatherData);
    }
  } catch (error) {
    console.error('Error fetching weather data for 10 cities:', error);
  }
}

// Helper function to convert Unix timestamp to time (HH:mm format)
function getTimeFromUnixTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Function to create a new row in the weather table
function createWeatherRow(city, weatherData) {
  const tableRow = document.createElement('tr');
  tableRow.innerHTML = `
    <td>${weatherData.name}, ${weatherData.sys.country}</td>
    <td>${weatherData.main.temp}°C</td>
    <td>${weatherData.wind.speed} m/s</td>
    <td>${weatherData.weather[0].description}</td>
    <td>${weatherData.coord.lon}</td>
    <td>${weatherData.coord.lat}</td>
    <td>${getTimeFromUnixTimestamp(weatherData.sys.sunrise)}</td>
    <td>${getTimeFromUnixTimestamp(weatherData.sys.sunset)}</td>
    <td>${weatherData.main.feels_like || '-'}</td>
    <td>${weatherData.main.temp_min || '-'}</td>
    <td>${weatherData.main.temp_max || '-'}</td>
    <td>${weatherData.main.pressure || '-'}</td>
    <td>${weatherData.main.humidity || '-'}</td>
    <td>${weatherData.main.sea_level || '-'}</td>
    <td>${weatherData.main.grnd_level || '-'}</td>
    <td>${weatherData.wind.gust || '-'}</td>
    <td>${weatherData.rain?.['1h'] || '0'} mm</td>
    <td>${weatherData.clouds.all || '-'}%</td>
    <td>${weatherData.timezone}</td>
  `;
  document.getElementById('weather-table').appendChild(tableRow);
}

// Function to show search result message
function showSearchResultMessage(message, success = true) {
  const messageBox = document.getElementById('message-box');
  messageBox.textContent = message;
  messageBox.style.color = success ? '#007bff' : 'red';
}

// Function to handle search button click
async function handleSearchButtonClick() {
  const cityInput = document.getElementById('city-input');
  const city = cityInput.value.trim();
  if (!city) {
    showSearchResultMessage('You did not type any city', false);
    return;
  }

  try {
    const weatherData = await getWeatherData(city);
    updateWeatherDisplay(weatherData);
    showSearchResultMessage(`Here is the weather of ${weatherData.name}, ${weatherData.sys.country}`);
  } catch (error) {
    if (error.message === 'Weather data not found.') {
      showSearchResultMessage('Weather data did not retrieve, check again', false);
    } else {
      showSearchResultMessage('Type city name correctly', false);
    }
  }
}

// Add event listener to search button
document.getElementById('search-btn').addEventListener('click', handleSearchButtonClick);

// Call the function to fetch and display weather data for the default city and 10 major cities on page load
document.addEventListener('DOMContentLoaded', () => {
  updateDefaultCityWeather();
  fetchWeatherFor10Cities();
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);
});

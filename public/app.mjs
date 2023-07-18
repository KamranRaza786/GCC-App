// app.js

const apiKey = '2fc6024d7933a770bd4c1168978bdfbd';

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
  const defaultCity = 'karachi,Pakistan';
  try {
    const weatherData = await getWeatherData(defaultCity);
    // Update the weather display here based on your index.html structure
    // For example:
    document.getElementById('location').textContent = `${weatherData.name}, ${weatherData.sys.country}`;
    document.getElementById('temperature').textContent = `${weatherData.main.temp}°C`;
    document.getElementById('description').textContent = weatherData.weather[0].description;
    // ...
  } catch (error) {
    console.error('Error updating default city weather:', error);
  }
}

// Function to fetch weather data for the 10 major cities in Pakistan
async function fetchWeatherFor10Cities() {
  const majorCities = ['jhang', 'Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Hyderabad', 'Gujranwala', 'Peshawar', 'Islamabad', 'Quetta'];
  try {
    for (const city of majorCities) {
      const weatherData = await getWeatherData(city);
      // Update the weather data in the table here based on your index.html structure
      // For example:
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
      `;
      document.getElementById('weather-table').appendChild(tableRow);
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

// Function to fetch weather data for the entered city
async function fetchWeatherForCity(city) {
  try {
    const weatherData = await getWeatherData(city);
    // Update the weather display here based on your index.html structure
    // For example:
    document.getElementById('location').textContent = `${weatherData.name}, ${weatherData.sys.country}`;
    document.getElementById('temperature').textContent = `${weatherData.main.temp}°C`;
    document.getElementById('description').textContent = weatherData.weather[0].description;
    // ...
  } catch (error) {
    console.error('Error fetching weather data for the entered city:', error);
    document.getElementById('error-message').textContent = 'Weather data not found for the entered city.';
  }
}

// Function to handle the search button click
function handleSearchButtonClick() {
  const cityInput = document.getElementById('city-input');
  const cityName = cityInput.value.trim();

  // Check if the input is not empty
  if (cityName) {
    // Clear any previous error message
    document.getElementById('error-message').textContent = '';
    
    // Fetch weather data for the entered city
    fetchWeatherForCity(cityName);
    
    // Clear the input field
    cityInput.value = '';
  } else {
    // Show an error message if the input is empty
    document.getElementById('error-message').textContent = 'Please enter a city name.';
  }
}

// Attach the click event listener to the search button
document.getElementById('search-btn').addEventListener('click', handleSearchButtonClick);

// Call the function to fetch and display weather data for the default city and 10 major cities on page load
document.addEventListener('DOMContentLoaded', () => {
  updateDefaultCityWeather();
  fetchWeatherFor10Cities();
});

document.addEventListener('DOMContentLoaded', () => {
  const locationElement = document.getElementById('location');
  const weatherIconElement = document.getElementById('weather-icon');
  const temperatureElement = document.getElementById('temperature');
  const descriptionElement = document.getElementById('description');
  const timeElement = document.getElementById('time');
  const searchInput = document.getElementById('city-input');
  const searchButton = document.getElementById('search-btn');
  const errorMessageElement = document.getElementById('error-message');

  searchButton.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city !== '') {
      fetchWeatherData(city);
    } else {
      displayErrorMessage('Please enter a city name.');
    }
  });

  async function fetchWeatherData(city) {
    try {
      if (city.toLowerCase() === 'current') {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const weatherData = await fetchWeatherByCoordinates(latitude, longitude);
              updateWeatherData(weatherData);
              clearErrorMessage();
            },
            (error) => {
              console.error('Error getting user location:', error);
              displayErrorMessage('Error getting user location. Please try again.');
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser');
          displayErrorMessage('Geolocation is not supported by this browser');
        }
      } else {
        const weatherData = await fetchWeatherByCity(city);
        updateWeatherData(weatherData);
        clearErrorMessage();
      }
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      displayErrorMessage('Failed to retrieve weather data. Please try again.');
    }
  }

  async function fetchWeatherByCity(city) {
    const response = await fetch(`/weather/${city}`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    return data;
  }

  async function fetchWeatherByCoordinates(latitude, longitude) {
    const response = await fetch(`/weather/coordinates?lat=${latitude}&lon=${longitude}`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    return data;
  }

  function updateWeatherData(data) {
    locationElement.textContent = data.name;
    temperatureElement.textContent = `${data.main.temp}°C`;
    descriptionElement.textContent = data.weather[0].description;

    const iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherIconElement.innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;

    // Display current time
    const currentTime = getCurrentTime();
    timeElement.textContent = currentTime;
    
    searchInput.value = ''; // Clear the search box
  }

  function displayErrorMessage(message) {
    errorMessageElement.textContent = message;
  }

  function clearErrorMessage() {
    errorMessageElement.textContent = '';
  }

  function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let meridiem = 'AM';

    // Convert to 12-hour format
    if (hours > 12) {
      hours -= 12;
      meridiem = 'PM';
    } else if (hours === 0) {
      hours = 12;
    }

    // Add leading zeros to minutes if necessary
    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    return `${hours}:${minutes} ${meridiem}`;
  }
});

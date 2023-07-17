document.addEventListener('DOMContentLoaded', () => {
    const locationElement = document.getElementById('location');
    const weatherIconElement = document.getElementById('weather-icon');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
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
        const response = await fetch(`/weather/${city}`);
        const data = await response.json();
  
        if (response.ok) {
          updateWeatherData(data);
          clearErrorMessage();
        } else {
          displayErrorMessage(data.error || 'Failed to retrieve weather data');
        }
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
        displayErrorMessage('Failed to retrieve weather data. Please try again.');
      }
    }
  
    function updateWeatherData(data) {
      locationElement.textContent = data.name;
      temperatureElement.textContent = `${data.main.temp}°C`;
      descriptionElement.textContent = data.weather[0].description;
  
      const iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      weatherIconElement.innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;
    }
  
    function displayErrorMessage(message) {
      errorMessageElement.textContent = message;
    }
  
    function clearErrorMessage() {
      errorMessageElement.textContent = '';
    }
  });
  
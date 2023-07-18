const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const apiKey = '2fc6024d7933a770bd4c1168978bdfbd';

app.use(express.static('public'));

// Endpoint to fetch weather data for a specific city
app.get('/weather/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    const weatherData = response.data;
    res.json(weatherData);
  } catch (error) {
    res.status(404).json({ message: 'Weather data not found.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

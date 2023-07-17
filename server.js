const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static('public'));

// Define the OpenWeather API URL and key
const apiKey = '2fc6024d7933a770bd4c1168978bdfbd';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Define a route to fetch weather data
app.get('/weather/:city', async (req, res) => {
  const { city } = req.params;

  try {
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    const data = response.data;

    res.json(data);
  } catch (error) {
    console.error('Failed to retrieve weather data:', error);
    res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

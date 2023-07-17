window.getweather = function () {
    const cityName = document.querySelector("#cityName").value;
    let API_KEY = '2fc6024d7933a770bd4c1168978bdfbd'

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
        .then(function (response) {
            // handle success
            console.log(response.data);



            document.querySelector("#result").innerHTML = `Current Temprature of ${response.data.name} is
            ${response.data.main.temp}<sup>°</sup>C`
            document.querySelector("#max_temp").innerHTML = `Maximum Temprature is ${response.data.main.temp_max}<sup>°</sup>C`
            document.querySelector("#min_temp").innerHTML = `Minimum Temprature is ${response.data.main.temp_min}<sup>°</sup>C`
            document.querySelector("#feels_like").innerHTML = `feels_like is ${response.data.main.feels_like}`
            document.querySelector("#humidity").innerHTML = `humidity is ${response.data.main.humidity}`
            document.querySelector("#pressure").innerHTML = `pressure is ${response.data.main.pressure}`
            document.querySelector("#description").innerHTML = `description ${response.data.weather.description}`
            document.querySelector("#main").innerHTML = `position is ${response.data.weather.main}`
            document.querySelector("#deg").innerHTML = `wind degree is ${response.data.wind.deg}`
            document.querySelector("#speed").innerHTML = `wind speed is ${response.data.wind.speed}`

        })
        .catch(function (error) {
            // handle error
            console.log(error.data);
            document.querySelector("#result").innerHTML = "error in getting weather data"
        })


}

                       
           
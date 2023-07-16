window.getweather = function () {
    const cityName = document.querySelector("#cityName").value;
    let API_KEY = '2fc6024d7933a770bd4c1168978bdfbd'

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
        .then(function (response) {
            // handle success
            console.log(response.data);
           

                   
            document.querySelector("#result").innerHTML = `Current Temprature of ${response.data.name} is
            ${response.data.main.temp}<sup>°</sup>C`
            document.querySelector("#max_temp").innerHTML = `Minimum Temprature is ${response.data.main.temp_max}<sup>°</sup>C`
           // const weathericon = document.getElementById("weathericon")
           // let dataIcon = data.weather[0].icon .src=\http://openweathermap.org/img/wn/${weatherIcon}.png``
        })
        .catch(function (error) {
            // handle error
            console.log(error.data);
            document.querySelector("#result").innerHTML = "error in getting weather data"
        })

}




import { useState, useEffect } from 'react'
import axios from 'axios'

/**
 * Display the weather report for a city.
 * @param {cityName, lon, lat} props 
 * @returns 
 */
 const WeatherReport = ({ cityName, lat, lon }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weatherData, setWeatherData] = useState(null)

    // get weather data from api
    useEffect(() => {
        console.log("loading weather data server...")
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
          .then(response => {
            setWeatherData(response.data)
          })
      }, [])

    if(weatherData) {
        return(
            <>
                <h3>Weather in {cityName}</h3>
                <p>temperature {weatherData.main.temp} Celcius</p>
                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}></img>
                <p>wind {weatherData.wind.speed} m/s</p>
            </>
        )
    }
}

export default WeatherReport
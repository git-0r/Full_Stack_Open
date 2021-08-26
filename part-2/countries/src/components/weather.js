import React, { useState, useEffect } from "react"
import axios from "axios"

const Weather = ({ capital }) => {

    const [weatherData, setWeatherData] = useState({
        temperature: "",
        icon: "",
        windSpeed: "",
        windDirection: ""
    })

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=YOUR_API_KEY&units=m&query=${capital}`)
            .then(response => {
                console.log(response.data)
                if (response.data.success === false) alert(response.data.error.info)
                else {
                    setWeatherData({
                        temperature: response.data.current.temperature,
                        icon: response.data.current.weather_icons[0],
                        windSpeed: response.data.current.wind_speed,
                        windDirection: response.data.current.wind_dir
                    })
                }
            })
    }, [capital])

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p>
                <b>temperature:</b> {weatherData.temperature}
            </p>
            <img src={weatherData.icon} alt=""></img>
            <p>
                <b>wind:</b> {weatherData.windSpeed} mph direction {weatherData.windDirection}
            </p>

        </div>
    )
}

export default Weather
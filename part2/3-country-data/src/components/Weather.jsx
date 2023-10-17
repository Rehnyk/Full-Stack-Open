import axios from 'axios'
import {useState, useEffect} from 'react';

const Weather = ( {city}) => {
    const api_key = import.meta.env.VITE_SOME_KEY;
    const [weatherData, setWeatherData] = useState(null);


    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
            .then(response => {
                console.log(response.data);
                setWeatherData(response.data);
            });
    }, [city, api_key]);

    return (
    <div>
        <h2>Weather in {city}</h2>

        {weatherData && (
            <div>
                <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2) } °C</p>
                <p>Wind: {weatherData.wind.speed} m/s</p>

            </div>
        )}
        <p></p>
    </div>
)

}

export default Weather;


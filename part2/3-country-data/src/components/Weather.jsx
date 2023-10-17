import axios from 'axios'
import {useState, useEffect} from 'react';

const Weather = ({city}) => {
    const api_key = import.meta.env.VITE_SOME_KEY;
    const [weatherData, setWeatherData] = useState(null);


    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
            .then(response => {
                setWeatherData(response.data);
            })
            .catch(error => {
            console.error("Error fetching weather data:", error);
        });
    }, [city, api_key]);

    if (!weatherData) {
        return <p className="no-data">Weather data not available for {city}</p>;
    }

        return (
            <div>
                <div>
                    <h2>Weather in {city}</h2>

                    {weatherData && (
                        <div>
                            <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)} °C</p>
                            <p>Wind: {weatherData.wind.speed} m/s</p>

                            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                 alt={weatherData.weather[0].description}/>
                        </div>
                    )}
                </div>
            </div>
        )

}

export default Weather;


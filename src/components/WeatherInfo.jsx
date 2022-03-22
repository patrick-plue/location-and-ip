import React from 'react';
import '../assets/weatherinfos.css';

function WeatherInfo({ weatherData }) {
  return (
    <div className="weatherContainer">
      {weatherData && (
        <ul>
          <li className="weatherItem">
            temperature {weatherData.main.temp} degrees Celsius
          </li>
          <li className="weatherItem">{weatherData.weather[0].description}</li>
          <li className="weatherItem">
            wind speed:{weatherData.wind.speed} km/h
          </li>
        </ul>
      )}
    </div>
  );
}

export default WeatherInfo;

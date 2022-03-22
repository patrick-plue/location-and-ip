import React from 'react';
import '../assets/weatherinfos.css';
import '../assets/mediaqu.css';

function WeatherInfo({ weatherData }) {
  return (
    <div className="weatherContainer">
      {weatherData && (
        <ul>
          <li className="weatherItem">
            temperature {weatherData.main.temp} Grad Celsius
          </li>
          <li className="weatherItem">
            overall:{weatherData.weather[0].description}
          </li>
          <li className="weatherItem">wind speed:{weatherData.wind.speed}</li>
        </ul>
      )}
    </div>
  );
}

export default WeatherInfo;

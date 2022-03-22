import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyMap from './components/MyMap';
import TouristInfos from './components/TouristInfos';
import WeatherInfo from './components/WeatherInfo';
import './assets/index.css';
import './assets/mediaqu.css';

function App() {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [places, setPlaces] = useState();
  const [weatherData, setWeatherData] = useState();
  const [latitudeForMarker, setLatitudeForMarker] = useState([]);
  const [longitudeForMarker, setLongitudeforMarker] = useState([]);
  const [clicked, SetClicked] = useState([]);

  // Geolocation of current Position
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;
    setLatitude(crd.latitude);
    setLongitude(crd.longitude);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  function changeClickedStatus(index) {
    const copyClicked = [...clicked];
    copyClicked[index] = !copyClicked[index];
    SetClicked(copyClicked);
  }

  // get weather data for current location

  useEffect(() => {
    if (latitude && longitude) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`
        )
        .then((response) => {
          console.log(response.data);
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [latitude, longitude]);

  const fsoptions = {
    method: 'GET',

    headers: {
      Accept: 'application/json',

      Authorization: process.env.REACT_APP_FOURSQUARE_KEY,
    },
  };

  // get information about user location

  useEffect(() => {
    if (longitude && latitude) {
      axios
        .get(
          `https://api.foursquare.com/v3/places/nearby?ll=${latitude}%2C${longitude}&limit=5&search=sights`,
          fsoptions
        )
        .then((response) => {
          setPlaces(response.data.results);
          setLatitudeForMarker(
            response.data.results.map((place) => place.geocodes.main.latitude)
          );
          setLongitudeforMarker(
            response.data.results.map((place) => place.geocodes.main.longitude)
          );
        })
        .catch((err) => console.error(err));
    }
  }, [longitude, latitude]);

  return (
    <>
      <div className="container">
        <div className="card">
          {weatherData && <h2>{weatherData.name}</h2>}
          <div className="top">
            <MyMap
              latitude={latitude}
              longitude={longitude}
              longitudeForMarker={longitudeForMarker}
              latitudeForMarker={latitudeForMarker}
              changeClickedStatus={changeClickedStatus}
              clicked={clicked}
              cityName={weatherData}
            />
            <WeatherInfo weatherData={weatherData} />
            <TouristInfos
              places={places}
              clicked={clicked}
              changeClickedStatus={changeClickedStatus}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

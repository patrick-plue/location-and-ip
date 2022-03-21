import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyMap from './components/MyMap';
import TouristInfos from './components/TouristInfos';
import WeatherInfo from './components/WeatherInfo';

function App() {
  const [ip, setIp] = useState('');
  const [location, setLocation] = useState('DE');
  const [timezone, setTimezone] = useState('+01:00');
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [historicPlaces, setHistoricPlaces] = useState();
  const [weatherData, setWeatherData] = useState();
  const [coordinates, setCoordinates] = useState([]);
  const [clicked, SetClicked] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

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

  //getInformation about location

  useEffect(() => {
    if (latitude && longitude) {
      axios
        .get(
          `https://api.opentripmap.com/0.1/en/places/radius?radius=20000&lon=${longitude}&lat=${latitude}&kinds=architecture&limit=7&rate=3h&apikey=${process.env.REACT_APP_OPENTRIPMAP_KEY}`
        )
        .then(function (response) {
          saveHistoricPlacesNames(response.data.features);
          saveCoordinatesHistoricPlaces(response.data.features);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [latitude, longitude]);

  // save locations of historic places for markers
  function saveCoordinatesHistoricPlaces(data) {
    setCoordinates(data.map((e) => e.geometry.coordinates));
  }

  function saveHistoricPlacesNames(data) {
    setHistoricPlaces(data.map((e) => e.properties.name));
  }

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

  return (
    <>
      <div className="container">
        <div className="card">
          <MyMap
            latitude={latitude}
            longitude={longitude}
            coordinates={coordinates}
            historicPlaces={historicPlaces}
            changeClickedStatus={changeClickedStatus}
            clicked={clicked}
          />
          <TouristInfos
            historicPlaces={historicPlaces}
            clicked={clicked}
            cityName={weatherData}
          />
          <WeatherInfo weatherData={weatherData} />
          {/* <Data ip={ip} location={location} timezone={timezone} /> */}
        </div>
      </div>
    </>
  );
}

export default App;

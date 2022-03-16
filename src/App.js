import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Data from './components/Data';
import MyMap from './components/MyMap';
import TouristInfos from './components/TouristInfos';

function App() {
  const [ip, setIp] = useState('');
  const [location, setLocation] = useState('DE');
  const [timezone, setTimezone] = useState('+01:00');
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [historicPlaces, setHistoricPlaces] = useState();
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

  // //   get ip-adresse-timezone and country
  // const url = `https://geo.ipify.org/api/v2/country?apiKey=${process.env.REACT_APP_IPIFY_KEY}`;

  // // max. 1000 Requests
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // function fetchData() {
  //   axios
  //     .get(url)
  //     .then(function (response) {
  //       console.log(response.data);
  //       console.log(response);
  //       setIp(response.data.ip);
  //       setLocation(response.data.location.country);
  //       setTimezone(response.data.location.timezone);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

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

  return (
    <>
      <div className="container">
        <div className="card">
          <Data ip={ip} location={location} timezone={timezone} />
          <MyMap
            latitude={latitude}
            longitude={longitude}
            coordinates={coordinates}
            historicPlaces={historicPlaces}
            changeClickedStatus={changeClickedStatus}
            clicked={clicked}
          />
          <TouristInfos historicPlaces={historicPlaces} clicked={clicked} />
        </div>
      </div>
    </>
  );
}

export default App;

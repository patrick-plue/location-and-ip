import React from 'react';
import { Map, Marker } from 'pigeon-maps';
import { stamenToner } from 'pigeon-maps/providers';

function MyMap({
  latitude,
  longitude,
  coordinates,
  historicPlaces,
  changeClickedStatus,
  clicked,
}) {
  return (
    <div className="mapFrame">
      {latitude && longitude && (
        <Map
          provider={stamenToner}
          height={500}
          width={500}
          defaultCenter={[latitude, longitude]}
          defaultZoom={13}
        >
          <Marker width={50} anchor={[latitude, longitude]} color="red" />
          {coordinates &&
            coordinates.map((e, i) => (
              <Marker
                key={i}
                width={40}
                anchor={[e[1], e[0]]}
                color={clicked[i] ? 'orange' : 'green'}
                onClick={() => changeClickedStatus(i)}
              />
            ))}
        </Map>
      )}
      {!latitude && !longitude && <p>Loading</p>}
    </div>
  );
}

export default MyMap;

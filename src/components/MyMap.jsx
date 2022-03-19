import React from 'react';
import { Map, Marker } from 'pigeon-maps';
import { v4 as uuidv4 } from 'uuid';

function MyMap({
  latitude,
  longitude,
  coordinates,
  historicPlaces,
  changeClickedStatus,
  clicked,
}) {
  return (
    <div>
      {latitude && longitude && (
        <Map
          height={400}
          width={500}
          defaultCenter={[latitude, longitude]}
          defaultZoom={13}
          className="mapFrame"
        >
          <Marker width={50} anchor={[latitude, longitude]} color="red" />
          {coordinates &&
            coordinates.map((e, i) => (
              <Marker
                key={uuidv4()}
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

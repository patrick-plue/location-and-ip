import React from 'react';
import { Map, Marker } from 'pigeon-maps';
import { v4 as uuidv4 } from 'uuid';

function MyMap({
  latitude,
  longitude,
  latitudeForMarker,
  longitudeForMarker,
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
          <Marker
            width={50}
            anchor={[latitudeForMarker[0], longitudeForMarker[0]]}
            color="red"
          />

          {latitudeForMarker &&
            longitudeForMarker &&
            latitudeForMarker.map((e, i) => (
              <Marker
                key={uuidv4()}
                width={40}
                anchor={[latitudeForMarker[i], longitudeForMarker[i]]}
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

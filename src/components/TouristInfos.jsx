import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function TouristInfos({ places, clicked, cityName }) {
  console.log(clicked);
  return (
    <div>
      <div className="listContainer">
        <ul className="list">
          {cityName && (
            <h3 className="listTitle">
              Interesting Locations nearby in {cityName.name}
            </h3>
          )}
          {places &&
            places.map((place) => (
              <div className={clicked ? 'active' : 'green'}>
                <p>{place.name}</p>
                <p>{place.distance}m away</p>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
}

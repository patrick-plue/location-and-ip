import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../assets/touristinfos.css';

export default function TouristInfos({ places, clicked, changeClickedStatus }) {
  return (
    <div>
      <div className="listContainer">
        <h3 className="listTitle">interesting locations nearby</h3>
        <ul className="list">
          {places &&
            places.map((place, i) => (
              <div
                className="listItem"
                key={uuidv4()}
                onClick={() => changeClickedStatus(i)}
              >
                <p className={clicked[i] ? 'active' : ''}>{place.name}</p>
                <p>{place.categories[0].name}</p>
                <p className={clicked[i] ? 'distance' : 'hide'}>
                  {place.distance}m away
                </p>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
}

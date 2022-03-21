import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function TouristInfos({ historicPlaces, clicked, cityName }) {
  return (
    <div>
      <div className="listContainer">
        <ul className="list">
          {cityName && (
            <h3 className="listTitle">
              Top Historic Places in {cityName.name}
            </h3>
          )}
          {historicPlaces &&
            historicPlaces.map((name, i) => (
              <a
                className={clicked[i] ? 'listItem active' : 'listItem'}
                key={uuidv4()}
                href={`https://en.wikipedia.org/wiki/${name}`}
                target="_blank"
                rel="noreferrer"
              >
                <li>{name}</li>
              </a>
            ))}
        </ul>
      </div>
    </div>
  );
}

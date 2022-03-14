import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function TouristInfos({ historicPlaces, clicked }) {
  return (
    <div>
      <h3 className="listTitle">Top Historic Places</h3>
      <div className="listContainer">
        <ul className="list">
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

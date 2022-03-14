import React from 'react';

export default function TouristInfos({ historicPlaces, clicked }) {
  return (
    <div>
      <h3>Top Historic Places</h3>
      <div className="listContainer">
        <ul className="list">
          {historicPlaces &&
            historicPlaces.map((name, i) => (
              <a
                className={clicked[i] ? 'listItem active' : 'listItem'}
                key={i}
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

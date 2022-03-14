import React from 'react';
import { DateTime } from 'luxon';

function Data({ ip, location, timezone }) {
  const date = DateTime.now().toLocaleString();

  return (
    <div>
      <p>Your IP-Adress: {ip}</p>
      <p>Your country : {location}</p>
      <p>Your timezone: {timezone}</p>
      <p>Today's date: {date}</p>
    </div>
  );
}

export default Data;

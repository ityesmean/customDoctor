/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable global-require */
import React from 'react';

function GeolocationTest() {
  const geolocation = require('geolocation');

  geolocation.getCurrentPosition(function (err, position) {
    if (err) throw err;
    console.log(position.coords);
  });
  return <div>GeolocationTest Page</div>;
}

export default GeolocationTest;

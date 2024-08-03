import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SunInfo() {
  const [sunInfo, setSunInfo] = useState({
    sunrise: '',
    sunset: '',
    dayLength: ''
  });

  useEffect(() => {
    const latitude = 0;
    const longitude =0;

    axios.get(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`)
      .then(response => {
        const data = response.data.results;
        const sunrise = new Date(data.sunrise).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sunset = new Date(data.sunset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dayLength = `${Math.floor(data.day_length / 3600)}h ${Math.floor((data.day_length % 3600) / 60)}m`;

        setSunInfo({
          sunrise,
          sunset,
          dayLength
        });
      })
      .catch(error => {
        console.error("There was an error fetching the sun data!", error);
      });
  }, []);

  return (
    <div className="text-center dark:text-white mt-6">
      <p className="text-lg">
        Sun: ↑ {sunInfo.sunrise} ↓ {sunInfo.sunset} ({sunInfo.dayLength}) - 
        {/* <a href="https://www.timeanddate.com/sun/nepal/kathmandu" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">More info</a> -  */}
        <a href="https://bibashjaprel.com.np/" target="_blank" className="text-blue-500 ">@bibash.japrel</a>
      </p>
    </div>
  );
}

export default SunInfo;

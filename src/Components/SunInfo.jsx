import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SunInfo() {
  const [sunInfo, setSunInfo] = useState({
    sunrise: '',
    sunset: '',
    dayLength: ''
  });
  const [locationName, setLocationName] = useState('');
  const [locationError, setLocationError] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

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

              axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`)
                .then(locationResponse => {
                  const locationData = locationResponse.data;
                  const locationName = locationData.address.city || locationData.address.town || locationData.address.village || locationData.address.state || locationData.address.country;
                  setLocationName(locationName);
                })
                .catch(error => {
                  console.error("There was an error fetching the location name!", error);
                });

            })
            .catch(error => {
              console.error("There was an error fetching the sun data!", error);
            });
        },
        error => {
          setLocationError('Unable to retrieve location.');
          console.error("Geolocation error:", error);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div className="text-center dark:text-white p-4">
      {locationError ? (
        <p className="text-red-500">{locationError}</p>
      ) : (
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
          Sun: ↑ {sunInfo.sunrise} ↓ {sunInfo.sunset} ({sunInfo.dayLength}) <br />
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl">{locationName}</span> <br />
          <a href="https://bibashjaprel.com.np/" target="_blank" className="text-blue-500 text-sm sm:text-base md:text-lg lg:text-xl"> @bibash.japrel</a>
        </p>
      )}
    </div>
  );
}

export default SunInfo;

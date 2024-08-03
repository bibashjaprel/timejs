import React, { useState, useEffect } from 'react';

function TimeDisplay() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = time.toLocaleDateString('en-US', options);

  return (
    <div className="text-center dark:text-white">
      <h1 className="text-9xl font-bold">
        {time.toLocaleTimeString()}
      </h1>
      <p className="text-2xl mt-4">
        {formattedDate}
      </p>
    </div>
  );
}

export default TimeDisplay;


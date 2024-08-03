import React, { useState } from 'react';
import './App.css';
import TimeDisplay from './Components/TimeDisplay';
import SunInfo from './Components/SunInfo';
import Switch from 'react-switch';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <div className={`h-screen flex flex-col items-center justify-center font-mono ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="absolute top-4 right-4 flex items-center">
        <span className="mr-2 text-gray-800 dark:text-gray-200">Dark Mode</span>
        <Switch
          onChange={handleToggle}
          checked={darkMode}
          offColor="#888"
          onColor="#000"
          uncheckedIcon={false}
          checkedIcon={false}
        />
      </div>
      <TimeDisplay />
      <SunInfo />
    </div>
  );
}

export default App;

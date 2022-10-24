import React, { useEffect, useState } from "react";
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const App = () => {
  const [darkMode, setDarkMode] = useState(localStorage.theme);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  useEffect(() => {
    const root = window.document.documentElement;

    if (darkMode) {
      root.classList.add("dark")
      root.classList.remove("light")
      localStorage.setItem("theme", "dark")
    } else {
      root.classList.add("light")
      root.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  return (
    <div className={`w-full min-h-screen py-14 px-16 dark:bg-my-black bg-my-white ${darkMode && 'dark'}`}>
      <div div className="w-full h- flex justify-between items-center border-b-2 dark:border-white border-black px-8" >
        <h1 className="text-9xl font-title dark:text-white">News Feed!</h1>
        <DarkModeSwitch
          style={{ marginBottom: '2rem' }}
          checked={darkMode}
          onChange={toggleDarkMode}
          size={80}
        />
      </div >
    </div >
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { Switch } from './components/toggleSwitch.js';
import { Listbox } from '@headlessui/react'

import { AiFillCaretDown as DownIcon } from "react-icons/ai"

// todo: make bg color animate smooth

const countries = [
  "ae", "ar", "at", "au", "be", "bg",
  "br", "ca", "ch", "cn", "co", "cu",
  "cz", "de", "eg", "fr", "gb", "gr",
  "hk", "hu", "id", "ie", "il", "in",
  "it", "jp", "kr", "lt", "lv", "ma",
  "mx", "my", "ng", "nl", "no", "nz",
  "ph", "pl", "pt", "ro", "rs", "ru",
  "sa", "se", "sg", "si", "sk", "th",
  "tr", "tw", "ua", "us", "ve", "za",
]

const getSrc = (country) => `https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/${country.toUpperCase()}.png`
const Country = ({ country }) => <><img src={getSrc(country)} alt={country} /> {country.toUpperCase()}</>

const App = () => {
  const [darkMode, setDarkMode] = useState(localStorage.theme);
  const [selectedCountry, setSelectedCountry] = useState(countries[0])

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
      {/* title */}
      <div className="w-full flex justify-between items-center border-b-2 dark:border-white border-black px-8" >
        <h1 className="text-6xl sm:text-7xl xl:text-8xl font-title dark:text-white">News Feed!</h1>
        <Switch
          classes="mb-8"
          checked={darkMode}
          onChange={toggleDarkMode}
          size={80}
        />
      </div >

      {/* options */}
      <div className="w-full flex justify-between items-center px-8 my-5" >
        <div className="w-fit h-fit relative">
          <Listbox value={selectedCountry} onChange={setSelectedCountry}>
            <Listbox.Button className="p-2 w-24 rounded-md dark:bg-component-dark-bg bg-component-light-bg border-2 flex justify-between items-center font-body dark:border-white border-black dark:text-white text-black"><DownIcon /><Country country={selectedCountry} /></Listbox.Button>
            <Listbox.Options className="p-2 w-60 h-48 scrollbar scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-700 scrollbar-rounded-md flex flex-wrap relative dark:text-white text-black overflow-y-scroll rounded-md mt-2">
              <div className="absolute w-full h-[210%] top-0 opacity-20 left-0 dark:bg-white bg-black" />
              {countries.map((country) => (
                <Listbox.Option
                  key={country}
                  value={country}
                  disabled={selectedCountry === country}
                  className="p-1 font-thin text-sm z-10 dark:border-gray-600 border-gray-300"
                >
                  <img src={getSrc(country)} className="w-fit mr-2" alt={country} />
                  {country.toUpperCase()}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
      </div >

      {/* the cards */}
    </div >
  );
}

export default App;

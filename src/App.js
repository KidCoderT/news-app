import React, { useEffect, useState } from "react";

import Switch from './components/Switch.js';
import { Listbox } from '@headlessui/react';

import { AiFillCaretDown as DownIcon } from "react-icons/ai";
import { GrRefresh as RefreshIcon } from "react-icons/gr";

import NewsArticle from "./components/NewsArticle.js";

// todo: make bg color animate smooth
// todo: make buttons animate
// todo: make options animate

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
const options = ["general", "entertainment", "business", "health", "science", "sports", "technology"];

const getSrc = (country) => `https://raw.githubusercontent.com/madebybowtie/FlagKit/master/Assets/PNG/${country.toUpperCase()}.png`
const Country = ({ country }) => <><img src={getSrc(country)} alt={country} /> {country.toUpperCase()}</>

const App = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === "dark");
  const [selectedCountry, setSelectedCountry] = useState(localStorage.getItem('country') !== null ? localStorage.getItem('country') : countries[0])
  const [selectedOption, setSelectedOption] = useState(localStorage.getItem('option') !== null ? localStorage.getItem('option') : options[0])

  const [feed, setFeed] = useState([])

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  useEffect(() => {
    const root = window.document.documentElement;

    if (darkMode || darkMode === "dark") {
      root.classList.add("dark")
      root.classList.remove("light")
      localStorage.setItem("theme", "dark")
    } else {
      root.classList.add("light")
      root.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  let refreshFeed = async () => {
    setFeed([])

    await fetch(
      `https://newsapi.org/v2/top-headlines?country=${selectedCountry}&category=${selectedOption}&apiKey=d65aae3dcaa740fd81f972849d16cd04&pageSize=81`,
      { method: 'GET' }
    )
      .then((data) => {
        data.json().then(result => setFeed(result.articles))
      })
    console.log("fetched more data")
  }

  useEffect(() => {
    localStorage.setItem("country", selectedCountry)
    localStorage.setItem("option", selectedOption)
    refreshFeed()
  }, [selectedCountry, selectedOption])

  return (
    <div className={`w-full min-h-screen py-10 px-12 sm:py-14 sm:px-16 dark:bg-my-black bg-my-white`}>
      {/* title */}
      <div className="w-full flex justify-around sm:justify-between items-center border-b-2 dark:border-white border-black px-8" >
        <h1 className="text-6xl sm:text-7xl xl:text-8xl font-title dark:text-white">News Feed!</h1>
        <Switch
          classes="mb-8"
          checked={darkMode}
          onChange={toggleDarkMode}
          size={80}
        />
      </div >

      {/* options */}
      <div className="w-full flex-wrap flex justify-start items-center px-8 my-3 sm:my-5" >
        <button onClick={() => { refreshFeed() }} className="mr-3 p-1 rounded-md dark:bg-component-dark-bg mt-2 sm:mt-0  bg-component-light-bg border-2 flex justify-between items-center font-body dark:border-white border-black dark:text-white text-black h-full w-10 flex items-center justify-center">
          <RefreshIcon size="2em" />
        </button>

        <Listbox as={"Div"} value={selectedCountry} onChange={setSelectedCountry} className="w-fit h-full relative mr-3">
          <Listbox.Button className="p-2 w-24 rounded-md dark:bg-component-dark-bg mt-2 sm:mt-0  bg-component-light-bg border-2 flex justify-between items-center font-body dark:border-white border-black dark:text-white text-black"><DownIcon /><Country country={selectedCountry} /></Listbox.Button>
          <Listbox.Options className="p-1 z-50 absolute w-[14rem] h-48 scrollbar-thin scrollbar-track-transparent  scrollbar-thumb-gray-700 scrollbar-rounded-md flex flex-wrap border-2 border-black dark:border-white bg-component-light-bg bg-opacity-40 dark:bg-component-dark-bg dark:text-white text-black overflow-y-scroll rounded-md mt-2">
            <div className="absolute w-full h-[210%] top-0 opacity-20 left-0" />
            {countries.map((country) => (
              <Listbox.Option
                key={country}
                value={country}
                disabled={selectedCountry === country}
                className="cursor-pointer rounded-sm flex p-1 items-center justify-center m-1 font-thin text-sm z-10 "
              >
                <img src={getSrc(country)} className="w-fit mr-2" alt={country} />
                {country.toUpperCase()}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>

        <Listbox as={"Div"} value={selectedOption} onChange={setSelectedOption} className="w-fit h-full relative">
          <Listbox.Button className="p-2 w-fit rounded-md dark:bg-component-dark-bg mt-2 sm:mt-0 bg-component-light-bg border-2 flex items-center font-body dark:border-white border-black dark:text-white text-black"><DownIcon /> <span className="ml-2">{selectedOption.toLocaleUpperCase()}</span></Listbox.Button>
          <Listbox.Options className="p-1 z-50 w-52 h-fit absolute border-2 border-black dark:border-white bg-component-light-bg bg-opacity-40 dark:bg-component-dark-bg dark:text-white text-black rounded-md mt-1">
            {/* <div className="absolute w-full h-[210%] top-0 opacity-20 left-0" /> */}
            {options.map((option) => (
              <Listbox.Option
                key={option}
                value={option}
                disabled={selectedOption === option}
                className="border-b-2 last:border-b-0 cursor-pointer p-1 font-thin text-sm z-10 border-component-border"
              >
                {option.toLocaleUpperCase()}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div >

      {/* the cards */}
      <div className="w-full flex-wrap flex justify-center px-1 my-3 sm:my-5 pt-2" >
        {feed.map((article, index) => (
          <NewsArticle
            author={article.author}
            title={article.title}
            date={article.publishedAt}
            image={article.urlToImage}
            url={article.url}
            key={index}
          />
        ))}
      </div>
    </div >
  );
}

export default App;

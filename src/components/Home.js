import React, { useState } from "react";
import ReactAnimatedWeather from "react-animated-weather";
import "./styles/Home.css";
import { cityList } from "../data/city";
import { Link } from "react-router-dom";

export default function Home() {
  const [id, setID] = useState(1729564);
  const iconsArray = [
    "CLEAR_DAY",
    "CLEAR_NIGHT",
    "PARTLY_CLOUDY_DAY",
    "PARTLY_CLOUDY_NIGHT",
    "CLOUDY",
    "RAIN",
    "SLEET",
    "SNOW",
    "WIND",
    "FOG",
  ];
  const iconRandom = iconsArray[Math.floor(Math.random() * iconsArray.length)];

  const cityOptions = cityList.map((city) => {
    return (
      <option key={city.id} value={city.id}>
        {city.name}
      </option>
    );
  });

  const handleChange = (event) => {
    setID(event.target.value);
  };

  return (
    <>
      <div className="home-container">
        <div className="home-logo">
          <ReactAnimatedWeather
            icon={iconRandom}
            color="black"
            size={250}
            animate={true}
          />
        </div>

        <div className="home-title">Weather Today!</div>
        <form>
          <label htmlFor="home-city" className="home-label">
            Where are you going?
          </label>
          <select id="home-city" className="home-city" onChange={handleChange}>
            {cityOptions}
          </select>
          <br></br>
          <Link to={`/results/${id}`}>
            <button type="button" className="home-button">
              See the weather{" "}
            </button>
          </Link>
        </form>
      </div>
    </>
  );
}

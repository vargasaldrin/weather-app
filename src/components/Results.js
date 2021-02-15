import React, { useEffect, useState } from "react";
import ReactAnimatedWeather from "react-animated-weather";
import { Link, useParams } from "react-router-dom";
import { cityList } from "../data/city";
import WeatherCard from "./WeatherCard";
import "./styles/Results.css";

export default function Results(props) {
  const apiKey = "e5b1f15dbd3d04b5a938670ec7093ba5";
  const [dataToday, setDataToday] = useState();
  const [dataWeek, setDataWeek] = useState();
  const { cityID } = useParams();

  const city = cityList.find((item) => item.id === parseInt(cityID));

  useEffect(() => {
    const getData = async () => {
      const latitude = city.coord.lat;
      const longitude = city.coord.lon;
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=currently,minutely,hourly,alerts&appid=${apiKey}&units=metric`,
      ).then((res) => res.json());

      setDataToday(data.daily[0]);
      setDataWeek(data.daily);
    };

    getData();
  }, []);

  const getDay = (utc) => {
    const converted = new Date(utc * 1000);
    let day = converted.getDay();

    switch (day) {
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
        break;
      case 0:
        day = "Sunday";
        break;
      default:
        break;
    }
    return day;
  };

  const getIcon = (value) => {
    let icon;
    switch (value) {
      case "Rain":
        icon = "RAIN";
        break;
      case "Clear":
        icon = "CLEAR_DAY";
        break;
      case "Clouds":
        icon = "CLOUDY";
        break;
      default:
        break;
    }

    return icon;
  };

  if (dataToday && dataWeek) {
    const weather = dataToday.weather[0].main;
    const weatherDate = getDay(dataToday.dt);
    const tempMax = dataToday.temp.max;
    const tempMin = dataToday.temp.min;
    const humidity = dataToday.humidity;
    const icon = getIcon(weather);

    const weatherFuture = dataWeek.map((data) => {
      if (dataWeek.indexOf(data) === 0 || dataWeek.indexOf(data) === 7) {
        return null;
      } else {
        return <WeatherCard weatherData={data} key={data.dt} getDay={getDay} />;
      }
    });

    return (
      <div className="results-container">
        <div className="results-today">
          <ReactAnimatedWeather
            icon={icon}
            color="black"
            size={100}
            animate={true}
          />
          <div className="results-day">{weatherDate}</div>
          <div className="results-weather">Weather: {weather}</div>
          <div className="results-temp">Max Temperature: {tempMax} &deg;C</div>
          <div className="results-temp">Min Temperature: {tempMin} &deg;C</div>
          <div className="results-humidity">Humidity: {humidity}%</div>
        </div>
        <div className="results-week">{weatherFuture}</div>
        <Link to={`/`}>
          <button type="button" className="home-button">
            Back to Home
          </button>
        </Link>
      </div>
    );
  } else {
    return null;
  }
}

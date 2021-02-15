import React from "react";
import "./styles/WeatherCard.css";

export default function WeatherCard({ weatherData, getDay }) {
  const { weather, dt } = weatherData;
  const day = getDay(dt);

  return (
    <div className="card-container">
      <img
        src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
        alt="weather"
      />
      <div className="card-day">{day}</div>
      <div className="card-weather">Weather: {weather[0].main}</div>
    </div>
  );
}

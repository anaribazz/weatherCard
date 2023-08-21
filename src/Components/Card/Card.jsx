import "./Card.scss";
import React, { useState, useEffect } from "react";
import search from "../../Assets/images/search.png";
import rain from "../../Assets/images/rain.png";
import humidity from "../../Assets/images/humidity.png";
import wind from "../../Assets/images/wind.png";
import axios from "axios";

export default function Card() {
  const apiKey = "6bbc347f2928f5f4926b9468ce42e143";
  const apiURL =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=vancouver";
  const [weatherData, setWeatherData] = useState(null);

  async function checkWeather() {
    try {
      const response = await axios.get(`${apiURL}&appid=${apiKey}`
        // (apiURL, {
        // params: {
        //   appid: apiKey,
        // },})
        );
      console.log(response);
    
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }
  useEffect(() => {
        checkWeather();
  }, []);

  const temp = Math.round(`${weatherData.main.temp}`) + '°C';

  return (
    <div className="Card-main">
      <div className="Card-search">
        <input
          className="Card-input"
          type="text"
          placeholder="City name"
          spellCheck="false"
        />
        <button className="Card-btn">
          <img className="Card-icon" src={search} alt="search icon" />
        </button>
      </div>

      {weatherData ? (
        <div className="Card-weather">
          <img className="Card-weather-icon" src={rain} alt="rain" />
          <h1 className="Card-temp"> {temp}</h1>
          <h2 className="Card-city">{weatherData.name}</h2>
        </div>
      ) : (
        <p>loading</p>
      )}
      <div className="Card-details">
        {weatherData ? (
          <div className="Card-col">
            <img className="Card-col-icon" src={humidity} alt="humidity icon" />
            <div>
              <p className="Card-humidity">{weatherData.main.humidity}</p>
              <p>Humidity</p>
            </div>
          </div>
        ) : (
          <p>loading</p>
        )}
        {weatherData ? (
          <div className="Card-col">
            <img className="Card-col-icon" src={wind} alt="wind icon" />
            <div>
              <p className="Card-wind">{weatherData.wind.speed}</p>
              <p>Wind Speed</p>
            </div>
          </div>
        ) : (
          <p>loading</p>
        )}
      </div>
    </div>
  );
}

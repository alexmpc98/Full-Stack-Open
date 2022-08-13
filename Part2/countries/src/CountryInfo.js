import axios from "axios";
import { useState, useEffect } from "react";
const CountryInfo = ({ name, area, capital, languages, image, latlng }) => {
  const [weatherData, setWeatherData] = useState([]);
  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    const dataHook = () => {
      axios
        .get(
          "https://api.openweathermap.org/data/2.5/forecast?lat=" +
            latlng[0] +
            "&lon=" +
            latlng[1] +
            "&units=metric&appid=" +
            api_key
        )
        .then((response) => {
          setWeatherData(response.data.list[0]);
        });
    };

    dataHook();
  }, [latlng]);

  const Languages = ({ name }) => {
    return (
      <ul>
        <li key={name}>{name}</li>
      </ul>
    );
  };
  if (weatherData.length !== 0) {
    return (
      <div>
        <h1>{name}</h1>
        <h3>capital {capital}</h3>
        <h3>area {area}</h3>
        {Object.keys(languages).map((languageKey) => (
          <Languages name={languages[languageKey]} />
        ))}
        <img src={image} alt="Flag" />
        <h1>Weather in {capital}</h1>
        <h3>temperature {weatherData.main.temp} Celcius</h3>
        <img alt={weatherData.weather[0].description} src={"http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"}></img>
        <h3>wind {weatherData.wind.speed} </h3>
      </div>
    );
  } else {
    return (
      <div>
        <h1>{name}</h1>
        <h3>capital {capital}</h3>
        <h3>area {area}</h3>
        {Object.keys(languages).map((languageKey) => (
          <Languages name={languages[languageKey]} />
        ))}
        <img src={image} alt="Flag" />
      </div>
    );
  }
};

export default CountryInfo;

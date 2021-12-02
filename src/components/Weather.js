import { useContext, useEffect, useState } from "react";
import LocationContext from "./location-context";
import styles from "./Weather.module.css";

const Weather = (props) => {
  const locationCtx = useContext(LocationContext);

  const [weatherData, setWeatherData] = useState({
    current: {
      dt: "",
      temp: "",
      icon: "",
    },
    nextThreeDaysForecast: [],
    showForecast: false,
  });

  const getCountry = (addrComponents) => {
    for (var i = 0; i < addrComponents.length; i++) {
      if (addrComponents[i].types[0] === "country") {
        return addrComponents[i].short_name;
      }
    }
    return false;
  };

  const getCity = (addrComponents) => {
    for (var i = 0; i < addrComponents.length; i++) {
      if (addrComponents[i].types[0] === "locality") {
        return addrComponents[i].long_name;
      }
    }
    return false;
  };

  const [locationName, setLocationName] = useState({
    city: "",
    country: "",
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (locationCtx.loaded) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${locationCtx.coordinates.lat}&lon=${locationCtx.coordinates.lng}&exclude=minutely,hourly,alerts&units=metric&appid=e25b1ae90ab2cc27ec77818bf149bcff`
        );

        const responseData = await response.json();
        const nextThreeDaysForecast = [];
        const currentWeather = {
          dt: responseData.current.dt,
          temp: responseData.current.temp,
          icon: responseData.current.weather[0].icon,
        };
        for (let i = 1; i < 4; i++) {
          nextThreeDaysForecast.push(responseData.daily[i]);
        }
        setWeatherData({
          current: currentWeather,
          nextThreeDaysForecast,
          showForecast: false,
        });

        const cityResponse = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationCtx.coordinates.lat},${locationCtx.coordinates.lng}&sensor=true&key=AIzaSyAuiJzFETNIsw2V6l_iZygmTXphE8cH9Iw`
        );

        const cityResponseData = await cityResponse.json();
        const country = getCountry(
          cityResponseData.results[0].address_components
        );
        const city = getCity(cityResponseData.results[0].address_components);

        setLocationName({
          city: city,
          country: country,
        });

        props.getCountryCode(locationName.country);
      }
    };

    fetchWeatherData();
  }, [locationCtx, locationName, props]);

  const timeStampToDateAndTime = (timestamp) => {
    let timestamp_ms = timestamp * 1000;
    let date_obj = new Date(timestamp_ms);

    let month = date_obj.toLocaleString("default", { month: "short" });
    let date = ("0" + date_obj.getDate()).slice(-2);
    let hours = ("0" + date_obj.getHours()).slice(-2);
    let minutes = ("0" + date_obj.getMinutes()).slice(-2);

    let dateString = hours + ":" + minutes + ", " + month + " " + date;

    return dateString;
  };

  const timeStampToDate = (timestamp) => {
    let timestamp_ms = timestamp * 1000;
    let date_obj = new Date(timestamp_ms);

    let month = date_obj.toLocaleString("default", { month: "short" });
    let date = ("0" + date_obj.getDate()).slice(-2);
    let day = date_obj.toLocaleString("default", { weekday: "short" });

    let dateString = day + ", " + month + " " + date;

    return dateString;
  };

  const toggleForecastHandler = () => {
    setWeatherData((prevState) => ({
      ...prevState,
      showForecast: !prevState.showForecast,
    }));
  };

  const forecast = weatherData.nextThreeDaysForecast.map((oneDayData) => (
    <div key={oneDayData.dt}>
      <ul className={styles.forecast}>
        <li>{timeStampToDate(oneDayData.dt)}</li>
        <li>
          <img
            src={
              `https://openweathermap.org/img/wn/` +
              oneDayData.weather[0].icon +
              `.png`
            }
            alt={oneDayData.weather[0].icon}
          />
          <div>
            {Math.round(oneDayData.temp.max)}/{Math.round(oneDayData.temp.min)}
            °C
          </div>
        </li>
        <li>{oneDayData.weather[0].description}</li>
      </ul>
    </div>
  ));

  return (
    <div>
      <div className={styles.dateTime}>
        {timeStampToDateAndTime(weatherData.current.dt)}
      </div>
      <div className={styles.city}>
        {locationName.city + ", " + locationName.country}
      </div>
      <div className={styles.current}>
        <img
          src={
            `https://openweathermap.org/img/wn/` +
            weatherData.current.icon +
            `.png`
          }
          alt={weatherData.current.icon}
        />
        <p className={styles.temp}>{Math.round(weatherData.current.temp)}°C</p>
      </div>
      <button onClick={toggleForecastHandler}>Next 3 Days Forecast</button>
      <div className={styles.container}>
        {weatherData.showForecast && forecast}
      </div>
    </div>
  );
};

export default Weather;

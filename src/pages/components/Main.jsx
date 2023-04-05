import { weatherService } from "../../services/WeatherService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const [currentLocation, setCurrentLocation] = useState({});
  const [savedCities, setSavedCities] = useState();
  const [time, setTime] = useState(0);
  const [weatherTime, setWeatherTime] = useState({});
  const [weatherIcon, setWeatherIcon] = useState({});
  const [isCelsius, setIsCelsius] = useState(true);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);
  const [location, setLocation] = useState({});
  const options = { weekday: "short", day: "numeric", month: "short" };
  const navigate = useNavigate();

  useEffect(() => {
    getTimeAndZone();
  }, []);

  const epochConverter = (epoch) => {
    const date = new Date(epoch).toLocaleDateString("en-US", options);
    return date;
  };

  const getTimeAndZone = async () => {
    const position = weatherService.getCoords();
    setCurrentLocation(position);
    console.log(position);
    setSavedCities(JSON.parse(window.localStorage.getItem("city")));
    getWeather(position);
  };

  const getWeather = async (position) => {
    console.log(savedCities);
    const { data } = await weatherService.getTime(position);
    setTime(data.location.localtime);
    setLocation(data.location);
    console.log(data);
    setWeatherTime({
      c_temp: data.current.temp_c,
      f_temp: data.current.temp_f,
    });
    setWeatherIcon({
      img: data.current.condition.icon,
      alt: data.current.condition.text,
    });
    setFiveDayForecast(data.forecast.forecastday);
  };

  const currentDayForecast = (forecast) => {
    return (
      <div width="300px">
        <div className="center-col" height="100px">
          <table>
            <tbody>
              <tr>
                {forecast.hour.map((hour, key) => (
                  <td key={key}>
                    <table>
                      <tbody>
                        <tr>
                          <td align="center">
                            {key < 10 ? "0" + key : key}:00
                          </td>
                        </tr>
                        <tr>
                          <td align="center">
                            <img
                              src={hour.condition.icon}
                              alt={hour.condition.text}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td align="center">
                            {isCelsius
                              ? Math.round(hour.temp_c)
                              : Math.round(hour.temp_f)}
                            °
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const otherDaysForecast = (forecast) => {
    return (
      <div>
        <table width="100%">
          <tbody>
            <tr
              onClick={() => {
                navigate("/dailyForecast/" + forecast.date);
              }}
            >
              <td align="left" width="33%">
                {epochConverter(forecast.date)}
              </td>
              <td align="center" width="33%">
                <img
                  src={forecast.day.condition.icon}
                  alt={forecast.day.condition.text}
                />
              </td>
              <td align="right" width="33%">
                {isCelsius
                  ? Math.round(forecast.day.maxtemp_c) +
                    "°/" +
                    Math.round(forecast.day.mintemp_c) +
                    "°"
                  : Math.round(forecast.day.maxtemp_f) +
                    "°/" +
                    Math.round(forecast.day.mintemp_f) +
                    "°"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const isCurrent = (lat, lon) => {
    if (
      Math.round(currentLocation.latitude * 100).toFixed(2) / 100 === lat &&
      Math.round(currentLocation.longitude * 100).toFixed(2) / 100 === lon
    ) {
      return false;
    }
    return true;
  };

  const isLast = (lat, lon) => {
    if(!isCurrent(lat,lon) && savedCities ){
      return true
    }
  };

  return (
    <div>
      {savedCities && isLast(location.lat, location.lon) && (
        <button className="button-right fixed-right" onClick={() => {}}>
          <span className="arrow-black"> &#8594; </span>
        </button>
      )}
      {currentLocation && isCurrent(location.lat, location.lon) && (
        <button className="button-left fixed-left" onClick={() => {}}>
          <span className="arrow-black"> &#8592; </span>
        </button>
      )}
      {weatherTime && (
        <div>
          <button
            className={isCelsius ? "converter-button-f" : "converter-button-c"}
            onClick={() => setIsCelsius(!isCelsius)}
          >
            °{isCelsius ? "C" : "F"}
          </button>
          <p className="central-name">
            {location.name} {", "} {location.region}
            {", "}
            {location.country}
          </p>
          <div className="central-temp">
            {isCelsius
              ? Math.round(weatherTime.c_temp)
              : Math.round(weatherTime.f_temp)}
            °
          </div>

          <br />
          <div align="center">
            <img src={weatherIcon.img} alt={weatherIcon.alt} align="center" />
          </div>
          <br />
          <div className="last-updated">Last updated at : {time}</div>
          <br />
          {fiveDayForecast.map((forecast, key) => (
            <div key={key}>
              {forecast.date === new Date().toLocaleDateString("en-CA")
                ? currentDayForecast(forecast)
                : otherDaysForecast(forecast)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

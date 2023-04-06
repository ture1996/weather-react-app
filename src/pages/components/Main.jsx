import { weatherService } from "../../services/WeatherService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { render } from "@testing-library/react";

export const Main = () => {
  const [currentLocation, setCurrentLocation] = useState({});
  const [savedCities, setSavedCities] = useState();
  const [time, setTime] = useState(0);
  const [weatherTime, setWeatherTime] = useState({});
  const [weatherIcon, setWeatherIcon] = useState({});
  const [isCelsius, setIsCelsius] = useState(true);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);
  const [location, setLocation] = useState({});
  const [windowLocation, setWindowLocation] = useState();
  const [currentCity, setCurrentCity] = useState();
  const [isLoading, setLoading] = useState(false);

  const options = { weekday: "short", day: "numeric", month: "short" };
  const navigate = useNavigate();

  useEffect(() => {
    getTimeAndZone();
  }, []);

  const epochConverter = (epoch) => {
    const date = new Date(epoch).toLocaleDateString("en-US", options);
    return date;
  };

  const getTimeAndZone = () => {
    const position = weatherService.getCoords();
    setCurrentLocation(position);
    setSavedCities(JSON.parse(window.localStorage.getItem("city")));
    getWeather(position);
  };

  const getWeather = async (position) => {
    setLoading(true);
    const { data } = await weatherService.getTime(position);
    setTime(data.location.localtime);
    setLocation(data.location);
    if (!currentCity) {
      setCurrentCity(data.location);
    }
    setWeatherTime({
      c_temp: data.current.temp_c,
      f_temp: data.current.temp_f,
    });
    setWeatherIcon({
      img: data.current.condition.icon,
      alt: data.current.condition.text,
    });
    setFiveDayForecast(data.forecast.forecastday);
    setTimeout(() => {
      setLoading(false);
    }, 500);
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
                navigate(
                  "/" + location.lat + "," + location.lon + "/" + forecast.date
                );
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

  const nextCity = () => {
    if (windowLocation) {
      getWeather(savedCities[savedCities.indexOf(windowLocation) + 1]);
      setWindowLocation(savedCities[savedCities.indexOf(windowLocation) + 1]);
      return;
    }
    setWindowLocation(savedCities[0]);
    getWeather(savedCities[0]);
    return;
  };

  const previousCity = () => {
    if (windowLocation === savedCities[0]) {
      getWeather(currentLocation);
      setWindowLocation();
      return;
    }
    getWeather(savedCities[savedCities.indexOf(windowLocation) - 1]);
    setWindowLocation(savedCities[savedCities.indexOf(windowLocation) - 1]);
  };

  const isCurrent = () => {
    return !(
      currentCity?.name === location?.name &&
      currentCity?.region === location?.region &&
      currentCity?.country === location?.country &&
      !windowLocation
    );
  };

  const isLast = () => {
    if (!isCurrent() && savedCities && !savedCities === []) {
      return true;
    }
    return savedCities.indexOf(windowLocation) + 1 !== savedCities.length;
  };

  const deleteLocation = (location) => {
    if (window.confirm("You sure want to delete this city?") === true) {
      const index = savedCities.indexOf(location);
      savedCities.splice(index, 1);
      window.localStorage.setItem("city", JSON.stringify(savedCities));
      getWeather(currentLocation);
      setWindowLocation();
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="vertical-center">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div>
          {savedCities && isLast() && (
            <button
              className="button-right fixed-right"
              onClick={() => {
                nextCity();
              }}
            >
              <span className="arrow-black"> &#8594; </span>
            </button>
          )}
          {currentLocation && isCurrent() && (
            <button
              className="button-left fixed-left"
              onClick={() => {
                previousCity();
              }}
            >
              <span className="arrow-black"> &#8592; </span>
            </button>
          )}
          {weatherTime && (
            <div>
              <button
                className={
                  isCelsius ? "converter-button-f" : "converter-button-c"
                }
                onClick={() => setIsCelsius(!isCelsius)}
              >
                °{isCelsius ? "C" : "F"}
              </button>
              {windowLocation && (
                <button
                  className="delete"
                  onClick={() => deleteLocation(windowLocation)}
                >
                  Delete
                </button>
              )}
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
                <img
                  src={weatherIcon.img}
                  alt={weatherIcon.alt}
                  align="center"
                />
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
          )
        </div>
      )}
    </div>
  );
};

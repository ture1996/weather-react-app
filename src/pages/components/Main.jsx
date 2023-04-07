import { weatherService } from "../../services/WeatherService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { MainWeatherForecast } from "../details/MainWeatherForecast";

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
          <MainWeatherForecast
            savedCities={savedCities}
            isLast={isLast}
            nextCity={nextCity}
            currentLocation={currentLocation}
            isCurrent={isCurrent}
            isCelsius={isCelsius}
            setIsCelsius={setIsCelsius}
            weatherTime={weatherTime}
            previousCity={previousCity}
            windowLocation={windowLocation}
            location={location}
            deleteLocation={deleteLocation}
            weatherIcon={weatherIcon}
            fiveDayForecast={fiveDayForecast}
            navigate={navigate}
            time={time}
            epochConverter={epochConverter}
          />
        </div>
      )}
    </div>
  );
};

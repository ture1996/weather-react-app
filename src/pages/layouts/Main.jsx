import { weatherService } from "../../services/WeatherService";
import { useEffect, useState } from "react";

export const Main = () => {
  const [time, setTime] = useState(0);
  const [weatherTime, setWeatherTime] = useState({});
  const [weatherIcon, setWeatherIcon] = useState({});
  const [isCelzius, setIsCelzius] = useState(true);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);

  useEffect(() => {
    getTimeAndZone();
  }, []);

  const getTimeAndZone = async () => {
    const position = await weatherService.getCoords();
    const { data } = await weatherService.getTime(position);
    setTime(data.location.localtime);
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

  const dayForecast = (forecast) => {
    return (
      <div width="300px">
        <div className='center-col' height='100px'>
      <table>
        <tbody>
          <tr>
            {forecast.hour.map((hour, key) => (
              <td key={key}>
                <table>
                  <tbody>
                    <tr>
                      <td align="center">{key < 10 ? "0" + key : key}:00</td>
                    </tr>
                    <tr>
                      <td align="center">
                        <img src={hour.condition.icon} />
                      </td>
                    </tr>
                    <tr>
                      <td align="center">
                        {isCelzius
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
      </table></div></div>
    );
  };

  return (
    <div>
      {weatherTime && (
        <div>
          <button onClick={() => setIsCelzius(!isCelzius)}>
            {isCelzius ? "°F" : "°C"}
          </button>
          <div>
            {isCelzius ? weatherTime.c_temp + "°C" : weatherTime.f_temp + "°F"}
          </div>
          <br />
          <img src={weatherIcon.img} alt={weatherIcon.alt} />
          <br />
          {time}
          <br />
          {fiveDayForecast.map((forecast, key) => (
            <li key={key}>
              {forecast.date == new Date().toLocaleDateString("en-CA")
                ? dayForecast(forecast)
                : "white"}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

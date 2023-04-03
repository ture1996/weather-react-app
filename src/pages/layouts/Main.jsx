import { weatherService } from "../../services/WeatherService";
import { useEffect, useState } from "react";

export const Main = () => {
  const [time, setTime] = useState(0);
  const [weatherTime, setWeatherTime] = useState({});
  const [weatherIcon, setWeatherIcon] = useState({});
  const [isCelzius, setIsCelzius] = useState(true);

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
        </div>
      )}
    </div>
  );
};

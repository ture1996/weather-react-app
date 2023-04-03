import { weatherService } from "../../services/WeatherService";
import { useEffect, useState } from "react";

export const Main = () => {
  const [time, setTime] = useState(0);
  const [weatherIcon, setWeatherIcon] = useState({});

  useEffect(() => {
    getTimeAndZone();
  }, []);

  const getTimeAndZone = async () => {
    const position = await weatherService.getCoords();
    const { data } = await weatherService.getTime(position);
    setTime(data.location.localtime);
    setWeatherIcon({
      img: data.current.condition.icon,
      alt: data.current.condition.text,
    });
  };

  return (
    <div>
      {weatherIcon && (
        <div>
          <img src={weatherIcon.img} alt={weatherIcon.alt} />
          <br />
          {time}
        </div>
      )}
    </div>
  );
};

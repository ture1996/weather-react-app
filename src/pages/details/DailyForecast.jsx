import { useState, useEffect } from "react";
import { weatherService } from "../../services/WeatherService";
import { useParams } from "react-router-dom";
import { isAfter, isBefore } from "date-fns";
import { Circles } from "react-loader-spinner";
import { FlexDailyTable } from "./FlexDailyTable";

export const DailyForecast = () => {
  const [wantedDayForecast, setWantedDayForecast] = useState();
  const { date } = useParams();
  const { location } = useParams();
  const [isCelsius, setIsCelsius] = useState(true);
  const [isKph, setIsKph] = useState(true);
  const [wantedDayAlert, setWantedDayAlert] = useState();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    dailyReport();
  }, []);

  const dailyReport = async () => {
    const locationDaily = location.split(",");
    const locationDailyKey = {
      latitude: locationDaily[0],
      longitude: locationDaily[1],
    };
    setLoading(true);
    const data = await weatherService.getDailyReport(locationDailyKey, date);
    setWantedDayForecast(data.dailyReport);
    setWantedDayAlert(data.alertReport);
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
                {forecast?.hour.map((hour, key) => (
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
                              src={hour?.condition.icon}
                              alt={hour?.condition.text}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td align="center">
                            {isCelsius
                              ? Math.round(hour?.temp_c)
                              : Math.round(hour?.temp_f)}
                            °
                          </td>
                        </tr>

                        <tr>
                          <td
                            align="center"
                            onClick={() => {
                              setIsKph(!isKph);
                            }}
                          >
                            {isKph
                              ? Math.round(hour?.wind_kph) + "kph"
                              : Math.round(hour?.wind_mph) + "mph"}
                          </td>
                        </tr>
                        <tr>
                          <td>{hour?.pressure_mb}mb</td>
                        </tr>
                        <tr>
                          <td align="center">
                            Feels:{" "}
                            {Math.round(
                              isCelsius ? hour?.feelslike_c : hour?.feelslike_f
                            )}
                            °<br />
                            {hour?.feelslike_f > hour?.temp_f ? (
                              <span className="arrow-red"> &#8593; </span>
                            ) : (
                              <span className="arrow-blue">&#8595;</span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>Rain: {hour?.chance_of_rain}%</td>
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

  const showAlert = (alert, key) => {
    return (
      <div key={key}>
        Alert:
        <br />
        {alert.desc}
        <br />
        {alert.event}
      </div>
    );
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
        wantedDayAlert && (
          <div>
            <button
              className={
                isCelsius ? "converter-button-f" : "converter-button-c"
              }
              onClick={() => setIsCelsius(!isCelsius)}
            >
              °{isCelsius ? "C" : "F"}
            </button>
            {currentDayForecast(wantedDayForecast)}
            <br />
            <div>
              {wantedDayForecast?.astro.sun_is_up ? (
                <div>
                  Sunrise: {wantedDayForecast?.astro.sunrise}
                  <br />
                  Sunset: {wantedDayForecast?.astro.sunset}
                </div>
              ) : (
                <div>
                  Moonrise: {wantedDayForecast?.astro.moonrise}
                  <br />
                  Moonset: {wantedDayForecast?.astro.moonset}
                </div>
              )}
              <div>
                Humidity: {wantedDayForecast?.day.avghumidity}
                <br />
                UV index: {wantedDayForecast?.day.uv}
              </div>
              <div>
                {wantedDayAlert?.map(
                  (alert, key) =>
                    isAfter(new Date(), new Date(alert?.effective)) &&
                    isBefore(new Date(), new Date(alert?.expires)) &&
                    showAlert(alert, key)
                )}
              </div>
            </div>
            <FlexDailyTable
              forecast={wantedDayForecast}
              isCelsius={isCelsius}
              isKph={isKph}
              setIsKph={setIsKph}
            />
          </div>
        )
      )}
    </div>
  );
};

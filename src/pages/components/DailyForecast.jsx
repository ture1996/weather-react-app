import { useState, useEffect } from "react";
import { weatherService } from "../../services/WeatherService";
import { useParams } from "react-router-dom";
import { isAfter, isBefore } from "date-fns";
import { Circles } from "react-loader-spinner";
import { FlexDailyTable } from "../details/FlexDailyTable";
import { OtherForecastInfo } from "../details/OtherForecastInfo";

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
            <div className="flex-background">
            <FlexDailyTable
              forecast={wantedDayForecast}
              isCelsius={isCelsius}
              isKph={isKph}
              setIsKph={setIsKph}
            />
            </div>
            <br />
            <OtherForecastInfo
              forecast={wantedDayForecast}
              alerts={wantedDayAlert}
              isAfter={isAfter}
              isBefore={isBefore}
              showAlert={showAlert}
            />
          </div>
        )
      )}
    </div>
  );
};

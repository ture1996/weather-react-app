import { ChangeCityButtons } from "./ChangeCityButtons";
import { MainCentralScreen } from "./MainCentralScreen";
import { MainDailyTable } from "./MainDailyTable";
import { MainHourlyTable } from "./MainHourlyTable";

export const MainWeatherForecast = ({
  savedCities,
  isLast,
  nextCity,
  currentLocation,
  isCurrent,
  isCelsius,
  setIsCelsius,
  weatherTime,
  previousCity,
  windowLocation,
  location,
  deleteLocation,
  weatherIcon,
  fiveDayForecast,
  navigate,
  time,
  epochConverter,
}) => {
  return (
    <>
      <ChangeCityButtons
        savedCities={savedCities}
        nextCity={nextCity}
        currentLocation={currentLocation}
        isCurrent={isCurrent}
        isLast={isLast}
        previousCity={previousCity}
      />
      {weatherTime && (
        <div>
          <MainCentralScreen
            isCelsius={isCelsius}
            setIsCelsius={setIsCelsius}
            windowLocation={windowLocation}
            location={location}
            weatherIcon={weatherIcon}
            time={time}
            weatherTime={weatherTime}
            deleteLocation={deleteLocation}
          />
          {fiveDayForecast.map((forecast, key) => (
            <div key={key} className="flex-background">
              {forecast.date === new Date().toLocaleDateString("en-CA") ? (
                <MainHourlyTable isCelsius={isCelsius} forecast={forecast} />
              ) : (
                <div className="flex-five-days">
                  <MainDailyTable
                    forecast={forecast}
                    navigate={navigate}
                    isCelsius={isCelsius}
                    location={location}
                    epochConverter={epochConverter}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

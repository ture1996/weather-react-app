export const MainDailyTable = ({
  navigate,
  location,
  epochConverter,
  isCelsius,
  forecast,
}) => {
  return (
    <>
        <div
          className="flex-five-days-column"
          onClick={() => {
            navigate(
              "/" + location.lat + "," + location.lon + "/" + forecast.date
            );
          }}
        >
          <div className="flex-element" align="left">
            {epochConverter(forecast.date)}
          </div>
          <div className="flex-element" align="center">
            <img
              src={forecast.day.condition.icon}
              alt={forecast.day.condition.text}
            />
          </div>
          <div className="flex-element" align="right">
            {isCelsius
              ? Math.round(forecast.day.maxtemp_c) +
                "°/" +
                Math.round(forecast.day.mintemp_c) +
                "°"
              : Math.round(forecast.day.maxtemp_f) +
                "°/" +
                Math.round(forecast.day.mintemp_f) +
                "°"}
          </div>
        </div>
    </>
  );
};

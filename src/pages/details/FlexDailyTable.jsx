export const FlexDailyTable = ({ forecast, isCelsius, isKph, setIsKph }) => {
  return (
    <>
      <div className="flex-daily">
        {forecast?.hour.map((hour, key) => (
          <div key={key} className="flex-daily-row">
            {key < 10 ? "0" + key : key}:00
            <br />
            <img src={hour?.condition.icon} alt={hour?.condition.text} />
            {isCelsius ? Math.round(hour?.temp_c) : Math.round(hour?.temp_f)}°
            <br />
            <div
              align="center"
              onClick={() => {
                setIsKph(!isKph);
              }}
            >
              {isKph
                ? Math.round(hour?.wind_kph) + "kph"
                : Math.round(hour?.wind_mph) + "mph"}
            </div>
            {hour?.pressure_mb}mb
            <br />
            Feels:{" "}
            {Math.round(isCelsius ? hour?.feelslike_c : hour?.feelslike_f)}
            °<br />
            {hour?.feelslike_f > hour?.temp_f ? (
              <span className="arrow-red"> &#8593; </span>
            ) : (
              <span className="arrow-blue">&#8595;</span>
            )}
            <br />
            Rain: {hour?.chance_of_rain}%
          </div>
        ))}
        <>{console.log(forecast)}</>
      </div>
    </>
  );
};

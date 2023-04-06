export const FlexDailyTable = ({ forecast, isCelsius, isKph, setIsKph }) => {
  return (
    <div>
      <view
        style={{ flex: 1, padding: 20, flexDirection: "row", display: "flex" }}
      >
        {forecast?.hour.map((hour, key) => (
          <view key={key}>
            <view align="center">
              {key < 10 ? "0" + key : key}:00
              <img src={hour?.condition.icon} alt={hour?.condition.text} />
              {isCelsius ? Math.round(hour?.temp_c) : Math.round(hour?.temp_f)}°
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
              {hour?.pressure_mb}mb Feels:{" "}
              {Math.round(isCelsius ? hour?.feelslike_c : hour?.feelslike_f)}
              °<br />
              {hour?.feelslike_f > hour?.temp_f ? (
                <span className="arrow-red"> &#8593; </span>
              ) : (
                <span className="arrow-blue">&#8595;</span>
              )}
              Rain: {hour?.chance_of_rain}%
            </view>
          </view>
        ))}
      </view>
    </div>
  );
};

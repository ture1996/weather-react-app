export const MainHourlyTable = ({ forecast, isCelsius }) => {
  return (
    <>
      <div className="flex-daily">
        {forecast.hour.map((hour, key) => (
          <div className="flex-daily-row" key={key}>
            {key < 10 ? "0" + key : key}:00
            <img src={hour.condition.icon} alt={hour.condition.text} />
            {isCelsius ? Math.round(hour.temp_c) : Math.round(hour.temp_f)}°
          </div>
        ))}
      </div>
    </>
  );
};

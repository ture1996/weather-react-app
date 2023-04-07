export const MainCentralScreen = ({
  isCelsius,
  setIsCelsius,
  windowLocation,
  location,
  weatherIcon,
  time,
  weatherTime,
  deleteLocation,
}) => {
  return (
    <>
      <button
        className={isCelsius ? "converter-button-f" : "converter-button-c"}
        onClick={() => setIsCelsius(!isCelsius)}
      >
        °{isCelsius ? "C" : "F"}
      </button>
      {windowLocation && (
        <div
        title="Remove city"
          className="fa fa-trash delete"
          onClick={() => deleteLocation(windowLocation)}
        />
      )}
      <p className="central-name"></p>
      <div className="central-temp">
        {isCelsius
          ? Math.round(weatherTime.c_temp)
          : Math.round(weatherTime.f_temp)}
        °
      </div>

      <br />
      <div align="center">
        <img src={weatherIcon.img} alt={weatherIcon.alt} align="center" />
      </div>
      <br />
      <div className="last-updated">
        <p>
          {location.name} {", "} {location.region}
          {", "}
          {location.country}
          <br />
          Last updated at : {time}
        </p>
      </div>
    </>
  );
};

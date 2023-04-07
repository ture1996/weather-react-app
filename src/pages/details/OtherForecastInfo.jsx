export const OtherForecastInfo = ({
  forecast,
  alerts,
  isAfter,
  isBefore,
  showAlert,
}) => {
  return (
    <div>
      {forecast?.astro.sun_is_up ? (
        <div>
          Sunrise: {forecast?.astro.sunrise}
          <br />
          Sunset: {forecast?.astro.sunset}
        </div>
      ) : (
        <div>
          Moonrise: {forecast?.astro.moonrise}
          <br />
          Moonset: {forecast?.astro.moonset}
        </div>
      )}
      <div>
        Humidity: {forecast?.day.avghumidity}
        <br />
        UV index: {forecast?.day.uv}
      </div>
      <div>
        {alerts?.map(
          (alert, key) =>
            isAfter(new Date(), new Date(alert?.effective)) &&
            isBefore(new Date(), new Date(alert?.expires)) &&
            showAlert(alert, key)
        )}
      </div>
    </div>
  );
};

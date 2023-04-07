export const ChangeCityButtons = ({
  savedCities,
  nextCity,
  currentLocation,
  isCurrent,
  isLast,
  previousCity,
}) => {
  return (
    <>
      {savedCities && isLast() && (
        <button
          className="button-right fixed-right"
          onClick={() => {
            nextCity();
          }}
        >
          <span className="arrow-black"> &#8594; </span>
        </button>
      )}
      {currentLocation && isCurrent() && (
        <button
          className="button-left fixed-left"
          onClick={() => {
            previousCity();
          }}
        >
          <span className="arrow-black"> &#8592; </span>
        </button>
      )}
    </>
  );
};

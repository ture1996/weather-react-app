import { weatherService } from "../../services/WeatherService";
import { useState } from "react";
import { Circles } from "react-loader-spinner";

export const AddCity = () => {
  const [cities, setCities] = useState();
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState();
  const [isLoading, setLoading] = useState(false);

  const getCities = async () => {
    setLoading(true);
    const data = await weatherService.getCitiesFromSearch(search);
    setCities(data);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const chooseCity = (city, key) => {
    return (
      <option key={key} value={city.lat + "," + city.lon}>
        City: {city.name}, {city.region}, {city.country}
      </option>
    );
  };

  const cityExists = (city) => {
    const savedCities = JSON.parse(window.localStorage.getItem("city"));
    return savedCities.includes(city);
  };

  const saveAndRedirect = (e, city) => {
    e.preventDefault();
    if (window.localStorage.getItem("city")) {
      if (cityExists(city)) {
        return alert("You already saved this city!");
      }
      window.localStorage.setItem(
        "city",
        JSON.stringify([
          ...JSON.parse(window.localStorage.getItem("city")),
          city,
        ])
      );
      window.location.replace("/");
      return;
    }
    window.localStorage.setItem("city", JSON.stringify([city]));
    window.location.replace("/");
  };

  const selectCity = (city) => {
    const cityObject = city.split(",");
    const cityObjectKeys = {
      latitude: parseFloat(cityObject[0], 10),
      longitude: parseFloat(cityObject[1], 10),
    };
    return cityObjectKeys;
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
        <div className="add-city-screen">
          <form
            onSubmit={(e) => {
              saveAndRedirect(e, selectedCity);
            }}
          >
            <input
              className="search-input"
              name="search"
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <br />
            <br />
            {cities && (
              <div>
                <select
                  className="search-input"
                  id="cities"
                  onChange={(e) => {
                    setSelectedCity(
                      selectCity(e.target.options[e.target.selectedIndex].value)
                    );
                  }}
                >
                  <option hidden disabled selected value>
                    --- select city ---
                  </option>
                  {cities.map((city, key) => chooseCity(city, key))}
                </select>
                <br />
              </div>
            )}
            <br />
            <div className="save-container">
              <div className="flex-search-save">
                <div
                  className="flex-element"
                  type="button"
                  name="search"
                  onClick={() => {
                    getCities();
                  }}
                >
                  <div className="search-button">&#128270;</div>
                </div>
                <div className="flex-element">
                  {!selectedCity ? (
                    <button disabled type="submit" name="disabled">
                      Save
                    </button>
                  ) : (
                    <button type="submit" name="save">
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

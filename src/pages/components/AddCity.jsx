import { weatherService } from "../../services/WeatherService";
import { useState } from "react";

export const AddCity = () => {
  const [cities, setCities] = useState();
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState();

  const getCities = async () => {
    const data = await weatherService.getCitiesFromSearch(search);
    setCities(data);
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

  return (
    <div>
      <form
        onSubmit={(e) => {
          saveAndRedirect(e, selectedCity);
        }}
      >
        <input
          name="search"
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <br />
        {cities && (
          <div>
            <select
              id="cities"
              onChange={(e) => {
                setSelectedCity(e.target.options[e.target.selectedIndex].value);
              }}
            >
              {cities.map((city, key) => chooseCity(city, key))}
            </select>
            <br />
          </div>
        )}
        <button
          type="button"
          name="search"
          onClick={() => {
            getCities();
          }}
        >
          Search
        </button>{" "}
        {!selectedCity ? (
          <button disabled type="submit" name="disabled">
            Save
          </button>
        ) : (
          <button type="submit" name="save">
            Save
          </button>
        )}
      </form>
    </div>
  );
};

import ApiService from "./ApiService";

class WeatherService extends ApiService {
  constructor() {
    super();
    this.options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
    this.lat = null;
    this.long = null;
    this.#getPosition();
  }

  #getPosition() {
    navigator.geolocation.getCurrentPosition(
      this.#success.bind(this),
      this.#error.bind(this),
      this.options
    );
  }

  #success(position) {
    this.lat = position?.coords?.latitude;
    this.long = position?.coords?.longitude;
    console.log(this.long);
    console.log(this.lat);
  }

  #error(aaa) {
    console.log(aaa);
  }

  getCoords() {
    return {
      latitude: this.lat,
      longitude: this.long,
    };
  }

  getTime = async (position) => {
    console.log(position);
    const data = await this.client.get(
      `/forecast.json?key=ede8801c0e634978a4a91953230304&q=${position.latitude},${position.longitude}
      &days=5&aqi=yes&alerts=yes`
    );
    return data;
  };
}

export const weatherService = new WeatherService();

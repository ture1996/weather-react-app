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
    const data = await this.client.get(
      `/forecast.json?key=ede8801c0e634978a4a91953230304&q=${position.latitude},${position.longitude}
      &days=5&aqi=yes&alerts=yes`
    );
    return data;
  };

  getDailyReport = async (position, date) => {
    const { data } = await this.getTime(position);
    console.log(data);
    const dailyReport = data.forecast.forecastday.find(
      (day) => day.date === date
    );
    const alertReport = data.alerts.alert;
    return { dailyReport: dailyReport, alertReport: alertReport };
  };
}

export const weatherService = new WeatherService();

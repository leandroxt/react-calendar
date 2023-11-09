const BASE = "http://dataservice.accuweather.com";
const PATH_FORECAST = "/forecasts/v1/daily/1day/{location}?apikey={key}";
const PATH_LOCATION = "/locations/v1/cities/search?apikey={key}&q={q}";

const serviceWeather = {
  apiKey: process.env.REACT_APP_ACCU_WEATHER,

  getLocation: async function (q) {
    const path = PATH_LOCATION.replace("{key}", this.apiKey).replace("{q}", q);

    try {
      const response = await fetch(`${BASE}/${path}`);
      const data = await response.json();

      return data || [];
    } catch (error) {
      return [];
    }
  },

  getForecast: async function (locationkey) {
    const path = PATH_FORECAST.replace("{location}", locationkey).replace(
      "{key}",
      this.apiKey
    );

    try {
      const response = await fetch(`${BASE}/${path}`);
      const data = response.json();
      return data;
    } catch (error) {
      return null;
    }
  },
};

export default serviceWeather;

import {API_HOST_WEATHER, API_KEY_WEATHER } from '../config/const';
/* Defined Endpoints */
import endpoints from '../config/endpoints';

export const apiWeather = {
  getWeather: async query => {
    try {
      const response = await fetch( `${API_HOST_WEATHER}${endpoints.weather.query}?q=${query}&units=metric&appid=${API_KEY_WEATHER}`);
      if (!response.ok || response.status === 404 || response.status === 403 || response.status === 409 || response.status === 500 ) {
        const data = await response.json();
        return data.message;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return error.toString();
    }
  },
};

export default apiWeather;

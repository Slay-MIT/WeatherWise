import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
// const API_KEY = 'YOUR_WEATHER_API_KEY';

const GEOCODING_BASE_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function getWeatherData(location: string) {
  try {
    // First, get the coordinates using the geocoding API
    const geoResponse = await axios.get(GEOCODING_BASE_URL, {
      params: {
        q: location,
        limit: 1,
        appid: API_KEY
      }
    });

    if (geoResponse.data.length === 0) {
      throw new Error('Location not found');
    }

    const { lat, lon } = geoResponse.data[0];

    // Now, use the coordinates to get the weather data
    const weatherResponse = await axios.get(WEATHER_BASE_URL, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric' // For Celsius
      }
    });

    return weatherResponse.data;
  } catch (error) {
    console.error('Error in getWeatherData:', error);
    throw error;
  }
}
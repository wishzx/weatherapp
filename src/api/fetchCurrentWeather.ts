import { GeoLocationData } from '../hooks/useGeoLocation';

const API_KEY = 'f8a3a62c1c7c7d8e39956c2e270c9d50'; //in production move this secret to a .env on the server that call the openweather api instead

const fetchCurrentWeather = async (geoLocationData: GeoLocationData) => {
  if (geoLocationData.latitude === null || geoLocationData.longitude === null) {
    throw new Error(`missing ${geoLocationData.latitude || ''} or ${geoLocationData.longitude || ''}`);
  }
  if (geoLocationData.latitude > 90 || geoLocationData.latitude < -90) {
    throw new Error(
      `latitude is ${geoLocationData.latitude || ''} but it must be a number between -90 and 90 
      }`,
    );
  }

  if (geoLocationData.longitude > 180 || geoLocationData.longitude < -180) {
    throw new Error(
      `longitude is ${geoLocationData.longitude || ''} but it must be a number between -180 and 180 
      }`,
    );
  }

  const apiRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${geoLocationData.latitude}&lon=${geoLocationData.longitude}&appid=${API_KEY}&units=metric`,
  );

  if (!apiRes.ok) {
    throw new Error(`lat: ${geoLocationData.latitude} long: ${geoLocationData.longitude} fetch current weather not ok`);
  }

  return apiRes.json();
};

export default fetchCurrentWeather;

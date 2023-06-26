import { GeoLocationData } from '../hooks/useGeoLocation';
import { API_KEY } from '../utils';

export const fetchForecastWeather = async (geoLocationData: GeoLocationData) => {
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
    `https://api.openweathermap.org/data/2.5/forecast?lat=${geoLocationData.latitude}&lon=${geoLocationData.longitude}&appid=${API_KEY}&units=metric`,
  );

  if (!apiRes.ok) {
    throw new Error(
      `lat: ${geoLocationData.latitude} long: ${geoLocationData.longitude} fetch forecast weather not ok`,
    );
  }
  console.log(apiRes);
  return apiRes.json();
};

export default fetchForecastWeather;

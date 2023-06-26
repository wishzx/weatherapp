import { useQuery } from '@tanstack/react-query';
import fetchForecastWeather from '../api/fetchForecastWeather';
import { GeoLocationData, GeoLocationPermission } from './useGeoLocation';
import { ForecastWeatherAPIResponse, WeatherForecastItem } from '../api/ForecastAPITypes';

export default function useForeCastWeather(
  geoLocationData: GeoLocationData,
  locationPermission: GeoLocationPermission,
) {
  const results = useQuery<ForecastWeatherAPIResponse>(
    ['forecast_weather', geoLocationData],
    () => fetchForecastWeather(geoLocationData),
    {
      enabled: locationPermission === 'granted',
    },
  );
  if (results.data === undefined) {
    return {
      data: results.data,
      formattedData: undefined,
      isLoading: results.isLoading,
      isError: results.isError,
      refetch: results.refetch,
    };
  }

  const data = splitListByDay(results.data.list);

  return {
    data: results.data,
    formattedData: data,
    isLoading: results.isLoading,
    isError: results.isError,
    refetch: results.refetch,
  };
}

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function splitListByDay(list: WeatherForecastItem[]): Record<string, WeatherForecastItem[]> {
  return list.reduce((result: Record<string, WeatherForecastItem[]>, obj: WeatherForecastItem) => {
    const date = new Date(obj.dt * 1000);
    const day = daysOfWeek[date.getDay()];

    if (!result[day]) {
      result[day] = [];
    }

    result[day].push(obj);

    return result;
  }, {});
}

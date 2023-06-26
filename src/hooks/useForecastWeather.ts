import { useQuery } from '@tanstack/react-query';
import fetchForecastWeather from '../api/fetchForecastWeather';
import { GeoLocationData, GeoLocationPermission } from './useGeoLocation';
import { ForecastWeatherAPIResponse } from '../api/ForecastAPITypes';

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
  return {
    data: results.data,
    isLoading: results.isLoading,
    isError: results.isError,
    refetch: results.refetch,
  };
}

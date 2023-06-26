import { useQuery } from '@tanstack/react-query';
import fetchCurrentWeather from '../api/fetchCurrentWeather';
import { GeoLocationData, GeoLocationPermission } from './useGeoLocation';
import { CurrentWeatherAPIResponse } from '../api/CurrentAPITypes';

export default function useCurrentWeather(geoLocationData: GeoLocationData, locationPermission: GeoLocationPermission) {
  const results = useQuery<CurrentWeatherAPIResponse>(
    ['current_weather', geoLocationData],
    () => fetchCurrentWeather(geoLocationData),
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

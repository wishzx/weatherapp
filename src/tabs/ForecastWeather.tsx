import useForecastWeather from '../hooks/useForecastWeather';

import { GeoLocationData, GeoLocationPermission } from '../hooks/useGeoLocation';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { orangeCustom } from '../App';

interface CurrentWeatherProps {
  locationData: GeoLocationData;
  locationPermission: GeoLocationPermission;
}

const ForecastWeather = (props: CurrentWeatherProps) => {
  const { data, isLoading, isError, refetch } = useForecastWeather(props.locationData, props.locationPermission);

  const onClick = () => {
    notifications.clean();
    void refetch();
  };
  console.log(data);

  useEffect(() => {
    if (isError) {
      notifications.show({
        id: 'api-error',
        title: "Couldn't retrieve current weather data",
        message: 'Press the refresh button to try again',
        color: 'red',
        withBorder: true,
        autoClose: false,

        withCloseButton: false,
      });
    }
    return () => {
      notifications.clean();
    };
  }, [isError]);

  return <div>forecast weather {data?.city.name}</div>;
};

export default ForecastWeather;

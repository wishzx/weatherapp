import useForecastWeather from '../hooks/useForecastWeather';

import { GeoLocationData, GeoLocationPermission } from '../hooks/useGeoLocation';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { orangeCustom } from '../utils';
import { Card, Group, Text, Menu, ActionIcon, Image, SimpleGrid, rem } from '@mantine/core';
import { IconDots, IconEye, IconFileZip, IconTrash } from '@tabler/icons-react';
import WeatherCard from '../components/WeatherCard';

const images = [
  'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1444723121867-7a241cacace9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1444084316824-dc26d6657664?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
];
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
        title: "Couldn't retrieve forecast weather data",
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

  return (
    <div>
      forecast weather {data?.city.name}
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group position="apart">
            <Text weight={500}>Review pictures</Text>
          </Group>
        </Card.Section>
        <WeatherCard icon="other" />
      </Card>
    </div>
  );
};

export default ForecastWeather;

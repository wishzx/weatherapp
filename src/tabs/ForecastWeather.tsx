import useForecastWeather from '../hooks/useForecastWeather';

import { GeoLocationData, GeoLocationPermission } from '../hooks/useGeoLocation';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { orangeCustom } from '../utils';
import { Card, Group, Text, Menu, ActionIcon, Image, SimpleGrid, rem, Flex, Stack, Container } from '@mantine/core';
import { IconDots, IconEye, IconFileZip, IconTrash } from '@tabler/icons-react';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';

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
    <Container pt={40}>
      <SimpleGrid cols={6}>
        {data?.list.map((card) => {
          return (
            <ForecastCard
              key={card.dt}
              timestamp={card.dt}
              title={card.main.temp.toFixed(0)}
              subtitle={card.weather[0].main}
              src={card.weather[0].icon}
            ></ForecastCard>
          );
        })}
      </SimpleGrid>
    </Container>
  );
};

export default ForecastWeather;

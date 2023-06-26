import { ActionIcon, Container, Group, Loader, Stack, Text, Title, Tooltip } from '@mantine/core';
import WeatherGrid from '../components/WeatherGrid';
import useCurrentWeather from '../hooks/useCurrentWeather';
import { GeoLocationData, GeoLocationPermission } from '../hooks/useGeoLocation';
import { getHourAndMinuteFromTimestamp } from '../utils';
import { BiRefresh } from 'react-icons/bi';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { orangeCustom } from '../utils';

interface CurrentWeatherProps {
  locationData: GeoLocationData;
  locationPermission: GeoLocationPermission;
}

const CurrentWeather = (props: CurrentWeatherProps) => {
  const { data, isLoading, isError, refetch } = useCurrentWeather(props.locationData, props.locationPermission);

  const onClick = () => {
    notifications.clean();
    void refetch();
  };

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

  return (
    <Container py={'10vh'} size={'sm'}>
      <Stack>
        <Container>
          {props.locationPermission === 'waiting' || isLoading ? (
            <Loader h={45} color={orangeCustom} variant="dots" size="xl" />
          ) : (
            <Title>{data?.name || '-'} </Title>
          )}
        </Container>
        <WeatherGrid data={data} />
        <Container>
          {(isError || !isLoading) && (
            <Group>
              <Text> {data?.dt && `last update ${getHourAndMinuteFromTimestamp(data.dt)}`} </Text>
              <Tooltip label="openweathermap send you the same cached data every time after the first request for a while">
                <ActionIcon disabled={isLoading} color="blue" variant="transparent" onClick={() => onClick()}>
                  <BiRefresh />
                </ActionIcon>
              </Tooltip>
            </Group>
          )}
        </Container>
      </Stack>
    </Container>
  );
};

export default CurrentWeather;

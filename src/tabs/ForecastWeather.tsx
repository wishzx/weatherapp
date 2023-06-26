import useForecastWeather from '../hooks/useForecastWeather';

import { GeoLocationData, GeoLocationPermission } from '../hooks/useGeoLocation';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { orangeCustom } from '../utils';
import {
  Card,
  Group,
  Text,
  Menu,
  ActionIcon,
  Image,
  SimpleGrid,
  rem,
  Flex,
  Stack,
  Container,
  Title,
  Divider,
  Loader,
  Tooltip,
} from '@mantine/core';
import { IconDots, IconEye, IconFileZip, IconTrash } from '@tabler/icons-react';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';
import { WeatherForecastItem } from '../api/ForecastAPITypes';
import { BiRefresh } from 'react-icons/bi';

interface CurrentWeatherProps {
  locationData: GeoLocationData;
  locationPermission: GeoLocationPermission;
}

const ForecastWeather = (props: CurrentWeatherProps) => {
  const { data, formattedData, isLoading, isError, refetch } = useForecastWeather(
    props.locationData,
    props.locationPermission,
  );

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
    <Container py={'10vh'}>
      <Stack>
        <Container>
          {props.locationPermission === 'waiting' || isLoading ? (
            <Loader h={45} color={orangeCustom} variant="dots" size="xl" />
          ) : (
            <Title>{data?.city.name || '-'} </Title>
          )}
        </Container>
        {Object.entries(formattedData || {}).map(([key, value]: [string, WeatherForecastItem[]]) => {
          return (
            <Container size="xl" key={key}>
              <Title py={10} c={orangeCustom} order={5}>
                {key}
              </Title>

              <SimpleGrid
                sx={{ justify: 'flex-end' }}
                cols={8}
                breakpoints={[
                  { maxWidth: '620', cols: 4, spacing: 'md' },
                  { maxWidth: 'sm', cols: 4, spacing: 'sm' },
                  { maxWidth: '360', cols: 2, spacing: 'sm' },
                ]}
              >
                {value?.map((card) => {
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
        })}
        <Container>
          {(isError || !isLoading) && (
            <Group>
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

export default ForecastWeather;

import useForecastWeather from '../hooks/useForecastWeather';

import { GeoLocationData, GeoLocationPermission } from '../hooks/useGeoLocation';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { orangeCustom } from '../utils';
import { Group, ActionIcon, Stack, Container, Title, Loader, Tooltip } from '@mantine/core';
import { BiRefresh } from 'react-icons/bi';
import ForecastGrid from '../components/ForecastGrid';

interface CurrentWeatherProps {
  locationData: GeoLocationData;
  locationPermission: GeoLocationPermission;
}

const ForecastWeather = (props: CurrentWeatherProps) => {
  const { data, formattedData, isLoading, isError, refetch } = useForecastWeather(
    props.locationData,
    props.locationPermission,
  );

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

  const onClick = () => {
    notifications.clean();
    void refetch();
  };

  //TODO: promote this to a layout and put the grid as outlet
  const showLoader = props.locationPermission === 'waiting' || isLoading;
  const top = (
    <Container>
      {showLoader ? (
        <Loader h={45} color={orangeCustom} variant="dots" size="xl" />
      ) : (
        <Title>{data?.city.name || '-'} </Title>
      )}
    </Container>
  );
  const showBottom = isError || !isLoading;
  const bottom = (
    <Container>
      {showBottom && (
        <Group>
          <Tooltip label="openweathermap send you the same cached data every time after the first request for a while">
            <ActionIcon disabled={isLoading} color="blue" variant="transparent" onClick={() => onClick()}>
              <BiRefresh />
            </ActionIcon>
          </Tooltip>
        </Group>
      )}
    </Container>
  );

  return (
    <Container py={'10vh'}>
      <Stack>
        {top}
        <ForecastGrid data={formattedData} />
        {bottom}
      </Stack>
    </Container>
  );
};

export default ForecastWeather;

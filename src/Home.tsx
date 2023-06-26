import { Tabs } from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';
import useGeoLocation from './hooks/useGeoLocation';
import { notifications } from '@mantine/notifications';
import { LuCalendarDays } from 'react-icons/lu';
import { BsHourglass } from 'react-icons/bs';
import ForecastWeather from './tabs/ForecastWeather';
import CurrentWeather from './tabs/CurrentWeather';
import { useEffect } from 'react';

const Home = () => {
  const { locationData, locationPermission } = useGeoLocation();

  useEffect(() => {
    if (locationPermission === 'denied') {
      notifications.clean();
      notifications.show({
        title: 'Geolocation denied',
        message:
          "You denied the permission to share your location. This website won't function properly without It. Refresh the page if you change your mind.",
        autoClose: false,
        color: 'red',
        withBorder: true,
        withCloseButton: false,
      });
    }
    if (locationPermission === 'unsupported') {
      notifications.clean();
      notifications.show({
        title: 'Geolocation not supported',
        message: "Your browser doesn't support geolocation, please try with another one",
        autoClose: false,
        color: 'red',
        withBorder: true,
        withCloseButton: false,
      });
    }
  }, [locationPermission]);

  const config = {
    iconSize: '0.8rem',
    padding: 'xs',
  };

  return (
    <>
      <Tabs defaultValue="current" keepMounted={false}>
        <Tabs.List>
          <Tabs.Tab
            value="current"
            icon={<IconPhoto size={config.iconSize} />}
            disabled={locationPermission !== 'granted'}
          >
            Current weather
          </Tabs.Tab>
          <Tabs.Tab
            value="forecast"
            icon={<BsHourglass size={config.iconSize} />}
            disabled={locationPermission !== 'granted'}
          >
            3 Day forecast
          </Tabs.Tab>
          <Tabs.Tab value="subscribe" icon={<LuCalendarDays size={config.iconSize} />} disabled={true}>
            Subscribe to notifications
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="current" pt={config.padding}>
          <CurrentWeather locationData={locationData} locationPermission={locationPermission} />
        </Tabs.Panel>

        <Tabs.Panel value="forecast" pt={config.padding}>
          <ForecastWeather />
        </Tabs.Panel>

        <Tabs.Panel value="notification" pt={config.padding}>
          -- coming soon --
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default Home;

import { SimpleGrid } from '@mantine/core';
import WeatherCard from './WeatherCard';
import { CurrentWeatherAPIResponse } from '../api/CurrentAPITypes';
import { getHourAndMinuteFromTimestamp } from '../utils';

interface WeatherGridProps {
  data: CurrentWeatherAPIResponse | undefined;
}

const WeatherGrid = ({ data }: WeatherGridProps) => {
  return (
    <SimpleGrid
      cols={3}
      mx={50}
      spacing="lg"
      breakpoints={[
        { maxWidth: 'md', cols: 3, spacing: 'md' },
        { maxWidth: 'sm', cols: 2, spacing: 'md' },
        { maxWidth: 'xs', cols: 1, spacing: 'sm' },
      ]}
    >
      <WeatherCard
        icon="other"
        src={`https://openweathermap.org/img/wn/${data?.weather[0].icon || '10d'}@2x.png`}
        subtitle={data?.weather[0].description}
      ></WeatherCard>
      <WeatherCard icon="Temperature" subtitle={data?.main.temp && `${data.main.temp}°C`}></WeatherCard>

      <WeatherCard icon="Wind" subtitle={data?.wind.speed && `${data.wind.speed} kmh`}></WeatherCard>
      <WeatherCard icon="Humidity" subtitle={data?.main.humidity && `${data.main.humidity} %`}></WeatherCard>
      <WeatherCard icon="Pressure" subtitle={data?.main.pressure && `${data.main.pressure} hPa`}></WeatherCard>

      <WeatherCard icon="Clouds" subtitle={data?.clouds.all && `${data.clouds.all}%`}></WeatherCard>

      <WeatherCard icon="Visibility" subtitle={data?.visibility && `${data.visibility / 1000} km`}></WeatherCard>
      <WeatherCard
        icon="Sunrise"
        subtitle={data?.sys.sunrise && getHourAndMinuteFromTimestamp(data.sys.sunrise)}
      ></WeatherCard>

      <WeatherCard
        icon="Sunset"
        subtitle={data?.sys.sunset && getHourAndMinuteFromTimestamp(data.sys.sunset)}
      ></WeatherCard>
    </SimpleGrid>
  );
};

export default WeatherGrid;

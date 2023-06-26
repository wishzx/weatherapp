import { Container, SimpleGrid, Title } from '@mantine/core';
import { orangeCustom } from '../utils';
import { WeatherForecastItem } from '../api/ForecastAPITypes';
import ForecastCard from './ForecastCard';

interface ForecastGridProps {
  data: Record<string, WeatherForecastItem[]> | undefined;
}

const ForecastGrid = ({ data }: ForecastGridProps) => {
  const config = {
    breapoints: [
      { maxWidth: '620', cols: 4, spacing: 'md' },
      { maxWidth: 'sm', cols: 4, spacing: 'sm' },
      { maxWidth: '360', cols: 2, spacing: 'sm' },
    ],
  };
  return (
    <>
      {Object.entries(data || {}).map(([key, value]: [string, WeatherForecastItem[]]) => {
        return (
          <Container size="xl" key={key}>
            <Title py={10} c={orangeCustom} order={5}>
              {key}
            </Title>
            <SimpleGrid sx={{ justify: 'flex-end' }} cols={8} breakpoints={config.breapoints}>
              {value?.map((card) => {
                return (
                  <ForecastCard
                    key={card.dt}
                    timestamp={card.dt}
                    title={card.main.temp.toFixed(0)}
                    subtitle={card.weather[0].main}
                    src={card.weather[0].icon}
                  />
                );
              })}
            </SimpleGrid>
          </Container>
        );
      })}
    </>
  );
};

export default ForecastGrid;

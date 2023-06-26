import React from 'react';

import { Story } from '@ladle/react';
import { Box, Card, Container, Group, Text } from '@mantine/core';
import WeatherGrid from '../../components/WeatherGrid';
import WeatherCard from '../../components/WeatherCard';
import ForecastCard from '../../components/ForecastCard';

export default {
  title: 'Cards',
};

export const LoadingGrid: Story = () => {
  return (
    <Container size="md">
      <WeatherGrid data={undefined}></WeatherGrid>
    </Container>
  );
};

export const ImagePlaceholder: Story = () => {
  return (
    <Container size="sm">
      <Box w={200} h={200}>
        <WeatherCard icon="other" src="WRONG-URL"></WeatherCard>
      </Box>
    </Container>
  );
};

export const ForeCastCard: Story = () => {
  return (
    <Container w={200} h={200} size="md">
      <ForecastCard timestamp={1624708800}></ForecastCard>
    </Container>
  );
};



import { Story } from '@ladle/react';
import { Container } from '@mantine/core';
import WeatherGrid from '../../components/WeatherGrid';

export const Loading: Story = () => {
  return (
    <Container size="md">
      <WeatherGrid data={undefined}></WeatherGrid>
    </Container>
  );
};

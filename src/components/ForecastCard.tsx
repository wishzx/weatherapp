import { Box, Group, Image, Stack, Text, Title } from '@mantine/core';

import { formatUnixTimestamp, orangeCustom } from '../utils';

interface ForecastCardProps {
  title?: string | number;
  subtitle?: string | number;
  src?: string;
  timestamp: number;
}

export const ForecastCard = (props: ForecastCardProps) => {
  const size = 36;

  const [formattedDate, formattedTime] = formatUnixTimestamp(props.timestamp);

  const IconComponent = (
    <Image
      withPlaceholder
      width={size * 1.1}
      height={size * 1.1}
      src={`https://openweathermap.org/img/wn/${props.src || '10d'}@2x.png`}
    />
  );

  const iconColor = orangeCustom;

  return (
    <>
      <Group position="apart" px={15}>
        <Text c="blue.2">{formattedDate} </Text>
        <Text c="blue.2">{formattedTime} </Text>
      </Group>
      <Stack
        spacing={1}
        sx={(theme) => ({
          textAlign: 'center',
          alignItems: 'center',
          borderRadius: theme.radius.sm,
          borderWidth: '2px',
          borderColor: theme.colors.gray[2],
          borderStyle: 'solid',
        })}
      >
        <Box>{IconComponent}</Box>
        <Stack spacing={0}>
          <Title order={6}>{props.subtitle || 'Clear Sky'}</Title>
          <Text size={12} c="dimmed" truncate>
            {props.title || '38 °C'}
          </Text>
        </Stack>
      </Stack>
    </>
  );
};

export default ForecastCard;

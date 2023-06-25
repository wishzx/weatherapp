import { Box, Image, Stack, Text, Title } from '@mantine/core';
import { PiWind } from 'react-icons/pi';
import { BsWater } from 'react-icons/bs';
import { IoWaterOutline } from 'react-icons/io5';
import { BsSunrise } from 'react-icons/bs';
import { BsSunset } from 'react-icons/bs';
import { TbTemperature } from 'react-icons/tb';
import { BsClouds } from 'react-icons/bs';
import { MdOutlineVisibility } from 'react-icons/md';
import { orangeCustom } from '../App';

interface WeatherCardProps {
  icon: IconType;
  title?: string | number;
  subtitle?: string | number;
  src?: string;
}

type IconType =
  | 'Wind'
  | 'Humidity'
  | 'Pressure'
  | 'Sunrise'
  | 'Sunset'
  | 'Visibility'
  | 'Temperature'
  | 'Clouds'
  | 'other';

export const WeatherCard = (props: WeatherCardProps) => {
  let IconComponent: JSX.Element | undefined;
  let title: string = props.icon.toString();

  const iconColor = orangeCustom;

  const size = 36;

  switch (props.icon) {
    case 'Wind':
      IconComponent = <PiWind size={size} color={iconColor} />;
      break;
    case 'Humidity':
      IconComponent = <IoWaterOutline size={size} color={iconColor} />;
      break;
    case 'Pressure':
      IconComponent = <BsWater size={size} color={iconColor} />;
      break;

    case 'Sunrise':
      IconComponent = <BsSunrise size={size} color={iconColor} />;
      break;

    case 'Sunset':
      IconComponent = <BsSunset size={size} color={iconColor} />;
      break;
    case 'Visibility':
      IconComponent = <MdOutlineVisibility size={size} color={iconColor} />;
      break;
    case 'Clouds':
      IconComponent = <BsClouds size={size} color={iconColor} />;
      break;
    case 'Temperature':
      IconComponent = <TbTemperature size={size} color={iconColor} />;
      break;
    default:
      IconComponent = <Image withPlaceholder width={size * 1.1} height={size * 1.1} src={props.src} />;
      title = props.title?.toString() || 'Weather';
      break;
  }

  return (
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
        <Title order={6}>{props.subtitle || '-'}</Title>
        <Text size={12} c="dimmed" truncate>
          {title}
        </Text>
      </Stack>
    </Stack>
  );
};

export default WeatherCard;

import { QueryClient } from '@tanstack/react-query';

export function getHourAndMinuteFromTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds

  const hour = String(date.getHours()).padStart(2, '0'); // Get hours and pad with leading zero if necessary
  const minute = String(date.getMinutes()).padStart(2, '0'); // Get minutes and pad with leading zero if necessary

  return `${hour}:${minute}`;
}
export const orangeCustom = '#EC6E4C';

export const theme = {
  //headings: { fontFamily: 'sans-serif' },
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000 * 60,
      cacheTime: 5 * 1000 * 60,
      refetchOnWindowFocus: false,
    },
  },
});

export function formatUnixTimestamp(unixTimestamp: number): [string, string] {
  const date = new Date(unixTimestamp * 1000);
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const day = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const formattedDate = `${day}, ${dayOfMonth}`;
  const formattedTime = `${hours}:${minutes}`;

  return [formattedDate, formattedTime];
}

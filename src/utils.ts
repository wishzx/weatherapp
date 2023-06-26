import { QueryClient } from '@tanstack/react-query';

export const orangeCustom = '#EC6E4C';

export const API_KEY = 'f8a3a62c1c7c7d8e39956c2e270c9d50'; //in production move this secret to a .env on the server that call the openweather api instead

export const theme = {
  //headings: { fontFamily: 'sans-serif' },
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000 * 60, // 5min
      cacheTime: 5 * 1000 * 60,
      refetchOnWindowFocus: false,
    },
  },
});

/**transform unixtimestamp to 2 string with this format ["Su, 26","23:33"] */
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

/** transform unixtimestamp to 2 string with this format "23:55" */
export function getHourAndMinuteFromTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds

  const hour = String(date.getHours()).padStart(2, '0'); // Get hours and pad with leading zero if necessary
  const minute = String(date.getMinutes()).padStart(2, '0'); // Get minutes and pad with leading zero if necessary

  return `${hour}:${minute}`;
}

export function getHourAndMinuteFromTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds

  const hour = String(date.getHours()).padStart(2, '0'); // Get hours and pad with leading zero if necessary
  const minute = String(date.getMinutes()).padStart(2, '0'); // Get minutes and pad with leading zero if necessary

  return `${hour}:${minute}`;
}

export interface CurrentWeatherAPIResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Weather[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    sunrise: number;
    sunset: number;
    country?: string;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

// API calls return an error 401
// API calls return an error 404
// API calls return an error 429
// API calls return errors 500, 502, 503 or 504

import { useState, useEffect } from 'react';

export type GeoLocationPermission = 'granted' | 'denied' | 'unsupported' | 'waiting';

export type GeoLocationData = {
  latitude: number | null;
  longitude: number | null;
};

const useGeoLocation = (): {
  locationPermission: GeoLocationPermission;
  locationData: GeoLocationData;
} => {
  const [locationPermission, setLocationPermission] = useState<GeoLocationPermission>('waiting');
  const [locationData, setLocationData] = useState<GeoLocationData>({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    askForLocationPermission();
  }, []);

  const askForLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationPermission('granted');
          setLocationData({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setLocationPermission('denied');
        },
      );
    } else {
      setLocationPermission('unsupported');
    }
  };
  return { locationPermission, locationData };
};

export default useGeoLocation;

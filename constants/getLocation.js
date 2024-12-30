import { useState } from "react";
import * as Location from "expo-location";

export const useLocation = () => {
  const [location, setLocation] = useState(null);

  const fetchLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      console.log({ loc });

      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  return { location, fetchLocation };
};

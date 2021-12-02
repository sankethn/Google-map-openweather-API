import React, { useState, useEffect } from "react";

const LocationContext = React.createContext({
  coordinates: {
    lat: "",
    lng: "",
  },
  loaded: false,
});

export const LocationContextProvider = (props) => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return (
    <LocationContext.Provider
      value={{
        coordinates: {
          lat: location.coordinates.lat,
          lng: location.coordinates.lng,
        },
        loaded: location.loaded,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationContext;

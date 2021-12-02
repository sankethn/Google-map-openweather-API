import { useContext } from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import LocationContext from "./location-context";

const Maps = () => {
  const locationCtx = useContext(LocationContext);

  return (
    <div>
      {locationCtx.loaded ? (
        <GoogleMap
          defaultZoom={10}
          defaultCenter={{
            lat: Number(locationCtx.coordinates.lat),
            lng: Number(locationCtx.coordinates.lng),
          }}
        />
      ) : (
        "Allow the location"
      )}
    </div>
  );
};

const WrapperMap = withScriptjs(withGoogleMap(Maps));

export default WrapperMap;

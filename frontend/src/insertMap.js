import React from "react";
import { mapsKey } from "./env";
import { brazilCenter } from "./brazilCenter";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export function InsertMapImplementation({ position, setPosition }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: mapsKey,
  });

  return isLoaded ? (
    <GoogleMap
      zoom={4}
      streetView={false}
      center={brazilCenter}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}
      onClick={(e) => { setPosition(e.latLng) }}
      mapContainerClassName="w-full h-full"
    >
      {position && <Marker position={position}></Marker>}
    </GoogleMap>
  ) : (
    <></>
  );
}

export const InsertMap = React.memo(InsertMapImplementation);

import { api } from "./api";
import { mapsKey } from "./env";
import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { coordinatesToPosition } from "./coordinatesToPosition";

export function DisplayMapImplementation({ setSelected }) {
  const [centers, setCenters] = useState([]);
  const brazilCenter = { lat: -14.4086569, lng: -51.31668 };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: mapsKey,
  });

  async function getCenters() {
    const res = await api.get("/bloodCenters");
    setCenters(res.data);
  }

  useEffect(() => {
    getCenters();
  }, []);

  return isLoaded ? (
    <GoogleMap
      zoom={4}
      streetView={false}
      center={brazilCenter}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}
      mapContainerClassName="w-full h-full"
    >
      {centers.map((center) => {
        const position = coordinatesToPosition(center.point.coordinates);
        return (
          <Marker
            key={center.id}
            position={position}
            onClick={() => {
              setSelected(center);
            }}
          ></Marker>
        );
      })}
    </GoogleMap>
  ) : (
    <></>
  );
}

export const DisplayMap = React.memo(DisplayMapImplementation);

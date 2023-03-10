import React from "react";
import styles from "./mapSide.module.scss";

import { MapContainer, GeoJSON } from "react-leaflet";
import dataElement from "../../assets/floor.json";
import "leaflet/dist/leaflet.css";

export const MapSide = () => {
  return (
    <div className={styles.map}>
      <MapContainer
        center={{ lat: 53.91697765446, lng: 27.63463972544 }}
        style={{ height: "100vh" }}
        zoom={19}
      >
        <GeoJSON data={dataElement.features} />
      </MapContainer>
    </div>
  );
};

import { useState } from "react";
import { MapContainer, TileLayer, Circle, useMapEvents } from "react-leaflet";
const Markers = () => {
  const [position, setPosition] = useState("");
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      localStorage.setItem("lat", e.latlng.lat);
      localStorage.setItem("lng", e.latlng.lng);
      localStorage.setItem("changed", 1);
    },
  });

  return position ? (
    <Circle
      center={{ lat: position.lat, lng: position.lng }}
      fillColor="blue"
      radius={5}
    />
  ) : null;
};
export default function LocationMap() {
  return (
    <MapContainer
      center={[32.1321, 35.20923]}
      zoom={16}
      scrollWheelZoom={false}
      style={{ width: "50vw", height: "70vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Markers />
    </MapContainer>
  );
}

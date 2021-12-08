import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(32.132276245036095, 35.20616054534913),
      L.latLng(32.12982314890067, 35.20132184028626),
    ],
    collapsible: false,
    lineOptions: {
      styles: [{ color: "red", weight: 2 }],
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: false,
    draggableWaypoints: false,
    fitSelectedRoutes: false,
    showAlternatives: false,
    createMarker: function () {
      return null;
    },
  });
  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;

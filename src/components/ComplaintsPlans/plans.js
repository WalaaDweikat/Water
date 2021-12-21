import "./plans.css";
import { useEffect, useRef } from "react";
import L from "leaflet";
import Tank from "../../img/tank.png";
import Mahbes from "../../img/mahbes.png";
import Service from "../../img/serviceIcon.png";
import Complaint from "../../img/complaint.png";
import IP from "../../ip.js";
import "leaflet-routing-machine";

export default function ComplaintsPlans() {
  const mapRef = useRef(null);
  const tankIcon = L.icon({
    iconSize: [35, 35],
    iconAnchor: [5, 5],
    popupAnchor: [0, 0],
    iconUrl: Tank,
  });
  const mahbesIcon = L.icon({
    iconSize: [25, 25],
    iconAnchor: [5, 5],
    iconUrl: Mahbes,
  });

  const serviceIcon = L.icon({
    iconSize: [25, 25],
    iconAnchor: [5, 5],
    popupAnchor: [0, 0],
    iconUrl: Service,
  });

  const complaintIcon = L.icon({
    iconSize: [40, 40],
    iconAnchor: [5, 5],
    popupAnchor: [0, 0],
    iconUrl: Complaint,
  });

  const getTanks = async () => {
    const axios = require("axios");
    return await axios.get(IP + "/water/MainTanks");
  };

  const getComplaints = async () => {
    const axios = require("axios");
    return await axios.get(IP + "/water/complaints/getAll");
  };

  const getStopcocks = async (tank_number) => {
    const axios = require("axios");
    return await axios.get(IP + "/water/mahbes/search_tank_number", {
      params: { tank_number: tank_number },
    });
  };
  const colors = ["yellow", "red", "green"];
  useEffect(() => {
    mapRef.current = L.map("map", {
      center: [32.131596, 35.205],
      zoom: 17,
      scrollWheelZoom: false,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });

    getTanks().then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        getStopcocks(res.data[i].tank_number).then((res2) => {
          for (let j = 0; j < res2.data.length; j++) {
            L.Routing.control({
              waypoints: [
                L.latLng(res.data[i].latitude, res.data[i].longitude),
                L.latLng(res2.data[j].latitude, res2.data[j].longitude),
              ],
              collapsible: false,
              lineOptions: {
                styles: [{ color: colors[i], weight: 3 }],
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
            }).addTo(mapRef.current);
            L.marker(
              [res2.data[j].latitude, res2.data[j].longitude],
              {
                draggable: false, // Make the icon dragable
                title: "محبس", // Add a title
                opacity: 1,
                icon: mahbesIcon,
                color: colors[i],
              } // Adjust the opacity
            )
              .addTo(mapRef.current)
              .bindPopup(`<b> المحبس رقم ${res2.data[j].mahbes_number}</b>`);
          }
        });
        L.marker(
          [res.data[i].latitude, res.data[i].longitude],
          {
            draggable: false, // Make the icon dragable
            title: "خزان", // Add a title
            opacity: 1,
            icon: tankIcon,
          } // Adjust the opacity
        )
          .addTo(mapRef.current)
          .bindPopup(
            `<b> الخزان رقم ${res.data[i].tank_number}</b><br> سعة الخزان ${res.data[i].capacity}`
          );
      }
    });

    getComplaints().then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        L.marker(
          [res.data[i].latitude, res.data[i].longitude],
          {
            draggable: false, // Make the icon dragable
            title: "شكوى", // Add a title
            opacity: 1,
            icon: complaintIcon,
          } // Adjust the opacity
        )
          .addTo(mapRef.current)
          .bindPopup(
            `<b> شكوى  رقم ${res.data[i].complaints_number}</b><br> رقم هوية صاحب الشكوى ${res.data[i].id_number}<br> موضوع الشكوى : ${res.data[i].subject}<br> تاريخ الشكوى : ${res.data[i].date}`
          );
      }
    });
  }, []);
  return <div className="map" id="map"></div>;
}

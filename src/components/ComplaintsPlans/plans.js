import "./plans.css";
import L from "leaflet";
import { Form, Input, Button } from "antd";
import { useState, useEffect, useRef } from "react";
import Tank from "../../img/tank.png";
import Mahbes from "../../img/mahbes.png";
import Service from "../../img/serviceIcon.png";
import Complaint from "../../img/complaint.png";
import IP from "../../ip.js";
import "leaflet-routing-machine";

export default function WaterPlansEngineer() {
  const [display, setDisplay] = useState("flex");
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
    iconSize: [35, 35],
    iconAnchor: [5, 5],
    popupAnchor: [0, 0],
    iconUrl: Complaint,
  });
  const getTanks = async () => {
    const axios = require("axios");
    return await axios.get(IP + "/water/MainTanks");
  };

  const getServices = async () => {
    const axios = require("axios");
    return await axios.get(IP + "/water/services");
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

  const getDApoints = async () => {
    const axios = require("axios");
    return await axios.get(IP + "/water/distribution_areas/all");
  };
  const getPumpingBYStopcockId = async (id) => {
    const axios = require("axios");
    console.log(id);
    return await axios.get(IP + "/water/PumpingTime/getBymabes_number", {
      params: { mabes_number: id },
    });
  };
  const colors = ["yellow", "magenta", "red"];
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

    getDApoints().then((res) => {
      let points = [];
      let order = 0;
      for (let i = 0; i < res.data.length; i++) {
        const index = res.data[i].distributionAreaIndex;

        for (let j = 0; j < res.data.length; j++) {
          const a = [];
          if (
            index === res.data[j].distributionAreaIndex &&
            res.data[j].order_ === order
          ) {
            a.push(res.data[j].latitude);
            a.push(res.data[j].Longitude);
            points.push(a);
            order += 1;
            points.push(a);
          }
        }
        const polygon = L.polygon(points, {
          color: "red",
          fillColor: "transparent",
          weight: 1,
        });
        polygon.addTo(mapRef.current);
        L.marker(points[0], {
          icon: L.divIcon({
            className: "text-labels", // Set class for CSS styling
            html: res.data[i].name,
          }),
          zIndexOffset: 1000, // Make appear above other map features
        }).addTo(mapRef.current);
        points = [];
        order = 0;
      }
    });

    getTanks().then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        getStopcocks(res.data[i].tank_number).then((res2) => {
          for (let j = 0; j < res2.data.length; j++) {
            getPumpingBYStopcockId(res2.data[j].mahbes_number).then((res3) => {
              console.log(res3);
              let c = "";
              if (
                res3.data.length &&
                !res3.data[res3.data.length - 1].closing_date
              )
                c = "blue";
              else c = colors[i];
              L.Routing.control({
                waypoints: [
                  L.latLng(res.data[i].latitude, res.data[i].longitude),
                  L.latLng(res2.data[j].latitude, res2.data[j].longitude),
                ],
                collapsible: false,
                lineOptions: {
                  styles: [{ color: c, weight: 3 }],
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
            });
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
              .bindPopup(`<b> محبس رقم ${res2.data[j].mahbes_number}</b>`);
          }
        });
        L.marker(
          [res.data[i].latitude, res.data[i].longitude],
          {
            draggable: false,
            title: "خزان",
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

    getServices().then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        L.marker(
          [res.data[i].latitude, res.data[i].longitude],
          {
            draggable: false, // Make the icon dragable
            title: "خدمة", // Add a title
            opacity: 1,
            icon: serviceIcon,
          } // Adjust the opacity
        )
          .addTo(mapRef.current)
          .bindPopup(
            `<b> خدمة  رقم ${res.data[i].service_number}</b><br> عدد الأفراد${res.data[i].family_number}`
          );
      }
    });
    getComplaints().then((res) => {
      console.log(res);
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

  return (
    <div>
      <div id="map" className="map_Com"></div>
    </div>
  );
}

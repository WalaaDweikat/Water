import "./plans.css";
import L, { map, point, polygon } from "leaflet";
import { Form, Input, Button, Select } from "antd";
import { useState, useEffect, useRef } from "react";
import Tank from "../../img/tank.png";
import Mahbes from "../../img/mahbes.png";
import Service from "../../img/serviceIcon.png";
import Complaint from "../../img/complaint.png";
import IP from "../../ip.js";

let points = [];
function inside(point, vs) {
  var x = point[0],
    y = point[1];
  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    var xi = vs[i][0],
      yi = vs[i][1];
    var xj = vs[j][0],
      yj = vs[j][1];

    var intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

export default function WaterPlansEngineer() {
  const [location, setLocation] = useState([]);
  const [display, setDisplay] = useState("flex");
  const mapRef = useRef(null);
  const [position, setPosition] = useState([0, 0]);
  const [draw, setDraw] = useState(false);
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
            ).addTo(mapRef.current);
          }
        });
        const tank = L.marker(
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
    mapRef.current.on("click", function (e) {
      const a = [];
      a[0] = e.latlng.lat;
      a[1] = e.latlng.lng;
      setPosition(a);
      points.push(a);
      setLocation(points);
    });
  }, []);
  useEffect(() => {
    if (draw === true) {
      points = [];
      setLocation([]);
      setDraw(false);
    }
  }, [draw]);
  useEffect(() => {
    var circleOptions = {
      color: "blue",
      fillColor: "#f03",
      fillOpacity: 0,
    };
    const circle = L.circle(position, 3, circleOptions);
    circle.addTo(mapRef.current);
  }, [position]);

  return (
    <div>
      <Button
        type="primary"
        htmlType="submit"
        style={{ marginTop: "64px", width: "100vw" }}
        onClick={() => {
          document.getElementById("newDA").style.display = display;
          if (display === "none") setDisplay("flex");
          else setDisplay("none");
        }}
      >
        اضغط هنا لتعديل المناطق التوزيعية
      </Button>
      <div className="newDA" id="newDA">
        <Form
          id="form1"
          className="form"
          layout="vertical"
          name="basic"
          labelCol={{
            span: 100,
          }}
          wrapperCol={{
            span: 100,
          }}
          initialValues={{
            remember: false,
          }}
          onFinish={(values) => {
            const polygon = L.polygon(location, {
              color: "red",
              fillColor: "transparent",
            });
            polygon.addTo(mapRef.current);
            document.getElementById("form1").reset();
            setDraw(true);
          }}
          onFinishFailed={(values) => {}}
          autoComplete="off"
        >
          <Form.Item
            label="اسم المنطقة التوزيعية"
            name="DAname"
            rules={[
              {
                required: true,
                message: "أدخل اسم المنطقة التوزيعية",
              },
            ]}
          >
            <Input id="DAname" />
          </Form.Item>
          <div className="buttons">
            <Form.Item
              wrapperCol={{
                offset: 0,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  marginTop: "5px",
                }}
              >
                أضف
              </Button>
            </Form.Item>
          </div>
        </Form>

        <Form
          id="form2"
          className="form"
          layout="vertical"
          labelCol={{
            span: 100,
          }}
          wrapperCol={{
            span: 100,
          }}
          initialValues={{
            remember: false,
          }}
          onFinish={(values) => {}}
          onFinishFailed={(values) => {}}
          autoComplete="off"
        >
          <Form.Item
            label="اختر المنطقة التوزيعية"
            name="DAname_select"
            rules={[
              {
                required: true,
                message: "اختر اسم المنطقة التوزيعية",
              },
            ]}
          >
            <Select id="DAname_select" />
          </Form.Item>
          <div className="buttons">
            <Form.Item
              wrapperCol={{
                offset: 0,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  marginTop: "5px",
                }}
              >
                حذف
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>

      <div id="map" className="map_A"></div>
    </div>
  );
}

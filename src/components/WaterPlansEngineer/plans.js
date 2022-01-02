import "./plans.css";
import L from "leaflet";
import { Form, Input, Button, Select, message } from "antd";
import { useState, useEffect, useRef } from "react";
import Tank from "../../img/tank.png";
import Mahbes from "../../img/mahbes.png";
import Service from "../../img/serviceIcon.png";
import Complaint from "../../img/complaint.png";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import IP from "../../ip.js";
import axios from "axios";
const { Option } = Select;
let points = [];
function inside(point, vs) {
  var x = point[0],
    y = point[1];
  console.log(vs);
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
  const [DA, setDA] = useState([]);
  const [services, setServices] = useState([]);
  const [stopscocks, setStop] = useState([]);
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

  const getStopcocksAll = async () => {
    const axios = require("axios");
    return await axios.get(IP + "/water/mahbes/all").then((res) => {
      setStop(res.data);
    });
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
  const getDA = async () => {
    const axios = require("axios");
    return await axios
      .get(IP + "/water/distributionِareaskey/getDAall")
      .then((res) => {
        console.log("wa;aa", res);
        setDA(res.data);
      });
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
        L.marker(points[points.length - 2], {
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
            ).addTo(mapRef.current);
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
      setServices(res.data);
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
    getStopcocksAll();
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
    getDA();
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
            if (location.length > 2) {
              const bodyFormData = new FormData();
              bodyFormData.append("name", values.DAname);
              bodyFormData.append("points", JSON.stringify(location));
              bodyFormData.append("amount", 0);
              axios({
                method: "post",
                url: IP + "/water/distribution_areas/establishArea",
                data: bodyFormData,
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
                .then((response) => {
                  console.log(response);
                  if (response.data === "added")
                    message.success("تم إضافة المنطقة التوزيعية");
                  else message.error("حدث خطأ ما");
                })
                .catch((error) => {
                  console.log(error);
                });
              const polygon = L.polygon(location, {
                color: "red",
                fillColor: "transparent",
                weight: 1,
              });
              polygon.addTo(mapRef.current);
              L.marker(location[1], {
                icon: L.divIcon({
                  className: "text-labels", // Set class for CSS styling
                  html: values.DAname,
                }),
                zIndexOffset: 1000, // Make appear above other map features
              }).addTo(mapRef.current);
              document.getElementById("form1").reset();
              setDraw(true);

              for (let i = 0; i < services.length; i++) {
                if (
                  !services[i].indexDistributionArea &&
                  inside(
                    [services[i].latitude, services[i].longitude],
                    location
                  )
                ) {
                  const bodyFormData = new FormData();
                  bodyFormData.append("DAname", values.DAname);
                  bodyFormData.append(
                    "service_number",
                    services[i].service_number
                  );
                  axios({
                    method: "put",
                    url: IP + "/water/services/updateDA",
                    data: bodyFormData,
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  })
                    .then((response) => {
                      console.log(response);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
              }

              for (let i = 0; i < stopscocks.length; i++) {
                if (
                  !stopscocks[i].DA &&
                  inside(
                    [stopscocks[i].latitude, services[i].longitude],
                    location
                  )
                ) {
                  const bodyFormData = new FormData();
                  bodyFormData.append("DA", values.DAname);
                  bodyFormData.append(
                    "mahbes_number",
                    stopscocks[i].mahbes_number
                  );
                  axios({
                    method: "put",
                    url: IP + "/water/mahbes/update_DA",
                    data: bodyFormData,
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  })
                    .then((response) => {
                      console.log(response);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
              }
            }
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
          onFinish={(values) => {
            console.log(values.DAname_select);
            const bodyFormData = new FormData();
            bodyFormData.append("name", values.DAname_select);
            console.log(IP + "/water/distributionِareaskey/deleteArea");
            axios({
              method: "DELETE",
              url: IP + "/water/distributionِareaskey/deleteArea",
              data: bodyFormData,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
              .then((response) => {
                console.log(response);
                if (response.data == 1) {
                  message.success("تم حذف المنطقة التوزيعية");
                } else message.error("حدث خطأ ما");
              })
              .catch((error) => {
                console.log(error);
              });
          }}
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
            <Select
              id="DAname_select"
              placeholder="اختر اسم المنطقة التوزيعية لحذفها"
            >
              {DA.map((option) => {
                console.log(option);
                return (
                  <Option key={option._index} value={option.name}>
                    {option.name}
                  </Option>
                );
              })}
            </Select>
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

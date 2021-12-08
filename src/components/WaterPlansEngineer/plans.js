import "./plans.css";
import L, { map, point, polygon } from "leaflet";
import { Form, Input, Button, Select } from "antd";
import { useState, useEffect, useRef } from "react";

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
  const [action, setAcction] = useState(-1);
  const [display, setDisplay] = useState("flex");
  const mapRef = useRef(null);
  const [reset, setReset] = useState(false);
  const [position, setPosition] = useState([0, 0]);
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
    let points = [];
    mapRef.current.on("click", function (e) {
      if (reset === true) {
        console.log("walaa");
        points = [];
        setLocation(points);
        console.log(location);
      }
      const a = [];
      a[0] = e.latlng.lat;
      a[1] = e.latlng.lng;
      setPosition(a);
      points.push(a);
      setLocation(points);
    });
  }, []);

  useEffect(() => {
    var circleOptions = {
      color: "blue",
      fillColor: "#f03",
      fillOpacity: 0,
    };
    const circle = L.circle(position, 3, circleOptions);
    circle.addTo(mapRef.current);
  }, [position]);

  useEffect(() => {}, [action]);
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
      <div>
        <Form
          id="newDA"
          className="newDA"
          layout="vertical"
          name="basic"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 8,
          }}
          initialValues={{
            remember: false,
          }}
          onFinish={(values) => {
            if (action === 1) {
              console.log(location);
              const polygon = L.polygon(location, { color: "red" });
              polygon.addTo(mapRef.current);
              document.getElementById("newDA").reset();
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
                onClick={() => {
                  setAcction(1);
                  setReset(true);
                }}
              >
                أضف
              </Button>
            </Form.Item>
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
                  marginRight: "10px",
                }}
                onClick={() => {
                  setAcction(0);
                }}
              >
                حذف
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
      <div id="map" className="map_A"></div>
      {/* <MapContainer
        ref={mapRef}
        center={[32.131596, 35.205]}
        zoom={17}
        scrollWheelZoom={false}
        className="map_A"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Markers location={location} />
      </MapContainer> */}
    </div>
  );
}

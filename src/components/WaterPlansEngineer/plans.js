import "./plans.css";
import L, { map, point, polygon } from "leaflet";
import { Form, Input, Button, Select } from "antd";
import { useState, useEffect, useRef } from "react";
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
  const [action, setAcction] = useState(-1);
  const [display, setDisplay] = useState("flex");
  const mapRef = useRef(null);
  const [position, setPosition] = useState([0, 0]);
  const [draw, setDraw] = useState(false);
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

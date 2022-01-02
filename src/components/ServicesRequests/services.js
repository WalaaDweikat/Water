import { Collapse } from "antd";
import { useEffect, useState } from "react";
import { Image, Button, Form, Select, Input, message } from "antd";
import { Modal } from "react-responsive-modal";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import axios from "axios";
import IP from "../../ip.js";
const { Option } = Select;
const { Panel } = Collapse;
const { TextArea } = Input;

export default function WaterTechCom() {
  const [com, setCom] = useState([]);
  const [com2, setCom2] = useState([]);
  const [open2, setOpen2] = useState(false);
  const [image, setImage] = useState([]);
  const [open, setOpen] = useState(false);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [status, setStatus] = useState(0);
  const [messageres, setMessage] = useState("");
  const [order_number, setOrder_number] = useState(-1);
  const getOrders2 = async () => {
    const axios = require("axios");
    return await axios.get(IP + "/water/transactions2").then((res) => {
      console.log(res.data);
      setCom2(res.data);
    });
  };

  const getOrders = async () => {
    const axios = require("axios");
    return await axios.get(IP + "/water/transactions1").then((res) => {
      console.log(res.data);
      setCom(res.data);
    });
  };

  const getOrderImage = () => {
    const axios = require("axios");
    axios.get(IP + "/water/OrderImages").then((res) => {
      setImage(res.data);
    });
  };

  useEffect(() => {
    getOrders();
    getOrders2();
    getOrderImage();
  }, []);

  const findImage = (order_number) => {
    for (let i = 0; i < image.length; i++) {
      if (image[i].order_number === order_number) return i;
    }
  };
  return (
    <div className="transContainer">
      <div className="space">
        <Collapse className="collapse">
          {com2.map((option) => {
            let b = "";
            let location = null;
            let operation;

            if (option.order_type === 1) {
              b = "نقل اشتراك";
              location = (
                <Button
                  onClick={() => {
                    setLat(option.latitude);
                    setLng(option.longitude);
                    setOpen2(true);
                  }}
                >
                  عرض موقع الخدمة
                </Button>
              );
              operation = (
                <Button style={{ color: "red" }}>
                  اضغط هنا لنقل عنوان الخدمة
                </Button>
              );
            }
            if (option.order_type === 2) {
              b = "حذف اشتراك";
              operation = (
                <Button style={{ color: "red" }}>اضغط هنا لحذف الخدمة</Button>
              );
            }
            const a = " طلب  رقم " + option.order_number + " " + b;
            const name =
              option.first_name +
              " " +
              option.middle_name +
              " " +
              option.last_name;
            const src_id = `data:image/jpeg;base64,${option.building_path}`;
            const src_building = `data:image/jpeg;base64,${option.id_path}`;
            return (
              <Panel header={a} key={option.service_number} className="panel">
                <Image width={100} src={src_id} />
                <Image width={100} src={src_building} />
                <p>الاسم: {name}</p>
                <p>رقم الهوية: {option.id_number}</p>
                <p>رقم الخدمة : {option.service_number}</p>
                {location}
                <Button
                  onClick={() => {
                    setOrder_number(option.order_number);
                    setOpen(true);
                  }}
                >
                  إضافة رد
                </Button>
                {operation}
              </Panel>
            );
          })}

          {com.map((option) => {
            const a = " طلب  رقم " + option.order_number + " طلب اشتراك ";
            const name =
              option.first_name +
              " " +
              option.middle_name +
              " " +
              option.last_name;
            const src_id = `data:image/jpeg;base64,${option.building_path}`;
            const src_building = `data:image/jpeg;base64,${option.id_path}`;
            return (
              <Panel header={a} key={option.order_number} className="panel">
                <Image width={100} src={src_id} />
                <Image width={100} src={src_building} />
                <p>الاسم: {name}</p>
                <p>رقم الهوية: {option.id_number}</p>
                <Button
                  onClick={() => {
                    setLat(option.latitude);
                    setLng(option.longitude);
                    setOpen2(true);
                  }}
                >
                  عرض موقع الخدمة
                </Button>
                <Button
                  onClick={() => {
                    setOrder_number(option.order_number);
                    setOpen(true);
                  }}
                >
                  إضافة رد
                </Button>
                <Button style={{ color: "red" }}>
                  اضغط هنا لإضافة الخدمة الجديدة
                </Button>
              </Panel>
            );
          })}
        </Collapse>

        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          center
        >
          <Form
            style={{ width: "30vw", marginTop: "50px" }}
            layout="vertical"
            name="basic"
            id="form"
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
              setStatus(values.complaintStatus);
              setMessage(values.desc);
              const employee_id = localStorage.getItem("username");
              if (status !== -1 && messageres !== "" && order_number !== -1) {
                const bodyFormData = new FormData();
                bodyFormData.append("employee_id", employee_id);
                bodyFormData.append("status", status);
                bodyFormData.append("message", messageres);
                bodyFormData.append("order_number", order_number);
                axios({
                  method: "post",
                  url: IP + "/water/OrderStatus/newOrderStatus",
                  data: bodyFormData,
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                  .then((response) => {
                    if (response.data === "new order status added")
                      message.success("تم إضافة رد");
                    if (response.data === "already order has status")
                      message.error("تم إضافة رد مسبقا");
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            }}
            onFinishFailed={(error) => {
              console.log(error);
            }}
            autoComplete="off"
          >
            <Form.Item
              label="حالة الطلب"
              name="complaintStatus"
              rules={[
                {
                  required: true,
                  message: "اختر حالة الطلب",
                },
              ]}
            >
              <Select>
                <Option value="1">مرفوضة</Option>
                <Option value="2">مقبولة</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="أضف شرحا"
              name="desc"
              rules={[
                {
                  required: true,
                  message: "أضف شرحا",
                },
              ]}
            >
              <TextArea rows={5} style={{ resize: "none" }} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 10,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginTop: "20px" }}
              >
                إضافة رد
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          open={open2}
          onClose={() => {
            setOpen2(false);
          }}
          center
        >
          <MapContainer
            center={[lat, lng]}
            zoom={16}
            scrollWheelZoom={false}
            style={{ width: "50vw", height: "70vh" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Circle
              center={{ lat: lat, lng: lng }}
              fillColor="blue"
              radius={5}
            />
          </MapContainer>
        </Modal>
      </div>
    </div>
  );
}

import "./register2.css";
import { Button, Form, Select, InputNumber, Input, message } from "antd";
import { useState, useEffect } from "react";
import { EnvironmentFilled } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import BackArrow from "../../img/R.jpg";
import LocationMap from "../LocationMap/location.js";
import "antd/dist/antd.css";
import IP from "../../ip.js";
import axios from "axios";

export default function Register2() {
  const { Option } = Select;
  const history = useHistory();
  const [services, setServices] = useState([]);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [value, setVale] = useState("");
  const getServices = async () => {
    const axios = require("axios");
    return await axios.get(IP + "/water/services/getServicesByid_number", {
      params: { id_number: parseInt(localStorage.getItem("username")) },
    });
  };

  useEffect(() => {
    getServices().then((res) => {
      setServices(res.data);
    });
  }, []);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function handleChange(value) {
    setVale(value);
  }

  return (
    <>
      <div className="register">
        <div className="rr" style={{ marginTop: "50px" }}>
          <img
            src={BackArrow}
            alt="backArrow"
            className="back"
            onClick={() => {
              history.goBack();
            }}
          />
        </div>
        <Form
          name="basic"
          style={{ marginTop: "20px" }}
          wrapperCol={{ span: 40 }}
          initialValues={{ remember: true }}
          onFinish={(values) => {
            const bodyFormData = new FormData();
            bodyFormData.append("latitude", lat);
            bodyFormData.append("longitude", lng);
            bodyFormData.append("service_number", values.select);
            bodyFormData.append("family_number", values.family_members);
            axios({
              method: "put",
              url: IP + "/water/services/updateServiceInfo",
              headers: {
                "Content-Type": "multipart/form-data",
              },
              data: bodyFormData,
            })
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
            history.push("/login");
            window.location.reload();
          }}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="select"
            rules={[{ required: true, message: "اختر أحد خدماتك" }]}
          >
            <Select
              className="select"
              size="large"
              placeholder="اختر أحد خدماتك"
              style={{ height: "40px", borderRadius: "10px" }}
              onChange={handleChange}
            >
              {services.map((option, index) => {
                return (
                  <Option key={index} value={option.service_number} id={index}>
                    {option.service_number}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              icon={<EnvironmentFilled />}
              style={{
                backgroundColor: "#ee2260",
                borderColor: "#ee2260",
                height: "40px",
              }}
              onClick={() => {
                localStorage.removeItem("lat");
                localStorage.removeItem("lng");
                setOpen(true);
              }}
            >
              عنوان الخدمة
            </Button>
          </Form.Item>
          <Form.Item
            label="أدخل عدد أفرادالخدمة"
            name="family_members"
            rules={[{ required: true, message: "أدخل عدد أفراد الأسرة" }]}
          >
            <InputNumber
              style={{ height: "40px", borderRadius: "10px", width: "120px" }}
            />
          </Form.Item>
          <Form.Item label="الخزانات التي أمتلكها">
            <Button
              type="primary"
              style={{
                backgroundColor: "#ee2260",
                borderColor: "#ee2260",
                height: "40px",
                width: "135px",
              }}
              onClick={() => {
                setOpen2(true);
              }}
            >
              أصف خزان
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 40 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "20px", height: "40px" }}
            >
              تسجيل
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          if (localStorage.getItem("lat")) {
            setLat(localStorage.getItem("lat"));
            setLng(localStorage.getItem("lng"));
          }
        }}
        center
      >
        <LocationMap />
      </Modal>
      <Modal
        open={open2}
        onClose={() => {
          setOpen2(false);
        }}
        center
      >
        <Form
          className="newTankForm"
          name="11"
          id="11"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 20,
          }}
          initialValues={{
            remember: false,
          }}
          onFinish={(values) => {
            const capacity = values.cap;
            const bodyFormData = new FormData();
            bodyFormData.append("capacity", capacity);
            bodyFormData.append("service_number", value);
            axios({
              method: "post",
              url: IP + "/water/citizens_tanks/addNewTank",
              headers: {
                "Content-Type": "multipart/form-data",
              },
              data: bodyFormData,
            })
              .then((response) => {
                if (response.data === "added") {
                  message.success("تمت إضافة الخزان");
                  document.getElementById("11").reset();
                }
              })
              .catch((error) => {
                console.log(error);
                message.error("حدث خطأ");
              });
          }}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="السعة"
            name="cap"
            rules={[
              {
                required: true,
                message: "أدخل سعة الخزان",
              },
              {
                pattern: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                message: "يرجى إدخال قيمة صالحة",
              },
            ]}
          >
            <Input id="cap" style={{ borderRadius: "20px" }} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ borderRadius: "20px" }}
            >
              إضافة
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

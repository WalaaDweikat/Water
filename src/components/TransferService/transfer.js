import "antd/dist/antd.css";
import "./transfer.css";
import { Form, Input, Button, Select, Upload, message } from "antd";
import { Modal } from "react-responsive-modal";
import LocationMap from "../LocationMap/location.js";
import ImgCrop from "antd-img-crop";
import { useState, useEffect } from "react";
import axios from "axios";
const { Option } = Select;
export default function TransferService() {
  const [fileList, setFileList] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [services, setServices] = useState([]);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  localStorage.setItem("changed", 0);
  const [open, setOpen] = useState(false);
  const getServices = async () => {
    const axios = require("axios");
    return await axios.get(
      "http://192.168.0.108:5000//water/services/getServicesByid_number",
      {
        params: { id_number: parseInt(localStorage.getItem("username")) },
      }
    );
  };
  const error = () => {
    message.error({
      content: "فشل إرسال الطلب",
      style: {
        marginTop: "30vh",
      },
      duration: 1,
    });
  };
  const success = () => {
    message.success({
      content: "تم إرسال الطلب ",
      style: {
        marginTop: "30vh",
      },
      duration: 1,
    });
  };
  useEffect(() => {
    getServices().then((res) => {
      setServices(res.data);
    });
  }, []);
  const onFinish = async (values) => {
    if (
      fileList.length !== 0 &&
      fileList2.length !== 0 &&
      values.service_number !== "" &&
      document.getElementById("newAddress").placeholder !== ""
    ) {
      const src1 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileList[0].originFileObj);
        reader.onload = () => resolve(reader.result);
      });

      const src2 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileList2[0].originFileObj);
        reader.onload = () => resolve(reader.result);
      });
      const result = src1.split(",");
      const result2 = src2.split(",");
      const bodyFormData = new FormData();
      bodyFormData.append("serviceNumber", values.service_number);
      bodyFormData.append("id_number", localStorage.getItem("username"));
      bodyFormData.append("IdImageName", fileList2[0].name);
      bodyFormData.append("IdImage", result2[1]);
      bodyFormData.append("BuildingImageName", fileList[0].name);
      bodyFormData.append("BuildingImage", result[1]);
      bodyFormData.append("latitude", lat);
      bodyFormData.append("longitude", lng);
      bodyFormData.append("order_type", 1);

      axios({
        method: "post",
        url: "http://192.168.0.108:5000///water/transactions/newOrder/transferSubscription",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: bodyFormData,
      })
        .then((response) => {
          console.log(response.data);
          if (response.data === "new order added") {
            success();
            document.getElementById("form").reset();
            setFileList2([]);
            setFileList([]);
          }
        })
        .catch((error) => {
          console.log(error);
          error();
        });
    } else error();
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const onChange2 = ({ fileList: newFileList }) => {
    setFileList2(newFileList);
  };
  const onPreview2 = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  return (
    <>
      <Form
        className="serviceTransfer"
        layout="vertical"
        name="basic"
        id="form"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="رقم الخدمة" name="service_number">
          <Select>
            {services.map((option) => {
              return (
                <Option
                  key={option.service_number}
                  value={option.service_number}
                >
                  {option.service_number}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item label="العنوان الجديد" name="newAddress">
          <Input
            onClick={() => {
              setOpen(true);
            }}
            id="newAddress"
          />
        </Form.Item>

        <Form.Item label="صورة ملف الترخيص" name="license">
          <ImgCrop rotate>
            <Upload
              beforeUpload={() => false}
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 1 && "+ إدراج"}
            </Upload>
          </ImgCrop>
        </Form.Item>

        <Form.Item label="صورة الهوية" name="id">
          <ImgCrop rotate>
            <Upload
              beforeUpload={() => false}
              listType="picture-card"
              fileList={fileList2}
              onChange={onChange2}
              onPreview={onPreview2}
            >
              {fileList2.length < 1 && "+ إدراج"}
            </Upload>
          </ImgCrop>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 3,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: "20px" }}
          >
            إرسال
          </Button>
        </Form.Item>
      </Form>

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          const a = localStorage.getItem("lat");
          const b = localStorage.getItem("lng");
          if (a !== null && localStorage.getItem("changed") === "1") {
            setLat(a);
            setLng(b);
            document.getElementById("newAddress").placeholder =
              "(" + a + "  ,  " + b + ")";
            localStorage.setItem("changed", 0);
          }
        }}
        center
      >
        <LocationMap />
      </Modal>
    </>
  );
}

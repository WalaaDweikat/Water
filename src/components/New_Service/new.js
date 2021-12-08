import "./new.css";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import LocationMap from "../LocationMap/location.js";
import { Upload, Button, Form, Input, message } from "antd";
import ImgCrop from "antd-img-crop";
import { useState } from "react";
export default function NewService() {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  localStorage.setItem("changed", 0);
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [fileList2, setFileList2] = useState([]);
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
  const onFinish = async (values) => {
    if (
      fileList.length !== 0 &&
      fileList2.length !== 0 &&
      document.getElementById("SAdd").placeholder !== ""
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
      bodyFormData.append("id_number", localStorage.getItem("username"));
      bodyFormData.append("IdImageName", fileList2[0].name);
      bodyFormData.append("IdImage", result2[1]);
      bodyFormData.append("BuildingImageName", fileList[0].name);
      bodyFormData.append("BuildingImage", result[1]);
      bodyFormData.append("latitude", lat);
      bodyFormData.append("longitude", lng);
      bodyFormData.append("order_type", 0);

      axios({
        method: "post",
        url: "http://192.168.0.108:5000///water/transactions/newOrder/subscriptionRequest",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: bodyFormData,
      })
        .then((response) => {
          console.log(response.data);
          if (response.data === "new order added") {
            success();
          }
        })
        .catch((error) => {
          console.log(error);
          error();
        });
    } else error();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
        className="newFrom"
        layout="vertical"
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
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="عنوان الخدمة" name="serviceAddress">
          <Input
            onClick={(e) => {
              setOpen(true);
            }}
            id="SAdd"
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
            offset: 0,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{
              marginTop: "30px",
              background: "rgb(24,144,255)",
              borderColor: "rgb(24,144,255)",
            }}
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
            document.getElementById("SAdd").placeholder =
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

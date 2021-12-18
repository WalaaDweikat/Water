import "./complaints.css";
import { Modal } from "react-responsive-modal";
import LocationMap from "../LocationMap/location.js";
import React, { useState } from "react";
import ImgCrop from "antd-img-crop";
import { Form, Input, Button, Upload, message } from "antd";
import axios from "axios";
const { TextArea } = Input;
export default function Complaints() {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  localStorage.setItem("changed", 0);
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState([]);

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
      values.subject !== undefined &&
      values.desc !== undefined &&
      document.getElementById("address").placeholder !== ""
    ) {
      const src1 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileList[0].originFileObj);
        reader.onload = () => resolve(reader.result);
      });

      const result = src1.split(",");
      const bodyFormData = new FormData();
      bodyFormData.append("id_number", localStorage.getItem("username"));
      bodyFormData.append("subject", values.subject);
      bodyFormData.append("message", values.desc);
      bodyFormData.append("ComplaintImageName", fileList[0].name);
      bodyFormData.append("ComplaintImage", result[1]);
      bodyFormData.append("latitude", lat);
      bodyFormData.append("longitude", lng);

      axios({
        method: "post",
        url: "http://192.168.0.109:5000///water/complaints/newComplaint",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: bodyFormData,
      })
        .then((response) => {
          if (response.data === "new complaint added") {
            success();
            document.getElementById("com").reset();
            setFileList([]);
          } else {
            error();
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
  return (
    <>
      <Form
        className="comForm"
        layout="vertical"
        name="complaints"
        id="com"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="موضوع الشكوى" name="subject">
          <Input />
        </Form.Item>
        <Form.Item label="عنوان الشكوى" name="complaintAddress">
          <Input
            id="address"
            onClick={() => {
              setOpen(true);
            }}
          />
        </Form.Item>
        <Form.Item label="الوصف" name="desc">
          <TextArea rows={5} style={{ resize: "none" }} />
        </Form.Item>
        <Form.Item label="أدرج صورة" name="photo">
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
            document.getElementById("address").placeholder =
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

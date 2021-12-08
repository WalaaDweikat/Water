import "./complaints.css";
import React, { useState } from "react";
import ImgCrop from "antd-img-crop";
import { Form, Input, Button, Upload } from "antd";
export default function Complaints() {
  const { TextArea } = Input;
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [fileList, setFileList] = useState([]);
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
    <Form
      className="comForm"
      layout="vertical"
      name="complaints"
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
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="موضوع الشكوى"
        name="object"
        rules={[
          {
            required: true,
            message: "أدخل موضوع الشكوى",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <div className="comAddress">
        <Form.Item
          label="عنوان الشكوى"
          name="complaintAddress"
          rules={[
            {
              required: true,
              message: "حدد عنوان الشكوى",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>

      <Form.Item
        label="الوصف"
        name="desc"
        rules={[
          {
            required: true,
            message: "أدخل وصف الشكوى",
          },
        ]}
      >
        <TextArea rows={5} style={{ resize: "none" }} />
      </Form.Item>
      <Form.Item label="أدرج صورة ">
        <ImgCrop rotate>
          <Upload
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
        <Button type="primary" htmlType="submit" style={{ marginTop: "20px" }}>
          إرسال
        </Button>
      </Form.Item>
    </Form>
  );
}

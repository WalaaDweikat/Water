import "./rate.css";
import axios from "axios";
import { Form, Input, Button, Rate, message } from "antd";
import { useState } from "react";
import IP from "../../ip.js";
export default function HelpUs() {
  const [value0, setValue0] = useState(-1);
  const [value1, setValue1] = useState(-1);
  const [value2, setValue2] = useState(-1);
  const [value3, setValue3] = useState(-1);

  const success = () => {
    message.success({
      content: "تم التقييم بنجاح ",
      style: {
        marginTop: "30vh",
      },
      duration: 1,
    });
  };

  const onFinish = (values) => {
    const bodyFormData = new FormData();
    bodyFormData.append("color", values["0"]);
    bodyFormData.append("view", values["1"]);
    bodyFormData.append("work", values["2"]);
    bodyFormData.append("note", values["3"]);
    bodyFormData.append("userId", parseInt(localStorage.getItem("username")));
    bodyFormData.append("userType", parseInt(localStorage.getItem("type")));

    axios({
      method: "post",
      url: IP + "/water/ratingApp/withnote",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: bodyFormData,
    })
      .then((response) => {
        console.log(response.data);
        if (response.data === "added") {
          success();
          document.getElementById("form").reset();
        }
      })
      .catch((error) => {
        console.log(error);
        error();
      });
  };
  return (
    <div className="divv">
      <h1>التقييم</h1>
      <Form
        className="rating"
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
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="0"
          label="هل ألوان التطبيق مناسبة؟"
          rules={[{ required: true, message: "أدخل تقييمك رجاء" }]}
        >
          <Rate
            allowHalf
            onChange={(value) => {
              setValue0(value);
            }}
            value={value0}
            style={{
              background: "#454241",
              width: "100%",
              textAlign: "center",
              marginBottom: "10px",
              fontWeight: "bolder",
            }}
          />
        </Form.Item>

        <Form.Item
          name="1"
          label="هل طريقة العرض مناسبة؟"
          rules={[{ required: true, message: "أدخل تقييمك رجاء" }]}
        >
          <Rate
            allowHalf
            onChange={(value) => {
              setValue1(value);
            }}
            value={value1}
            style={{
              background: "#454241",
              width: "100%",
              textAlign: "center",
              marginBottom: "10px",
              fontWeight: "bolder",
            }}
          />
        </Form.Item>

        <Form.Item
          name="2"
          label="هل ساهم التطبيق في تسهيل العمل؟"
          rules={[{ required: true, message: "أدخل تقييمك رجاء" }]}
        >
          <Rate
            allowHalf
            onChange={(value) => {
              setValue2(value);
            }}
            value={value2}
            style={{
              background: "#454241",
              width: "100%",
              textAlign: "center",
              marginBottom: "10px",
              fontWeight: "bolder",
            }}
          />
        </Form.Item>

        <Form.Item name="3" label="ملاحظات أخرى" rules={[{ required: false }]}>
          <Input
            onChange={(value) => {
              setValue3(value);
            }}
            value={value3}
            style={{
              background: "#454241",
              width: "100%",
              textAlign: "center",
              marginBottom: "10px",
              fontWeight: "bolder",
              color: "white",
            }}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 3,
            span: 100,
          }}
        >
          <Button type="primary" htmlType="submit" style={{ marginTop: "0px" }}>
            تقييم
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

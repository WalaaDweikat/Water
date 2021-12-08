import "./points.css";
import { Form, Input, Button, Rate, Tabs } from "antd";
import { useEffect, useState } from "react";
const { TabPane } = Tabs;

export default function HelpUs() {
  const [position, setPosition] = useState("top");
  const [w, setW] = useState(window.innerWidth);
  const [value, setValue] = useState(0);
  window.addEventListener("resize", () => {
    setW(window.innerWidth);
  });
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    if (w < 350) {
      setPosition("right");
    } else {
      setPosition("top");
    }
  }, [w]);

  const handleChange = (value) => {
    setValue(value);
  };
  return (
    <Tabs
      defaultActiveKey="1"
      className="pointsContanier"
      tabPosition={position}
    >
      <TabPane tab="دورة المياه" key="1">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "50px",
          }}
        >
          <div
            style={{
              paddingBottom: "20px",
              background: "#454241",
              color: "white",
            }}
          >
            تقدير نسبة امتلاء الخزان بعد عملية الضح
          </div>
          <span>
            <Rate
              allowHalf
              onChange={handleChange}
              value={value}
              style={{
                background: "#454241",
                width: "100%",
                textAlign: "center",
                marginBottom: "10px",
                fontWeight: "bolder",
                paddingBottom: "20px",
              }}
            />
          </span>
          <Button type="primary">إرسال</Button>
        </div>
      </TabPane>
      <TabPane tab="قراءة العداد" key="2">
        <Form
          style={{ marginTop: "50px", marginBottom: "20px" }}
          className="helpUs"
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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="قراءة العداد قبل ضخ المياه"
            name="befor"
            rules={[
              {
                required: true,
                message: "يرجى إدخال قيمة",
              },
              {
                pattern: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                message: "يرجى إدخال قيمة صالحة",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 3,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              حفظ
            </Button>
          </Form.Item>
        </Form>

        <Form
          className="helpUs"
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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="قراءة العداد بعد ضخ المياه"
            name="after"
            rules={[
              {
                required: true,
                message: "يرجى إدخال قيمة",
              },
              {
                pattern: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                message: "يرجى إدخال قيمة صالحة",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 3,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              حفظ
            </Button>
          </Form.Item>
        </Form>
      </TabPane>
      <TabPane tab="توضيح" key="3"></TabPane>
    </Tabs>
  );
}

import "./register2.css";
import { Button, Form, Select, InputNumber } from "antd";
import { EnvironmentFilled } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import BackArrow from "../../img/R.jpg";
import "antd/dist/antd.css";
export default function Register2() {
  const { Option } = Select;
  const history = useHistory();
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
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
        onFinish={onFinish}
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
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled">Disabled</Option>
            <Option value="Yiminghe">yiminghe</Option>
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
          >
            عنوان الخدمة
          </Button>
        </Form.Item>
        <Form.Item
          label="أدخل عدد أفرادالخدمة"
          name="family members"
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
  );
}

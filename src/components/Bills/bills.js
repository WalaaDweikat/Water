import "./bills.css";
import { Form, DatePicker, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
export default function Bills() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  return (
    <Form
      className="billForm"
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
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label="الشهر" name="billMonth">
        <DatePicker onChange={onChange} picker="month" />
      </Form.Item>

      <Form.Item label="السنة" name="billYear">
        <DatePicker onChange={onChange} picker="year" />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 0,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" style={{ marginTop: "20px" }}>
          عرض
        </Button>
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
          style={{ marginTop: "20px" }}
          icon={<DownloadOutlined />}
        >
          تنزيل
        </Button>
      </Form.Item>
    </Form>
  );
}

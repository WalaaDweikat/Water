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
      layout="vertical"
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: false,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="تاريخ الفاتورة"
        name="billDate"
        rules={[
          {
            required: true,
            message: "قم بإدخال تاريخ الفاتورة",
          },
        ]}
      >
        <DatePicker onChange={onChange} />
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

import "./delete.css";
import { Form, Input, Button } from "antd";

export default function DeleteService() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className="deleteForm"
      layout="vertical"
      name="basic"
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
        label="رقم الخدمة"
        name="service_number"
        rules={[
          {
            required: true,
            message: "قم بإدخال رقم الخدمة لحذفها",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="كلمة المرور"
        name="password"
        rules={[
          {
            required: true,
            message: "قم بإدخال كلمة المرور",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 3,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" style={{ marginTop: "20px" }}>
          حذف
        </Button>
      </Form.Item>
    </Form>
  );
}

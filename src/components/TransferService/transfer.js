import "antd/dist/antd.css";
import { Form, Input, Button, Select } from "antd";

export default function TransferService() {
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
        remember: false,
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
            message: "قم باختيار رقم الخدمة ",
          },
        ]}
      >
        <Select />
      </Form.Item>

      <Form.Item
        label="العنوان الجديد"
        name="newAddress"
        rules={[
          {
            required: true,
            message: "أدخل العنوان الجديد",
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
          إرسال
        </Button>
      </Form.Item>
    </Form>
  );
}

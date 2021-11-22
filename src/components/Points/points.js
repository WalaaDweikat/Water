import "./points.css";
import { Form, Input, Button, Select } from "antd";

export default function DeleteService() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className>
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
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: "20px" }}
          >
            حفظ
          </Button>
        </Form.Item>
      </Form>

      <Form
        style={{ marginTop: "-200px" }}
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
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: "20px" }}
          >
            حفظ
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

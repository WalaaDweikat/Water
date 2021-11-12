import "./newTank.css";
import { Form, Input, Button } from "antd";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import React from "react";
export default function NewTank() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [open, setOpen] = React.useState(true);
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)} center>
        <Form
          layout="vertical"
          name="basic"
          labelCol={{
            span: 16,
          }}
          wrapperCol={{
            span: 16,
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
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "20px" }}
            >
              حذف
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

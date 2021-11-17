import "./new.css";
import { Upload, message, Button, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
export default function NewService() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const props = {
    name: "file1",
    action: "",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} تم إرفاق الملف بنجاح`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} فشل إرفاق الملف`);
      }
    },
  };

  const props2 = {
    name: "file2",
    action: "",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} تم إرفاق الملف بنجاح`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} فشل إرفاق الملف`);
      }
    },
  };

  return (
    <Form
      className="newFrom"
      layout="vertical"
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
        label="ملف الترخيص"
        name="license"
        rules={[
          {
            required: true,
            message: "قم بإرفاق الترخيص",
          },
        ]}
      >
        <Upload {...props}>
          <Button className="uploadFileButton" icon={<UploadOutlined />}>
            أرفق الملف
          </Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="صورة الهوية"
        name="id"
        rules={[
          {
            required: true,
            message: "قم بإرفاق صورة الهوية",
          },
        ]}
      >
        <Upload {...props2}>
          <Button className="uploadFileButton" icon={<UploadOutlined />}>
            أرفق الملف
          </Button>
        </Upload>
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
          style={{
            marginTop: "30px",
            background: "rgb(24,144,255)",
            borderColor: "rgb(24,144,255)",
          }}
        >
          إرسال
        </Button>
      </Form.Item>
    </Form>
  );
}

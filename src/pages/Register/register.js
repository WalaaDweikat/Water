import "./register.css";
import { Input, Button, Form } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import BackArrow from "../../img/R.jpg";
import "antd/dist/antd.css";

export default function Register() {
  const history = useHistory();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="b">
      <div className="register">
        <div className="rr">
          <img
            src={BackArrow}
            alt="backArrow"
            className="back"
            onClick={() => {
              history.goBack();
            }}
          />
          <div className="newUser">تسـجـيـل مـشـتـرك جـديـد</div>
        </div>
        <Form
          className="form"
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "أدخل رقم هويتك",
              },
            ]}
          >
            <Input
              className="in"
              prefix={<UserOutlined />}
              placeholder="رقم الهوية"
              style={{ height: "40px", width: "300px", borderRadius: "10px" }}
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "يرجى إدخال بريد إلكتروني صالح",
              },
              {
                required: true,
                message: "أدخل بريك الإلكتروني",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="البريد الإلكتروني"
              style={{ height: "40px", width: "300px", borderRadius: "10px" }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "أدخل كلمة المرور",
                // validator: validatePassword,
              },
            ]}
          >
            <Input.Password
              id="password"
              prefix={<LockOutlined />}
              style={{ height: "40px", width: "300px", borderRadius: "10px" }}
              placeholder="كلمة المرور"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,

                message: "أكد كلمة المرور",
              },
            ]}
          >
            <Input.Password
              id="confirmPassword"
              prefix={<LockOutlined />}
              style={{ height: "40px", width: "300px", borderRadius: "10px" }}
              placeholder="تأكيد كلمة المرور"
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 4,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "fit-content",
                height: "40px",
                margin: "30px 0 0 0",
                borderRadius: "10px",
                backgroundColor: "green",
                borderColor: "green",
              }}
            >
              تسجيــل
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

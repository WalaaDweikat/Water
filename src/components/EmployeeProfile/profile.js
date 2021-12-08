import "./profile.css";
import "antd/dist/antd.css";
import NewUserTank from "../NewUserTank/newUserTank.js";
import { useState, useEffect } from "react";
import { Form, Input, Button, Select, Tabs } from "antd";
const { TabPane } = Tabs;
export default function EmployeeProfile() {
  const [count, setCount] = useState(1);
  const [w, setW] = useState(window.innerWidth);
  const [position, setPosition] = useState("top");

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
  return (
    <Tabs
      defaultActiveKey="1"
      className="profileContainer"
      tabPosition={position}
    >
      <TabPane tab="معلوماتي" key="1">
        <div className="sec">
          <div>
            <div className="t">معلومات شخصية</div>
            <Form
              layout="vertical"
              wrapperCol={{
                span: 100,
              }}
              labelCol={{ span: 100 }}
              initialValues={{
                remember: false,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="info"
            >
              <Form.Item label="الاسم الرباعي" name="userName">
                <Input id="username" disabled />
              </Form.Item>
              <Form.Item
                label="المدينة "
                name="address"
                rules={[
                  {
                    required: true,
                    message: "قم بإدخال المدينة",
                  },
                ]}
              >
                <Select id="city" />
              </Form.Item>
              <Form.Item
                label="التجمع"
                name="area"
                rules={[
                  {
                    required: true,
                    message: "قم بإدخال التجمع ",
                  },
                ]}
              >
                <Select id="area" />
              </Form.Item>
              <Form.Item
                label="الشارع"
                name="street"
                rules={[
                  {
                    required: true,
                    message: "قم بإدخال الشارع",
                  },
                ]}
              >
                <Input id="street" />
              </Form.Item>
              <Form.Item
                label="رقم الهاتف المحمول"
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "قم بإدخال رقم الهاتف المحمول",
                  },
                  {
                    pattern: /^(?:\d*)$/,
                    message: "يرجى إدخال أرقام فقط",
                  },
                ]}
              >
                <Input id="phone_number" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    borderRadius: "10px",
                    marginTop: "10px",
                    backgroundColor: "#ee2260",
                    borderColor: "#ee2260",
                  }}
                >
                  حفظ
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div>
            <div className="t">معلومات الحساب</div>
            <Form
              className="info"
              layout="vertical"
              wrapperCol={{
                span: 100,
              }}
              labelCol={{ span: 100 }}
              initialValues={{
                remember: false,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item label="رقم الهوية(اسم المستخدم)">
                <Input id="idNumber" disabled />
              </Form.Item>
              <Form.Item
                name="email"
                label="البريد الإلكتروني"
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
                <Input id="email" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    borderRadius: "10px",
                    marginTop: "10px",
                    backgroundColor: "#ee2260",
                    borderColor: "#ee2260",
                  }}
                >
                  حفظ
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </TabPane>

      <TabPane tab="تغيير كلمة المرور" key="3">
        <div className="sec ">
          <Form
            layout="vertical"
            className="info"
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
            <div className="t">تغيير كلمة المرور</div>
            <Form.Item
              label="كلمة المرور القديمة"
              name="old_password"
              rules={[
                {
                  required: true,
                  message: "أدخل كلمة المرور",
                },
              ]}
            >
              <Input.Password id="old_pass" />
            </Form.Item>
            <Form.Item
              label="كلمة المرور الجديدة"
              name="new_password"
              rules={[
                {
                  required: true,
                  message: "أدخل كلمة المرور",
                },
              ]}
            >
              <Input.Password id="new_pass" />
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
                  borderRadius: "10px",
                  marginTop: "30px",
                  backgroundColor: "#ee2260",
                  borderColor: "#ee2260",
                }}
              >
                حفظ
              </Button>
            </Form.Item>
          </Form>
        </div>
      </TabPane>
    </Tabs>
  );
}

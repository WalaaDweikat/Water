import "./profile.css";
import "antd/dist/antd.css";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import LocationMap from "../LocationMap/location.js";
import { useState, useEffect } from "react";
import { Form, Input, Button, Tabs, message } from "antd";
import IP from "../../ip.js";
const { TabPane } = Tabs;
export default function Profile() {
  localStorage.setItem("changed", 0);

  const [open, setOpen] = useState(false);
  const [w, setW] = useState(window.innerWidth);
  const [position, setPosition] = useState("top");
  const getAccountInfo = async () => {
    const axios = require("axios");
    return await axios.get(IP + "/water/employeeAccount/getEmailById", {
      params: { username: localStorage.getItem("username") },
    });
  };
  const getPersonalInfo = async () => {
    const axios = require("axios");
    return await axios.get(IP + "/water/employees/search_id", {
      params: { id: parseInt(localStorage.getItem("username")) },
    });
  };

  useEffect(() => {
    getAccountInfo().then((res) => {
      document.getElementById("email").placeholder = res.data.email;
    });

    getPersonalInfo().then((res) => {
      const name =
        res.data[0].Fname + " " + res.data[0].Sname + " " + res.data[0].Lname;
      document.getElementById("username").placeholder = name;
      document.getElementById("idNumber").placeholder = res.data[0].id;
      document.getElementById("area").placeholder = res.data[0].area;
      document.getElementById("region").placeholder = res.data[0].region;
      document.getElementById("street").placeholder = res.data[0].street;
    });
  }, []);

  const success = () => {
    message.success({
      content: "تم تغيير كلمة المرور بنجاح ",
      style: {
        marginTop: "30vh",
      },
      duration: 1,
    });
  };

  const error = () => {
    message.error({
      content: "كلمة مرور خاطئة",
      style: {
        marginTop: "30vh",
      },
      duration: 1,
    });
  };

  window.addEventListener("resize", () => {
    setW(window.innerWidth);
  });

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
                remember: true,
              }}
              onFinish={(values) => {
                let area = values.area;
                let region = values.region;
                let street = values.street;

                if (area === undefined)
                  area = document.getElementById("area").placeholder;
                if (region === undefined)
                  region = document.getElementById("region").placeholder;
                if (street === undefined)
                  street = document.getElementById("street").placeholder;

                const bodyFormData = new FormData();
                bodyFormData.append(
                  "id_number",
                  localStorage.getItem("username")
                );
                bodyFormData.append("area", area);
                bodyFormData.append("region", region);
                bodyFormData.append("street", street);
                axios({
                  method: "put",
                  url: IP + "water/employee/updateInfo/all",
                  data: bodyFormData,
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                  .then((response) => {
                    if (response.data === "Updated") {
                      document.getElementById("area").placeholder = area;
                      document.getElementById("region").placeholder = region;
                      document.getElementById("street").placeholder = street;
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="info"
            >
              <Form.Item label="الاسم الرباعي" name="userName">
                <Input id="username" disabled />
              </Form.Item>
              <Form.Item
                label="المدينة "
                name="area"
                rules={[
                  {
                    required: false,
                    message: "قم بإدخال المدينة",
                  },
                ]}
              >
                <Input id="area" />
              </Form.Item>
              <Form.Item
                label="التجمع"
                name="region"
                rules={[
                  {
                    required: false,
                    message: "قم بإدخال التجمع ",
                  },
                ]}
              >
                <Input id="region" />
              </Form.Item>
              <Form.Item
                label="الشارع"
                name="street"
                rules={[
                  {
                    required: false,
                    message: "قم بإدخال الشارع",
                  },
                ]}
              >
                <Input id="street" />
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
              onFinish={(values) => {
                let email = values.email;

                if (email === undefined)
                  email = document.getElementById("email").placeholder;
                const bodyFormData = new FormData();
                bodyFormData.append(
                  "username",
                  localStorage.getItem("username")
                );
                bodyFormData.append("email", email);
                axios({
                  method: "put",
                  url: IP + "/water/employeeAccount/update_email",
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                  data: bodyFormData,
                })
                  .then((response) => {
                    if (response.data === "Updated") {
                      document.getElementById("email").placeholder = email;
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item label="اسم المستخدم">
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
                    required: false,
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

      <TabPane tab="تغيير كلمة المرور" key="2">
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
            onFinish={(values) => {
              let new_pass = values.new_pass;

              const bodyFormData = new FormData();
              bodyFormData.append("username", localStorage.getItem("username"));
              bodyFormData.append("password", new_pass);
              axios({
                method: "put",
                url: IP + "/water/employeeAccount/update_password",
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                data: bodyFormData,
              })
                .then((response) => {
                  if (response.data === "updated") success();
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="t">تغيير كلمة المرور</div>

            <Form.Item
              label="كلمة المرور الجديدة"
              name="new_pass"
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
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          if (localStorage.getItem("lat") !== null) {
            document.getElementById("service_address").placeholder =
              localStorage.getItem("lat") + "," + localStorage.getItem("lng");
          }
        }}
        center
      >
        <LocationMap />
      </Modal>
    </Tabs>
  );
}

import "./profile.css";
import "antd/dist/antd.css";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import LocationMap from "../LocationMap/location.js";
import NewUserTank from "../../components/NewUserTank/newUserTank.js";
import { useState, useEffect } from "react";
import { Form, Input, Button, Select, Tabs, message } from "antd";
const { TabPane } = Tabs;
const { Option } = Select;
export default function Profile() {
  localStorage.setItem("changed", 0);

  const [S_number, setS] = useState("");
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [w, setW] = useState(window.innerWidth);
  const [position, setPosition] = useState("top");
  const getAccountInfo = async () => {
    const axios = require("axios");
    return await axios.get("http://192.168.0.108:5000//water/users/UserBy", {
      params: { username: localStorage.getItem("username") },
    });
  };
  const getPersonalInfo = async () => {
    const axios = require("axios");
    return await axios.get(
      "http://192.168.0.108:5000//water/citizens/search_id_number",
      {
        params: { id_number: localStorage.getItem("username") },
      }
    );
  };
  const getServices = async () => {
    const axios = require("axios");
    return await axios.get(
      "http://192.168.0.108:5000//water/services/getServicesByid_number",
      {
        params: { id_number: parseInt(localStorage.getItem("username")) },
      }
    );
  };

  const getServiceInfo = async (number) => {
    const axios = require("axios");
    return await axios.get(
      "http://192.168.0.108:5000//water/services/getByServiceNumber",
      {
        params: { service_number: number },
      }
    );
  };

  getAccountInfo().then((res) => {
    document.getElementById("idNumber").placeholder = res.data.username;
    document.getElementById("email").placeholder = res.data.email;
  });

  getPersonalInfo().then((res) => {
    const name =
      res.data[0].first_name +
      " " +
      res.data[0].middle_name +
      " " +
      res.data[0].last_name;
    document.getElementById("username").placeholder = name;
    document.getElementById("area").placeholder = res.data[0].area;
    document.getElementById("region").placeholder = res.data[0].region;
    document.getElementById("street").placeholder = res.data[0].street;
    document.getElementById("mobile_number").placeholder =
      "0" + res.data[0].mobile_number;
  });

  const handleChange = (value) => {
    localStorage.removeItem("lat");
    localStorage.removeItem("lng");
    document.getElementById("service_address").placeholder = null;
    getServiceInfo(value).then((res) => {
      setS(value);
      document.getElementById("service_address").placeholder =
        res.data[0].latitude + "," + res.data[0].longitude;
      document.getElementById("members_number").placeholder =
        res.data[0].family_number;
      document.getElementById("points").placeholder = res.data[0].points;
      document.getElementById("height").placeholder = res.data[0].height;
    });
  };

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
    getServices().then((res) => {
      setServices(res.data);
    });
  }, [w, S_number]);

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
                let mobile_number = values.mobile_number;

                if (area === undefined)
                  area = document.getElementById("area").placeholder;
                if (region === undefined)
                  region = document.getElementById("region").placeholder;
                if (street === undefined)
                  street = document.getElementById("street").placeholder;
                if (mobile_number === undefined)
                  mobile_number =
                    document.getElementById("mobile_number").placeholder;

                const bodyFormData = new FormData();
                bodyFormData.append(
                  "id_number",
                  localStorage.getItem("username")
                );
                bodyFormData.append("area", area);
                bodyFormData.append("region", region);
                bodyFormData.append("street", street);
                bodyFormData.append("mobile_number", mobile_number);
                axios({
                  method: "put",
                  url: "http://192.168.0.108:5000//water/citizens/updateInfo/all",
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
                      document.getElementById("mobile_number").placeholder =
                        mobile_number;
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
              <Form.Item
                label="رقم الهاتف المحمول"
                name="mobile_number"
                rules={[
                  {
                    required: false,
                    message: "قم بإدخال رقم الهاتف المحمول",
                  },
                  {
                    pattern: /^(?:\d*)$/,
                    message: "يرجى إدخال أرقام فقط",
                  },
                ]}
              >
                <Input id="mobile_number" />
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
                  url: "http://192.168.0.108:5000///water/users/updateEmail",
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
      <TabPane tab="معلومات الخدمة" key="2">
        <div className="sec a">
          <div>
            <div className="t">معلومات الخدمة</div>
            <Form
              layout="vertical"
              className="info"
              id="info"
              wrapperCol={{
                span: 100,
              }}
              initialValues={{
                remember: false,
              }}
              onFinish={(values) => {
                let services_select = values.services_select;
                if (services_select !== undefined) {
                  let lat = localStorage.getItem("lat");
                  let lng = localStorage.getItem("lng");
                  let members_number = values.members_number;
                  let height = values.height;

                  if (lat === null) {
                    const a = document
                      .getElementById("service_address")
                      .placeholder.split(",");
                    lat = a[0];
                    lng = a[1];
                  }
                  if (members_number === "" || members_number === undefined) {
                    members_number =
                      document.getElementById("members_number").placeholder;
                  }
                  if (height === "" || height === undefined) {
                    height = document.getElementById("height").placeholder;
                  }
                  const bodyFormData = new FormData();
                  bodyFormData.append(
                    "family_number",
                    parseInt(members_number)
                  );
                  bodyFormData.append("height", parseFloat(height));
                  bodyFormData.append("latitude", lat);
                  bodyFormData.append("longitude", lng);
                  bodyFormData.append(
                    "service_number",
                    parseInt(services_select)
                  );
                  axios({
                    method: "put",
                    url: "http://192.168.0.108:5000//water/services/updateServiceInfo",
                    data: bodyFormData,
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  })
                    .then((response) => {
                      if (response.data === "Updated") {
                        document.getElementById("info").reset();
                        message.success("تم تحديث بيانات الخدمة ");
                        setS(-1);
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
              }}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="رقم الخدمة"
                name="services_select"
                rules={[
                  {
                    required: false,
                    message: "اختر رقم الخدمة",
                  },
                ]}
              >
                <Select
                  onChange={handleChange}
                  placeholder="اختر خدمة"
                  id="services_select"
                >
                  {services.map((option) => {
                    return (
                      <Option
                        key={option.service_number}
                        value={option.service_number}
                      >
                        {option.service_number}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                label="عنوان الخدمة"
                name="service_address"
                rules={[
                  {
                    required: false,
                    message: "أدخل عنوان الخدمة",
                  },
                ]}
              >
                <Input
                  id="service_address"
                  onClick={() => {
                    setOpen(true);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="عدد الأفراد"
                name="members_number"
                rules={[
                  {
                    required: false,
                    message: "أدخل عدد الأفراد",
                  },
                ]}
              >
                <Input type="number" id="members_number" min={1} />
              </Form.Item>

              <Form.Item
                label="ارتفاع المنطقة"
                name="height"
                rules={[
                  {
                    pattern: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "يرجى إدخال قيمة صالحة",
                  },
                ]}
              >
                <Input id="height" />
              </Form.Item>

              <Form.Item label="عدد نقاط الخدمة " name="points">
                <Input type="number" id="points" disabled />
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
          <div>
            <div className="ta">
              <NewUserTank service_number={S_number} />
            </div>
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
            onFinish={(values) => {
              let old_pass = values.old_pass;
              let new_pass = values.new_pass;

              const bodyFormData = new FormData();
              bodyFormData.append("username", localStorage.getItem("username"));
              bodyFormData.append("newPassword", new_pass);
              bodyFormData.append("oldPassword", old_pass);
              axios({
                method: "put",
                url: "http://192.168.0.108:5000///water/users/changePass",
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                data: bodyFormData,
              })
                .then((response) => {
                  if (response.data === "password changed") success();
                  else if (response.data === "wrong password") error();
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
              label="كلمة المرور القديمة"
              name="old_pass"
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

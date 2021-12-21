import "./points.css";
import axios from "axios";
import { Form, Input, Button, Rate, Tabs, message, Select } from "antd";
import { useEffect, useState } from "react";
import IP from "../../ip.js";
const { TabPane } = Tabs;
const { Option } = Select;
export default function HelpUs() {
  const [position, setPosition] = useState("top");
  const [w, setW] = useState(window.innerWidth);
  const [value, setValue] = useState(0);
  const [firstReading, setFirstReading] = useState(false);
  const [secondReading, setSecondReading] = useState(false);
  const [feedBack, setFeedBack] = useState(true);
  const [services, setServices] = useState([]);
  const getServices = async () => {
    const axios = require("axios");
    return await axios.get(IP + "/water/services/getServicesByid_number", {
      params: { id_number: parseInt(localStorage.getItem("username")) },
    });
  };
  const error = () => {
    message.error({
      content: "لا يمكن إجراء التقييم الان",
      style: {
        marginTop: "30vh",
      },
      duration: 1,
    });
  };
  const success = () => {
    message.success({
      content: "تم التقييم بنجاح ",
      style: {
        marginTop: "30vh",
      },
      duration: 1,
    });
  };
  useEffect(() => {
    getServices().then((res) => {
      setServices(res.data);
    });
  }, []);
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

  const handleChange = (value) => {
    setValue(value);
  };
  const onFinish = async (values) => {
    if (feedBack && values.service_number !== undefined && value !== 0) {
      const bodyFormData = new FormData();
      bodyFormData.append("service_number", parseInt(values.service_number));
      bodyFormData.append("value", value);
      console.log(value);
      axios({
        method: "post",
        url: IP + "//water/user_feed_back/add",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: bodyFormData,
      })
        .then((response) => {
          console.log(response.data);
          if (response.data === "added") {
            success();
            document.getElementById("form").reset();
            setFeedBack(false);
            setValue(0);
          }
        })
        .catch((error) => {
          console.log(error);
          error();
        });
    } else error();
  };
  return (
    <Tabs
      defaultActiveKey="1"
      className="pointsContanier"
      tabPosition={position}
    >
      <TabPane tab="دورة المياه" key="1" style={{ width: "100vw" }}>
        <Form
          className="feedBack"
          layout="vertical"
          name="basic"
          id="form"
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
          autoComplete="off"
        >
          <Form.Item label="رقم الخدمة" name="service_number">
            <Select>
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
          <Form.Item name="value">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  paddingBottom: "20px",
                  background: "#454241",
                  color: "white",
                  textAlign: "center",
                  paddingTop: "20px",
                }}
              >
                تقدير نسبة امتلاء الخزان بعد عملية الضح
              </div>
              <span>
                <Rate
                  allowHalf
                  onChange={handleChange}
                  value={value}
                  style={{
                    background: "#454241",
                    width: "100%",
                    textAlign: "center",
                    marginBottom: "10px",
                    fontWeight: "bolder",
                    paddingBottom: "20px",
                  }}
                />
              </span>
            </div>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 3,
              span: 100,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "0px" }}
            >
              إرسال
            </Button>
          </Form.Item>
        </Form>
      </TabPane>
      <TabPane tab="قراءة العداد" key="2">
        <Form
          style={{ marginTop: "50px", marginBottom: "20px" }}
          className="helpUs"
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
          onFinish={(values) => {
            if (firstReading) {
              const befor = values.befor;
              const bodyFormData = new FormData();
              bodyFormData.append("user_id", localStorage.getItem("username"));
              bodyFormData.append("first_reading", befor);
              axios({
                method: "post",
                url: IP + "//water/first_reading/add",
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                data: bodyFormData,
              })
                .then((response) => {
                  message.info("تم إضافة القراءة ");
                })
                .catch((error) => {});
              setFirstReading(false);
            } else {
              message.info("لا يمكن تخزين القراءة حاليا");
            }
          }}
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
            <Button type="primary" htmlType="submit">
              حفظ
            </Button>
          </Form.Item>
        </Form>

        <Form
          className="helpUs"
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
          onFinish={(values) => {
            if (secondReading) {
              const after = values.after;
              const bodyFormData = new FormData();
              bodyFormData.append("user_id", localStorage.getItem("username"));
              bodyFormData.append("second_reading", after);
              axios({
                method: "post",
                url: IP + "//water/secondReading/AddNewSecondRading",
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                data: bodyFormData,
              })
                .then((response) => {
                  message.info("تم إضافة القراءة ");
                })
                .catch((error) => {});
              setSecondReading(false);
            } else {
              message.info("لا يمكن تخزين القراءة حاليا");
            }
          }}
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
            <Button type="primary" htmlType="submit">
              حفظ
            </Button>
          </Form.Item>
        </Form>
      </TabPane>
      <TabPane tab="توضيح" key="3">
        <div className="demonstration">
          <span style={{ fontWeight: "bolder" }}>المساعدة</span>
          <p>
            عزيزي المواطن,قم بقراءة العداد ووضع المياه عندك حيث ستتيح لك إمكانية
            جمع النقاط.كلما حصلت على نقاط أكبر كانت الفائدة لك أكبر لاتتردد
          </p>
          <span style={{ fontWeight: "bolder" }}>شاركنا واجمع النقاط</span>
        </div>
      </TabPane>
    </Tabs>
  );
}

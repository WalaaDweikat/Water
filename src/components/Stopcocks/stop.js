import "./stop.css";
import { useEffect, useState } from "react";
import { Form, Button, Select, message } from "antd";
import IP from "../../ip.js";
import axios from "axios";
const { Option } = Select;
export default function Stopcocks() {
  const [Stopcocks, setStopcocks] = useState([]);
  const [process, setProcess] = useState(-1);
  const getStopcocks = async () => {
    const axios = require("axios");
    return await axios.get(IP + "/water/mahbes/all");
  };
  useEffect(() => {
    getStopcocks().then((res) => {
      setStopcocks(res.data);
    });
  }, []);
  return (
    <>
      <Form
        className="stopForm"
        layout="vertical"
        name="form1"
        id="form1"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={(values) => {
          console.log(values.stopcock_number);
          let url = "";
          let method = "";
          let m = "";
          if (process === 0) {
            url = IP + "/water/PumpingTime/endPumping";
            m =
              "تم الآن إغلاق المحبس الرجاء تزويدنا بقراءة العداد الحالية بالإضافة إلى تقييم وضع الخزان الحالي";
            method = "put";
          } else if (process === 1) {
            url = IP + "/water/PumpingTime/newPumpingTime";
            m = "تم الآن فتح المحبس الرجاء تزويدنا بقراءة العداد";
            method = "post";
          }

          axios
            .get(IP + "/water/mahbes/search_mahbes_number", {
              params: { mahbes_number: values.stopcock_number },
            })
            .then((res) => {
              console.log("DA", res.data[0].DA);
              const bodyFormData = new FormData();
              bodyFormData.append("DA", res.data[0].DA);
              bodyFormData.append("username", localStorage.getItem("username"));
              axios({
                method: method,
                url: url,
                data: bodyFormData,
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
                .then((response) => {
                  console.log("pumping", response);
                  message.success("تم");
                })
                .catch((error) => {
                  console.log(error);
                });

              document.getElementById("form1").reset();
              const bodyFormData1 = new FormData();
              bodyFormData1.append("message", m);
              axios({
                method: "post",
                url: IP + "/water/notifications/add",
                data: bodyFormData1,
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
                .then((response) => {
                  console.log("notification", response);
                })
                .catch((error) => {
                  console.log(error);
                });
            });
        }}
        autoComplete="off"
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: "اختر رقم المحبس",
            },
          ]}
          label="اختر رقم المحبس "
          name="stopcock_number"
        >
          <Select>
            {Stopcocks.map((option) => {
              return (
                <Option key={option.mahbes_number} value={option.mahbes_number}>
                  {option.mahbes_number}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: "20px" }}
            onClick={() => {
              setProcess(1);
            }}
          >
            فتح المحبس
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: "20px", marginRight: "10px" }}
            onClick={() => {
              setProcess(0);
            }}
          >
            إغلاق المحبس
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

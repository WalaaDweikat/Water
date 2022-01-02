import { Collapse } from "antd";
import { useEffect, useState } from "react";
import { Button, Form, Select, Input, Image, message } from "antd";
import { Modal } from "react-responsive-modal";
import IP from "../../ip.js";
import axios from "axios";
const { Option } = Select;
const { Panel } = Collapse;
const { TextArea } = Input;

export default function WaterTechCom() {
  const [com, setCom] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageres, setMessage] = useState("");
  const [status, setStatus] = useState(-1);
  const [order_number, setOrder_number] = useState(-1);
  const getComplaints = () => {
    const axios = require("axios");
    return axios.get(IP + "/water/ComplaintsAndImages/all").then((res) => {
      setCom(res.data);
    });
  };

  useEffect(() => {
    getComplaints();
  }, []);

  return (
    <div className="transContainer">
      <div className="space">
        <Collapse className="collapse">
          {com.map((option) => {
            const a = " شكوى رقم " + option.com_number + " : " + option.subject;
            const imgSrc = `data:image/jpeg;base64,${option.com_path}`;
            return (
              <Panel header={a} key={option.com_number} className="panel">
                <Image width={100} src={imgSrc} />
                <p>الوصف: {option.message}</p>

                <Button
                  onClick={() => {
                    setOrder_number(option.com_number);
                    setOpen(true);
                  }}
                >
                  إضافة رد للشكوى
                </Button>
              </Panel>
            );
          })}
        </Collapse>
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          center
        >
          <Form
            style={{ width: "30vw", marginTop: "50px" }}
            layout="vertical"
            name="basic"
            id="form"
            labelCol={{
              span: 100,
            }}
            wrapperCol={{
              span: 100,
            }}
            initialValues={{
              remember: false,
            }}
            onFinish={(values) => {
              setStatus(values.complaintStatus);
              setMessage(values.desc);

              const employee_id = localStorage.getItem("username");
              console.log(status, messageres, order_number);
              if (status !== -1 && messageres !== "" && order_number !== -1) {
                const bodyFormData = new FormData();
                bodyFormData.append("employee_id", employee_id);
                bodyFormData.append("status", status);
                bodyFormData.append("message", messageres);
                bodyFormData.append("complaints_number", order_number);
                axios({
                  method: "post",
                  url: IP + "/water/complaints_status/newcomplaintStatus",
                  data: bodyFormData,
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                  .then((response) => {
                    if (response.data === "new complaints status added")
                      message.success("تم إضافة رد");
                    if (response.data === "already complaint has status")
                      message.error("تم إضافة رد مسبقا");
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            }}
            onFinishFailed={(error) => {
              console.log(error);
            }}
            autoComplete="off"
          >
            <Form.Item
              label="حالة الشكوى"
              name="complaintStatus"
              rules={[
                {
                  required: true,
                  message: "اختر حالة الشكوى",
                },
              ]}
            >
              <Select>
                <Option value="1">مرفوضة</Option>
                <Option value="2">مقبولة</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="أضف شرحا"
              name="desc"
              rules={[
                {
                  required: true,
                  message: "أضف شرحا",
                },
              ]}
            >
              <TextArea rows={5} style={{ resize: "none" }} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 10,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginTop: "20px" }}
              >
                إضافة رد
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

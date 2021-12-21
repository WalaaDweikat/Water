import { Collapse } from "antd";
import { useEffect, useState } from "react";
import { Button, Form, Select, Input } from "antd";
import { Modal } from "react-responsive-modal";
import IP from "../../ip.js";
const { Option } = Select;
const { Panel } = Collapse;
const { TextArea } = Input;

export default function WaterTechCom() {
  const [com, setCom] = useState([]);
  const [image, setImage] = useState([]);
  const [open, setOpen] = useState(false);
  const getComplaints = async () => {
    const axios = require("axios");
    return await axios.get(IP + "/water/complaints/getAll");
  };

  // const getComplaintImage = async (order_number) => {
  //   const axios = require("axios");
  //   return await axios.get(IP + "/water/OrderStatus/getByorder_number", {
  //     params: { order_number: order_number },
  //   });
  // };

  useEffect(() => {
    getComplaints().then((res) => {
      setCom(res.data);
    });
    // getComplaintImage().then((res) => {
    //   console.log(res.data);
    //   setImage(res.data);
    // });
  }, []);
  return (
    <div className="transContainer">
      <div className="space">
        <Collapse className="collapse">
          {com.map((option) => {
            const a =
              " شكوى رقم " + option.complaints_number + " : " + option.subject;
            return (
              <Panel
                header={a}
                key={option.complaints_number}
                className="panel"
              >
                {/* <Image
                  width={100}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                /> */}
                <p>الوصف: {option.message}</p>

                <Button
                  onClick={() => {
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
            onFinish={(values) => {}}
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
                <Option value="0">مرفوضة</Option>
                <Option value="1">مقبولة</Option>
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

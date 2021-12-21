import { Collapse } from "antd";
import { useEffect, useState } from "react";
import { Image, Button, Form, Select, Input } from "antd";
import { Modal } from "react-responsive-modal";
import IP from "../../ip.js";
const { Option } = Select;
const { Panel } = Collapse;
const { TextArea } = Input;

export default function WaterTechCom() {
  const [com, setCom] = useState([]);
  const [image, setImage] = useState([]);
  const [sesrviceNumber, setServiceNumber] = useState("0000");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const getOrders = async () => {
    const axios = require("axios");
    return await axios.get(IP + "/water/transactions");
  };

  const getCitizen = async (id_number) => {
    const axios = require("axios");
    await axios
      .get(IP + "/water/citizens/search_id_number", {
        params: { id_number: id_number },
      })
      .then((res) => {
        setName(
          res.data[0].first_name +
            " " +
            res.data[0].middle_name +
            " " +
            res.data[0].last_name
        );
      });
  };

  const getorderRef = async (order_number) => {
    const axios = require("axios");
    await axios
      .get(IP + "/water/order_ref", {
        params: { order_number: order_number },
      })
      .then((res) => {
        if (res.data) setServiceNumber(res.data.service_number);
        else setServiceNumber("");
      });
  };

  // const getOrderImage = async (order_number) => {
  //   const axios = require("axios");
  //   return await axios.get(IP + "/water/OrderStatus/getByorder_number", {
  //     params: { order_number: order_number },
  //   });
  // };

  useEffect(() => {
    getOrders().then((res) => {
      setCom(res.data);
    });
    // getOrderImage().then((res) => {
    //   setImage(res.data);
    // });
  }, []);
  return (
    <div className="transContainer">
      <div className="space">
        <Collapse className="collapse">
          {com.map((option, index) => {
            const type = option.order_type;
            let b = "";
            if (type === 0) b = "طلب اشتراك";
            if (type === 1) b = "نقل اشتراك";
            if (type === 2) b = "حذف اشتراك";
            const a = " طلب  رقم " + option.order_number + " " + b;

            //getCitizen(option.id_number);
            // getorderRef(option.order_number);
            return (
              <Panel header={a} key={option.order_number} className="panel">
                {/* <Image
                  width={100}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                /> */}
                {/* <Image
                  width={100}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                /> */}
                <p>الاسم: {name}</p>
                <p>رقم الهوية: {option.id_number}</p>
                <p>رقم الخدمة : {sesrviceNumber}</p>
                <Button
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  إضافة رد
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
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginTop: "20px" }}
              >
                حذف الشكوى
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

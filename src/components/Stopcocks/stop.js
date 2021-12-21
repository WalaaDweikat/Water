import "./stop.css";
import { useEffect, useState } from "react";
import { Form, Button, Select } from "antd";
import IP from "../../ip.js";

const { Option } = Select;
export default function Stopcocks() {
  const [Stopcocks, setStopcocks] = useState([]);
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
        name="complaints"
        id="com"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={() => {}}
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
                <Option value={option.mahbes_number}>
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
          >
            فتح المحبس
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: "20px", marginRight: "10px" }}
          >
            إغلاق المحبس
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

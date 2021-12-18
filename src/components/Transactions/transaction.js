import "./trans.css";
import { Collapse } from "antd";
import { useEffect, useState } from "react";
const { Panel } = Collapse;
export default function Transactions() {
  const [trans, setTrans] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const getTransactions = async () => {
    const axios = require("axios");
    return await axios.get(
      "http://192.168.0.109:5000//water/transactionsIdNum",
      {
        params: { id_number: localStorage.getItem("username") },
      }
    );
  };

  const getComplaints = async () => {
    const axios = require("axios");
    return await axios.get(
      "http://192.168.0.109:5000//water/complaints/getComplaintsByid_number",
      {
        params: { id_number: localStorage.getItem("username") },
      }
    );
  };

  const getOrderStatus = async (order_number) => {
    const axios = require("axios");
    return await axios.get(
      "http://192.168.0.109:5000//water/OrderStatus/getByorder_number",
      {
        params: { order_number: order_number },
      }
    );
  };

  const getComplaintStatus = async (com_number) => {
    const axios = require("axios");
    return await axios.get(
      "http://192.168.0.109:5000//water/complaints_status/getBycomplaints_number",
      {
        params: { complaints_number: com_number },
      }
    );
  };

  useEffect(() => {
    getTransactions().then((res) => {
      setTrans(res.data);
    });
    getComplaints().then((res) => {
      setComplaints(res.data);
    });
  }, []);
  return (
    <div className="transContainer">
      <div className="space">
        {trans.map((option) => {
          let status = [];
          getOrderStatus(option.order_number).then((res) => {
            status = res.data;
          });
          let orderStatus = "غير معروف";
          let orderMessage = "لم يتم النظر في الطلب حتى الان";
          if (status.length !== 0) {
            orderMessage = status[0].orderMessage;
            orderStatus = status[0].orderStatus;
          }
          let a = "";
          if (option.order_type === 0)
            a = " طلب رقم " + option.order_number + " : اشتراك خدمة جديدة ";
          else if (option.order_type === 1)
            a = " طلب رقم " + option.order_number + " : تحويل خدمة  ";
          else if (option.order_type === 2)
            a = " طلب رقم " + option.order_number + " : حذف خدمة  ";
          return (
            <Collapse className="collapse">
              <Panel header={a} key={Option.order_number} className="panel">
                <p> رقم الطلب {option.order_number}</p>
                <p> حالة الطلب: {orderStatus}</p>
                <p> توضيح: {orderMessage} </p>
              </Panel>
            </Collapse>
          );
        })}

        {complaints.map((option) => {
          let status = [];
          getComplaintStatus(option.complaints_number).then((res) => {
            status = res.data;
          });
          let orderStatus = "غير معروف";
          let orderMessage = "لم يتم النظر في الشكوى حتى الان";
          if (status.length !== 0) {
            orderMessage = status[0].orderMessage;
            orderStatus = status[0].orderStatus;
          }
          const a =
            " شكوى رقم " + option.complaints_number + " : " + option.subject;
          return (
            <Collapse className="collapse">
              <Panel
                header={a}
                key={option.complaints_number}
                className="panel"
              >
                <p> حالة الشكوى: {orderStatus} </p>
                <p>توضيح: {orderMessage}</p>
              </Panel>
            </Collapse>
          );
        })}
      </div>
    </div>
  );
}

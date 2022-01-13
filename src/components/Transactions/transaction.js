import "./trans.css";
import { Collapse } from "antd";
import { useEffect, useState } from "react";
import IP from "../../ip.js";
const { Panel } = Collapse;
export default function Transactions() {
  const [status, setStatus] = useState([]);
  const [status2, setStatus2] = useState([]);
  const [trans, setTrans] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const getTransactions = () => {
    const axios = require("axios");
    return axios.get(IP + "/water/transactionsIdNum", {
      params: { id_number: localStorage.getItem("username") },
    });
  };

  const getComplaints = () => {
    const axios = require("axios");
    return axios.get(IP + "/water/complaints/getComplaintsByid_number", {
      params: { id_number: localStorage.getItem("username") },
    });
  };

  const getComplaintStatus = () => {
    const axios = require("axios");
    return axios.get(IP + "/water/complaints_status");
  };

  const getOrderStatus = () => {
    const axios = require("axios");
    return axios.get(IP + "/water/OrderStatus");
  };
  useEffect(() => {
    getOrderStatus().then((res) => {
      setStatus(res.data);
    });
    getComplaintStatus().then((res) => {
      setStatus2(res.data);
    });
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
        <Collapse className="collapse">
          {trans.map((option, index) => {
            let orderStatus = "غير معروف";
            let orderMessage = "لم يتم النظر في الطلب حتى الان";

            let a = "";
            if (option.order_type === 0)
              a = " طلب رقم " + option.order_number + " : اشتراك خدمة جديدة ";
            else if (option.order_type === 1)
              a = " طلب رقم " + option.order_number + " : تحويل خدمة  ";
            else if (option.order_type === 2)
              a = " طلب رقم " + option.order_number + " : حذف خدمة  ";

            for (let i = 0; i < status.length; i++) {
              if (status[i].order_number === option.order_number) {
                orderMessage = status[i].message;
                if (status[i].status === 0) orderStatus = "غير مقروءة";
                else if (status[i].status === 1) orderStatus = "مرفوضة";
                else if (status[i].status === 2) orderStatus = "يتم النظر فيها";
                else if (status[i].status === 3)
                  orderStatus = "تم الانتهاء منها";
                break;
              }
            }
            return (
              <Panel header={a} key={index} className="panel">
                <p> حالة الطلب: {orderStatus}</p>
                <p> توضيح: {orderMessage} </p>
              </Panel>
            );
          })}

          {complaints.map((option, index) => {
            let orderStatus = "غير معروف";
            let orderMessage = "لم يتم النظر في الشكوى حتى الان";
            for (let i = 0; i < status2.length; i++) {
              if (status2[i].complaints_number === option.order_number) {
                orderMessage = status2[i].message;

                if (status2[i].status === 0) orderStatus = "غير مقروءة";
                else if (status2[i].status === 1) orderStatus = "مرفوضة";
                else if (status2[i].status === 2)
                  orderStatus = "يتم النظر فيها";
                else if (status2[i].status === 3)
                  orderStatus = "تم الانتهاء منها";
                break;
              }
            }

            const a =
              " شكوى رقم " + option.complaints_number + " : " + option.subject;
            return (
              <Panel header={a} key={index + trans.length} className="panel">
                <p> حالة الشكوى: {orderStatus} </p>
                <p>توضيح: {orderMessage}</p>
              </Panel>
            );
          })}
        </Collapse>
      </div>
    </div>
  );
}

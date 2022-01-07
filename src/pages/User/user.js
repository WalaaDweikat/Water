import "./user.css";
import "./userHome.css";
import "./services.css";
import "antd/dist/antd.css";
import Footer from "../../components/Footer/footer.js";
import Logo from "../../img/256888_109854515773613_2567514_o.jpg";
import Login from "../Login/login.js";
import Profile from "../../components/Profile/profile.js";
import DeleteService from "../../components/DeleteService/delete.js";
import Complaints from "../../components/Complaints/complaints.js";
import TransferService from "../../components/TransferService/transfer.js";
import Rating from "../../components/Rating/rate.js";
import NewService from "../../components/New_Service/new.js";
import Bills from "../../components/Bills/bills.js";
import Transactions from "../../components/Transactions/transaction.js";
import Points from "../../components/Points/points.js";
import IP from "../../ip.js";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
} from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu, Button, Dropdown, notification } from "antd";

import {
  faComment,
  faUser,
  faClipboardList,
  faClone,
  faPlus,
  faRetweet,
  faTimesCircle,
  faFileInvoiceDollar,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import { NotificationOutlined } from "@ant-design/icons";

function User() {
  const [notifications, setNotifications] = useState([]);
  const getNotifications = async () => {
    const axios = require("axios");
    await axios
      .get(IP + "/water/notifications/getAll", {
        params: { username: localStorage.getItem("username") },
      })
      .then((res) => {
        console.log(res);
        setNotifications(res.data);
      });
  };
  const openNotification = (m) => {
    notification.open({
      message: "تنبيه",
      description: m,
    });
  };
  useEffect(() => {
    const axios = require("axios");
    axios
      .get(IP + "/water/notificationUserType", {
        params: { username: localStorage.getItem("username"), type: -1 },
      })
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          openNotification(res.data[i].msg);
          const bodyFormData = new FormData();
          bodyFormData.append("type", -1);
          bodyFormData.append("username", localStorage.getItem("username"));
          bodyFormData.append("id", res.data[i].notificationId);
          axios({
            method: "put",
            url: IP + "/water/notification/markAsSent",
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
  }, []);

  const menu = (
    <Menu style={{ height: "60vh", overflow: "scroll" }}>
      {notifications.map((option, index) => {
        return (
          <Menu.Item key={index} id={option.notification_id}>
            <div>{option.notification_mssage}</div>
            <div>{option.date}</div>
          </Menu.Item>
        );
      })}
    </Menu>
  );
  const [Id, setId] = useState(window.location.pathname);
  const { Content } = Layout;
  const { Header } = Layout;
  const { SubMenu } = Menu;
  const history = useHistory();
  const singout = () => {
    localStorage.removeItem("username");
    history.push("/water_service/login");
  };
  window.addEventListener("click", () => {
    setId(window.location.pathname);
  });

  return (
    <Router>
      <Layout className="userContainer">
        <Header
          className="header"
          style={{ position: "fixed", zIndex: 1, width: "100%" }}
        >
          <div className="logo">
            <img src={Logo} alt="logo" className="logoHeader" />
          </div>

          <Menu theme="dark" mode="horizontal" selectedKeys={[Id]} id="menu">
            <Menu.Item className="item" key="/water_service/user/home">
              <Link to="/water_service/user/home">الرئيسية</Link>
            </Menu.Item>
            <Menu.Item className="item" key="/water_service/user/profile">
              <Link to="/water_service/user/profile">الملف الشخصي</Link>
            </Menu.Item>
            <Menu.Item className="item" key="/water_service/user/transactions">
              <Link to="/water_service/user/transactions">معاملاتي</Link>
            </Menu.Item>
            <SubMenu
              key="water_service/user/services"
              className="item"
              title="خدماتي"
            >
              <Menu.Item key="/water_service/user/new_service">
                <Link to="/water_service/user/new_service">طلب اشتراك</Link>
              </Menu.Item>
              <Menu.Item key="/water_service/user/service_transfer">
                <Link to="/water_service/user/service_transfer">
                  نقل اشتراك
                </Link>
              </Menu.Item>
              <Menu.Item key="/water_service/user/delete_service">
                <Link to="/water_service/user/delete_service">
                  إزالة اشتراك
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item className="item" key="/water_service/user/complaints">
              <Link to="/water_service/user/complaints"> الشكاوي</Link>
            </Menu.Item>
            {/* <Menu.Item className="item" key="/water/user/bills">
              <Link to="/water/user/bills"> الفواتير</Link>
            </Menu.Item> */}
            <Menu.Item className="item" key="/water_service/user/points">
              <Link to="/water_service/user/points"> ساعدنا</Link>
            </Menu.Item>
            <Menu.Item key="/water_service/user/rate_us" className="out">
              <a href="/water_service/user/rate_us">تقييم التطبيق</a>
            </Menu.Item>
            <Menu.Item className="item" key={"8"} disabled>
              <Dropdown overlay={menu} placement={"bottomCenter"} arrow>
                <Button
                  icon={<NotificationOutlined />}
                  onMouseEnter={() => {
                    getNotifications();
                  }}
                ></Button>
              </Dropdown>
            </Menu.Item>

            <Menu.Item key="out" className="out">
              <Button type="primary" onClick={singout}>
                تسجيل الخروج
              </Button>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          <Switch>
            <Route path="/water_service/user/services">
              <div className="userServicesContainer ">
                <Link to="/water_service/user/new_service">
                  <Button type="primary" id="/water_service/user/new_service">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    طلب اشتراك
                  </Button>
                </Link>
                <Link to="/water_service/user/service_transfer">
                  <Button
                    type="primary"
                    id="/water_service/user/service_transfer"
                  >
                    <FontAwesomeIcon icon={faRetweet} className="icon" />
                    نقل اشتراك
                  </Button>
                </Link>
                <Link to="/water_service/user/delete_service">
                  <Button
                    type="primary"
                    id="/water_service/user/delete_service"
                  >
                    <FontAwesomeIcon icon={faTimesCircle} className="icon" />
                    حذف اشتراك
                  </Button>
                </Link>
              </div>
            </Route>
            <Route path="/water_service/user/service_transfer">
              <div className="services">
                <div className="headerServices">نقل اشتراك</div>
                <TransferService />
              </div>
            </Route>
            <Route path="/water_service/user/new_service">
              <div className="services">
                <div className="headerServices">طلب اشتراك جديد</div>
                <NewService />
              </div>
            </Route>
            <Route path="/water_service/user/delete_service">
              <div className="services">
                <div className="headerServices">حذف اشتراك </div>
                <DeleteService />
              </div>
            </Route>
            <Route path="/water_service/user/transactions">
              <Transactions />
            </Route>
            <Route path="/water_service/user/home">
              <div className="userHomeContainer ">
                <Link to="/water_service/user/profile">
                  <Button
                    type="primary"
                    id="/water_service/user/profile"
                    icon={<FontAwesomeIcon icon={faUser} className="icon" />}
                  >
                    الملف الشخصي
                  </Button>
                </Link>
                <Link to="/water_service/user/complaints">
                  <Button
                    type="primary"
                    id="/water_service/user/complaints"
                    icon={<FontAwesomeIcon icon={faComment} className="icon" />}
                  >
                    الشكاوي
                  </Button>
                </Link>
                <Link to="/water_service/user/transactions">
                  <Button
                    type="primary"
                    id="/water_service/user/transactions"
                    icon={
                      <FontAwesomeIcon
                        icon={faClipboardList}
                        className="icon"
                      />
                    }
                  >
                    معاملاتي
                  </Button>
                </Link>
                <Link to="/water_service/user/services">
                  <Button
                    type="primary"
                    id="/water_service/user/services"
                    icon={<FontAwesomeIcon icon={faClone} className="icon" />}
                  >
                    خدماتي
                  </Button>
                </Link>
                {/* <Link to="/water/user/bills">
                  <Button
                    type="primary"
                    id="/water/user/bills"
                    icon={
                      <FontAwesomeIcon
                        icon={faFileInvoiceDollar}
                        className="icon"
                      />
                    }
                  >
                    الفواتير
                  </Button>
                </Link> */}
                <Link to="/water_service/user/points">
                  <Button
                    type="primary"
                    id="/water_service/user/points"
                    icon={
                      <FontAwesomeIcon icon={faDollarSign} className="icon" />
                    }
                  >
                    ساعدنا
                  </Button>
                </Link>
              </div>
            </Route>
            <Route path="/water_service/user/complaints">
              <div className="services">
                <div className="headerServices">إدراج شكوى </div>
                <Complaints />
              </div>
            </Route>
            <Route path="/water_service/user/profile">
              <Profile />
            </Route>
            <Route path="/water_service/user/login">
              <Login />
            </Route>
            {/* <Route path="/water/user/bills">
              <div className="services">
                <div className="headerServices">الفواتير</div>
                <Bills />
              </div>
            </Route> */}
            <Route path="/water_service/user/points">
              <Points />
            </Route>
            <Route path="/water_service/user/rate_us">
              <Rating />
            </Route>
          </Switch>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
}

export default User;

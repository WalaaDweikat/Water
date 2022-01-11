import "antd/dist/antd.css";
import Footer from "../../components/Footer/footer.js";
import Logo from "../../img/256888_109854515773613_2567514_o.jpg";
import EmployeeProfile from "../../components/EmployeeProfile/profile.js";
import ServicesRequests from "../../components/ServicesRequests/services.js";
import Rating from "../../components/Rating/rate.js";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
  Redirect,
} from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import { useState } from "react";

function ServicesEmployee() {
  const [Id, setId] = useState(window.location.pathname);
  const { Content } = Layout;
  const { Header } = Layout;
  const history = useHistory();

  const singout = () => {
    localStorage.removeItem("username");
    localStorage.setItem("flag", "0");
    history.push("/water/login");
    window.location.reload();
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
          <Menu theme="dark" mode="horizontal" selectedKeys={[Id]}>
            <Menu.Item className="item" key="/Services_employee/profile">
              <Link to="/Services_employee/profile">الملف الشخصي </Link>
            </Menu.Item>

            <Menu.Item className="item" key="/Services_employee/services">
              <Link to="/Services_employee/services">الخدمات</Link>
            </Menu.Item>
            <Menu.Item className="item" key="/Services_employee/rate_us">
              <Link to="/Services_employee/rate_us">تقييم الموقع</Link>
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
            <Route path="/Services_employee/services">
              {localStorage.getItem("flag") === "1" ? (
                <ServicesRequests />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/Services_employee/profile">
              {localStorage.getItem("flag") === "1" ? (
                <EmployeeProfile />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/Services_employee/rate_us">
              {localStorage.getItem("flag") === "1" ? (
                <Rating />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
          </Switch>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
}

export default ServicesEmployee;

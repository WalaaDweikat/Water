import "antd/dist/antd.css";
import Footer from "../../components/Footer/footer.js";
import Logo from "../../img/256888_109854515773613_2567514_o.jpg";
import EmployeeProfile from "../../components/EmployeeProfile/profile.js";
import Complaints from "../../components/WaterTechCom/waterTechCom.js";
import ComplaintsPlans from "../../components/ComplaintsPlans/plans.js";
import Stopcocks from "../../components/Stopcocks/stop.js";
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

function WaterTech(props) {
  const [Id, setId] = useState(window.location.pathname);
  const { Content } = Layout;
  const { Header } = Layout;
  const history = useHistory();

  const singout = () => {
    localStorage.removeItem("username");
    history.push("/login");
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
            <Menu.Item className="item" key="/water_technician/profile">
              <Link to="/water_technician/profile">الملف الشخصي </Link>
            </Menu.Item>

            <Menu.Item className="item" key="/water_technician/stopcocks">
              <Link to="/water_technician/stopcocks">المحابس</Link>
            </Menu.Item>

            <Menu.Item className="item" key="/water_technician/complaints">
              <Link to="/water_technician/complaints">الشكاوي</Link>
            </Menu.Item>

            <Menu.Item className="item" key="/water_technician/plans">
              <Link to="/water_technician/plans">توزيع الشكاوي</Link>
            </Menu.Item>

            <Menu.Item className="item" key="/water_technician/rate_us">
              <Link to="/water_technician/rate_us">قيمنا</Link>
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
            <Route path="/water_technician/complaints">
              {localStorage.getItem("flag") === "1" ? (
                <Complaints />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>

            <Route path="/water_technician/plans">
              {localStorage.getItem("flag") === "1" ? (
                <ComplaintsPlans />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>

            <Route path="/water_technician/stopcocks">
              {localStorage.getItem("flag") === "1" ? (
                <Stopcocks />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>

            <Route path="/water_technician/profile">
              {localStorage.getItem("flag") === "1" ? (
                <EmployeeProfile />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/water_technician/rate_us">
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

export default WaterTech;

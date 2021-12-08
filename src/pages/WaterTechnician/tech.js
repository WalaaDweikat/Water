import "antd/dist/antd.css";
import Footer from "../../components/Footer/footer.js";
import Logo from "../../img/256888_109854515773613_2567514_o.jpg";
import EmployeeProfile from "../../components/EmployeeProfile/profile.js";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
} from "react-router-dom";
import { Layout, Menu, Button, Form, Input, Select } from "antd";
import { useState } from "react";

import WaterTechCom from "../../components/WaterTechCom/waterTechCom.js";

function WaterTechnician(props) {
  const username = props.usename;
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [Id, setId] = useState(window.location.pathname);
  const { Content } = Layout;
  const { Header } = Layout;
  const history = useHistory();

  const singout = () => {
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
            <Menu.Item className="item" key="/water/water_technician/profile">
              <Link to="/water/water_technician/profile">معلوماتي </Link>
            </Menu.Item>

            <Menu.Item
              className="item"
              key="/water/water_technician/complaints"
            >
              <Link to="/water/water_technician/tanks">الشكاوي </Link>
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
            <Route path="/water/water_technician/complaints">
              <div className="tanksContainer">
                <h2
                  style={{
                    textAlign: "center",
                    marginBottom: "30px",
                    marginTop: "-50px",
                    color: "#ee2260",
                    fontWeight: "bold",
                  }}
                >
                  الشكاوي
                </h2>
                <WaterTechCom />
              </div>
            </Route>

            <Route path="/water/water_technician/profile">
              <div className="tanksContainer" style={{ height: "fit-content" }}>
                <h2
                  style={{
                    textAlign: "center",
                    marginBottom: "30px",
                    marginTop: "-50px",
                    color: "#ee2260",
                    fontWeight: "bold",
                  }}
                >
                  الملف الشخصي
                </h2>
                <EmployeeProfile />
              </div>
            </Route>
          </Switch>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
}

export default WaterTechnician;

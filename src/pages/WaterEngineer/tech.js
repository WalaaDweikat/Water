import "antd/dist/antd.css";
import Footer from "../../components/Footer/footer.js";
import Logo from "../../img/256888_109854515773613_2567514_o.jpg";
import WaterPlansEngineer from "../../components/WaterPlansEngineer/plans.js";
import EmployeeProfile from "../../components/EmployeeProfile/profile.js";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
} from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import { useState } from "react";

function WaterEngineer(props) {
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
            <Menu.Item className="item" key="/water/water_engineer/profile">
              <Link to="/water/water_engineer/profile">الملف الشخصي </Link>
            </Menu.Item>

            <Menu.Item className="item" key="/water/water_engineer/water_plans">
              <Link to="/water/water_engineer/water_plans">شبكات المياه</Link>
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
            <Route path="/water/water_engineer/water_plans">
              <WaterPlansEngineer />
            </Route>

            <Route path="/water/water_engineer/profile">
              <EmployeeProfile />
            </Route>
          </Switch>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
}

export default WaterEngineer;

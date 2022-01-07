import "./admin.css";
import "antd/dist/antd.css";
import Footer from "../../components/Footer/footer.js";
import Logo from "../../img/256888_109854515773613_2567514_o.jpg";
import Login from "../Login/login.js";
import Tanks from "../../components/Tanks/tanks.js";
import Employees from "../../components/Employees/employees.js";
import WaterPlans from "../../components/WaterPlans/plans.js";
import WaterServices from "../../components/WaterServices/comAd.js";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
} from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu, Button } from "antd";
import {
  faTint,
  faArchive,
  faUsers,
  faBorderNone,
} from "@fortawesome/free-solid-svg-icons";

function Admin() {
  const [Id, setId] = useState(window.location.pathname);
  const { Content } = Layout;
  const { Header } = Layout;
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
          <Menu theme="dark" mode="horizontal" selectedKeys={[Id]}>
            <Menu.Item className="item" key="/water_service/admin/home">
              <Link to="/water_service/admin/home">الرئيسية</Link>
            </Menu.Item>
            <Menu.Item className="item" key="/water_service/admin/tanks">
              <Link to="/water_service/admin/tanks">الخزانات والمحابس</Link>
            </Menu.Item>
            <Menu.Item className="item" key="/water_service/admin/water_plans">
              <Link to="/water_service/admin/water_plans">شبكات المياه</Link>
            </Menu.Item>
            <Menu.Item className="item" key="/water_service/admin/services">
              <Link to="/water_service/admin/services"> الاشتراكات</Link>
            </Menu.Item>
            <Menu.Item className="item" key="/water_service/admin/employees">
              <Link to="/water_service/admin/employees"> الموظفيين</Link>
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
            <Route path="/water_service/admin/tanks">
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
                  الخزانات
                </h2>
                <Tanks />
              </div>
            </Route>
            <Route path="/water_service/admin/home">
              <div className="userHomeContainer">
                <Link to="/water_service/admin/employees">
                  <Button
                    type="primary"
                    id="employees"
                    icon={<FontAwesomeIcon icon={faUsers} className="icon" />}
                  >
                    الموظفيين
                  </Button>
                </Link>
                <Link to="/water_service/admin/services">
                  <Button
                    type="primary"
                    id="complaints"
                    icon={<FontAwesomeIcon icon={faTint} className="icon" />}
                  >
                    الاشتراكات
                  </Button>
                </Link>
                <Link to="/water_service/admin/water_plans">
                  <Button
                    type="primary"
                    id="water_plans"
                    icon={
                      <FontAwesomeIcon icon={faBorderNone} className="icon" />
                    }
                  >
                    شبكات المياه
                  </Button>
                </Link>
                <Link to="/water_service/admin/tanks">
                  <Button
                    type="primary"
                    id="tanks"
                    icon={<FontAwesomeIcon icon={faArchive} className="icon" />}
                  >
                    الخزانات
                  </Button>
                </Link>
              </div>
            </Route>
            <Route path="/water_service/admin/employees">
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
                  الموظفين
                </h2>
                <Employees />
              </div>
            </Route>
            <Route path="/water_service/admin/services">
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
                  الاشتراكات
                </h2>
                <WaterServices />
              </div>
            </Route>
            <Route path="/water_service/admin/water_plans">
              <WaterPlans />
            </Route>
            <Route path="/water_service/admin/login">
              <Login />
            </Route>
          </Switch>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
}

export default Admin;

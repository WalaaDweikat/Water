import "./admin.css";
import "antd/dist/antd.css";
import Footer from "../../components/Footer/footer.js";
import Logo from "../../img/256888_109854515773613_2567514_o.jpg";
import Login from "../Login/login.js";
import Tanks from "../../components/Tanks/tanks.js";
import WaterPlans from "../../components/WaterPlans/plans.js";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu, Button } from "antd";
import {
  faComment,
  faArchive,
  faUsers,
  faBorderNone,
} from "@fortawesome/free-solid-svg-icons";

function Admin() {
  const { Content } = Layout;
  const { Header } = Layout;
  const history = useHistory();
  const selectMenu = (e) => {
    let path = e.target.to;
    console.log(path);
    document.getElementById("menu").defaultSelectedKeys = [path];
    console.log(document.getElementById("menu").defaultSelectedKeys);
  };
  const singout = () => {
    history.push("/water/login");
    window.location.reload();
  };

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
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["/water/admin/home"]}
            id="menu"
          >
            <Menu.Item className="item" key="/water/admin/home">
              <Link to="/water/admin/home">الرئيسية</Link>
            </Menu.Item>
            <Menu.Item className="item" key="/water/admin/tanks">
              <Link to="/water/admin/tanks">الخزانات</Link>
            </Menu.Item>
            <Menu.Item className="item" key="/water/admin/water_plans">
              <Link to="/water/admin/water_plans">شبكات المياه</Link>
            </Menu.Item>
            <Menu.Item className="item" key="/water/admin/complaints">
              <Link to="/water/admin/complaints"> الشكاوي</Link>
            </Menu.Item>
            <Menu.Item className="item" key="/water/admin/employees">
              <Link to="/water/admin/employees"> الموظفيين</Link>
            </Menu.Item>
            <Menu.Item className="item" key="/water/admin/mhbes">
              <Link to="/water/admin/mhbes"> المحابس</Link>
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
            <Route path="/water/admin/tanks">
              <div className="tanksContainer">
                <Tanks />
              </div>
            </Route>
            <Route path="/water/admin/home">
              <div className="userHomeContainer aaa">
                <Link to="/water/admin/employees" onClick={selectMenu}>
                  <Button type="primary" id="employees">
                    <FontAwesomeIcon icon={faUsers} className="icon" />
                    الموظفيين
                  </Button>
                </Link>
                <Link to="/water/admin/complaints" onClick={selectMenu}>
                  <Button type="primary" id="complaints">
                    <FontAwesomeIcon icon={faComment} className="icon" />
                    الشكاوي
                  </Button>
                </Link>
                <Link to="/water/admin/water_plans" onClick={selectMenu}>
                  <Button type="primary" id="water_plans">
                    <FontAwesomeIcon icon={faBorderNone} className="icon" />
                    شبكات المياه
                  </Button>
                </Link>
                <Link to="/water/admin/tanks" onClick={selectMenu}>
                  <Button type="primary" id="tanks">
                    <FontAwesomeIcon icon={faArchive} className="icon" />
                    الخزانات
                  </Button>
                </Link>
                <Link to="/water/admin/mhbes" onClick={selectMenu}>
                  <Button type="primary" id="mhbes">
                    <FontAwesomeIcon icon={faArchive} className="icon" />
                    المحابس
                  </Button>
                </Link>
              </div>
            </Route>
            <Route path="/water/admin/employees"></Route>
            <Route path="/water/admin/complaints"></Route>
            <Route path="/water/admin/mhbes"></Route>
            <Route path="/water/admin/water_plans">
              <WaterPlans />
            </Route>
            <Route path="/water/admin/login">
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

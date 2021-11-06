import "./admin.css";
import "antd/dist/antd.css";
import Footer from "../../components/Footer/footer.js";
import Logo from "../../img/256888_109854515773613_2567514_o.jpg";
import Login from "../Login/login.js";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu, Button } from "antd";
import {
  faComment,
  faUser,
  faClipboardList,
  faClone,
  faPlus,
  faRetweet,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

function User() {
  const { Content } = Layout;
  const { Header } = Layout;
  const { SubMenu } = Menu;
  const history = useHistory();
  const selectMenu = (e) => {
    let path = `/water/user/${e.target.id}`;
    document.getElementById("menu").defaultSelectedKeys = [path];
    console.log(e.target.id);
    console.log(document.getElementById("menu").defaultSelectedKeys);
  };
  const singout = () => {
    history.push("/water/login");
    window.location.reload();
  };

  return (
    <Router>
      <Switch>
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
              <Menu.Item className="item" key="/water/admin/profile">
                <Link to="/water/admin/profile">بياناتي</Link>
              </Menu.Item>
              <Menu.Item className="item" key="/water/admin/transactions">
                <Link to="/water/admin/transactions">معاملاتي</Link>
              </Menu.Item>
              <SubMenu
                key="water/admin/services"
                className="item"
                title="خدماتي"
              >
                <Menu.Item key="/water/admin/new_service">
                  <Link to="/water/admin/new_service">طلب اشتراك</Link>
                </Menu.Item>
                <Menu.Item key="/water/admin/service_transfer">
                  <Link to="/water/admin/service_transfer">نقل اشتراك</Link>
                </Menu.Item>
                <Menu.Item key="/water/admin/delete_service">
                  <Link to="/water/admin/delete_service">إزالةاشتراك</Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item className="item" key="/water/admin/complaints">
                <Link to="/water/admin/complaints"> الشكاوي</Link>
              </Menu.Item>
              <Menu.Item key="out" className="out">
                <Button type="primary" onClick={singout}>
                  تسجيل الخروج
                </Button>
              </Menu.Item>
            </Menu>
          </Header>
          <Content>
            <Route path="/water/admin/services"></Route>
            <Route path="/water/admin/service_transfer"></Route>
            <Route path="/water/admin/new_service"></Route>
            <Route path="/water/admin/delete_service"></Route>
            <Route path="/water/admin/transactions"></Route>
            <Route path="/water/admin/home"></Route>
            <Route path="/water/admin/complaints"></Route>
            <Route path="/water/admin/profile"></Route>
            <Route path="/water/admin/login">
              <Login />
            </Route>
          </Content>
          <Footer />
        </Layout>
      </Switch>
    </Router>
  );
}

export default User;

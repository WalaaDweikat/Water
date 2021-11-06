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
              defaultSelectedKeys={["/water/user/home"]}
              id="menu"
            >
              <Menu.Item className="item" key="/water/user/home">
                <Link to="/water/user/home">الرئيسية</Link>
              </Menu.Item>
              <Menu.Item className="item" key="/water/user/profile">
                <Link to="/water/user/profile">بياناتي</Link>
              </Menu.Item>
              <Menu.Item className="item" key="/water/user/transactions">
                <Link to="/water/user/transactions">معاملاتي</Link>
              </Menu.Item>
              <SubMenu
                key="water/user/services"
                className="item"
                title="خدماتي"
              >
                <Menu.Item key="/water/user/new_service">
                  <Link to="/water/user/new_service">طلب اشتراك</Link>
                </Menu.Item>
                <Menu.Item key="/water/user/service_transfer">
                  <Link to="/water/user/service_transfer">نقل اشتراك</Link>
                </Menu.Item>
                <Menu.Item key="/water/user/delete_service">
                  <Link to="/water/user/delete_service">إزالةاشتراك</Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item className="item" key="/water/user/complaints">
                <Link to="/water/user/complaints"> الشكاوي</Link>
              </Menu.Item>
              <Menu.Item key="out" className="out">
                <Button type="primary" onClick={singout}>
                  تسجيل الخروج
                </Button>
              </Menu.Item>
            </Menu>
          </Header>
          <Content>
            <Route path="/water/user/services">
              <div className="userServicesContainer">
                <Link to="/water/user/new_service">
                  <Button type="primary">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    طلب اشتراك
                  </Button>
                </Link>
                <Link to="/water/user/service_transfer">
                  <Button type="primary">
                    <FontAwesomeIcon icon={faRetweet} className="icon" />
                    نقل اشتراك
                  </Button>
                </Link>
                <Link to="/water/user/delete_service">
                  <Button type="primary">
                    <FontAwesomeIcon icon={faTimesCircle} className="icon" />
                    حذف اشتراك
                  </Button>
                </Link>
              </div>
            </Route>
            <Route path="/water/user/service_transfer">
              <p>service_transfer</p>
            </Route>
            <Route path="/water/user/new_service">
              <p>new_service</p>
            </Route>
            <Route path="/water/user/delete_service">
              <DeleteService />
            </Route>
            <Route path="/water/user/transactions">
              <p>transactions</p>
            </Route>
            <Route path="/water/user/home">
              <div className="userHomeContainer">
                <Link to="/water/user/profile">
                  <Button type="primary" id="profile" onClick={selectMenu}>
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    بياناتي
                  </Button>
                </Link>
                <Link to="/water/user/complaints">
                  <Button type="primary" id="complaints" onClick={selectMenu}>
                    <FontAwesomeIcon icon={faComment} className="icon" />
                    الشكاوي
                  </Button>
                </Link>
                <Link to="/water/user/transactions">
                  <Button type="primary" id="transactions" onClick={selectMenu}>
                    <FontAwesomeIcon icon={faClipboardList} className="icon" />
                    معاملاتي
                  </Button>
                </Link>
                <Link to="/water/user/services">
                  <Button type="primary" id="services" onClick={selectMenu}>
                    <FontAwesomeIcon icon={faClone} className="icon" />
                    خدماتي
                  </Button>
                </Link>
              </div>
            </Route>
            <Route path="/water/user/complaints">
              <Complaints />
            </Route>
            <Route path="/water/user/profile">
              <Profile />
            </Route>
            <Route path="/water/user/login">
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

import "./user.css";
import Footer from "../../components/Footer/footer.js";
import UserHome from "../../components/UserHome/userHome.js";
import UserServices from "../../components/UserServices/services.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import Logo from "../../img/256888_109854515773613_2567514_o.jpg";
function App() {
  const { Content } = Layout;
  const { Header } = Layout;
  const { SubMenu } = Menu;
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
            defaultSelectedKeys="/Water/User/Home"
          >
            <Menu.Item className="item" key="/Water/User/Home">
              <Link to="/Water/User/Home">الرئيسية</Link>
            </Menu.Item>
            <Menu.Item className="item" key="/Water/User/Profile">
              <Link to="/Water/User/Profile">بياناتي</Link>
            </Menu.Item>
            <Menu.Item className="item" key="2">
              <Link to="/Water/User/Processing">معاملاتي</Link>
            </Menu.Item>
            <SubMenu key="Services" className="item" title="خدماتي">
              <Menu.Item key="/Water/User/NewService">
                <Link to="/Water/User/NewService">طلب اشتراك</Link>
              </Menu.Item>
              <Menu.Item key="/Water/User/ServiceTransfer">
                <Link to="/Water/User/ServiceTransfer">نقل اشتراك</Link>
              </Menu.Item>
              <Menu.Item key="/Water/User/DeleteService">
                <Link to="/Water/User/DeleteService">إزالةاشتراك</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item className="item" key="/Water/User/Complaints">
              <Link to="/Water/User/Complaints"> الشكاوي</Link>
            </Menu.Item>

            <Menu.Item key="out" className="out">
              <Button type="primary">تسجيل الخروج</Button>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          <switch>
            <Route path="/Water/User/Services">
              <UserServices />
            </Route>
            <Route path="/Water/User/Home">
              <UserHome />
            </Route>
          </switch>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;

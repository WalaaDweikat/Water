import "./officer.css";
import "antd/dist/antd.css";
import Footer from "../../components/Footer/footer.js";
import Logo from "../../img/256888_109854515773613_2567514_o.jpg";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
} from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import { useState } from "react";
import OfficerCom from "../../components/OfficerCom/officierCom.js";

function CollectionOfficer() {
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
            <Menu.Item
              className="item"
              key="/water/collection_officer/complaints"
            >
              <Link to="/water/maintenance_worker/tanks">الشكاوي </Link>
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
            <Route path="/water/collection_officer/complaints">
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
                <OfficerCom />
              </div>
            </Route>
          </Switch>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
}

export default CollectionOfficer;

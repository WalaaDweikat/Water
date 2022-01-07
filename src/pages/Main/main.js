import "./main.css";
import "antd/dist/antd.css";
import { Layout, Menu, Carousel } from "antd";
import Logo from "../../img/256888_109854515773613_2567514_o.jpg";
import Login from "../Login/login.js";
import User from "../User/user.js";
import NewAccount from "../NewAccount/newAccount.js";
import Admin from "../Admin/admin.js";
import Footer from "../../components/Footer/footer.js";
import img1 from "../../img/loginImage.jpg";
import img2 from "../../img/893647_441162895976105_631260900_o.jpg";
import img3 from "../../img/154889906_3768521463227511_155617644466092987_n.jpg";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WaterTechnician from "../WaterTechnician/tech.js";
import WaterEngineer from "../WaterEngineer/tech.js";
import ServicesEmployee from "../ServicesEmployee/tech.js";
export default function Main() {
  const contentStyle = {
    height: "100vh",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const { Content } = Layout;
  const { Header } = Layout;

  return (
    <Router>
      <Layout className="userContainer">
        <Content>
          <Switch>
            <Route path="/water_service/" exact>
              <Header
                className="header"
                style={{ position: "fixed", zIndex: 1, width: "100%" }}
              >
                <div className="logo">
                  <img src={Logo} alt="logo" className="logoHeader" />
                </div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[1]}>
                  <Menu.Item key="out" className="out">
                    <a href="/water_service/login">تسجيل الدخول</a>
                  </Menu.Item>
                  <Menu.Item key="in" className="out">
                    <a href="/water_service/signup">إنشاء حساب</a>
                  </Menu.Item>
                </Menu>
              </Header>
              <div className="mainPageContent">
                <Carousel effect="fade" className="car" dotPosition="right">
                  <div>
                    <div style={contentStyle}>
                      <h1
                        style={{
                          position: "relative",
                          top: "200px",
                          height: "0",
                        }}
                      >
                        بلديــة جماعيـــن
                      </h1>
                      <h2
                        style={{
                          position: "relative",
                          top: "230px",
                          height: "0",
                        }}
                      >
                        قسم المياه
                      </h2>
                      <img
                        alt=""
                        src={img2}
                        style={{
                          width: "100vw",
                          height: "100vh",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div style={contentStyle}>
                      <img
                        alt=""
                        src={img1}
                        style={{
                          width: "100vw",
                          height: "100vh",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div style={contentStyle}>
                      <img
                        alt=""
                        src={img3}
                        style={{
                          width: "100vw",
                          height: "100vh",
                        }}
                      />
                    </div>
                  </div>
                </Carousel>
                {/* <div className="news">
                  <div className="news1">
                    <div className="img">
                      <img
                        alt=""
                        src={img1}
                        style={{ width: "30vw", height: "30vw" }}
                      />
                    </div>
                    <div>
                      <h1>header1</h1>
                      <pre>
                        Text in a pre element is displayed in a fixed-width
                        font, and it preserves both spaces and line breaks
                      </pre>
                    </div>
                  </div>

                  <div className="news1">
                    <div className="img">
                      <img
                        alt=""
                        src={img1}
                        style={{ width: "30vw", height: "30vw" }}
                      />
                    </div>
                    <div>
                      <h1>header1</h1>
                      <pre>
                        Text in a pre element is displayed in a fixed-width
                        font, and it preserves both spaces and line breaks
                      </pre>
                    </div>
                  </div>

                  <div className="news1">
                    <div className="img">
                      <img
                        alt=""
                        src={img1}
                        style={{ width: "30vw", height: "30vw" }}
                      />
                    </div>
                    <div>
                      <h1>header1</h1>
                      <pre>
                        Text in a pre element is displayed in a fixed-width
                        font, and it preserves both spaces and line breaks
                      </pre>
                    </div>
                  </div>
                </div> */}
              </div>
              <Footer />
            </Route>
            <Route path="/water_service/login">
              <Login />
            </Route>
            <Route path="/water_service/signup">
              <NewAccount />
            </Route>
            <Route path="/water_service/user/home">
              <User />
            </Route>
            <Route path="/water_service/admin/home">
              <Admin />
            </Route>
            <Route path="/water_service/user/services">
              <User />
            </Route>
            <Route path="/water_service/user/profile">
              <User />
            </Route>
            <Route path="/water_service/user/complaints">
              <User />
            </Route>
            <Route path="/water_service/user/delete_service">
              <User />
            </Route>
            <Route path="/water_service/user/service_transfer">
              <User />
            </Route>
            <Route path="/water_service/user/new_service">
              <User />
            </Route>
            <Route path="/water_service/admin/tanks">
              <Admin />
            </Route>
            <Route path="/water_service/admin/rate_us">
              <Admin />
            </Route>
            <Route path="/water_service/admin/water_plans">
              <Admin />
            </Route>
            <Route path="/water_service/admin/services">
              <Admin />
            </Route>
            <Route path="/water_service/admin/employees">
              <Admin />
            </Route>
            <Route path="/water_service/admin/mhbes">
              <Admin />
            </Route>
            <Route path="/water_service/user/bills">
              <User />
            </Route>
            <Route path="/water_service/user/transactions">
              <User />
            </Route>
            <Route path="/water_service/user/points">
              <User />
            </Route>
            <Route path="/water_service/water_technician/complaints">
              <WaterTechnician />
            </Route>
            <Route path="/water_service/water_technician/rate_us">
              <WaterTechnician />
            </Route>
            <Route path="/water_service/water_technician/profile">
              <WaterTechnician />
            </Route>
            <Route path="/water_service/water_technician/stopcocks">
              <WaterTechnician />
            </Route>
            <Route path="/water_service/water_technician/plans">
              <WaterTechnician />
            </Route>
            <Route path="/water_service/water_engineer/water_plans">
              <WaterEngineer />
            </Route>
            <Route path="/water_service/water_engineer/rate_us">
              <WaterEngineer />
            </Route>
            <Route path="/water_service/water_engineer/profile">
              <WaterEngineer />
            </Route>
            <Route path="/water_service/Services_employee/profile">
              <ServicesEmployee />
            </Route>
            <Route path="/water_service/Services_employee/rate_us">
              <ServicesEmployee />
            </Route>
            <Route path="/water_service/Services_employee/services">
              <ServicesEmployee />
            </Route>
            <Route path="/water_service/user/rate_us">
              <User />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Router>
  );
}

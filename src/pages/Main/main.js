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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
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
            <Route path="/" exact>
              <Header
                className="header"
                style={{ position: "fixed", zIndex: 1, width: "100%" }}
              >
                <div className="logo">
                  <img src={Logo} alt="logo" className="logoHeader" />
                </div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[1]}>
                  <Menu.Item key="out" className="out">
                    <a href="/login">تسجيل الدخول</a>
                  </Menu.Item>
                  <Menu.Item key="in" className="out">
                    <a href="/signup">إنشاء حساب</a>
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
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <NewAccount />
            </Route>
            <Route path="/user/home">
              {localStorage.getItem("flag") === "1" ? <User /> : <Login />}
            </Route>
            <Route path="/user/services">
              {localStorage.getItem("flag") === "1" ? <User /> : <Login />}
            </Route>
            <Route path="/user/profile">
              {localStorage.getItem("flag") === "1" ? <User /> : <Login />}
            </Route>
            <Route path="/user/complaints">
              {localStorage.getItem("flag") === "1" ? <User /> : <Login />}
            </Route>
            <Route path="/user/delete_service">
              {localStorage.getItem("flag") === "1" ? <User /> : <Login />}
            </Route>
            <Route path="/user/service_transfer">
              {localStorage.getItem("flag") === "1" ? <User /> : <Login />}
            </Route>
            <Route path="/user/new_service">
              {localStorage.getItem("flag") === "1" ? <User /> : <Login />}
            </Route>
            <Route path="/user/rate_us">
              {localStorage.getItem("flag") === "1" ? <User /> : <Login />}
            </Route>
            {/* <Route path="/user/bills">
              <User />
            </Route> */}
            <Route path="/user/transactions">
              {localStorage.getItem("flag") === "1" ? <User /> : <Login />}
            </Route>
            <Route path="/user/points">
              {localStorage.getItem("flag") === "1" ? <User /> : <Login />}
            </Route>
            <Route path="/admin/home">
              {localStorage.getItem("flag") === "1" ? <Admin /> : <Login />}
            </Route>
            <Route path="/admin/tanks">
              {localStorage.getItem("flag") === "1" ? <Admin /> : <Login />}
            </Route>
            <Route path="/admin/rate_us">
              {localStorage.getItem("flag") === "1" ? <Admin /> : <Login />}
            </Route>
            <Route path="/admin/water_plans">
              {localStorage.getItem("flag") === "1" ? <Admin /> : <Login />}
            </Route>
            <Route path="/admin/services">
              {localStorage.getItem("flag") === "1" ? <Admin /> : <Login />}
            </Route>
            <Route path="/admin/employees">
              {localStorage.getItem("flag") === "1" ? <Admin /> : <Login />}
            </Route>
            <Route path="/admin/mhbes">
              {localStorage.getItem("flag") === "1" ? <Admin /> : <Login />}
            </Route>
            <Route path="/water_technician/complaints">
              {localStorage.getItem("flag") === "1" ? (
                <WaterTechnician />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/water_technician/rate_us">
              {localStorage.getItem("flag") === "1" ? (
                <WaterTechnician />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/water_technician/profile">
              {localStorage.getItem("flag") === "1" ? (
                <WaterTechnician />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/water_technician/stopcocks">
              {localStorage.getItem("flag") === "1" ? (
                <WaterTechnician />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/water_technician/plans">
              {localStorage.getItem("flag") === "1" ? (
                <WaterTechnician />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/water_engineer/water_plans">
              {localStorage.getItem("flag") === "1" ? (
                <WaterEngineer />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/water_engineer/rate_us">
              {localStorage.getItem("flag") === "1" ? (
                <WaterEngineer />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/water_engineer/profile">
              {localStorage.getItem("flag") === "1" ? (
                <WaterEngineer />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/Services_employee/profile">
              {localStorage.getItem("flag") === "1" ? (
                <ServicesEmployee />
              ) : (
                <Redirect to="/login" />
              )}
              <ServicesEmployee />
            </Route>
            <Route path="/Services_employee/rate_us">
              {localStorage.getItem("flag") === "1" ? (
                <ServicesEmployee />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/Services_employee/services">
              {localStorage.getItem("flag") === "1" ? (
                <ServicesEmployee />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Router>
  );
}

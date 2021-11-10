import "./main.css";
import "antd/dist/antd.css";
import { Button } from "antd";
import Login from "../Login/login.js";
import User from "../User/user.js";
import NewAccount from "../NewAccount/newAccount.js";
import Admin from "../Admin/admin.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Main() {
  return (
    <Router>
      <Switch>
        <Route path="/water/" exact>
          <div className="container">
            <div className="title">
              <h1>بلدية جماعيــن</h1>
              <h2>قسم المياه</h2>
            </div>
            <div className="singIN">
              <Link to="/water/login">
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#ee2260",
                    border: "1px solid #ee22602",
                    color: "white",
                    borderRadius: "50px",
                  }}
                >
                  تــــســــجــــيــــل الدخـــــول
                </Button>
              </Link>
              <span className="sp">
                ليس لديك حساب؟
                <Link className="a" to="/water/signup">
                  اصغظ هنا
                </Link>
              </span>
            </div>
          </div>
        </Route>
        <Route path="/water/login">
          <Login />
        </Route>
        <Route path="/water/signup">
          <NewAccount />
        </Route>
        <Route path="/water/user/home">
          <User />
        </Route>
        <Route path="/water/admin/home">
          <Admin />
        </Route>
        <Route path="/water/user/services">
          <User />
        </Route>
        <Route path="/water/user/profile">
          <User />
        </Route>
        <Route path="/water/user/complaints">
          <User />
        </Route>
        <Route path="/water/user/delete_service">
          <User />
        </Route>
        <Route path="/water/user/service_transfer">
          <User />
        </Route>
        <Route path="/water/user/new_service">
          <User />
        </Route>
        <Route path="/water/admin/tanks">
          <Admin />
        </Route>
        <Route path="/water/admin/water_plans">
          <Admin />
        </Route>
      </Switch>
    </Router>
  );
}

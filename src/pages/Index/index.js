import "./index.css";
import { Button } from "antd";
import Login from "../Login/login.js";
import Register from "../Register/register";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Index() {
  return (
    <Router>
      <Switch>
        <Route path="/Water/" exact>
          <div className="container">
            <div className="title">
              <h1>بلدية جماعيــن</h1>
              <h2>قسم المياه</h2>
            </div>
            <div className="singIN">
              <Link to="/Water/Login">
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
                <Link className="a" to="/Water/Signup">
                  اصغظ هنا
                </Link>
              </span>
            </div>
          </div>
        </Route>
        <Route path="/Water/Login">
          <Login />
        </Route>
        <Route path="/Water/Signup">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

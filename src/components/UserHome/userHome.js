import "./userHome.css";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faUser,
  faClipboardList,
  faClone,
} from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "antd/dist/antd.css";
export default function UserHome() {
  return (
    <Router>
      <Switch>
        <div className="userHomeContainer">
          <Button type="primary">
            <FontAwesomeIcon icon={faUser} className="icon" />
            بياناتي
          </Button>
          <Button type="primary">
            <FontAwesomeIcon icon={faComment} className="icon" />
            الشكاوي
          </Button>
          <Button type="primary">
            <FontAwesomeIcon icon={faClipboardList} className="icon" />
            معاملاتي
          </Button>
          <Link to="/Water/User/Services">
            <Button type="primary">
              <FontAwesomeIcon icon={faClone} className="icon" />
              خدماتي
            </Button>
          </Link>
        </div>
      </Switch>
    </Router>
  );
}

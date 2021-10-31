import "./services.css";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faRetweet,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import "antd/dist/antd.css";
export default function UserServices() {
  return (
    <div className="userServicesContainer">
      <Button type="primary">
        <FontAwesomeIcon icon={faPlus} className="icon" />
        طلب اشتراك
      </Button>
      <Button type="primary">
        <FontAwesomeIcon icon={faRetweet} className="icon" />
        نقل اشتراك
      </Button>
      <Button type="primary">
        <FontAwesomeIcon icon={faTimesCircle} className="icon" />
        حذف اشتراك
      </Button>
    </div>
  );
}

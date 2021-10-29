import { Layout, Menu, Button } from "antd";
import Logo from "../../img/256888_109854515773613_2567514_o.jpg";
import "./header.css";
export default function Header(props) {
  const { Header } = Layout;
  return (
    <Header className="header">
      <div className="logo">
        <img src={Logo} alt="logo" className="logoHeader" />
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["0"]}>
        <Menu.Item className="item" key="0">
          {props.menuItems[0]}
        </Menu.Item>
        <Menu.Item className="item" key="1">
          {props.menuItems[1]}
        </Menu.Item>
        <Menu.Item className="item" key="2">
          {props.menuItems[2]}
        </Menu.Item>
        <Menu.Item className="item" key="3">
          {props.menuItems[3]}
        </Menu.Item>
        <Menu.Item className="item" key="4">
          {props.menuItems[4]}
        </Menu.Item>
        <Menu.Item key="5" className="out">
          <Button type="primary">تسجيل الخروج</Button>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

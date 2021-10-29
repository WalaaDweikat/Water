import "./user.css";
import { Layout } from "antd";
import Header from "../../components/Header/header.js";
import Footer from "../../components/Footer/footer.js";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

function App() {
  const { Content } = Layout;

  return (
    <Layout className="userContainer">
      <Header
        className="header"
        menuItems={["الرئيسية", "البيانات", "الشكاوي", "معاملاتي", "خدماتي"]}
      />
      <Content>
        <Button typr="primary" icone={<UserOutlined />} shape="round">
          بياناتي
        </Button>
      </Content>

      <Footer />
    </Layout>
  );
}

export default App;

import "./user.css";
import { Layout } from "antd";
import Header from "../../components/Header/header.js";
import Footer from "../../components/Footer/footer.js";
import UserHome from "../../components/UserHome/userHome.js";
function App() {
  const { Content } = Layout;

  return (
    <Layout className="userContainer">
      <Header
        className="header"
        menuItems={["الرئيسية", "البيانات", "الشكاوي", "معاملاتي", "خدماتي"]}
      />
      <Content>
        <UserHome />
      </Content>
      <Footer />
    </Layout>
  );
}

export default App;

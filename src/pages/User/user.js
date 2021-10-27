import { Layout } from "antd";
import Header from "../../components/Header/header.js";
import Footer from "../../components/Footer/footer.js";
import "./user.css";
function App() {
  const { Content } = Layout;

  return (
    <Layout className="userContainer">
      <Header
        className="header"
        menuItems={["الرئيسية", "البيانات", "الشكاوي", "معاملاتي", "خدماتي"]}
      />
      <Footer />
    </Layout>
  );
}

export default App;

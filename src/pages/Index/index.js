import "./index.css";
import { Button } from "antd";

export default function Index() {
  return (
    <div className="container">
      <div className="title">
        <h1>بلدية جماعيــن</h1>
        <h2>قسم المياه</h2>
      </div>

      <div className="singIN">
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
        <span className="sp">
          ليس لديك حساب؟
          <a href="">اصغظ هنا</a>
        </span>
      </div>
    </div>
  );
}

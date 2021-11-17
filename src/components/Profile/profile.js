import "./profile.css";
import "antd/dist/antd.css";
import Line from "../../img/line.PNG";
import { Form, Input, Button, Select } from "antd";
export default function Profile() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="profileContainer">
      <Form
        className="sec"
        layout="vertical"
        name="basic"
        wrapperCol={{
          span: 100,
        }}
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div>
          <div className="t">معلومات شخصية</div>
          <div className="info">
            <div className="labelandinput">
              <label>الاسم الرباعي</label>
              <Input id="username" disabled />
            </div>
            <div className="labelandinput">
              <label>العنوان</label>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "قم بإدخال كلمة المرور",
                  },
                ]}
              >
                <Input id="address" />
              </Form.Item>
            </div>
            <div className="labelandinput">
              <label>رقم الهاتف المحمول</label>
              <Input id="phone_number" />
            </div>
          </div>
        </div>
        <div className="a">
          <div className="t">معلومات الحساب</div>
          <div className="info">
            <div className="labelandinput">
              <label>رقم الهوية</label>
              <Input id="idNumber" disabled />
            </div>
            <div className="labelandinput">
              <label>البريد الإلكتروني</label>
              <Input type="email" id="email" />
            </div>
          </div>
        </div>
      </Form>
      <div className="sec">
        <div>
          <div className="t">
            <img src={Line} style={{ width: "50vw" }} />
            <br />
            معلومات الخدمة
          </div>
          <div className="info">
            <div className="labelandinput">
              <label>رقم الخدمة</label>
              <Select id="idNumber" />
            </div>
            <div className="labelandinput">
              <label>عدد الأفراد</label>
              <Input type="number" id="members_number" />
            </div>
            <div className="labelandinput">
              <label>عدد النقاط</label>
              <Input type="number" id="points_number" />
            </div>
          </div>
        </div>
      </div>

      <div className="sec">
        <div>
          <div className="t">
            <img src={Line} style={{ width: "50vw" }} />
            <br />
            تغيير كلمة المرور
          </div>
          <div className="info">
            <div className="labelandinput">
              <label>كلمة المرور القديمة</label>
              <Input id="old_pass" type="password" />
            </div>
            <div className="labelandinput">
              <label>كلمة المرور الجديدة</label>
              <Input id="new_pass" type="password" />
            </div>
            <div className="labelandinput">
              <label>تأكيد كلمة المرور</label>
              <Input id="confpass" type="password" />
            </div>
          </div>
        </div>
      </div>
      <Button type="primary">حفظ التغييرات</Button>
    </div>
  );
}

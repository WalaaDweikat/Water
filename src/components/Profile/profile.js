import "./profile.css";
import "antd/dist/antd.css";

import { Input, Button } from "antd";

export default function Profile() {
  return (
    <div className="profileContainer">
      <div className="sec">
        <div className="t">حسابي</div>
        <div className="info">
          <div className="labelandinput">
            <label for="username">اسمي الكامل</label>
            <Input id="username" disabled />
          </div>
          <div className="labelandinput">
            <label for="idNumber">رقم الهوية </label>
            <Input id="idNumber" disabled />
          </div>
          <div className="labelandinput">
            <label for="phone_number">رقم الجوال</label>
            <Input type="number" id="phone_number" />
          </div>
          <div className="labelandinput">
            <label for="email">البريد الإلكتروني</label>
            <Input type="email" id="email" />
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="t">معلوماتي</div>
        <div className="info">
          <div className="labelandinput">
            <label for="username">عنواني</label>
            <Input id="username" />
          </div>
          <div className="labelandinput">
            <label for="idNumber">عدد أفراد أسرتي</label>
            <Input type="number" id="idNumber" />
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="t">تغيير كلمة المرور</div>
        <div className="info">
          <div className="labelandinput">
            <label for="old_pass">كلمة المرور القديمة</label>
            <Input id="old_pass" type="password" />
          </div>
          <div className="labelandinput">
            <label for="new_pass">كلمة المرور الجديدة</label>
            <Input id="new_pass" type="password" />
          </div>
          <div className="labelandinput">
            <label for="confpass">تأكيد كلمة المرور</label>
            <Input id="confpass" type="password" />
          </div>
        </div>
      </div>
      <Button type="primary">حفظ التغييرات</Button>
    </div>
  );
}

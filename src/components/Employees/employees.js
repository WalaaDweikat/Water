import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form, Select, message } from "antd";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import "antd/dist/antd.css";
import "../Tanks/tanks.css";
import "./employees.css";
import "react-responsive-modal/styles.css";
import IP from "../../ip.js";
const EditableContext = React.createContext(null);
const { Search } = Input;
const { Option } = Select;

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form} style={{ background: "red" }}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: ` قم بتعبئة ${title}`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
          fontSize: "15px",
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
class Employees extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "اسم الموطف",
        dataIndex: "name",
        width: "30%",
        editable: false,
      },
      {
        title: "رقم الهوية",
        dataIndex: "id",
        editable: false,
        width: "10%",
      },
      {
        title: "العنوان",
        dataIndex: "address",
        editable: false,
      },
      {
        title: "الوظيفة",
        dataIndex: "job",
        editable: false,
      },
      {
        title: "العملية",
        dataIndex: "operation",
        width: "10%",

        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="هل أنت متأكد من الحذف"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a style={{ color: "red" }}>حذف</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [],
      dataSource2: [],
      count: 0,
      open: false,
      open2: false,
      open3: false,
      job: "",
      selectValue: "",
      username: "",
      password: "",
    };
  }
  componentDidMount() {
    const a = [];
    let i = 0;

    this.getEmployees().then((res) => {
      for (; i < res.data.length; i++) {
        let job = "";
        if (res.data[i].type == 1) job = "مهندس مي";
        if (res.data[i].type == 2) job = "فني مي";
        if (res.data[i].type == 3) job = "موظف الخدمات";
        if (res.data[i].type == 4) job = "موظف العدادات ";
        if (res.data[i].type == 5) job = "موظف والشحن";
        const name =
          res.data[i].Fname +
          " " +
          res.data[i].Sname +
          " " +
          res.data[i].Lname +
          " ";
        const address =
          res.data[i].region +
          " " +
          res.data[i].area +
          " " +
          res.data[i].street +
          " ";
        const data = {
          key: i,
          name: name,
          id: res.data[i].id,
          address: address,
          job: job,
        };
        a.push(data);
      }
      this.setState({
        dataSource: a,
        dataSource2: a,
        count: i,
      });
    });
  }
  async getEmployees() {
    const axios = require("axios");
    return await axios.get(IP + "/water/employees/all1");
  }

  async deleteEmployee(id) {
    const bodyFormData = new FormData();
    bodyFormData.append("id", parseInt(id));
    axios({
      method: "delete",
      url: IP + "/water/employees/delete",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: bodyFormData,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async addnewEmployee(fName, sName, lName, job, id) {
    const bodyFormData = new FormData();
    bodyFormData.append("id", id);
    bodyFormData.append("fName", fName);
    bodyFormData.append("sName", sName);
    bodyFormData.append("lName", lName);
    bodyFormData.append("type", job);
    bodyFormData.append("email", "");
    axios({
      method: "post",
      url: IP + "/water/employeeAccount/newEmployeeForSystem",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: bodyFormData,
    })
      .then((response) => {
        this.setState({
          username: response.data["username"],
          password: response.data["password"],
        });
        message.success("تمت إضافة موظف جديد");
      })
      .catch((error) => {
        console.log(error);
        message.error("حدث خطأ");
      });
  }

  onFinish = (values) => {
    let employeeName = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let id = document.getElementById("id").value;
    this.handleAdd(employeeName, address, id);
    this.handleClose();
    this.setState({
      dataSource: [...this.state.dataSource],
      open2: true,
    });
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    const id = this.state.dataSource[key].id;
    this.deleteEmployee(id).then((res) => console.log(res));
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
      count: this.state.count - 1,
    });
  };
  handleAdd = (employeeName, address, id) => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: employeeName,
      employeeName: employeeName,
      address: address,
      id: id,
      job: this.state.job,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };
  handleOpen() {
    this.setState({
      dataSource: [...this.state.dataSource],
      open: true,
    });
  }
  handleClose() {
    this.setState({
      dataSource: [...this.state.dataSource],
      open: false,
    });
  }
  setLoction = () => {
    this.setState({
      dataSource: [...this.state.dataSource],
      open3: true,
    });
  };
  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    return (
      <div className="newTank">
        <div className="search">
          <Select
            onChange={(value) => {
              this.setState({ selectValue: value });
            }}
            placeholder="البحث بناء على"
            style={{ width: "130px" }}
          >
            <Option value="Fname"> الاسم</Option>
            <Option value="region">المدينة</Option>
            <Option value="area">التجمع</Option>
            <Option value="street">الشارع</Option>
            <Option value="id">رقم الهوية</Option>
            <Option value="job">الوظيفة</Option>
          </Select>
          <Search
            placeholder="أدخل نص البحث"
            onSearch={(value) => {
              if (
                this.state.selectValue !== "" &&
                this.state.selectValue !== "id"
              ) {
                const axios = require("axios");
                axios
                  .get(IP + "/water/employees/searchbyKey", {
                    params: {
                      key: this.state.selectValue,
                      value: '"' + value + '"',
                    },
                  })
                  .then((res) => {
                    const a = [];
                    let i = 0;
                    for (; i < res.data.length; i++) {
                      let job = "";
                      if (res.data[i].type == 1) job = "مهندس مي";
                      if (res.data[i].type == 2) job = "فني مي";
                      if (res.data[i].type == 3) job = "موظف الخدمات";
                      if (res.data[i].type == 4) job = "موظف العدادات ";
                      if (res.data[i].type == 5) job = "موظف الشحن";

                      const name =
                        res.data[i].Fname +
                        " " +
                        res.data[i].Sname +
                        " " +
                        res.data[i].Lname +
                        " ";
                      const address =
                        res.data[i].region +
                        " " +
                        res.data[i].area +
                        " " +
                        res.data[i].street +
                        " ";
                      const data = {
                        key: i,
                        name: name,
                        id: res.data[i].id,
                        address: address,
                        job: job,
                      };
                      a.push(data);
                    }
                    this.setState({
                      dataSource: a,
                      count: i,
                    });
                  });
              } else if (
                this.state.selectValue !== "" &&
                this.state.selectValue === "id"
              ) {
                const axios = require("axios");
                axios
                  .get(IP + "/water/employees/searchbyKey", {
                    params: {
                      key: this.state.selectValue,
                      value: value,
                    },
                  })
                  .then((res) => {
                    const a = [];
                    let i = 0;
                    for (; i < res.data.length; i++) {
                      let job = "";
                      if (res.data[i].type == 1) job = "مهندس مي";
                      if (res.data[i].type == 2) job = "فني مي";
                      if (res.data[i].type == 3) job = "موظف الخدمات";
                      if (res.data[i].type == 4) job = "موظف العدادات ";
                      if (res.data[i].type == 5) job = "موظف الشحن";
                      const name =
                        res.data[i].Fname +
                        " " +
                        res.data[i].Sname +
                        " " +
                        res.data[i].Lname +
                        " ";
                      const address =
                        res.data[i].region +
                        " " +
                        res.data[i].area +
                        " " +
                        res.data[i].street +
                        " ";
                      const data = {
                        key: i,
                        name: name,
                        id: res.data[i].id,
                        address: address,
                        job: job,
                      };
                      a.push(data);
                    }
                    this.setState({
                      dataSource: a,
                      count: i,
                    });
                  });
              }
            }}
            enterButton
            style={{ width: "290px", marginRight: "5px" }}
          />
          <Button
            type="primary"
            onClick={() => {
              this.setState({
                dataSource: this.state.dataSource2,
                count: this.state.dataSource2.length,
              });
            }}
          >
            X
          </Button>
        </div>

        <Table
          bordered
          components={components}
          rowClassName={() => "editable-row"}
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 3 }}
          scroll={{ x: "150px" }}
        />
        <>
          <Button
            type="primary"
            onClick={() => this.handleOpen()}
            style={{ borderRadius: "20px", marginTop: "-30px" }}
          >
            أضف موظف جديد
          </Button>

          <Modal
            open={this.state.open}
            onClose={() => this.handleClose()}
            center
          >
            <div className="newTankForm">
              <h2 className="headerNewTank">إضافة موظف</h2>.
              <Form
                layout="vertical"
                className="newTankForm"
                name="basic"
                labelCol={{
                  span: 70,
                }}
                wrapperCol={{
                  span: 70,
                }}
                initialValues={{
                  remember: false,
                }}
                onFinish={(values) => {
                  const fName = values.fname;
                  const lName = values.lname;
                  const sName = values.sname;
                  const id = values.id;
                  let job = 0;
                  if (values.job === "فني مياه") job = "1";
                  else if (values.job === "مهندس مي") job = "2";
                  else if (values.job === "موظف الشحن") job = "5";
                  else if (values.job === "موظف العدادات") job = "4";
                  else if (values.job === "موظف الخدمات") job = "3";

                  this.addnewEmployee(fName, sName, lName, job, id);
                  const newData = {
                    key: this.state.count,
                    name: fName + " " + sName + " " + lName,
                    id: id,
                    address: "",
                    job: values.job,
                  };
                  this.setState({
                    dataSource: [...this.state.dataSource, newData],
                    open3: false,
                    open2: true,
                    open: false,
                    count: this.state.count + 1,
                  });
                }}
                onFinishFailed={this.onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="الوظيفة"
                  name="job"
                  rules={[
                    {
                      required: true,
                      message: "اختر الوظيفة",
                    },
                  ]}
                >
                  <Select placeholder="اختر الوظيفة" style={{ width: "170px" }}>
                    <Option value="فني مياه">فني مياه</Option>
                    <Option value="موظف الخدمات">موظف الخدمات</Option>
                    <Option value="مهندس مي">مهندس مي</Option>
                    <Option value="موظف العدادات">موظف العدادات</Option>
                    <Option value="موظف والشحن">موظف الشحن</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label=" الاسم الاول"
                  name="fname"
                  rules={[
                    {
                      required: true,
                      message: "أدخل الاسم",
                    },
                  ]}
                >
                  <Input id="fname" style={{ borderRadius: "10px" }} />
                </Form.Item>

                <Form.Item
                  label=" الاسم الثاني"
                  name="sname"
                  rules={[
                    {
                      required: true,
                      message: "أدخل الاسم",
                    },
                  ]}
                >
                  <Input id="sname" style={{ borderRadius: "10px" }} />
                </Form.Item>

                <Form.Item
                  label=" الاسم الأخير"
                  name="lname"
                  rules={[
                    {
                      required: true,
                      message: "أدخل الاسم",
                    },
                  ]}
                >
                  <Input id="lname" style={{ borderRadius: "10px" }} />
                </Form.Item>

                <Form.Item
                  label="رقم الهوية"
                  name="id"
                  rules={[
                    {
                      required: true,
                      message: "أدخل رقم الهوية",
                    },
                    {
                      pattern: /^(?:\d*)$/,
                      message: "يرجى إدخال أرقام فقط",
                    },
                    {
                      pattern: /^[\d]{9}$/,
                      message: "أدخل رقم من 9 خانات",
                    },
                  ]}
                >
                  <Input id="id" style={{ borderRadius: "10px" }} />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    span: 16,
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ borderRadius: "20px" }}
                  >
                    إضافة
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Modal>
        </>
        <Modal
          open={this.state.open2}
          onClose={() => {
            this.setState({
              dataSource: [...this.state.dataSource],
              open2: false,
            });
          }}
          center
        >
          <div className="theEmployeeNewAccount" id="newAccount">
            <div>معلومات حساب الموظف الجديد </div>
            <div>اسم المستخدم :{this.state.username}</div>
            <div>كلمة المرور : {this.state.password}</div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Employees;

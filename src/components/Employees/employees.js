import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form, Select } from "antd";
import { Modal } from "react-responsive-modal";
import "antd/dist/antd.css";
import "../Tanks/tanks.css";
import "./employees.css";
import "react-responsive-modal/styles.css";
import LocationMap from "../LocationMap/location.js";
const EditableContext = React.createContext(null);
const { Search } = Input;
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

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
        width: "10%",
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
      dataSource: [
        {
          key: "1",
          name: "2",
          id: "32",
          address: "London, Park Lane no. 1",
        },
      ],
      count: 2,
      open: false,
      open2: false,
      open3: false,
      job: "",
      location: "",
    };
  }
  onFinish = (values) => {
    console.log("Success:", values);
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
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
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
    const onSearch = (value) => console.log(value);

    return (
      <div className="newTank">
        <div className="search">
          <Select placeholder="البحث بناء على" style={{ width: "130px" }}>
            <Option value="name">الاسم</Option>
            <Option value="address">العنوان</Option>
            <Option value="id">رقم الهوية</Option>
            <Option value="job">الوظيفة</Option>
          </Select>
          <Search
            placeholder="أدخل نص البحث"
            onSearch={onSearch}
            enterButton
            style={{ width: "290px", marginRight: "5px" }}
          />
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
                onFinish={this.onFinish}
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
                  <Select
                    placeholder="اختر الوظيفة"
                    style={{ width: "170px" }}
                    onChange={(value) => {
                      this.setState({
                        dataSource: [...this.state.dataSource],
                        job: value,
                      });
                      console.log(value);
                    }}
                  >
                    <Option value="فني مياه">فني مياه</Option>
                    <Option value="عامل صيانة">عامل صيانة</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="الاسم"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "أدخل اسم الموظف",
                    },
                  ]}
                >
                  <Input id="name" style={{ borderRadius: "10px" }} />
                </Form.Item>

                <Form.Item
                  label="رقم الهوية"
                  name="id"
                  rules={[
                    {
                      required: true,
                      message: "أدخل رقم هويتك",
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
                  label="العنوان"
                  name="adderess"
                  rules={[
                    {
                      required: true,
                      message: "أدخل العنوان",
                    },
                  ]}
                >
                  <Input
                    style={{ borderRadius: "10px" }}
                    onClick={this.setLoction}
                    id="EmAdd"
                    value={this.state.location}
                  />
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
            <div>اسم المستخدم</div>
            <div>كلمة المرور</div>
          </div>
        </Modal>
        <Modal
          open={this.state.open3}
          onClose={() => {
            const a = document.getElementById("EmAdd").value;
            this.setState({
              dataSource: [...this.state.dataSource],
              open3: false,
              location: a,
            });
            console.log(a);
          }}
          center
        >
          <LocationMap />
        </Modal>
      </div>
    );
  }
}

export default Employees;

import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form } from "antd";
import { Modal } from "react-responsive-modal";
import "antd/dist/antd.css";
import "./newUserTank.css";
import "react-responsive-modal/styles.css";
import axios from "axios";
const EditableContext = React.createContext(null);
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
          {
            pattern: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
            message: "يرجى إدخال قيمة صالحة",
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
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
class NewUserTank extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "رقم الخزان",
        dataIndex: "index",
        width: "10%",
        editable: false,
      },
      {
        title: "سعة الخزان",
        dataIndex: "capacity",
        editable: true,
      },
      {
        title: "حذف",
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
      count: 1,
      open: false,
      service_number: props.service_number,
      tanks: [],
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      service_number: newProps.service_number,
    });
    if (newProps.service_number !== "") {
      this.getTanks(parseInt(newProps.service_number)).then((res) => {
        const tanks = [];
        const tankNumber = [];
        let i = 0;
        for (; i < res.data.length; i++) {
          const a = {
            key: i,
            index: i + 1,
            capacity: res.data[i].capacity,
          };
          tanks.push(a);
          tankNumber.push(res.data[i].tank_number);
        }
        this.setState({ dataSource: tanks, count: i + 1, tanks: tankNumber });
      });
    }
  }

  async getTanks(aa) {
    const axios = require("axios");
    return await axios.get(
      "http://192.168.0.108:5000//water/citizens_tanks/search_service_number",
      {
        params: { service_number: aa },
      }
    );
  }

  async updateTankCapacity(capacity, tank_number) {
    const bodyFormData = new FormData();
    bodyFormData.append("tank_number", parseInt(tank_number));
    bodyFormData.append("capacity", capacity);
    axios({
      method: "put",
      url: "http://192.168.0.108:5000//water/citizens_tanks/update_capacity",
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

  async addnewTank(c) {
    const bodyFormData = new FormData();
    bodyFormData.append("service_number", this.state.service_number);
    bodyFormData.append("capacity", c);
    axios({
      method: "post",
      url: "http://192.168.0.108:5000//water/citizens_tanks/addNewTank",
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

  async deleteTank(tankNumber) {
    const bodyFormData = new FormData();
    bodyFormData.append("service_number", this.state.service_number);
    bodyFormData.append("tank_number", tankNumber);
    axios({
      method: "delete",
      url: "http://192.168.0.108:5000//water/citizens-tanks/deletecitiznTank",
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

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    const tankNumber = this.state.tanks[dataSource[key].index - 1];
    this.deleteTank(tankNumber).then((res) => {
      console.log(res);
    });
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
      count: this.state.count - 1,
    });
  };

  handleAdd = (capacity) => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      index: count,
      capacity: capacity,
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
    this.updateTankCapacity(
      newData[item.key].capacity,
      this.state.tanks[item.key]
    ).then((res) => {
      console.log(res);
    });
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
          tank_number: this.state.tanks,
          count: this.state.count,
        }),
      };
    });

    return (
      <div className="newUserTank">
        <div>
          <Table
            bordered
            components={components}
            rowClassName={() => "editable-row"}
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 3 }}
            scroll={{ x: "150px" }}
          />
        </div>

        <Button
          type="primary"
          onClick={() => this.handleOpen()}
          style={{ borderRadius: "10px", marginTop: "30px" }}
        >
          أضف خزان جديد
        </Button>
        <Modal open={this.state.open} onClose={() => this.handleClose()} center>
          <div className="newTankForm">
            <h2 className="headerNewTank">إضافة خزان</h2>.
            <Form
              className="newTankForm"
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 20,
              }}
              initialValues={{
                remember: false,
              }}
              onFinish={(values) => {
                let capacity = values.cap;
                this.addnewTank(capacity).then((res) => console.log(res));
                this.handleAdd(capacity);
                this.handleClose();
              }}
              onFinishFailed={this.onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="السعة"
                name="cap"
                rules={[
                  {
                    required: true,
                    message: "أدخل سعة الخزان",
                  },
                  {
                    pattern: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "يرجى إدخال قيمة صالحة",
                  },
                ]}
              >
                <Input id="cap" style={{ borderRadius: "20px" }} />
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
      </div>
    );
  }
}

export default NewUserTank;

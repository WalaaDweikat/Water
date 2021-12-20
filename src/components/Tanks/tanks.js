import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form, Select, message } from "antd";
import { Modal } from "react-responsive-modal";
import "antd/dist/antd.css";
import "./tanks.css";
import "react-responsive-modal/styles.css";
import Mhbes from "../Mhbes/mhbes.js";
import LocationMap from "../LocationMap/location.js";
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
class Tanks extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "رقم الخزان",
        dataIndex: "index",
        width: "2%",
        editable: false,
      },
      {
        title: "سعة الخزان",
        dataIndex: "capacity",
        editable: true,
        width: "10%",
      },
      {
        title: "الموقع",
        dataIndex: "address",
        editable: false,
      },
      {
        title: "عرض المحابس",
        dataIndex: "mhbes",
        width: "10%",

        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="سيتم عرض المحابس المرنبطة بالخزان"
              onConfirm={() => this.handleShow(record)}
            >
              <Button> عرض</Button>
            </Popconfirm>
          ) : null,
      },
      {
        title: "تحديث الموقع",
        dataIndex: "updateLocation",
        width: "10%",

        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="سيتم عرض الخريطة"
              onConfirm={() => {
                localStorage.setItem("key", record["key"]);
                localStorage.removeItem("lat");
                localStorage.removeItem("lng");
                this.setState({
                  open4: true,
                });
              }}
            >
              <Button> عرض الخريطة</Button>
            </Popconfirm>
          ) : null,
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
      count: 0,
      open: false,
      open2: false,
      open3: false,
      open4: false,
      tank_number: -1,
    };
  }

  async updateTankCapacity(capacity, tank_number) {
    const bodyFormData = new FormData();
    bodyFormData.append("tank_number", parseInt(tank_number));
    bodyFormData.append("capacity", capacity);
    axios({
      method: "put",
      url: "http://192.168.0.109:5000//water/MainTanks/updateMainTankCapacity",
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

  async updateTankLocation(lat, lng, tank_number) {
    const bodyFormData = new FormData();
    bodyFormData.append("tank_number", parseInt(tank_number));
    bodyFormData.append("latitude", lat);
    bodyFormData.append("longitude", lng);
    axios({
      method: "put",
      url: "http://192.168.0.109:5000//water/MainTanks/updateMainTankLocation",
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
  async getTanks() {
    const axios = require("axios");
    return await axios.get("http://192.168.0.109:5000//water/MainTanks");
  }

  componentDidMount() {
    this.getTanks().then((res) => {
      let i = 0;
      const data = [];
      for (; i < res.data.length; i++) {
        const a = {
          id: res.data[i].tank_number,
          key: i,
          index: i + 1,
          capacity: res.data[i].capacity,
          address: res.data[i].latitude + " , " + res.data[i].longitude,
        };
        data.push(a);
      }
      this.setState({
        dataSource: data,
        count: i,
      });
    });
  }
  onFinish = (values) => {
    console.log("Success:", values);
    let capacity = document.getElementById("cap").value;
    this.handleAdd(capacity);
    this.handleClose();
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    const id = this.state.dataSource[key].id;
    const bodyFormData = new FormData();
    bodyFormData.append("tank_number", parseInt(id));
    axios({
      method: "delete",
      url: "http://192.168.0.109:5000//water/MainTanks/DeleteMainTank",
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

    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  handleShow = (record) => {
    this.setState({
      tank_number: record.id,
      dataSource: [...this.state.dataSource],
      open2: true,
    });
  };

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.updateTankCapacity(newData[item.key].capacity, newData[item.key].id);
    this.setState({
      dataSource: newData,
    });
  };

  handleSaveLocation = (row) => {
    console.log(row);
    const newData = [];
    for (let i = 0; i < this.state.dataSource.length; i++) {
      let add = "";
      if (this.state.dataSource[i].id === row.id) {
        add = row.address;
        const b = row.address.split(" , ");
        console.log(b[0]);
        this.updateTankLocation(b[0], b[1], row.id).then((res) =>
          console.log(res)
        );
      } else {
        add = this.state.dataSource[i].address;
      }
      const a = {
        id: this.state.dataSource[i].id,
        key: this.state.dataSource[i].key,
        index: this.state.dataSource[i].index,
        capacity: this.state.dataSource[i].capacity,
        address: add,
      };
      newData.push(a);
    }
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
      open2: false,
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
        }),
      };
    });
    return (
      <div className="newTank">
        <Table
          bordered
          components={components}
          rowClassName={() => "editable-row"}
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 3 }}
          scroll={{ x: "150px" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleOpen()}
          style={{ borderRadius: "20px", marginTop: "-30px" }}
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
                if (document.getElementById("newTankAddress").placeholder) {
                  const capacity = values.cap;
                  const bodyFormData = new FormData();
                  bodyFormData.append("capacity", capacity);
                  bodyFormData.append("height", 0);
                  bodyFormData.append("latitude", localStorage.getItem("lat"));
                  bodyFormData.append("longitude", localStorage.getItem("lng"));

                  axios({
                    method: "post",
                    url: "http://192.168.0.109:5000///water/MainTanks/AddNewMainTank",
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                    data: bodyFormData,
                  })
                    .then((response) => {
                      message.success("تمت إضافة خزان جديد");
                      this.handleClose();
                      this.getTanks().then((res) => {
                        let i = 0;
                        const data = [];
                        for (; i < res.data.length; i++) {
                          const a = {
                            id: res.data[i].tank_number,
                            key: i,
                            index: i + 1,
                            capacity: res.data[i].capacity,
                            address:
                              res.data[i].latitude +
                              " , " +
                              res.data[i].longitude,
                          };
                          data.push(a);
                        }
                        this.setState({
                          dataSource: data,
                          count: i,
                        });
                      });
                    })
                    .catch((error) => {
                      console.log(error);
                      message.error("حدث خطأ");
                    });
                }
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
                label="العنوان"
                name="newTankAddress"
                rules={[
                  {
                    message: "حدد العنوان",
                  },
                ]}
              >
                <Input
                  id="newTankAddress"
                  onClick={() => {
                    localStorage.removeItem("lat");
                    localStorage.removeItem("lng");
                    this.setState({
                      open3: true,
                    });
                  }}
                  style={{ borderRadius: "20px" }}
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
        <Modal
          open={this.state.open2}
          onClose={() => this.handleClose()}
          center
        >
          <Mhbes tank_number={this.state.tank_number} />
        </Modal>

        <Modal
          open={this.state.open3}
          onClose={() => {
            this.setState({ open3: false });
            if (localStorage.getItem("lat"))
              document.getElementById("newTankAddress").placeholder =
                localStorage.getItem("lat") +
                " , " +
                localStorage.getItem("lng");
          }}
          center
        >
          <LocationMap />
        </Modal>
        <Modal
          open={this.state.open4}
          onClose={() => {
            this.setState({ open4: false });
            const key = localStorage.getItem("key");
            localStorage.removeItem("key");
            if (localStorage.getItem("lat")) {
              const record = {
                id: this.state.dataSource[key].id,
                key: key,
                index: this.state.dataSource[key].index,
                capacity: this.state.dataSource[key].capacity,
                address:
                  localStorage.getItem("lat") +
                  " , " +
                  localStorage.getItem("lng"),
              };
              this.handleSaveLocation(record);
            }
          }}
          center
        >
          <LocationMap />
        </Modal>
      </div>
    );
  }
}

export default Tanks;

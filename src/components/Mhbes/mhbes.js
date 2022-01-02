import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form, message } from "antd";
import { Modal } from "react-responsive-modal";
import axios from "axios";
import "antd/dist/antd.css";
import "../Tanks/tanks.css";
import "react-responsive-modal/styles.css";
import IP from "../../ip.js";
import LocationMap from "../LocationMap/location.js";
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

  const save = async (lng, lat) => {
    try {
      toggleEdit();
      handleSave({ ...record, lng, lat });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;
  const [open, setOpen] = useState(false);
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
        <Input
          ref={inputRef}
          id="location"
          onClick={() => {
            localStorage.removeItem("lng");
            localStorage.removeItem("lat");
            setOpen(true);
          }}
        />
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

  return (
    <>
      <td {...restProps}>{childNode}</td>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          if (localStorage.getItem("lat"))
            save(localStorage.getItem("lng"), localStorage.getItem("lat"));
        }}
        center
      >
        <LocationMap />
      </Modal>
    </>
  );
};
class Mhbes extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "رقم المحبس",
        dataIndex: "index",
        width: "2%",
        editable: false,
      },
      {
        title: "العنوان",
        dataIndex: "address",
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
      count: 0,
      open: false,
      tank_number: -1,
      open3: false,
    };
  }

  async getStopcocks(tank_number) {
    const axios = require("axios");
    return await axios.get(IP + "/water/mahbes/search_tank_number", {
      params: { tank_number: tank_number },
    });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.tank_number !== prevState.tank_number) {
      console.log(nextProps.tank_number);

      return { tank_number: nextProps.tank_number };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Yes");
    if (prevProps.tank_number !== this.props.tank_number) {
      this.setState({ tank_number: this.props.tank_number });
    }
  }

  componentDidMount() {
    this.getStopcocks(this.state.tank_number).then((res) => {
      let i = 0;
      const data = [];
      for (; i < res.data.length; i++) {
        const a = {
          id: res.data[i].mahbes_number,
          index: res.data[i].mahbes_number,
          key: i,
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
  async updateMahbesLocation(lat, lng, id) {
    const bodyFormData = new FormData();
    bodyFormData.append("mahbes_number", parseInt(id));
    bodyFormData.append("latitude", lat);
    bodyFormData.append("longitude", lng);
    axios({
      method: "put",
      url: IP + "/water/mahbes/update_location",
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
    return await axios.get(IP + "/water/MainTanks");
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
    console.log(id);
    const bodyFormData = new FormData();
    bodyFormData.append("mahbes_number", parseInt(id));
    axios({
      method: "delete",
      url: IP + "/water/mahbes/delete",
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

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const a = {
      id: row.id,
      key: row.key,
      index: row.index,
      address: row.lat + " , " + row.lng,
    };
    this.updateMahbesLocation(row.lat, row.lng, row.id).then((res) => {
      console.log(res);
    });
    const index = newData.findIndex((item) => a.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...a });
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
        }),
      };
    });
    return (
      <div style={{ height: "fit-content" }}>
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
          style={{ borderRadius: "20px" }}
        >
          أضف محبس جديد
        </Button>
        <Modal open={this.state.open} onClose={() => this.handleClose()} center>
          <div className="newTankForm">
            <h2 className="headerNewTank">إضافة محبس</h2>
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
                if (document.getElementById("address").placeholder) {
                  const bodyFormData = new FormData();
                  bodyFormData.append("latitude", localStorage.getItem("lat"));
                  bodyFormData.append("longitude", localStorage.getItem("lng"));
                  bodyFormData.append("tank_number", this.state.tank_number);
                  axios({
                    method: "post",
                    url: IP + "/water/mahbes/add",
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                    data: bodyFormData,
                  })
                    .then((response) => {
                      message.success("تمت إضافة محبس جديد");
                      this.handleClose();
                      this.getStopcocks(this.state.tank_number).then((res) => {
                        let i = 0;
                        const data = [];
                        for (; i < res.data.length; i++) {
                          const a = {
                            id: res.data[i].mahbes_number,
                            key: i,
                            index: res.data[i].mahbes_number,
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
                label="العنوان"
                name="address"
                rules={[
                  {
                    message: "حدد عنوان المحبس",
                  },
                ]}
              >
                <Input
                  id="address"
                  style={{ borderRadius: "20px" }}
                  onClick={() => {
                    localStorage.removeItem("lat");
                    localStorage.removeItem("lng");
                    this.setState({ open3: true });
                  }}
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
          open={this.state.open3}
          onClose={() => {
            this.setState({ open3: false });
            if (localStorage.getItem("lat"))
              document.getElementById("address").placeholder =
                localStorage.getItem("lat") +
                " , " +
                localStorage.getItem("lng");
          }}
          center
        >
          <LocationMap />
        </Modal>
      </div>
    );
  }
}

export default Mhbes;

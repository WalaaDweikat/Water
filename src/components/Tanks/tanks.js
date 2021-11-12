import React, { useContext, useState, useEffect, useRef } from "react";
import "antd/dist/antd.css";
import { Table, Input, Button, Popconfirm, Form } from "antd";
import NewTank from "../NewTank/newTank.js";
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
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
        width: "10%",
        editable: false,
      },
      {
        title: "سعة الخزان",
        dataIndex: "capacity",
        editable: true,
        width: "25%",
      },
      {
        title: "العنوان",
        dataIndex: "address",
        editable: true,
      },
      {
        title: "العملية",
        dataIndex: "operation",
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="هل أنت متأكد من الحذف"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a>حذف</a>
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      dataSource: [
        {
          key: "0",
          index: "Edward King 0",
          capacity: "32",
          address: "London, Park Lane no. 0",
        },
        {
          key: "1",
          index: "Edward King 1",
          capacity: "32",
          address: "London, Park Lane no. 1",
        },
      ],
      count: 2,
    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      index: count,
      capacity: `أدخل السعة`,
      address: `أدخل العنوان `,
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
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          أضف خزان جديد
        </Button>
        <Table
          bordered
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 4 }}
        />
        <NewTank />
      </div>
    );
  }
}

export default Tanks;

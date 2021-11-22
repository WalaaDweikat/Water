import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Form, Select, Popconfirm } from "antd";
import "antd/dist/antd.css";
import "react-responsive-modal/styles.css";
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
class OfficerCom extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "رقم الشكوى",
        dataIndex: "index",
        editable: false,
        width: "5%",
      },
      {
        title: "موضوع الشكوى",
        dataIndex: "subject",
        editable: false,
        width: "20%",
      },
      {
        title: "الوصف",
        dataIndex: "des",
        editable: false,
        width: "25%",
      },
      {
        title: "صاحب الشكوى",
        dataIndex: "name",
        editable: false,
        width: "25%",
      },
      {
        title: "رقم الهوية",
        dataIndex: "id",
        editable: false,
        width: "25%",
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
    };
  }
  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
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
            <Option value="ال">الاسم</Option>
            <Option value="رقم الهوية">رقم الهوية</Option>
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
      </div>
    );
  }
}

export default OfficerCom;

import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Form } from "antd";
import "antd/dist/antd.css";
import "react-responsive-modal/styles.css";
import IP from "../../ip.js";
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
class ComAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "رقم الاشتراك",
        dataIndex: "number",
        editable: false,
      },
      {
        title: "رقم الهوية",
        dataIndex: "id",
        editable: false,
      },
      {
        title: "الاسم",
        dataIndex: "name",
        editable: false,
      },
      {
        title: "عددالأفراد",
        dataIndex: "members",
        editable: false,
      },
    ];
    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    const axios = require("axios");
    axios.get(IP + "/water/services1").then((res) => {
      const data = [];
      let i = 0;
      for (; i < res.data.length; i++) {
        const a = {
          key: i,
          id: res.data[i].id_number,
          number: res.data[i].service_number,
          name:
            res.data[i].first_name +
            " " +
            res.data[i].middle_name +
            " " +
            res.data[i].last_name,
          members: res.data[i].family_number,
        };

        data.push(a);
      }
      this.setState({ dataSource: data });
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
      </div>
    );
  }
}

export default ComAdmin;

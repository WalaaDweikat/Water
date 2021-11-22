import "./trans.css";
import { Collapse, Space } from "antd";
const { Panel } = Collapse;

export default function Transactions() {
  function callback(key) {
    console.log(key);
  }

  const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  `;

  return (
    <div className="transContainer">
      <Space direction="vertical">
        <Collapse onChange={callback} className="collapse">
          <Panel header="This is panel header 1" key="1" className="panel">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 2" key="2" className="panel">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 3" key="3" className="panel">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </Space>
    </div>
  );
}

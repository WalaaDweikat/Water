import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const PrivacyModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const policyText = (
    <p style={{ textAlign: "right" }}>
      Qui velit magna velit ipsum qui officia veniam excepteur aliqua sunt velit
      fugiat. Qui velit magna velit ipsum qui officia veniam excepteur aliqua
      sunt velit fugiat.Qui velit magna velit ipsum qui officia veniam excepteur
      aliqua sunt velit fugiat. Qui velit magna velit ipsum qui officia veniam
      excepteur aliqua sunt velit fugiat.Qui velit magna velit ipsum qui officia
      veniam excepteur aliqua sunt velit fugiat. Qui velit magna velit ipsum qui
      officia veniam excepteur aliqua sunt velit fugiat.Qui velit magna velit
      ipsum qui officia veniam excepteur aliqua sunt velit fugiat. Qui velit
      magna velit ipsum qui officia veniam excepteur aliqua sunt velit fugiat.
    </p>
  );
  return (
    <>
      <button className="item1" onClick={() => setOpen(true)}>
        بلـديـة جمـاعيـن
      </button>
      <Modal open={open} onClose={() => setOpen(false)} center>
        <h2 style={{ textAlign: "right" }}>بلدية جماعين</h2>
        {policyText}
        {policyText}
        {policyText}
      </Modal>
    </>
  );
};

export default PrivacyModal;

import React from "react";
import { Modal } from "antd";

function Issues({ open = false, setOpen, selectedBook }) {
  return (
    <Modal
      title="Issue Book"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={900}
    >
      <div> Issues List </div>
    </Modal>
  );
}

export default Issues;

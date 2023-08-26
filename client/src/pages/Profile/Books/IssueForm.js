import Modal from "antd/es/modal/Modal";
import React from "react";

function IssueForm({ open = false, setOpen, selectedBook, setSelectedBook }) {
  return (
    <Modal
      title="Issue Form"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <div> Issues Form </div>
    </Modal>
  );
}

export default IssueForm;

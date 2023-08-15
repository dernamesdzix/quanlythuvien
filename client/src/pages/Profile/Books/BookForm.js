import React, { useState } from "react";
import { Modal } from "antd";

function BookForm() {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      title="Add Book"
      open={open}
      onCancel={() => setOpen(false)}
      centered
      width={800}
      footer={null}
    >
      <h1>BookForm</h1>
    </Modal>
  );
}

export default BookForm;

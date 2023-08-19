import React from "react";
import Button from "../../../components/Button";
import BookForm from "./BookForm";

function Books() {
  const [openBookForm, setOpenBookForm] = React.useState(false);

  return (
    <div>
      <div className="flex justify-end">
        <Button title="Add Book" onClick={() => setOpenBookForm(true)} />
      </div>

      {openBookForm && (
        <BookForm open={openBookForm} setOpen={setOpenBookForm} />
      )}
    </div>
  );
}

export default Books;

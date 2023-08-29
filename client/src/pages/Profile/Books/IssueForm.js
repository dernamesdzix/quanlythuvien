import { Modal, Form, message } from "antd";
import Button from "../../../components/Button";
import React, { useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../../redux/loaderSlice";
import { getUserById } from "../../../api/user";
import { IssueBook } from "../../../api/issue";

function IssueForm({
  open = false,
  setOpen,
  selectedBook,
  setSelectedBook,
  getData,
  selectedIssue,
  type,
}) {
  const { user } = useSelector((state) => state.users);
  const [validated, setValidated] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(``);
  const [patronData, setPatronData] = useState(`null`);
  const [patronID, setPatronId] = React.useState(``);
  const [returnDate, setReturnDate] = React.useState(``);
  const dispatch = useDispatch();

  const validate = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getUserById(patronID);
      if (response.success) {
        if (response.data.role !== "patron") {
          setValidated(false);
          setErrorMessage("This user is not a patron");
          dispatch(HideLoading());
          return;
        } else {
          setPatronData(response.data);
          setValidated(true);
          setErrorMessage("");
        }
      } else {
        setValidated(false);
        setErrorMessage("This user is not a patron");
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      setValidated(false);
      setErrorMessage(error.message);
    }
  };

  const onIssue = async () => {
    try {
      dispatch(ShowLoading());
      const response = await IssueBook({
        book: selectedBook._id,
        user: patronData._id,
        issueDate: new Date(),
        returnDate,
        rent:
          moment(returnDate).diff(moment(), "days") * selectedBook?.rentPerDay,
        fine: 0,
        issuedBy: user._id,
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getData();
        setPatronId("");
        setReturnDate("");
        setValidated(false);
        setErrorMessage("");
        setSelectedBook(null);
        setOpen(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <Modal title="" open={open} onCancel={() => setOpen(false)} footer={null}>
      <div className="flex flex-col gap-2 ">
        <h1 className="text-secondary font-bold text-xl uppercase text-center">
          Issue New Book
        </h1>
        <input
          type="text"
          value={patronID}
          onChange={(e) => setPatronId(e.target.value)}
          placeholder="Patron Id"
          // disabled={type === "edit"}
        />
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          placeholder="Return Date"
          min={moment().format("YYYY-MM-DD")}
        />

        {errorMessage && <span className="error-message">{errorMessage}</span>}

        {validated && (
          <div className="bg-secondary p-1 text-white">
            <h1 className="text-sm">Patron : {patronData.name}</h1>
            <h1>
              Number Of Days : {moment(returnDate).diff(moment(), "days")}
            </h1>
            <h1>Rent per Day : {selectedBook.rentPerDay}</h1>
            <h1>
              Rent :{" "}
              {moment(returnDate).diff(moment(), "days") *
                selectedBook?.rentPerDay}
            </h1>
          </div>
        )}

        <div className="flex justify-end gap-2 w-100">
          <Button
            title="Cancel"
            variant="outlined"
            onClick={() => setOpen(false)}
          />
          <Button
            title="Validate"
            disabled={patronID === "" || returnDate === ""}
            onClick={validate}
          />
          {validated && (
            <Button
              title={"Issue"}
              onClick={onIssue}
              disabled={patronID === "" || returnDate === ""}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}

export default IssueForm;

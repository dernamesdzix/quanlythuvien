import React, { useEffect } from "react";
import { Modal, Table, message } from "antd";
import moment from "moment";
import Button from "../../../components/Button";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { GetIssues, ReturnBook } from "../../../api/issue";

function Issues({ open = false, setOpen, selectedBook, reloadBooks }) {
  const [issues, setIssues] = React.useState([]);
  const dispatch = useDispatch();

  const getIssues = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetIssues({
        book: selectedBook._id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setIssues(response.data);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error = error.message;
    }
  };

  useEffect(() => {
    getIssues();
  }, []);

  const onReturnHandler = async (issue) => {
    try {
      if (!issue.book || !issue.book._id) {
        // Check if issue.book or issue.book._id is undefined
        message.error("Invalid issue data");
        return;
      }
      // Check if the book is returned before the due date
      const today = moment().format("YYYY-MM-DD");
      const dueDate = moment(issue.returnDate).format("YYYY-MM-DD");

      if (today > dueDate) {
        // Book is returned after the due date, calculate the fine
        const fine = moment(today).diff(dueDate, "days") * 1; // Adjust the fine calculation as needed
        issue.fine = fine;
      }
      issue.returnedDate = new Date();
      issue.book = issue.book._id;

      dispatch(ShowLoading());
      const response = await ReturnBook(issue);
      dispatch(HideLoading());

      if (response.success) {
        message.success(response.message);
        getIssues();
        reloadBooks();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Id Issues",
      dataIndex: "_id",
      render: (_id, record) => (
        <div className="flex flex-col">
          <span>{_id}</span>
          <span className="text-xs text-gray-500">{record.user.name}</span>
        </div>
      ),
    },
    {
      title: "Issued On",
      dataIndex: "issueDate",
      render: (issueDate) => moment(issueDate).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Return Date (Due Date)",
      dataIndex: "returnDate",
      render: (dueDate) => moment(dueDate).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Amount",
      dataIndex: "rent",
      render: (rent, record) => (
        <div className="flex flex-col">
          <span>Rent : {record.rent}</span>
          <span className="text-xs text-gray-500">
            Fine : {record.fine || 0}
          </span>
        </div>
      ),
    },
    {
      title: "Returned On",
      dataIndex: "returnedDate",
      render: (returnedDate) => {
        if (returnedDate) {
          return moment(returnedDate).format("DD-MM-YYYY hh:mm A");
        } else {
          return "Not Returned Yet";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => {
        return (
          <Button
            title="Return Now"
            onClick={() => onReturnHandler(record)}
            variant="outlined"
          />
        );
      },
    },
  ];

  return (
    <Modal
      title="Issue Book"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={1400}
    >
      <h1 className="text-xl mt-1 mb-1 text-secondary uppercase font-bold text-center">
        Issues of {selectedBook.title}
      </h1>
      <Table columns={columns} dataSource={issues} />
    </Modal>
  );
}

export default Issues;

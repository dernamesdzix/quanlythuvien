import React, { useEffect } from "react";
import Button from "../../../components/Button";
import BookForm from "./BookForm";
import { useDispatch } from "react-redux";
import { GetAllBooks } from "../../../api/books";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { Table, message } from "antd";

function Books() {
  const [openBookForm, setOpenBookForm] = React.useState(false);
  const [Books, setBooks] = React.useState([]);
  const dispatch = useDispatch();

  const getBooks = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllBooks();
      dispatch(HideLoading());
      if (response.success) {
        setBooks(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const columns = [
    {
      title: "Book",
      dataIndex: "image",
      render: (image) => <img src={image} alt="book" width="60" height="60" />,
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Publisher",
      dataIndex: "publisher",
    },
    {
      title: "Total Copies",
      dataIndex: "totalCopies",
    },
    {
      title: "Available Copies",
      dataIndex: "availableCopies",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-1">
          <i
            class="ri-delete-bin-5-line"
            // onClick={() => deleteBook(record._id)}
          ></i>
          <i
            className="ri-pencil-line"
            // onClick={() => {
            //   setFormType("edit");
            //   setSelectedBook(record);
            //   setOpenBookForm(true);
            // }}
          ></i>
          {/* <span
            className="underline"
            // onClick={() => {
            //   setOpenIssues(true);
            //   setSelectedBook(record);
            // }}
          >
            Issues
          </span> */}

          {/* <span
            className="underline"
            // onClick={() => {
            //   setOpenIssuesForm(true);
            //   setSelectedBook(record);
            // }}
          >
            Issue Book
          </span> */}
        </div>
      ),
    },

    // {
    //   title: "Added On",
    //   dataIndex: "createdAt",
    //   render: (date) => moment(date).format("DD-MM-YYYY hh:mm:ss A"),
    // },
  ];
  return (
    <div>
      <div className="flex justify-end">
        <Button title="Add Book" onClick={() => setOpenBookForm(true)} />
      </div>
      <Table columns={columns} dataSource={Books} className="mt-1" />

      {openBookForm && (
        <BookForm
          open={openBookForm}
          setOpen={setOpenBookForm}
          reloadBooks={getBooks}
        />
      )}
    </div>
  );
}

export default Books;

import React from "react";
import { Col, Form, Modal, Row, message } from "antd";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AddBook } from "../../../api/books";
import { ShowLoading, HideLoading } from "../../../redux/loaderSlice";

function BookForm({ open, setOpen, reloadBooks }) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      values.createdBy = user._id;
      values.availableCopies = values.totalCopies;

      const response = await AddBook(values);
      if (response.success) {
        message.success(response.message);
        reloadBooks();
        setOpen(false);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <Modal
      title="Add Book"
      open={open}
      onCancel={() => setOpen(false)}
      centered
      width={800}
      footer={null}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ require: true, messsage: "Please add a book title" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { require: true, messsage: "Please add a book description" },
              ]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="image URL"
              name="image"
              rules={[{ require: true, messsage: "Please add image url" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Author"
              name="author"
              rules={[{ require: true, messsage: "Please add author name" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Publisher"
              name="publisher"
              rules={[{ require: true, messsage: "Please add publisher name" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Published Date"
              name="publishedDate"
              rules={[{ require: true, messsage: "Please add published date" }]}
            >
              <input type="date" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ require: true, messsage: "Please add category" }]}
            >
              <select>
                <option value="">Select Category</option>
                <option value="mythology">Mythology</option>
                <option value="fiction">Fiction</option>
                <option value="technology">Technology</option>
                <option value="biography">Biography</option>
                <option value="poetry">Poetry</option>
                <option value="drama">Drama</option>
                <option value="history">History</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Rent Per Day"
              name="rentPerDay"
              rules={[{ require: true, messsage: "Please input rent per day" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Total Copies"
              name="totalCopies"
              rules={[{ require: true, messsage: "Please add total copies" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end gap-1 mt-2">
          <Button
            type="custombutton"
            variant="outlined"
            title="Cancel"
            onClick={() => setOpen(false)}
          />
          <Button title="Save" type="Submit" />
        </div>
      </Form>
    </Modal>
  );
}

export default BookForm;

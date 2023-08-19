import { apiManagement } from "./apiManagement";

export const AddBook = async (payload) => {
  try {
    const response = await apiManagement.post("/api/books/add-book", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get all books
export const GetAllBooks = async () => {
  try {
    const response = await apiManagement.get("/api/books/get-all-books");
    return response.data;
  } catch (error) {
    throw error;
  }
};

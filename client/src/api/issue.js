import { apiManagement } from "./apiManagement";

// issue a book
export const IssueBook = async (payload) => {
  try {
    const response = await apiManagement.post(
      "/api/issues/issues-new-book",
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

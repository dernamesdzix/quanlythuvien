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

// get all issues
export const GetIssues = async (payload) => {
  try {
    const response = await apiManagement.post(
      "/api/issues/get-issues",
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// return a book
export const ReturnBook = async (payload) => {
  try {
    const response = await apiManagement.post(
      "/api/issues/return-book",
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete an issue
export const DeleteIssue = async (payload) => {
  try {
    const response = await apiManagement.post(
      "/api/issues/delete-issue",
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

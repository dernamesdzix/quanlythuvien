import { apiManagement } from "./apiManagement";

// register user
export const registerUser = async (payload) => {
  try {
    const response = await apiManagement.post("/api/users/register", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// login user
export const loginUser = async (payload) => {
  try {
    const response = await apiManagement.post("/api/users/login", payload); // Use the correct URL for login
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get logged in user details
export const getLoggedInUserDetails = async () => {
  try {
    const response = await apiManagement.get("/api/users/get-logged-in-user");
    return response.data;
  } catch (error) {
    throw error;
  }
};

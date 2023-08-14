import axios from "axios";

export const apiManagement = axios.create({
  headers: {
    authorization: `Bearer ${localStorage.getItem(`token`)}`,
  },
});

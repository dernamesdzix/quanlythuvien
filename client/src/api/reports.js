import { apiManagement } from "./apiManagement";

export const GetReports = async () => {
  try {
    const response = await apiManagement.get("/api/reports/get-reports");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

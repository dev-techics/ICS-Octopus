// src/utils/api.ts
import axiosInstance from "./axios";
import { type ScrapedResponse } from "../types/data";
import type { CheckParametersType } from "../types/type";

// Get all data
export const loadData = async (
  params: CheckParametersType
): Promise<ScrapedResponse> => {
  const response = await axiosInstance.get("extension-load.php", { params });
  return response.data;
};

// Save scraped data
// export const saveData = async (data: ScrapedData) => {
//   const response = await axiosInstance.post("/save", data);
//   return response.data;
// };

// Update data
// export const updateData = async (id: string, data: Partial<ScrapedData>) => {
//   const response = await axiosInstance.patch(`/update/${id}`, data);
//   return response.data;
// };

// Delete or more methods if needed...

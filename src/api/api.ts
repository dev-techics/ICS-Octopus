// src/utils/api.ts
import axiosInstance from "./axios";
import type {
  LogRequestType,
  SaveRequestType,
  ServerResponse,
} from "../types/data";
import type { CheckParametersType } from "../types/type";

// Get all data
export const loadData = async (
  params: CheckParametersType
): Promise<ServerResponse> => {
  const response = await axiosInstance.get("ics-extension-check.php", {
    params,
  });
  return response.data;
};

// Save scraped data
export const saveMatter = async (data: SaveRequestType) => {
  console.log("Data is ", data);
  const response = await axiosInstance.post(
    "ics-extension-matter-save.php",
    data
  );
  return response.data;
};

// update activity log
export const updateLog = async (data: LogRequestType) => {
  const response = await axiosInstance.post(
    "ics-extension-update-activity.php",
    data
  );
  return response.data;
};

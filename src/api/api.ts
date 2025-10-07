// src/utils/api.ts
import axiosInstance from "./axios";
import type {
  EmailVerificationResponse,
  LogRequestType,
  SaveRequestType,
  ServerResponse,
} from "../types/data";
import type { CheckParametersType } from "../types/type";

// Get all data
export const verifyEmail = async (
  email: string
): Promise<EmailVerificationResponse> => {
  const response = await axiosInstance.post(
    "https://booking.icslegal.com/email-checker/index.php",
    { email: email }
  );
  return response.data;
};

// Get all data
export const loadData = async (
  params: CheckParametersType
): Promise<ServerResponse> => {
  const response = await axiosInstance.post("ics-extension-check.php", {
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

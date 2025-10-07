import { verifyEmail } from "../api/api";
import { updateEmailState } from "../context/AppContext";

export default async (email: string) => {
  const { valid } = await verifyEmail(email);
  updateEmailState(valid ? "valid" : "invalid");
  return valid;
};

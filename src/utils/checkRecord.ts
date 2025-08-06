import { loadData } from "../api/api";
import { updateMatters, updateMembers } from "../context/AppContext";
import type { ClientInfoType } from "../types/type";
import { getMobile, getName } from "./filter";

export default async (clientInfo: ClientInfoType) => {
  // parameters validation
  let { name, mobile, email } = clientInfo;
  const [fname] = getName(name);
  mobile = getMobile(mobile);

  // send request
  const requestBody = { fname, mobile, email };
  const response = await loadData(requestBody);
  if (response.status === "error") return false;

  console.log("Response", response);

  // update states
  if (response.matters) updateMatters(response.matters);
  if (response.members) updateMembers(response.members);
  return true;
};

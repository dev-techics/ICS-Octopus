export interface Member {
  id: number;
  fname: string;
  lname: string;
  email: string;
  mobile: string;
  phone: string;
}

export interface Matter {
  caseid: number;
  title: string;
  details: string;
  fkclientid: string;
}

export interface ServerResponse {
  status: "success" | "error";
  members?: Member[];
  matters?: Matter[];
  email?: string;
  message?: string;
}

export interface LogRequestType {
  userId: number;
  matterId: number;
  activityLog: string;
  priority: string;
}

export interface SaveRequestType {
  userId: number;
  website: string;
  fname: string;
  lname: string;
  email: string;
  mobile: string;

  matterType: string;
  matterTitle: string;
  matterDesc: string;
  advertise: string;
  sources: string;

  priority: string;
  activityLog: string;
}

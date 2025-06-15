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

export interface ScrapedResponse {
  status: "success" | "error";
  members?: Member[];
  matters?: Matter[];
  email?: string;
  message?: string;
}

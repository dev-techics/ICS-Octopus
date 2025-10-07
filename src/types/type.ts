import type { ReactNode } from "react";

export interface GroupButtonProps {
  hidden: boolean;
  classes?: string;
  loading: boolean;
  disabled: boolean;
  disabledText: string;
  firstButtonText: string;
  secondButtonText: string;
  firstButtonClick: () => void;
  secondButtonClick: () => void;
}

export interface AppProviderProps {
  children: ReactNode;
}

export interface ClientInfoType {
  name: string;
  mobile: string;
  email: string;
  address?: string;
  matterType: string;
  matterTitle: string;
  matterDesc: string;
  activityLog: string;
  advertise: string;
  sources: string;
  extra?: any;
}

export interface CheckParametersType {
  fname: string;
  mobile: string;
  email: string;
}

export interface BarkRefundModalParamsType {
  title : string,
  description: string;
  redirect?: boolean;
}

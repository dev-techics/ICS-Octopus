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
  matterType: string;
  matterTitle: string;
  matterDesc: string;
  activityLog: string;
  advertise: string;
  sources: string;
}

export interface CheckParametersType {
  fname: string;
  mobile: string;
  email: string;
}

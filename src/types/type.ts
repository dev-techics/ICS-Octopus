import type { ReactNode } from "react";

export interface GroupButtonProps {
  hidden: boolean;
  disabled: boolean;
  disabledText: string;
  firstButtonText: string;
  secondButtonText: string;
  classes?: string;
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
  matterTitle: string;
  activityLog: string;
}

export interface CheckParametersType {
  fname: string;
  mobile: string;
  email: string;
}

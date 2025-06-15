import React, { createContext, useState, useContext } from "react";
import type { AppProviderProps, ClientInfoType } from "../types/type";
import type { Matter, Member } from "../types/data";

// type declaration
interface AppContextType {
  // client information
  clientInfo: ClientInfoType;
  setClientInfo: React.Dispatch<React.SetStateAction<ClientInfoType>>;

  // matter information
  matters: Matter[];
  setMatters: React.Dispatch<React.SetStateAction<Matter[]>>;

  // member information
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
}

// global
let externalSetClientInfo: React.Dispatch<
  React.SetStateAction<ClientInfoType>
> | null = null;

let externalSetMatters: React.Dispatch<React.SetStateAction<Matter[]>> | null =
  null;

let externalSetMembers: React.Dispatch<React.SetStateAction<Member[]>> | null =
  null;

// context & provider
const AppContext = createContext<AppContextType | undefined>(undefined);
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // states
  const [matters, setMatters] = useState<Matter[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [clientInfo, setClientInfo] = useState<ClientInfoType>({
    name: "",
    mobile: "",
    email: "",
    matterTitle: "",
    activityLog: "",
  });

  // assign to global
  externalSetClientInfo = setClientInfo;
  externalSetMatters = setMatters;
  externalSetMembers = setMembers;

  return (
    <AppContext.Provider
      value={{
        clientInfo,
        setClientInfo,
        matters,
        setMatters,
        members,
        setMembers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// update client information
export const updateClientInfo = (info: ClientInfoType) => {
  if (externalSetClientInfo) {
    externalSetClientInfo(info);
  } else {
    console.warn("Context not initialized yet.");
  }
};

// update matters information
export const updateMatters = (matters: Matter[]) => {
  if (externalSetMatters) {
    externalSetMatters(matters);
  } else {
    console.warn("Context not initialized yet.");
  }
};

// update member information
export const updateMembers = (members: Member[]) => {
  if (externalSetMembers) {
    externalSetMembers(members);
  } else {
    console.warn("Context not initialized yet.");
  }
};

// custom hook
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a MyProvider");
  }
  return context;
};

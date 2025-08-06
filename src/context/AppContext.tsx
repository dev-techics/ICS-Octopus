import React, { createContext, useState, useContext } from "react";
import type { AppProviderProps, ClientInfoType } from "../types/type";
import type { Matter, Member } from "../types/data";

// type declaration
interface AppContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  saved: boolean;
  setSaved: React.Dispatch<React.SetStateAction<boolean>>;

  clientInfo: ClientInfoType;
  setClientInfo: React.Dispatch<React.SetStateAction<ClientInfoType>>;

  matters: Matter[];
  setMatters: React.Dispatch<React.SetStateAction<Matter[]>>;

  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;

  memberId: number | undefined;
  setMemberId: React.Dispatch<React.SetStateAction<number | undefined>>;

  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;

  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [matters, setMatters] = useState<Matter[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [memberId, setMemberId] = useState<number | undefined>(0);
  const [selected, setSelected] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [clientInfo, setClientInfo] = useState<ClientInfoType>({
    name: "",
    mobile: "",
    email: "",
    address: "",
    matterType: "",
    matterTitle: "",
    matterDesc: "",
    activityLog: "",
    advertise: "",
    sources: "",
    extra: {}, 
  });

  // assign to global
  externalSetClientInfo = setClientInfo;
  externalSetMatters = setMatters;
  externalSetMembers = setMembers;

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        saved,
        setSaved,
        clientInfo,
        setClientInfo,
        matters,
        setMatters,
        members,
        setMembers,
        memberId,
        setMemberId,
        selected,
        setSelected,
        errorMessage,
        setErrorMessage,
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

import React from "react";
import { useAppContext } from "../context/AppContext";

const Footer: React.FC = () => {
  const { matters, members, errorMessage } = useAppContext();
  const totalMatters = matters.length;
  const totalMembers = members.length;

  return (
    <p className={`${errorMessage ? "bg-red-400 text-white" : ""} px-4 py-2.5 mt-3 bg-gray-100 border-t border-slate-200`}>
      {errorMessage ? (
        errorMessage
      ) : (
        <span>
          We found {totalMembers ? totalMembers : "no"} members and{" "}
          {totalMatters ? totalMatters : "no"} matters for this lead.
        </span>
      )}
    </p>
  );
};

export default Footer;
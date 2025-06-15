import React from "react";
import { useAppContext } from "../context/AppContext";

const Footer: React.FC = (props) => {
  const { matters, members } = useAppContext();
  const totalMatters = matters.length;
  const totalMembers = members.length;

  return (
    <p className="px-4 py-2.5 mt-3 bg-gray-100 border-t border-slate-200">
      We found {totalMatters ? totalMatters : "no"} members and{" "}
      {totalMembers ? totalMembers : "no "} matters for this leads.
    </p>
  );
};

export default Footer;

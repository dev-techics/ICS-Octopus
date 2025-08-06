import React from "react";
import logo from "../assets/techics.png";
import octopus from "../assets/octopus.png";

const Header: React.FC = () => {
  return (
    <section className="px-4 pt-6 pb-2 flex justify-between items-center">
      <div className="flex items-center gap-1">
        <img className="h-6 w-6 ml-1" src={octopus} alt="" />
        <h1 className="font-extrabold text-[15px] ml-1">
          <span>ICS</span> Octopus
        </h1>
      </div>

      <img className="h-4.5" src={logo} alt="tech-ics" />
    </section>
  );
};

export default Header;

import React from "react";
import logo from "../assets/techics.png";

const Header: React.FC = () => {
  return (
    <section className="px-4 pt-4 pb-2 flex justify-between items-center">
      <h1 className="font-extrabold text-lg">ICS Scraper</h1>
      <img className="h-4.5" src={logo} alt="tech-ics" />
    </section>
  );
};

export default Header;

import React from "react";
import memberIcon from "../assets/avatar.jpg";
import emailIcon from "../assets/icon-email.svg";
import mobileIcon from "../assets/icon-phone.svg";
import { useAppContext } from "../context/AppContext";

const Matter: React.FC = () => {
  const { members } = useAppContext();

  return (
    <section className={`px-2 ${members.length ? "pt-4" : "pt-2"}`}>
      <h3 className="text text-gray-500 px-2">
        {members.length === 0
          ? "No member found for this leads."
          : members.length > 1
          ? "Members Found"
          : "Member Found"}
      </h3>
      <div>
        {members.map((member, index) => (
          <div
            key={index}
            className="flex items-center justify-between mt-1 hover:bg-gray-100/80 transition cursor-pointer rounded-md px-2"
          >
            <div className="flex gap-3 py-2">
              <img
                className="h-10 w-10 rounded-full border border-slate-200"
                src={memberIcon}
                alt="matter"
              />
              <div>
                <h2 className="font-semibold text-[14px] max-w-[210px] truncate whitespace-nowrap overflow-hidden text-ellipsis">
                  {member.fname + " " + member.lname}
                </h2>
                <div className="flex gap-3">
                  <div className="flex items-center gap-1">
                    <img
                      className="h-4.5 w-4.5"
                      src={emailIcon}
                      alt="email icon"
                    />
                    <p className=" text-gray-500">{member.email}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img
                      className="h-4 w-4"
                      src={mobileIcon}
                      alt="email icon"
                    />
                    <p className=" text-gray-500">
                      {member.phone || member.mobile}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Matter;

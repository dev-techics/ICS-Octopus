import React from "react";
import memberIcon from "../assets/avatar.jpg";
import emailIcon from "../assets/icon-email.svg";
import mobileIcon from "../assets/icon-phone.svg";
import { useAppContext } from "../context/AppContext";
import type { Member } from "../types/data";
import { isEmailMatch, isPhoneMatch } from "../utils/match";
import { getMobile } from "../utils/filter";

const Matter: React.FC = () => {
  const { clientInfo, members, memberId, setMemberId, setSelected } = useAppContext();

  const getParcentage = (member: Member): string => {
    const clientEmail = clientInfo.email;
    const clientPhone = getMobile(clientInfo.mobile);
    const clientFname = clientInfo.name.split(" ")[0].toLowerCase();

    const memberEmail = member.email;
    const memberPhone = member.phone || member.mobile;
    const memberFname = member.fname.toLowerCase();

    // email + number + name [ not masked ] 100%
    return memberEmail === clientEmail &&
      (memberPhone === clientPhone) &&
      memberFname === clientFname
      ? "100%"
      : // email + number + name [ masked ]
      isEmailMatch(clientEmail, memberEmail) &&
        isPhoneMatch(clientPhone, memberPhone) &&
        memberFname === clientFname
      ? "90%"
      : // email + phone [ masked ]
      isEmailMatch(clientEmail, memberEmail) &&
        isPhoneMatch(clientPhone, memberPhone)
      ? "50%"
      : // email + name [ masked ]
      isEmailMatch(clientEmail, memberEmail) && memberFname === clientFname
      ? "50%"
      : // if phone or name match
      isPhoneMatch(clientPhone, memberPhone) ||
        memberFname === clientFname
      ? "50%"
      : // if not match
        "25%";
  }

  const handleMemberSelection = (memberId: number) =>{
    setMemberId(memberId)
    setSelected(true);
  }



  return (
    <section className={`px-2 ${members.length ? "pt-4" : "pt-2"}`}>
      <h3 className="text text-gray-500 px-2 mb-1">
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
            onClick={() => handleMemberSelection(member.id)}
            className="flex items-center justify-between hover:bg-gray-100/80 transition cursor-pointer rounded-md px-2"
          >
            <div className="flex gap-3 py-2">
              <div className={`${memberId == member.id && "ring"} relative  ring-[#26848E] ring-offset-2 rounded-full`}>
                <div className="absolute h-full w-full text-center flex items-center justify-center rounded-full bg-slate-900/50 text-white">
                  <span className="text-[10px] font-semibold">{getParcentage(member)}</span>
                </div>
                <img
                  className="h-10 w-10 rounded-full border border-slate-200"
                  src={memberIcon}
                  alt="matter"
                />
              </div>

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

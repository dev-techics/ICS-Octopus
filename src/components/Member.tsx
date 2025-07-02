import React, { useState } from "react";
import memberIcon from "../assets/avatar.jpg";
import emailIcon from "../assets/icon-email.svg";
import mobileIcon from "../assets/icon-phone.svg";
import { useAppContext } from "../context/AppContext";
import type { Member as MemberType } from "../types/data";
import { isEmailMatch, isPhoneMatch } from "../utils/match";
import { getMobile } from "../utils/filter";
import { AnimatePresence, motion } from "framer-motion";
import Matter from "./Matter";

const Member: React.FC = () => {
  const { clientInfo, members, memberId, setMemberId, setSelected } = useAppContext();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const getParcentage = (member: MemberType): string => {
    let parcentage = 0;
    const clientEmail = clientInfo.email.toLocaleLowerCase();
    const clientPhone = getMobile(clientInfo.mobile);
    const clientFname = clientInfo.name.split(" ")[0].toLowerCase();

    const memberEmail = member.email.toLocaleLowerCase();
    const memberPhone = member.phone || member.mobile;
    const memberFname = member.fname.toLowerCase();

    const isMasked = clientEmail.includes("*") || clientPhone.includes("*");
    if (!isMasked && (memberEmail === clientEmail || memberPhone == clientPhone)) {
      parcentage += 100;
    } else {
      if (isEmailMatch(clientEmail, memberEmail)) parcentage += 25;
      if (isPhoneMatch(clientPhone, memberPhone)) parcentage += 25;
      if (clientFname == memberFname) parcentage += 25;
    }
    if (parcentage == 75) parcentage += 15;
    return parcentage + "%";
  };

  const handleMemberSelection = (memberId: number, index: number) => {
    setMemberId(memberId);
    setSelected(true);
    setOpenIndex(openIndex === index ? null : index); // toggle dropdown
  };

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
        {members
          .slice()
          .sort((a, b) => {
            const aPercent = parseInt(getParcentage(a));
            const bPercent = parseInt(getParcentage(b));
            return bPercent - aPercent;
          })
          .map((member, index) => (
            <div key={member.id}>
              <div
                onClick={() => handleMemberSelection(member.id, index)}
                className="flex hover:bg-gray-100/80 items-center justify-between transition cursor-pointer rounded-md px-2"
              >
                <div className="flex gap-3 py-2">
                  <div className={`${memberId == member.id ? "ring" : ""} relative ring-[#26848E] ring-offset-2 rounded-full`}>
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
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Matter />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Member;
import React, { use } from "react";
import GroupButton from "./ui/GroupButton";
import { useAppContext } from "../context/AppContext";

const Client: React.FC = () => {
  const { clientInfo } = useAppContext();
  const { members } = useAppContext();

  // variable for button group
  let isMember = false;
  let existEmail = !clientInfo.email ? true : false;
  members.forEach((member) => {
    if (member.email === clientInfo.email) {
      isMember = true;
    }
  });

  // create new matter
  const createMatter = (priority: string = "") => {
    console.log({
      website: "https://example.com",
      owner_id: "113",
      fname: "John",
      lname: "Doe",
      email: "john.doe@example.com",
      mobile: "1234567890",
      matter_type: "Legal Consultation",
      service_type: "Immigration",
      matter_title: "Immigration Enquiry",
      matter_details: "Client seeking assistance with visa application.",
      advertise: "Google Ads",
      sources: "Online Search",
      activity_log: "Initial enquiry logged via web form.",
      priority: "Medium",
    });
  };

  return (
    <section className="px-4 pt-3 pb-6 flex justify-between items-center border-b border-dashed border-gray-300">
      <div className="flex items-center w-full justify-between relative">
        <div className="flex gap-3">
          <div className="h-10 w-10 flex justify-center items-center rounded-full font-semibold bg-avatar text-white text-lg">
            {clientInfo.name[0] || "X"}
          </div>
          <div>
            <h2 className="font-bold text-slate-800 text-[15px]">
              {clientInfo.name || "No buyer name found."}
            </h2>
            <p className="text text-gray-500">
              {clientInfo.email || "No buyer email found."}
            </p>
          </div>
        </div>

        <GroupButton
          hidden={existEmail}
          disabled={isMember}
          disabledText="Saved"
          firstButtonText="Save"
          secondButtonText="Save & Priority"
          firstButtonClick={createMatter}
          secondButtonClick={() => createMatter("high")}
        />
      </div>
    </section>
  );
};

export default Client;

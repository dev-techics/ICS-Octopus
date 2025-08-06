import React from "react";
import GroupButton from "./ui/GroupButton";
import { useAppContext } from "../context/AppContext";
import { getMobile, getName, getPlatformName } from "../utils/filter";
import { saveMatter } from "../api/api";
import sendEmail from "../utils/send-email-sms";

const Client: React.FC = () => {
  const {
    clientInfo,
    members,
    saved,
    setSaved,
    loading,
    setLoading,
    setErrorMessage,
  } = useAppContext();

  // hide group button
  let existEmail = () => {
    return !clientInfo.email || clientInfo.email.includes("*");
  };

  // show saved
  members.forEach((member) => {
    if (member.email === clientInfo.email) {
      if (!saved) setSaved(true);
    }
  });

  // create new matter
  const createMatter = async (priority: string = "") => {
    const userId = import.meta.env.VITE_USER_ID;
    const platform = await getPlatformName();
    const [fname, lname] = getName(clientInfo.name);
    const mobile = getMobile(clientInfo.mobile);
    sendEmail(); // only work for bark

    try {
      const response = await saveMatter({
        userId: userId,
        website: platform,
        fname: fname,
        lname: lname,
        email: clientInfo.email,
        mobile: mobile,
        address: clientInfo.address,
        matterType: clientInfo.matterType,
        matterTitle: clientInfo.matterTitle,
        matterDesc: clientInfo.matterDesc,
        advertise: clientInfo.advertise,
        sources: clientInfo.sources,
        priority: priority,
        activityLog: clientInfo.activityLog,
        extra: clientInfo.extra,
      });

      if (response.status === "error") throw Error(response.message);
      if (response.status === "success") setSaved(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to save matter. Please try again."
      );
    } finally {
      setLoading(false);
    }
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
          loading={loading}
          disabled={saved}
          hidden={existEmail()}
          disabledText="Saved"
          firstButtonText="Save"
          secondButtonText="Save & Priority"
          firstButtonClick={() => createMatter()}
          secondButtonClick={() => createMatter("high")}
        />
      </div>
    </section>
  );
};

export default Client;

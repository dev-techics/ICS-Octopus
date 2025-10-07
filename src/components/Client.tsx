import React from "react";
import GroupButton from "./ui/GroupButton";
import { useAppContext } from "../context/AppContext";
import { getMobile, getName, getPlatformName } from "../utils/filter";
import { saveMatter } from "../api/api";
import sendEmail from "../utils/send-email-sms";
import loadingIcon from "../assets/loading.svg";
import iconVerify from "../assets/icon-verify.svg";
import crossIcon from "../assets/icon-cross.svg";

const Client: React.FC = () => {
  const {
    clientInfo,
    members,
    saved,
    setSaved,
    loading,
    setLoading,
    setErrorMessage,
    emailState,
  } = useAppContext();

  // hide group button
  const existEmail = () => {
    return !clientInfo.email || clientInfo.email.includes("*");
  };

  // show saved if member exists
  members.forEach((member) => {
    if (member.email === clientInfo.email && !saved) setSaved(true);
  });

  // create new matter
  const createMatter = async (priority: string = "") => {
    const userId = import.meta.env.VITE_USER_ID;
    const platform = await getPlatformName();
    const [fname, lname] = getName(clientInfo.name);
    const mobile = getMobile(clientInfo.mobile);
    sendEmail(); // only works for bark

    try {
      const response = await saveMatter({
        userId,
        website: platform,
        fname,
        lname,
        email: clientInfo.email,
        mobile,
        address: clientInfo.address,
        matterType: clientInfo.matterType,
        matterTitle: clientInfo.matterTitle,
        matterDesc: clientInfo.matterDesc,
        advertise: clientInfo.advertise,
        sources: clientInfo.sources,
        priority,
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

            <div className="text text-gray-500 flex items-center gap-2">
              <span>{clientInfo.email || "No buyer email found."}</span>

              {!existEmail() && (
                <>
                  {emailState === "loading" && (
                    <span className="bg-gray-200 h-5 w-5 rounded-full p-0.5 inline-flex">
                      <img
                        src={loadingIcon}
                        alt="loading-icon"
                        className="animate-spin"
                      />
                    </span>
                  )}

                  {emailState === "valid" && (
                    <img
                      src={iconVerify}
                      alt="verified-icon"
                      className="h-5 w-5"
                    />
                  )}

                  {emailState === "invalid" && (
                    <span className="bg-red-200 h-5 w-5 rounded-full p-0.5 inline-flex">
                      <img src={crossIcon} alt="invalid-icon" />
                    </span>
                  )}
                </>
              )}
            </div>
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

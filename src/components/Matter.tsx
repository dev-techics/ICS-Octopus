import React, { useState } from "react";
import matterIcon from "../assets//matter-icon.svg";
import GroupButton from "./ui/GroupButton";
import { useAppContext } from "../context/AppContext";
import { stripHtml } from "../utils/filter";
import { updateLog } from "../api/api";

const Matter: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const userId = import.meta.env.VITE_USER_ID;
  const { clientInfo, matters, memberId, selected, setErrorMessage } =
    useAppContext();
  const [isSaved, setSaved] = useState<boolean>(false);
  const [loadingStates, setLoadingStates] = useState<{
    [key: number]: boolean;
  }>({});

  // open matter
  const openMatter = (matterId: number) => {
    const URL = serverUrl + "add_edit_case.php?caseid=" + matterId;
    chrome.tabs.create({ url: URL });
  };

  const updateActivityLog = async (matterId: number, priority: string = "") => {
    setLoadingStates((prevState) => ({
      ...prevState,
      [matterId]: true,
    }));

    try {
      const response = await updateLog({
        userId: userId,
        matterId: matterId,
        activityLog: clientInfo.activityLog,
        priority: priority,
        extra: { projectId: clientInfo.extra?.projectId || null },
      });

      if (response.status === "error") {
        setErrorMessage(response.message || "Failed to update matter.");
        setLoadingStates((prevState) => ({
          ...prevState,
          [matterId]: false,
        }));
        return;
      }

      setSaved(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to update matter. Please try again."
      );
    } finally {
      setLoadingStates((prevState) => ({
        ...prevState,
        [matterId]: false,
      }));
    }
  };

  return (
    <section className={`px-2 ${matters.length ? "pt-4" : "pt-2"}`}>
      {/* title area start  */}
      <h3 className="text text-gray-500 px-2 mb-1">
        {matters.length === 0
          ? "No matter found for this leads."
          : matters.length > 1
          ? "Matters Found"
          : "Matter Found"}
      </h3>

      {/* matters area start  */}
      <div>
        {matters.map((matter, index) => (
          <div
            key={index}
            className={`${
              !selected ||
              (memberId && memberId.toString() === matter.fkclientid)
                ? "opacity-100"
                : "opacity-50"
            } flex relative items-center justify-between hover:bg-gray-100/80 transition cursor-pointer rounded-md px-2`}
          >
            <div
              onClick={() => openMatter(matter.caseid)}
              className="flex gap-3 py-2"
            >
              <img src={matterIcon} alt="matter" className="pl-1" />
              <div>
                <h2 className="font-semibold text-[14px] max-w-[250px] truncate whitespace-nowrap overflow-hidden text-ellipsis">
                  {matter.title}
                </h2>
                <p className="truncate whitespace-nowrap overflow-hidden text-ellipsis max-w-[230px] text-gray-500">
                  {matter.details.trim()
                    ? stripHtml(matter.details)
                    : "No description found."}
                </p>
              </div>
            </div>

            <GroupButton
              classes="mr-2"
              hidden={false}
              loading={loadingStates[matter.caseid] || false}
              disabled={isSaved}
              disabledText="Updated"
              firstButtonText="Update"
              secondButtonText="Update & Priority"
              firstButtonClick={() => updateActivityLog(matter.caseid)}
              secondButtonClick={() => {
                updateActivityLog(matter.caseid, "high");
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Matter;

import React, { useState } from "react";
import matterIcon from "../assets//matter-icon.svg";
import GroupButton from "./ui/GroupButton";
import { useAppContext } from "../context/AppContext";
import { stripHtml } from "../utils/filter";
import { updateLog } from "../api/api";

const Matter: React.FC = () => {
  const [isSaved, setSaved] = useState<boolean>(false);
  const { clientInfo, matters } = useAppContext();

  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const userId = import.meta.env.VITE_USER_ID;

  // open matter
  const openMatter = (matterId: number) => {
    const URL = serverUrl + "add_edit_case.php?caseid=" + matterId;
    chrome.tabs.create({ url: URL });
  };

  // update matter
  const updateActivityLog = async (matterId: number, priority: string = "") => {
    const response = await updateLog({
      userId: userId,
      matterId: matterId,
      activityLog: clientInfo.activityLog,
      priority: priority,
    });
    if (response.status === "error") return;
    setSaved(true);
  };

  return (
    <section className="px-2 pt-4">
      {/* title area start  */}
      <h3 className="text text-gray-500 px-2">
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
            className="flex relative items-center justify-between mt-1 hover:bg-gray-100/80 transition cursor-pointer rounded-md px-2"
          >
            <div
              onClick={() => openMatter(matter.caseid)}
              className="flex gap-3 py-2"
            >
              <img src={matterIcon} alt="matter" />
              <div>
                <h2 className="font-semibold text-[14px] max-w-[250px] truncate whitespace-nowrap overflow-hidden text-ellipsis">
                  {matter.title}
                </h2>
                <p className="truncate whitespace-nowrap overflow-hidden text-ellipsis max-w-[230px] text-gray-500">
                  {stripHtml(matter.details)}
                </p>
              </div>
            </div>

            <GroupButton
              classes="mr-2"
              hidden={false}
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

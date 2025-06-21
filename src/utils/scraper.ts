import { updateClientInfo } from "../context/AppContext";

export default () => {
  return new Promise<void>((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      if (!tabId) return reject("No active tab");

      chrome.tabs.sendMessage(
        tabId,
        { action: "START_SCRAPING" },
        (response) => {
          if (response?.data) {
            updateClientInfo(response.data);
            resolve();
          } else {
            reject("No data received");
          }
        }
      );
    });
  });
};

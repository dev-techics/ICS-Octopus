import { updateClientInfo } from "../context/AppContext";

export default () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;
    if (!tabId) return;

    chrome.tabs.sendMessage(tabId, { action: "START_SCRAPING" }, (response) => {
      if (response?.data) {
        updateClientInfo(response.data);
        //chrome.storage.local.set({ scrapedData: response.data }, () => {
        // console.log("Data saved to chrome.storage.local", response.data);
        //});
      }
    });
  });
};

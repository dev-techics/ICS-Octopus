export default () => {
  return new Promise<void>((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      if (!tabId) return reject("No active tab");

      chrome.tabs.sendMessage(
        tabId,
        { action: "SEND_EMAIL_SMS" },
        (response) => {
          if (response?.data) {
            resolve();
          } else {
            reject("No data received");
          }
        }
      );
    });
  });
};

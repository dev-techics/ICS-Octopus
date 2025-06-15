// // popup.tsx or background.ts
// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//   if (tabs[0]?.id) {
//     chrome.scripting.executeScript({
//       target: { tabId: tabs[0].id },
//       files: ["scrapers/apply-to-supply.ts"],
//     });
//   }
// });

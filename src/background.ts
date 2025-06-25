// chrome.runtime.onMessage.addListener((message: any, sender, sendResponse) => {
//   if (message.action === "scrape_url") {
//     chrome.tabs.create({ url: message.url, active: false }, (tab) => {
//       if (!tab.id) return;

//       const checkLoadedAndScrape = () => {
//         chrome.tabs.get(tab.id!, (updatedTab) => {
//           if (updatedTab.status === "complete") {
//             chrome.scripting.executeScript({
//               target: { tabId: tab.id! },
//               files: ["scraper.js"],
//             });
//           } else {
//             // Wait and check again
//             setTimeout(checkLoadedAndScrape, 500);
//           }
//         });
//       };

//       checkLoadedAndScrape();
//     });
//   }

//   if (message.action === "scraped_data") {
//     console.log("Received scraped data:", message.data);

//     // Optional: you can send this to popup or store it
//   }
// });

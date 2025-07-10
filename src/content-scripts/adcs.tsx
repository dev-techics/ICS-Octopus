import scrapDos from "../scrapers/scrape-adcs";

// start scraping
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "START_SCRAPING") {
    const data = scrapDos();
    sendResponse({ data });
    console.log(sender);
  }
  return true;
});

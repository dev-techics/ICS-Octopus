import scrapBark from "../helpers/scrape-bark";

// start scraping
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "START_SCRAPING") {
    const data = scrapBark();
    sendResponse({ data });
    console.log(sender);
  }
  return true;
});

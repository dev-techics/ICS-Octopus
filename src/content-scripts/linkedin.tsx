import scrapLinkedin from "../helpers/scrape-linkedin";

// start scraping
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "START_SCRAPING") {
    const data = scrapLinkedin();
    sendResponse({ data });
  }
  return true;
});

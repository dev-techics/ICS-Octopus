import scrapLinkedin from "../scrapers/scrape-linkedin";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "START_SCRAPING") {
    scrapLinkedin()
      .then((data) => {
        sendResponse({ data }); // send result when promise resolves
      })
      .catch((error) => {
        console.error("Scraping failed:", error);
        sendResponse({ error: "Scraping failed" });
      });

    return true; // 🔒 Keeps the message channel open for async response
  }
});

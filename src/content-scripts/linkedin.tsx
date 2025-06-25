import scrapLinkedin from "../scrapers/scrape-linkedin";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "START_SCRAPING") {
    // Wrap async code inside an IIFE to handle async/await in this callback
    (async () => {
      try {
        const data = await scrapLinkedin();
        if (data) {
          sendResponse({ data });
          console.log(sender);
        } else {
          sendResponse({ error: "Scraping failed" });
        }
      } catch (error) {
        sendResponse({ error: "Scraping threw an error" });
      }
    })();
    return true; // Important for sendResponse to work asynchronously
  }
});

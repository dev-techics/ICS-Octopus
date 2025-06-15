/*------------------------------------------
  CONTENT SCRIPT
------------------------------------------*/
import { createRoot } from "react-dom/client";
import scrapeApplyToSupply from "../helpers/scrape-apply-to-supply";

// start scraping
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "START_SCRAPING") {
    const data = scrapeApplyToSupply();
    sendResponse({ data });
  }
  return true;
});

// render root
function renderRoot() {
  if (document.getElementById("__EXTENSION_HOLDER")) return;
  const container = document.createElement("div");
  container.id = "__EXTENSION_HOLDER";
  const rootDiv = document.createElement("div");
  rootDiv.id = "__EXTENSION_ROOT";
  container.appendChild(rootDiv);
  document.body.appendChild(container);
  createRoot(rootDiv).render(<h1>Hello World</h1>);
}

renderRoot();

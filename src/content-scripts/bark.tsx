import { useState, useEffect, useRef } from "react";
import scrapBark from "../scrapers/scrape-bark";
import { createRoot } from "react-dom/client";

// Chrome message listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "START_SCRAPING") {
    const data = scrapBark();
    sendResponse({ data });
    console.log("Scraping started:", sender);
  }

  if (request.action === "SEND_EMAIL_SMS") {
    const optionEmail = document.getElementById("seller-button-btn-send-template");
    const optionSms = document.getElementById("seller-button-btn-send-sms");

    if (optionEmail) optionEmail.click();
    if (optionSms) optionSms.click();

    setTimeout(() => {
      const modals = document.querySelectorAll(".bark-modal.show");
      modals.forEach((modal) => {
        const button = modal.querySelector<HTMLButtonElement>("button.btn-primary");
        if (button) {
          button.click();
          console.log("Clicked modal confirm button:", button);
        }
      });
    }, 1000);
  }

  return true;
});

// React widget component
const MyWidget = () => {
  const [isOn, setIsOn] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsOn(checked);
  };

  useEffect(() => {
    if (isOn) {
      console.log("Auto-loader ON");
      intervalRef.current = setInterval(() => {
        const loadButton = document.querySelector<HTMLButtonElement>(".button.button-white.btn.btn-link");

        if (
          loadButton &&
          loadButton.offsetParent !== null && // visible
          !loadButton.disabled &&
          !loadButton.classList.contains("loading")
        ) {
          loadButton.click();
          console.log("Clicked load button");
        } else {
          console.log("No valid load button found, or all content loaded.");
        }
      }, 2000);
    } else {
      console.log("Auto-loader OFF");
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isOn]);

  return (
    <div style={{ background: "#fff", padding: "10px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <label style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "sans-serif" }}>
        <input type="checkbox" checked={isOn} onChange={handleSwitchChange} />
        <span>{isOn ? "Auto-Loading ON" : "Auto-Loading OFF"}</span>
      </label>
    </div>
  );
};

// Mount the React widget
const mountReactApp = () => {
  const existing = document.getElementById("my-react-widget");
  if (existing) return; // prevent duplicate

  const appContainer = document.createElement("div");
  appContainer.id = "my-react-widget";
  appContainer.style.position = "fixed";
  appContainer.style.top = "100px";
  appContainer.style.right = "20px";
  appContainer.style.zIndex = "9999";
  document.body.appendChild(appContainer);

  const root = createRoot(appContainer);
  root.render(<MyWidget />);
};

window.addEventListener("load", mountReactApp);

import { sendEmail, sendSMS } from "../helpers/bark";
import scrapBark from "../scrapers/scrape-bark";

// Chrome message listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case "START_SCRAPING":
      const data = scrapBark();
      sendResponse({ data });
      console.log("Scraping started:", sender);
      break;

    case "SEND_EMAIL_SMS":
      sendEmail();
      sendSMS();
      break;

    default:
      console.warn("Unknown action:", request.action);
      sendResponse({ error: "Unknown action" });
  }
  return false;
});






    // const optionEmail = document.getElementById(
    //   "seller-button-btn-send-template"
    // );
    // const optionSms = document.getElementById("seller-button-btn-send-sms");

    // if (optionEmail) optionEmail.click();
    // if (optionSms) optionSms.click();

    // setTimeout(() => {
    //   const smsModal = document.querySelector(
    //     "div#bark-modal.modal.bark-modal.show"
    //   );
    //   const emailModal = document.querySelector("#selectTemplateModal");

    //   const smsSendButton =
    //     smsModal?.querySelector<HTMLButtonElement>("button.btn-primary");
    //   const emailSendButton =
    //     emailModal?.querySelector<HTMLButtonElement>("button.btn-primary");

    //   // click email send button
    //   if (emailSendButton) emailSendButton.click();
    //   else chrome.storage.local.set({ errorMessage: "Failed to send Email" });

    //   // click sms send button
    //   if (smsSendButton) setTimeout(() => smsSendButton.click(), 500);
    //   else chrome.storage.local.set({ errorMessage: "Failed to send SMS" });
    // }, 1000);




// /* ----------------------------------------
//       Utility: Wait for Page Ready
// ------------------------------------------ */
// function onPageReady(callback: () => void) {
//   if (document.readyState === "complete") {
//     callback();
//   } else {
//     window.addEventListener("load", callback);
//   }
// }

// /* ----------------------------------------
//       Utility: Wait for Element (Visible)
// ------------------------------------------ */
// function waitForElement(selector: string, timeout: number = 5000): Promise<Element> {
//   return new Promise((resolve, reject) => {
//     const start = Date.now();

//     const interval = setInterval(() => {
//       const element = document.querySelector(selector);
//       const isVisible = element && (element as HTMLElement).offsetParent !== null;

//       if (element && isVisible) {
//         clearInterval(interval);
//         resolve(element);
//       } else if (Date.now() - start > timeout) {
//         clearInterval(interval);
//         reject(new Error(`Timeout: Element ${selector} not found or not visible`));
//       }
//     }, 200);
//   });
// }

// /* ----------------------------------------
//       Function: Send Email
// ------------------------------------------ */
// function sendEmail() {
//   console.log("Attempting to send email...");
//   const optionEmail = document.getElementById("seller-button-btn-send-template");
//   if (optionEmail) {
//     optionEmail.click();

//     waitForElement("#selectTemplateModal")
//       .then((emailModal) => {
//         console.log("Email modal found");
//         const sendBtn = emailModal.querySelector("button.btn-primary");
//         if (sendBtn) {
//           (sendBtn as HTMLButtonElement).click();
//           console.log("Email send button clicked");
//         } else {
//           chrome.storage.local.set({ errorMessage: "Failed to find Email send button" });
//         }
//       })
//       .catch((err) => {
//         chrome.storage.local.set({ errorMessage: "Email modal did not appear" });
//         console.error(err);
//       });
//   } else {
//     chrome.storage.local.set({ errorMessage: "Email option not found" });
//   }
// }

// /* ----------------------------------------
//       Function: Send SMS
// ------------------------------------------ */
// function sendSMS() {
//   console.log("Attempting to send SMS...");
//   const optionSms = document.getElementById("seller-button-btn-send-sms");
//   if (optionSms) {
//     optionSms.click();

//     waitForElement("div#bark-modal.modal.bark-modal.show")
//       .then((smsModal) => {
//         console.log("SMS modal found");
//         const sendBtn = smsModal.querySelector("button.btn-primary");
//         if (sendBtn) {
//           setTimeout(() => {
//             (sendBtn as HTMLButtonElement).click();
//             console.log("SMS send button clicked");
//           }, 300);
//         } else {
//           chrome.storage.local.set({ errorMessage: "Failed to find SMS send button" });
//         }
//       })
//       .catch((err) => {
//         chrome.storage.local.set({ errorMessage: "SMS modal did not appear" });
//         console.error(err);
//       });
//   } else {
//     chrome.storage.local.set({ errorMessage: "SMS option not found" });
//   }
// }

// /* ----------------------------------------
//       Chrome Runtime Listener
// ------------------------------------------ */
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log("Message received:", request.action);

//   switch (request.action) {
//     case "START_SCRAPING":
//       const data = scrapBark();
//       sendResponse({ data });
//       break;

//     case "SEND_EMAIL_SMS":
//       onPageReady(() => {
//         sendEmail();
//         sendSMS();
//       });
//       break;

//     default:
//       console.warn("Unknown action:", request.action);
//   }

//   return true;
// });

// // React widget component
// const MyWidget = () => {
//   const [isOn, setIsOn] = useState(false);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const checked = event.target.checked;
//     setIsOn(checked);
//   };

//   useEffect(() => {
//     if (isOn) {
//       console.log("Auto-loader ON");
//       intervalRef.current = setInterval(() => {
//         const loadButton = document.querySelector<HTMLButtonElement>(".button.button-white.btn.btn-link");

//         if (
//           loadButton &&
//           loadButton.offsetParent !== null && // visible
//           !loadButton.disabled &&
//           !loadButton.classList.contains("loading")
//         ) {
//           loadButton.click();
//           console.log("Clicked load button");
//         } else {
//           console.log("No valid load button found, or all content loaded.");
//         }
//       }, 2000);
//     } else {
//       console.log("Auto-loader OFF");
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//         intervalRef.current = null;
//       }
//     }

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [isOn]);

//   return (
//     <div style={{ background: "#fff", padding: "10px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
//       <label style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "sans-serif" }}>
//         <input type="checkbox" checked={isOn} onChange={handleSwitchChange} />
//         <span>{isOn ? "Auto-Loading ON" : "Auto-Loading OFF"}</span>
//       </label>
//     </div>
//   );
// };

// // Mount the React widget
// const mountReactApp = () => {
//   const existing = document.getElementById("my-react-widget");
//   if (existing) return; // prevent duplicate

//   const appContainer = document.createElement("div");
//   appContainer.id = "my-react-widget";
//   appContainer.style.position = "fixed";
//   appContainer.style.top = "100px";
//   appContainer.style.right = "20px";
//   appContainer.style.zIndex = "9999";
//   document.body.appendChild(appContainer);

//   const root = createRoot(appContainer);
//   root.render(<MyWidget />);
// };

// window.addEventListener("load", mountReactApp);

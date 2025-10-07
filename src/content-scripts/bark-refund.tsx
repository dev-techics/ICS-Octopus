import { createRoot } from "react-dom/client";
import BarkRefundSuccessModal from "./components/BarkRefundSuccessModal";


// -------- Mount App ----------
function mountReactApp() {
  if (document.getElementById("my-react-widget")) return;
  const container = document.createElement("div");
  container.id = "my-react-widget";
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(<BarkRefundSuccessModal />);
}


// ----------------- Main Script -----------------
(async () => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const returnTo = params.get("return_to");

  const name        = params.get("name");
  const email       = params.get("email");
  const caseId      = params.get("case_id");
  const requestCode = params.get("request_code");
  const requestNote = params.get("request_note");
  const templateId  = params.get("template_id");

  try {
    // Save case ID in Chrome session (clears when browser closes)
    if (caseId) sessionStorage.setItem("case_id", caseId);

    // Only show modal when redirected back to requests
    if (decodeURIComponent(returnTo || "") === "/hc/requests") {
      mountReactApp();
      return; // stop executing rest of the script
    }

    // Validate required params
    if (!name || !email || !caseId || !requestCode || !requestNote || !templateId){
      throw new Error("Missing required query parameters");
    }
      
    // Collect form elements
    const inputs = document.querySelectorAll<HTMLInputElement>("input");
    const reasonInput = inputs[4];
    const nameInput = inputs[5];
    const emailInput = inputs[6];
    const refundForm = document.querySelector<HTMLFormElement>("#new_request");
    const accountEmailInput = document.querySelector<HTMLInputElement>("#request_anonymous_requester_email");
    const submitButton = document.querySelector<HTMLInputElement>('input[type="submit"]');
    const textEditor = document.querySelector<HTMLDivElement>(".form-field.request_description");

    if (!reasonInput || !nameInput || !emailInput || !refundForm || !accountEmailInput || !submitButton){
      throw new Error("Missing required form elements");
    }
      
    // Send refund request to CRM
    const response = await fetch("https://cms.icslegal.com/process-bark-refund.php", {
      method: "POST",
      body: new URLSearchParams({ case_id: caseId, template_id: templateId }),
    });

    const data = await response.json();
    if (data.status !== "success") throw new Error(`Refund request failed: ${JSON.stringify(data)}`);

    // Fill form fields
    const accountEmail = "abdul.kadir@sk-associates.org";
    accountEmailInput.value = accountEmail;
    reasonInput.value = requestCode;
    nameInput.value = name;
    emailInput.value = email;

    // Replace CKEditor with plain input
    textEditor?.remove();
    const descriptionInput = Object.assign(document.createElement("input"), {
      type: "text",
      name: "request[description]",
      value: requestNote,
    });
    refundForm.appendChild(descriptionInput);

    // Optional: auto-submit after delay
    setTimeout(() => submitButton.click(), 2000);    
  } catch (error) {
    console.error("Error processing refund:", error);
  }
})();
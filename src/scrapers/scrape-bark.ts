// get project id [Client Id form BARK]
const getProjectId = () => {
  const selectedElement = document.querySelector<Element>(
    ".responses-projects-item.selected"
  );
  return selectedElement?.getAttribute("data-project-id") ?? "";
};

// get client name
const getName = () => {
  const element = document.querySelector(".buyer_name");
  return (element && element.textContent?.trim()) || "";
};

// get client email
const getEmail = () => {
  const element = document.querySelector(".buyer-email-display");
  return (element && element.textContent?.trim()) || "";
};

// get client mobile
const getMobile = () => {
  const element = document.querySelector(".buyer-telephone-display");
  return (element && element.textContent?.trim()) || "";
};

// get client service type
const getService = () => {
  const element = document.querySelectorAll(".project-details-answer")[1];
  return (element && element.textContent?.trim()) || "";
};

// get activity log
const getActivity = () => {
  let finalOutput = "";
  const questions = document.querySelectorAll(".project-details-question");
  const answers = document.querySelectorAll(".project-details-answer");

  if (questions && answers) {
    questions.forEach((question, index) => {
      const qText = question?.textContent?.trim() || "";
      const answerElem = answers[index];
      const aText = answerElem?.textContent?.trim() || "";
      finalOutput += `<b>Question : ${qText} </b>\n <p>Answer : ${aText}</p>`;
    });
  }

  // request quotes info and message
  let requestQuotes = "";
  const responseSpan = document.querySelector(".response.text-regular");
  if (responseSpan) {
    const spanTextNode = responseSpan.childNodes[0];
    const spanText = spanTextNode?.textContent?.trim() || "";
    const messageElement = responseSpan.querySelector(".font-weight-bold");
    const message = messageElement?.textContent?.trim() || "";
    if (spanText || message) {
      requestQuotes = `Info: ${spanText}\nMessage: ${message}\n`;
    }
  }

  return finalOutput + requestQuotes;
};

// get title
const getTitle = () => {
  return getService() + " - Bark Enquiry";
};

interface ExtraData {
  projectId: string | null;
}
export default () => {
  const name = getName();
  const email = getEmail();
  const mobile = getMobile();
  const activityLog = getActivity();
  const matterType = "Consultation";
  const matterTitle = getTitle();
  const matterDesc = "Created by ICS-Octopus.";
  const advertise = "Bark";
  const sources = "Bark";
  const extra: ExtraData = { projectId: getProjectId() };
  return {
    name,
    mobile,
    email,
    matterType,
    matterTitle,
    matterDesc,
    activityLog,
    advertise,
    sources,
    extra,
  };
};

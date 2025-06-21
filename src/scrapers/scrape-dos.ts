let targetedCard: Element | null = null;
let service = "";

// select card by click
document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  targetedCard = target.closest(".lead_card");
  if (targetedCard) {
    document
      .querySelectorAll(".lead_card")
      .forEach((c) => c.classList.remove("border-2", "border-black"));
    targetedCard.classList.add("border-2", "border-black");
  }
});

// get name, email, mobile data
const getData = (name: string) => {
  if (targetedCard) {
    const element = targetedCard.querySelector(name);
    return element?.textContent?.trim() || "";
  }
  return "";
};

// get activity
const getActivity = () => {
  if (targetedCard) {
    const output = [] as string[];
    const qaWrapper = targetedCard.querySelectorAll(".question_wrapper");
    qaWrapper.forEach((wrapper, index) => {
      const qElement = wrapper.querySelector(".question") as HTMLElement;
      const question = qElement?.textContent?.trim() || "";
      const aElement = wrapper.querySelector(".question_answer") as HTMLElement;
      const answer = aElement?.textContent?.trim() || "";

      if (index == 1) service = answer;
      if (question && answer) {
        output.push(
          `<b>Question: ${question}</b><br> \n<b>Answer</b>: ${answer}\n</br><br>`
        );
      }
    });

    return output.join("\n");
  }

  return "";
};

export default () => {
  const name = getData("h3");
  const email = getData(".mail_wrapper");
  const mobile = getData(".phone_wrapper");
  const matterType = "Consultation";
  const matterDesc = "Created by ICS-Octopus";
  const matterTitle = `${service} - DOS Enquiry`;
  const advertise = "Linkedin";
  const sources = "Linkedin";
  const activityLog = getActivity();
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
  };

  // Empty data for testing
  // -----------------------------------
  // const name = "";
  // const email = "";
  // const mobile = "";
  // const matterType = "";
  // const matterTitle = "";
  // const matterDesc = "";
  // const activityLog = "";
  // const advertise = "";
  // const sources = "";
  // return {
  //   name,
  //   mobile,
  //   email,
  //   matterType,
  //   matterTitle,
  //   matterDesc,
  //   activityLog,
  //   advertise,
  //   sources,
  // };
};

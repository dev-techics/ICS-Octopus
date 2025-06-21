const openModal = () => {
  const contactModalId = "#top-card-text-details-contact-info";
  const contactModal = document.querySelector<HTMLElement>(contactModalId);
  contactModal?.click();
};

// const closeModal = () => {
//   const closeButton = document.querySelector<HTMLElement>(
//     "button[data-test-modal-close-btn]"
//   );
//   closeButton?.click();
// };

const getName = () => {
  const element = document.querySelector("h1");
  return (element && element.textContent?.trim()) || "";
};

const getEmail = () => {
  // prettier-ignore
  const element = document.querySelector<HTMLAnchorElement>('a[href^="mailto:"]');
  if (element && element.href) {
    const email = element.href.replace(/^mailto:/, "").trim();
    return email;
  }
  return "";
};

const getMobile = () => {
  const elements = document.querySelectorAll(".pv-contact-info__contact-type");
  const mobileElement = Array.from(elements).find((section) => {
    return section.querySelector("h3")?.innerText === "Phone";
  });

  const dataElement = mobileElement?.querySelector("span");
  const mobile = dataElement?.textContent?.trim() || "";
  return mobile;
};

const getMatterDesc = () => {
  const elements = document.querySelectorAll(".pv-contact-info__contact-type");
  let matterDesc = "";

  elements.forEach((infoElement) => {
    const heading = infoElement.querySelector("h3")?.textContent?.trim();
    const valueElement = infoElement.querySelector("a, span");
    const value = valueElement?.textContent?.trim();
    if (heading && value) {
      matterDesc += `<b>${heading}</b>: ${value} <br>`;
    }
  });

  return matterDesc;
};

const getActivity = () => {
  let expriences = "";
  const containers = document.querySelectorAll(".artdeco-card");
  const exprienceContainer = Array.from(containers).find((section) => {
    const titleElement = section.querySelector("h2")?.querySelector("span");
    const title = titleElement?.textContent?.trim();
    return title === "Experience";
  });
  const data = exprienceContainer?.querySelectorAll(".visually-hidden");
  data?.forEach((item) => {
    expriences += item.textContent + "<br>";
  });

  const backButton =
    document.querySelector<HTMLButtonElement>(".artdeco-button--3");
  backButton?.click();

  return expriences;
};

export default () => {
  let name = getName();
  let email = getEmail();
  let mobile = getMobile();
  let matterType = "Consultation";
  let matterDesc = getMatterDesc();
  let activityLog = getActivity();
  let matterTitle = "";
  let advertise = "";
  let sources = "";

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
};

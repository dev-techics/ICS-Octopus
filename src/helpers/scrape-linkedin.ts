const dataArray: string[] = [];

const openModal = () => {
  const contactModalId = "#top-card-text-details-contact-info";
  const contactModal = document.querySelector<HTMLElement>(contactModalId);
  contactModal?.click();
};

const closeModal = () => {
  const closeButton = document.querySelector<HTMLElement>(
    "button[data-test-modal-close-btn]"
  );
  closeButton?.click();
};

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
  const data = dataElement?.textContent?.trim() || "";
  return data;
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
  // const containers = document.querySelectorAll(".artdeco-card");
  // const exprienceContainer = Array.from(containers).find((section) => {
  //   const titleElement = section.querySelector("h2")?.querySelector("span");
  //   const title = titleElement?.textContent?.trim();
  //   return title === "Experience";
  // });

  // if (exprienceContainer) {
  //   exprienceContainer // clcik on more button
  //     .querySelector<HTMLElement>("#navigation-index-see-all-experiences")
  //     ?.click();

  //   // add data into the vaiable
  //   const data = exprienceContainer.querySelectorAll(".visually-hidden");
  //   data.forEach((item) => {
  //     dataArray.push(item.textContent?.trim() || "");
  //     expriences += item.textContent + "<br>";
  //   });
  // }

  return expriences;
};

const getCompanyName = () => {
  return dataArray[1];
};

const getTitle = () => {
  return `[ HR Director @ ${getCompanyName()}`;
};

export default () => {
  openModal();
  // const loader = document.querySelector(".artdeco-loader__bars");

  // const activityLog = getActivity();
  // const name = getName();
  // const email = getEmail();
  // const mobile = getMobile();
  // const matterType = "General Enquery";
  // const matterDesc = getMatterDesc();
  // const matterTitle = getTitle();
  // const advertise = "Linkedin";
  // const sources = "Linkedin";
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

  const activityLog = "";
  const name = "";
  const email = "";
  const mobile = "";
  const matterType = "";
  const matterDesc = "";
  const matterTitle = "";
  const advertise = "";
  const sources = "";
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

const openModal = () => {
  const contactModalId = "#top-card-text-details-contact-info";
  const contactModal = document.querySelector<HTMLElement>(contactModalId);
  contactModal?.click();
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getName = () => {
  const element = document.querySelector("h1");
  return (element && element.textContent?.trim()) || "";
};

const getTitle = () => {
  const card = document.querySelector(".artdeco-card");
  if (!card) return "";

  const titleElement = card.querySelector(".text-body-medium.break-words");
  return "[Linkedin] " + titleElement?.textContent?.trim() || "";
};

const getEmail = () => {
  const element =
    document.querySelector<HTMLAnchorElement>('a[href^="mailto:"]');
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

const getActivity = async () => {
  let experiences = "";
  const containers = document.querySelectorAll(".artdeco-card");
  const experienceContainer = Array.from(containers).find((section) => {
    const titleElement = section.querySelector("h2 span");
    const title = titleElement?.textContent?.trim();
    return title === "Experience";
  });

  // experienceContainer
  //   ?.querySelector<HTMLButtonElement>(".artdeco-button")
  //   ?.click();

  const data = experienceContainer?.querySelectorAll(".visually-hidden");
  data?.forEach((item) => {
    experiences += item.textContent + "<br>";
  });

  // const backButton =
  //   document.querySelector<HTMLButtonElement>(".artdeco-button--3");
  // backButton?.click();

  return experiences;
};

export default async () => {
  const name = getName();
  openModal();
  await delay(1500);
  const matterTitle = getTitle();
  const email = getEmail();
  const mobile = getMobile();
  const matterDesc = getMatterDesc();
  const matterType = "Consultation";
  const advertise = "Linkedin";
  const sources = "Linkedin";
  const activityLog = await getActivity();

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

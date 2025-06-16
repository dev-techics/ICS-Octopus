// get activity log
const getMatterTitle = () => {
  const companyName =
    document.querySelector(".govuk-caption-l")?.textContent || "";
  return `[${companyName} @ GOV.UK]`;
};

// get contact info
const getContactInfo = (): string[] => {
  let name = "";
  let mobile = "";
  let email = "";

  document.querySelectorAll("h2").forEach((heading) => {
    if (heading.textContent?.trim() === "Contact") {
      const contactBlock = heading.nextElementSibling;

      if (contactBlock) {
        let textItems: string[] = [];

        contactBlock.childNodes.forEach((node) => {
          const text = (node.textContent || "").trim();

          if (node.nodeType === Node.TEXT_NODE && text) {
            textItems.push(text);
          } else if (
            node.nodeType === Node.ELEMENT_NODE &&
            (node as HTMLElement).tagName === "A"
          ) {
            const href = (node as HTMLAnchorElement).getAttribute("href");
            if (href?.startsWith("mailto:")) {
              email = href.replace("mailto:", "");
            }
          }
        });

        // Use position-based logic
        if (textItems.length >= 1) name = textItems[0];
        if (textItems.length >= 2) mobile = textItems[1]; // assume 2nd is mobile
      }
    }
  });

  return [name, mobile, email];
};

// get activity log
const getActivityLog = () => {
  const elements = document.querySelectorAll(".govuk-body");
  return elements[3]?.innerHTML || "";
};

const getWebsite = () => {
  return window.location.href;
};

// return client information
export default () => {
  const [name, mobile, email] = getContactInfo();
  const activityLog = getActivityLog();
  const matterType = "Consultation";
  const matterTitle = getMatterTitle();
  const matterDesc = getWebsite();
  const advertise = "Google";
  const sources = "GOV.UK";
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

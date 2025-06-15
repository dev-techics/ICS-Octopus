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
        contactBlock.childNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = (node.textContent || "").trim();
            if (text && !name) {
              name = text;
            } else if (text.startsWith("+")) {
              mobile = text;
            }
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
      }
    }
  });

  return [name, mobile, email];
};

// get activity log
const getActivityLog = () => {
  return document.querySelectorAll(".govuk-body")[3].textContent || "";
};

// return client information
export default () => {
  const [name, mobile, email] = getContactInfo();
  const matterTitle = getMatterTitle();
  const activityLog = getActivityLog();
  return {
    name,
    mobile,
    email,
    matterTitle,
    activityLog,
  };
};

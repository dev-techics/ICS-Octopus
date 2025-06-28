// filter name
export const getName = (name: string) => {
  const fname = name.split(" ")[0];
  const lname = name.split(" ").slice(1).join(" ") || ".";
  return [fname, lname];
};

export const getMobile = (mobile: string): string => {
  // Remove all spaces
  let cleaned = mobile.replace(/\s+/g, "");
  if (cleaned.startsWith("+44")) {
    cleaned = "0" + cleaned.slice(3);
  } else if (cleaned.startsWith("+")) {
    cleaned = cleaned.slice(1);
  }

  return cleaned;
};

// filter html text
export const stripHtml = (html: string): string => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

// filter platform name
export const getPlatformName = async (): Promise<string> => {
  try {
    const tabs = await new Promise<chrome.tabs.Tab[]>((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, resolve);
    });

    const url = tabs[0]?.url;
    if (!url) return "Unknown";

    // get platform address
    let platform = url.split("/")[2];
    console.log(platform);

    switch (platform) {
      case "www.applytosupply.digitalmarketplace.service.gov.uk":
        platform = "applytosupply";
        break;

      case "www.bark.com":
        platform = "bark";
        break;

      case "app.dosfinds.co.uk":
        platform = "dos";
        break;

      case "www.linkedin.com":
        platform = "linkedin";
        break;

      default:
        platform = "";
        break;
    }

    return platform;
  } catch (e) {
    console.error("Error getting platform name:", e);
    return "Unknown";
  }
};

// get specific data
export const sanitize = (data: any) => {
  const seen = new WeakSet();
  return JSON.parse(
    JSON.stringify(data, (value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) return undefined;
        seen.add(value);
      }
      return value;
    })
  );
};

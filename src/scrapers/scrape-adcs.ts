// get contact info
const getContactInfo = (): string[] => {
  let name = "";
  let mobile = "";
  let email = "";
  let jobTile = "";
  let address = "";
  let region = "";

  const fields = document.querySelectorAll(".field-label");
  fields.forEach((field) => {
    switch (field.textContent) {
      case "Name":
        name = field.nextElementSibling?.textContent || "";
        break;
      case "Email":
        email = field.nextElementSibling?.textContent || "";
        break;
      case "Mobile":
        mobile = field.nextElementSibling?.textContent || "";
        break;
      case "Job Title":
        jobTile = field.nextElementSibling?.textContent || "";
        break;
      case "Address":
        address = field.nextElementSibling?.textContent || "";
        break;
      case "Region":
        region = field.nextElementSibling?.textContent || "";
        break;
      default:
        break;
    }
  });

  return [name, mobile, email, jobTile, address, region];
};

// get matter title in Pascal Case (with spaces)
const getMatterTitle = (jobTitle: string): string => {
  const url = window.location.href;
  const urlObj = new URL(url);
  const slug = urlObj.pathname
    .split("/")
    .filter(Boolean)
    .pop()
    ?.replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return slug ? `[ADCS] ${slug} - (${jobTitle})` : "[ADCS] Untitled Matter";
};

// get website form email address
const getWebsite = (email: string): string => {
  const popularDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com",
    "aol.com",
    "protonmail.com",
  ];

  const domain = email.split("@")[1].toLowerCase();
  if (!domain || popularDomains.includes(domain)) {
    return "Not Found";
  }
  return domain;
};

// get activity log
const getMatterDesc = (
  authority: string,
  jobTitle: string,
  region: string,
  email: string
) => {
  const website = getWebsite(email);
  return `<b>Local Authority</b> : ${authority} <br>
   <b>Job Title</b> : ${jobTitle} <br>
   <b>Website</b> : ${website} <br>
   <b>Region</b> : ${region}
  `;
};

// return client information
export default () => {
  const [name, mobile, email, jobTile, address, region] = getContactInfo();
  const matterTitle = getMatterTitle(jobTile);
  const activityLog = "Created by ICS Octopus";
  const matterType = "Consultation";
  const matterDesc = getMatterDesc(matterTitle, jobTile, region, email);
  const advertise = "Google";
  const sources = "ADCS";
  return {
    name,
    mobile,
    email,
    address,
    matterType,
    matterTitle,
    matterDesc,
    activityLog,
    advertise,
    sources,
  };
};

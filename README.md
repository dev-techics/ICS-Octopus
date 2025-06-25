# ICS Octopus Documentation

---

## 📑 Table of Contents

- [ICS Octopus Documentation](#ics-octopus-documentation)
  - [📑 Table of Contents](#-table-of-contents)
  - [1. Overview](#1-overview)
    - [What is ICS Octopus?](#what-is-ics-octopus)
    - [Key Features](#key-features)
    - [Use Cases](#use-cases)
    - [Integration with ICS Legal CRM](#integration-with-ics-legal-crm)
  - [2. System Requirements](#2-system-requirements)
    - [Platform Requirements](#platform-requirements)
    - [Dependencies / Libraries](#dependencies--libraries)
    - [API Access Requirements](#api-access-requirements)
    - [Database](#database)
  - [3. Getting Started](#3-getting-started)
  - [4. Core Concepts](#4-core-concepts)
    - [How Scraping Works](#how-scraping-works)
  - [5. How to Scale Up](#5-how-to-scale-up)
    - [Adding Support for a New Website](#adding-support-for-a-new-website)

---

## 1. Overview

### What is ICS Octopus?

**ICS Octopus** is a browser extension designed to scrape structured data from multiple online platforms and integrate it directly into the ICS Legal CRM (Hybrid CRM). It automates lead capture, data normalization, and syncing workflows, helping reduce manual input and improve CRM data accuracy.

### Key Features

- **Multi-Platform Scraping**  
  Supports scraping from:

  - [Bark](https://www.bark.com/sellers/dashboard/)
  - [Dosfinds](https://app.dosfinds.co.uk/)
  - [Digital Marketplace](https://www.applytosupply.digitalmarketplace.service.gov.uk/)

- **Intelligent Data Matching**  
  Matches and deduplicates data entries, even when partially masked (e.g., `som****g@g***l.com`).

- **Flexible Data Saving Options**

  - _Normal Save_: Standard data entry
  - _Priority Save_: Marks entries for urgent follow-up

- **Activity Logging & Updates**  
  Logs new activities and updates existing CRM records through the extension.

### Use Cases

- Automated lead collection from multiple sources
- Enrichment and deduplication of CRM data
- Real-time syncing with ICS Legal CRM
- Reduction of manual data entry and lead qualification effort

### Integration with ICS Legal CRM

ICS Octopus communicates with ICS Legal CRM through the following backend API endpoints:

| Endpoint                            | Purpose                           |
| ----------------------------------- | --------------------------------- |
| `ics-extension-check.php`           | Duplicate checking and validation |
| `ics-extension-matter-save.php`     | Save new leads or cases           |
| `ics-extension-update-activity.php` | Log or update user activities     |

> All API interactions are managed in the file: `src/api/api.ts`

---

## 2. System Requirements

### Platform Requirements

- **Operating Systems**: Windows 10+, macOS, Linux (with modern browsers)
- **Node.js**: Version 18.x or higher (recommended)
- **Package Manager**: npm ≥ 9.x or yarn ≥ 1.22.x

### Dependencies / Libraries

| Dependency        | Version  | Purpose                           |
| ----------------- | -------- | --------------------------------- |
| React             | ^19.1.0  | Frontend UI library               |
| TypeScript        | ~5.8.3   | Static typing for JavaScript      |
| Tailwind CSS      | 4.x      | Utility-first CSS framework       |
| Axios             | ^1.9.0   | HTTP client for API communication |
| React Context API | Built-in | Global state management           |
| Vite (optional)   | ^6.3.5   | Development server & bundler      |

### API Access Requirements

- User must be authenticated in ICS Legal CRM with appropriate permissions
- Network access to API endpoint files (`ics-extension-check.php`, etc.)
- API tokens or headers configured in `src/api/api.ts` if applicable

### Database

ICS Octopus does **not** maintain a local database. All data persistence is handled by the ICS Legal CRM backend.

---

## 3. Getting Started

- Clone the repository
- Install dependencies using npm or yarn
- Configure environment variables (`config.json` / `.env`) with CRM API keys and endpoints
- Run the project in development mode or build for production

---

## 4. Core Concepts

### How Scraping Works

The extension uses **content scripts** injected into target websites’ DOM to extract data.

Example `manifest.json` snippet registering content scripts:

```json
"content_scripts": [
  {
    "js": ["src/content-scripts/apply-to-supply.tsx"],
    "matches": ["https://www.applytosupply.digitalmarketplace.service.gov.uk/*"]
  },
  {
    "js": ["src/content-scripts/bark.tsx"],
    "matches": ["https://www.bark.com/*"]
  }
]
```

Inside `src/App.tsx`, the scraper is triggered on extension load:

```tsx
useEffect(() => {
  const scrape = async () => {
    try {
      await startScraping();
    } catch (err) {
      console.error("Scraping failed:", err);
    }
  };
  scrape();
}, []);
```

The scraper function (`utils/scraper.ts`) sends a message to the active tab's content script to start scraping:

```tsx
import { updateClientInfo } from "../context/AppContext";

export default (): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;
      if (!tabId) return reject("No active tab found.");

      chrome.tabs.sendMessage(
        tabId,
        { action: "START_SCRAPING" },
        (response) => {
          if (response?.data) {
            updateClientInfo(response.data);
            resolve();
          } else {
            reject("No data received from content script.");
          }
        }
      );
    });
  });
};
```

Content scripts listen for this message and respond with scraped data, for example in `src/content-scripts/bark.tsx`:

```tsx
import scrapBark from "../scrapers/scrape-bark";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "START_SCRAPING") {
    const data = scrapBark();
    sendResponse({ data });
  }
  return true;
});
```

The scraper helper extracts structured client data from the DOM:

```tsx
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
```

---

## 5. How to Scale Up

### Adding Support for a New Website

1. Create a new content script in `src/content-scripts/`, for example: `your-content-script.ts`.

2. Register it in `manifest.json` under `content_scripts`:

```json
"content_scripts": [
  {
    "js": ["src/content-scripts/your-content-script.ts"],
    "matches": ["https://your-website-url/*"]
  }
]
```

3. If need to send an welcome email you just have to open `src/utils/filter.ts` and add this line :

```tsx
// First check the platform url in console.
console.log(platform);

// then set you platform name.
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
```

4. Then open CRM `ics-extension-matter-save.php` and add:

```tsx
// -----------------------------------------------
//    Step Ten : Send Confirmation Email
// -----------------------------------------------
if ($platform === "bark" || $platform === "dos") {
```

5. Implement DOM scraping logic in the content script and return a structured data object:

```tsx
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
```

_End of Documentation_

export const getName = (name: string) => {
  const fname = name.split(" ")[0];
  const lname = name.split(" ").slice(1).join(" ");
  return [fname, lname];
};

export const getMobile = (phone: string) => {
  const cleaned = phone.replace(/[^\d+]/g, "");

  // replace +44 with 0
  if (cleaned.startsWith("+44")) {
    return "0" + cleaned.slice(3);
  }

  // remove + for other country codes
  if (cleaned.startsWith("+")) {
    return cleaned.slice(1);
  }

  return cleaned;
};

export const stripHtml = (html: string): string => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

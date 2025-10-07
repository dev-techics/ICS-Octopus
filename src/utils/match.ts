// useful functions
export function isEmailMatch(masked: string, real: string): boolean {
  let pattern = masked.replace(/([.+?^${}()|\[\]\\])/g, "\\$1");
  pattern = pattern.replace(/\*/g, ".");
  const regex = new RegExp("^" + pattern + "$", "i");
  return regex.test(real);
}

export function isPhoneMatch(maskedPhone: string, realPhone: string) {
  let cleanMasked = maskedPhone.replace(/\s+/g, "");
  let pattern = cleanMasked.replace(/([.+?^${}()|\[\]\\])/g, "\\$1");
  pattern = pattern.replace(/\*/g, ".");
  const regex = new RegExp("^" + pattern + "$");
  return regex.test(realPhone);
}

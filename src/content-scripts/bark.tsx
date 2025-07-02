import scrapBark from "../scrapers/scrape-bark";

// start scraping
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "START_SCRAPING") {
    const data = scrapBark();
    sendResponse({ data });
    console.log(sender);
  }

 if (request.action === "SEND_EMAIL_SMS") {
    const optionEmail = document.getElementById('seller-button-btn-send-template');
    const optionSms = document.getElementById('seller-button-btn-send-sms');
    if(optionEmail) optionEmail.click();
    if(optionSms) optionSms.click();
    
    setTimeout(() => {
      const modals = document.querySelectorAll('.bark-modal.show')
      modals.forEach(modal => {
        const button = modal.querySelector<HTMLButtonElement>('button.btn-primary');
        button?.click();
        console.log(button);
      });
    }, 1000);
 }

  return true;
});

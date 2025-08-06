const headers = {
  'Accept': 'application/vnd.bark.v2+json',
  'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImd0eSI6WyJhdXRob3JpemF0aW9uX2NvZGUiXSwia2lkIjoiRW5LOTNJdjhiX3V6NWd0QnV4RjRwVTJRSm4wIn0.eyJhdWQiOiI0MDQ0OTMwMi1kY2Y5LTQyYzQtOGQ0Ni1mZTRhOTZjNjIzMGQiLCJleHAiOjE3NjIwMDM2NTEsImlhdCI6MTc1NDIyNzY1MSwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5iYXJrLmNvbSIsInN1YiI6IjMzOTFjYTdiLWFkZjktNDAxNy04ZWUyLTM4YjU1OWY5ZDdiNCIsImp0aSI6ImM0OWZmYjYzLWQ1ZmQtNDdhMC05MTFlLTliYTQ0ZTdiMjQ0ZCIsImF1dGhlbnRpY2F0aW9uVHlwZSI6IlBJTkciLCJlbWFpbCI6ImFiZHVsLmthZGlyQHNrLWFzc29jaWF0ZXMub3JnIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6ImFiZHVsLmthZGlyQHNrLWFzc29jaWF0ZXMub3JnIiwiYXBwbGljYXRpb25JZCI6IjQwNDQ5MzAyLWRjZjktNDJjNC04ZDQ2LWZlNGE5NmM2MjMwZCIsInJvbGVzIjpbXSwiYXV0aF90aW1lIjoxNzU0MjI3NjUxLCJ0aWQiOiIwZGM4YmNiMy1hMThiLTQyMDgtODBmYi04MjgxOGU4MmM0YWUiLCJlbnRpdGxlbWVudHMiOltdLCJicmt1aWQiOiIxMDc0MTI2IiwiaGFzTWZhIjpmYWxzZSwic3VpZCI6IjIyMTc2NCIsInNwZmlkIjoiMjIxMDk5IiwicmVxdWlyZXNNZmEiOnRydWUsImJpZCI6Ijg2MDMzMjYifQ.2CV1sUI2Mb6NU2O1IdYlh0s40aa2CsvKJSS0_mjd6wRiWp8gnqltIeCzi7r5SqG0wzgi91aEiZGy75tdfYxEuw',
  'Origin': 'https://www.bark.com',
  'Referer': 'https://www.bark.com/',
};


/* ----------------------------------------
  Function: get project id [Client Id form BARK]
------------------------------------------*/
function getProjectId(): string | null {
  const selectedElement = document.querySelector<Element>('.responses-projects-item.selected');
  return selectedElement?.getAttribute('data-project-id') ?? null;
}


/* ----------------------------------------
  Function: Send Email
------------------------------------------*/
export function sendEmail(): void {
    console.log("Sending email...");
    const projectId = getProjectId();
    if (!projectId) return;

    const url = `https://api.bark.com/seller/response/${projectId}/template/65609`;
    fetch(url, {method: 'POST', headers})
    .then(response => response.json())
    .then(data => data.status ? console.log('Email sent successfully.') : console.log('Email sending failed.', data))
    .catch(error => {
      console.error('Error sending email:', error);
      chrome.storage.local.set({ errorMessage: "Failed to send email" });
    });
}

/* ----------------------------------------
  Function: Send SMS
------------------------------------------*/
export function sendSMS(){
  // open sms modal
  const optionSMS = document.getElementById("seller-button-btn-send-sms");
  if (optionSMS) optionSMS.click();

  // click send button
  const smsModal = document.querySelector("div#bark-modal.modal.bark-modal.show");
  const smsSendButton = smsModal?.querySelector<HTMLButtonElement>("button.btn-primary");
  if (smsSendButton) smsSendButton.click();
  else chrome.storage.local.set({ errorMessage: "Failed to send SMS" });
}


/* -----------------------------------------------
I try to handle sms send using Bark API, but it seems to be not working.
--------------------------------------------- */
    // const optionEmail = document.getElementById(
    //   "seller-button-btn-send-template"
    // );
    // const optionSms = document.getElementById("seller-button-btn-send-sms");

    // if (optionEmail) optionEmail.click();
    // if (optionSms) optionSms.click();

    // setTimeout(() => {
      // const smsModal = document.querySelector(
      //   "div#bark-modal.modal.bark-modal.show"
      // );
    //   const emailModal = document.querySelector("#selectTemplateModal");

    //   const smsSendButton =
    //     smsModal?.querySelector<HTMLButtonElement>("button.btn-primary");
    //   const emailSendButton =
    //     emailModal?.querySelector<HTMLButtonElement>("button.btn-primary");

    //   // click email send button
    //   if (emailSendButton) emailSendButton.click();
    //   else chrome.storage.local.set({ errorMessage: "Failed to send Email" });

    //   // click sms send button
    //   if (smsSendButton) setTimeout(() => smsSendButton.click(), 500);
    //   else chrome.storage.local.set({ errorMessage: "Failed to send SMS" });
    // }, 1000);

// export async function sendSMS(): Promise<void> {
//   const projectId = getProjectId();
//   if (!projectId) {
//     console.error('No projectId found.');
//     return;
//   }

//   // Step 1 – Fetch resp_id
//   const getUrl = `https://api.bark.com/seller/response/${projectId}/`;
//   const getRes = await fetch(getUrl, { method: 'GET', headers });

//   if (!getRes.ok) {
//     console.error(`Failed to fetch project: ${getRes.status}`);
//     return;
//   }

//   const getData = await getRes.json();
//   const respId = getData?.data?.resp_id;

//   if (!respId) {
//     console.error('resp_id not found in response.');
//     return;
//   }

//   console.log(`Found resp_id: ${respId}`);

//   // Step 2 – Prepare form data as URL-encoded string
//   const formData = new URLSearchParams();
//   formData.append('project_response_id', respId);
//   formData.append('template_id', '26051');

//   const postUrl = 'https://api.bark.com/response/sms/';
//   const postHeaders = {
//     ...headers,
//     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//   };

//   const postRes = await fetch(postUrl, {
//     method: 'POST',
//     headers: postHeaders,
//     body: formData.toString(),
//   });

//   if (!postRes.ok) {
//     console.error(`Failed to send SMS: ${postRes.status}`);
//     return;
//   }

//   const postData = await postRes.json();
//   console.log(`SMS sent successfully:`, postData);
// }



// Bark.api('response/sms/', {project_response_id:134641243, template_id:26051}, ()=>console.log("success"), ()=>console.log("error"), "POST")
// function (
// 			{ projectResponseId, templateId = null, message = null },
// 			onSuccess,
// 			onFailure,
// 		) {
// 			let t = this;
// 			let payload = {
// 				project_response_id: projectResponseId,
// 			};
// 			let event = 'sms.custom_sent';

// 			if (templateId) {
// 				payload.template_id = templateId;
// 				event = 'sms.template_sent';
// 			} else {
// 				payload.message = message;
// 			}
// 			Bark.api(
// 				'response/sms/',
// 				payload,
// 				() => {
// 					if (onSuccess()) {
// 						onSuccess();
// 					}
// 					this.fireEvent(event);
// 				},
// 				(error) => {
// 					let errorMessage = _t('seller_sms-template-manager:fail-to-send-error');
// 					if (
// 						error.responseJSON &&
// 						error.responseJSON.error &&
// 						error.responseJSON.error.errors
// 					) {
// 						if (error.responseJSON.error.errors.project_response_id) {
// 							errorMessage = error.responseJSON.error.errors.project_response_id[0];
// 						} else if (error.responseJSON.error.errors.message) {
// 							errorMessage = error.responseJSON.error.errors.message[0];
// 						}
// 					} else if (error.responseJSON && error.responseJSON.message) {
// 						let message = error.responseJSON.message;
// 						if (message === 'SMS Template not found') {
// 							errorMessage = message;
// 							Bark.SMSTemplates.refresh();
// 						}
// 					}
// 					onFailure(errorMessage);
// 				},
// 				'POST',
// 			);
// 		},
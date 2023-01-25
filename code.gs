function onFormSubmit(e) {
  var form = FormApp.getActiveForm();
  var formResponses = form.getResponses();
  var latestResponse = formResponses[formResponses.length - 1];
  var itemResponses = latestResponse.getItemResponses();
  var surveyContent = "Survey Content From Pass Holder\n----------------------\n\n";
  var submitterEmail = latestResponse.getRespondentEmail();
  var username = submitterEmail.split("@")[0];
  var subject = "";
  var body = "";
  var ownerEmail = "example@place.com";
  var email = [ownerEmail,submitterEmail];

  subject = "(Automatic Email) " + username + " Pass Form Completion Summary at " + latestResponse.getTimestamp();

  if(itemResponses[0].getResponse().toLowerCase() === "yes"){
    if(itemResponses[1].getResponse().toLowerCase() === "no" && itemResponses[2].getResponse().toLowerCase() === "no" && itemResponses[3].getResponse().toLowerCase() === "yes"){
      subject = "(Automatic Email) " + username + " Cannot Add Pass To Mobile Wallet at " + latestResponse.getTimestamp();

        if(itemResponses[4].getResponse().toLowerCase() === "no"){
          body += "Hi team, A person had just filled out our Survey here at Place after encountering some issues and it seems like they are having issues with getting their pass added to their mobile device.  ";
          body += "This person hasn't been able to add their mobile pass to any device yet so they'll need to have their account refreshed to clear the error that they are encountering.  ";
        }
        else{
          body += "We've received your form response and we'll get back to you with some instructions on getting that may resolve your issue.";
        }
    }
  }
  else{
    body += "We've received your form response and we'll get back to you shortly.";
  }

  body += "\n\n";

  surveyContent += "Submitter Email: \n\n" + submitterEmail +"\n\n";

  //combining response 
  for(var i = 0; i<itemResponses.length; i++){

    var response = itemResponses[i];
    var question = response.getItem().getTitle();
    var answer = response.getResponse();
    surveyContent += question + ":\n\n";
    surveyContent += answer + "\n\n";
  }

  body += surveyContent;
  body += "Survey at url";
  MailApp.sendEmail(email.join(','),subject,body);
}

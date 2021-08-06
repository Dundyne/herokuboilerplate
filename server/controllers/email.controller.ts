import catchAsyncErrors from "../utils/catchAsync";
import { sendMail } from "../utils/sendEmail";

export const sendMails = catchAsyncErrors(async (req, res, next) => {
  var email = {
    subject: req.body.subject,
    text:
      "<b>Addresse:</b>" +
      " " +
      req.body.address +
      "<br>" +
      "<b>By:</b>" +
      " " +
      req.body.city +
      "<br>" +
      "<b>Navn:</b>" +
      " " +
      req.body.firstname +
      " " +
      req.body.lastname +
      "<br>" +
      "<b>Telefonnummer:</b>" +
      " " +
      req.body.number +
      "<br>" +
      "<b>Beskrivelse:</b>" +
      " " +
      req.body.text,
  };
  try {
    await sendMail(email);
    console.log(email);
  } catch (error) {
    console.log(error);
  }
  res.status(250).json();
});

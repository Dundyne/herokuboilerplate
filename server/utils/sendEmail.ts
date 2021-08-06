import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();
export const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const message = {
    to: process.env.EMAIL_DESTINATION_ADDRESS,
    subject: options.subject,
    html: options.text,
    //options.lastname +
    //options.number +
    //options.text,
  };

  await transporter.sendMail(message, function (error, res) {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent!");

    }
    transporter.close();
  });
};

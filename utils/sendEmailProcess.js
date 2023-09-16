"use strict";
var nodemailer = require("nodemailer");

export default function sendEmailProcess(
  fromEmail,
  sendEmail,
  subject,
  sendText
) {
  nodemailer.createTestAccount((err, account) => {
    var transpoter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      service: "gmail",
      auth: {
        user: process.env.Email,
        pass: process.env.Email_PW,
      },
      logger: true,
      transactionLog: true, // include SMTP traffic in the logs
      allowInternalNetworkInterfaces: false,
    });

    transpoter.sendMail(
      {
        from: process.env.Email,
        to: sendEmail,
        subject: subject,
        text: sendText,
      },
      (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info.response);
        }
      }
    );
  });
}

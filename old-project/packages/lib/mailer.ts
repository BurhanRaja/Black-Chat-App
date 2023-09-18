import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST!,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PORT,
  },
});

export const sendEmail = async (
  email: string | undefined,
  subject: string,
  html: string
) => {
  const mailData = {
    from: `${process.env.APP_NAME}<support@blackchat.com>`,
    to: email,
    subject: subject,
    html: html,
  };

  const info = await transport.sendMail(mailData);
};

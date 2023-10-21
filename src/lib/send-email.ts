import nodemailer, { SendMailOptions } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const smtpHost = process.env.NEXT_SMTP_HOST!;
const smtpUsername = process.env.NEXT_SMTP_USERNAME;
const smtpPassword = process.env.NEXT_SMTP_PASSWORD;
const smtpPort = Number(process.env.NEXT_SMTP_PORT);

const options: SMTPTransport.Options = {
  host: smtpHost,
  port: smtpPort,
  secure: false,
  auth: {
    user: smtpUsername,
    pass: smtpPassword,
  },
};

const transporter = nodemailer.createTransport(options);

const sendEmail = async ({
  from,
  to,
  subject,
  text,
  html,
}: SendMailOptions) => {
  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });

  
};

export default sendEmail;

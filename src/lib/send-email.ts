import { NextResponse } from "next/server";
import nodemailer, { SendMailOptions } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import template, { EmailTemplateParams } from "./email-template";

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

export interface NewSendEmailOptions
  extends SendMailOptions,
    EmailTemplateParams {}

const sendEmail = async ({
  from,
  to,
  subject,
  content,
  link,
  linkText,
}: NewSendEmailOptions) => {
  transporter.sendMail(
    {
      from,
      to,
      subject,
      html: template({ content, link, linkText }),
    },
    (err) => {
      if (err) {
        return NextResponse.json(
          { error: "Email was not sent." },
          { status: 417 }
        );
      }

      return NextResponse.json(
        { message: "Email sent successfully." },
        { status: 200 }
      );
    }
  );
};

export default sendEmail;

import { NextFunction } from "express";
import nodemailer from "nodemailer";
import { Service } from "typedi";

import { URL, mailer } from "../config";

export type SendEmailArgs = {
  email: string;
  body: string;
  // text: string;
  subject: string;
};

@Service()
export class EmailService {
  private async sendEmail({ email, body, subject }: SendEmailArgs) {
    const transporter = nodemailer.createTransport({
      service: mailer.SERVICE,
      host: mailer.HOST,
      port: mailer.PORT,
      secure: mailer.SECURE,
      auth: {
        user: mailer.TRIDE_MAIL,
        pass: mailer.TRIDE_MAIL_PASSWORD,
      },
    });

    const info = {
      from: {
        name: "Viascrow",
        address: "hello@viascrow.com",
      },
      to: email,
      subject: subject,
      html: body,
      // text: text,
    };
    try {
      await transporter.sendMail(info, (err, inf) => {
        console.log(err);
        inf;
      });
      return true;
    } catch (err) {
      console.log(err);
      throw new Error("email did not send ooo");
    }
    };

  async welcome(email: string, name: string, token: string) {
    const link = `${URL.CLIENT_URL}/auth/confirm/?token=${token}`;
    const { default: emailVerificationTemplate } = await import("../mail-templates/email-verification");
    const data = emailVerificationTemplate({
      name,
      link,
    });
    const result = await this.sendEmail({
      email,
      ...data,
    });
    return result;
  }
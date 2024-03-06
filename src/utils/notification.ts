import nodemailer from 'nodemailer';
import { Service } from 'typedi';

import { APP_NAME, HELLO_ADDRESS, mailer } from '../config';

export type SendEmailArgs = {
  email: string;
  body: string;
  subject: string;
};

@Service()
export class EmailService {
  constructor() {}
  private async sendEmail({ email, body, subject }: SendEmailArgs) {
    const transporter = nodemailer.createTransport({
      port: mailer.PORT,
      service: mailer.SERVICE,
      // host: mailer.HOST,
      // secure: mailer.SECURE,
      auth: {
        user: mailer.USERNAME,
        pass: mailer.PASSWORD,
      },
    });

    const info = {
      from: {
        name: `${APP_NAME}`,
        address: `${HELLO_ADDRESS}`,
      },
      to: email,
      subject: subject,
      html: body,
    };
    try {
      transporter.sendMail(info, (err, inf) => {
        console.log(err);
        inf;
      });
      return true;
    } catch (err) {
      console.log(err);
      throw new Error('Email did not send');
    }
  }

  async welcome(email: string, name: string) {
    const { default: WelcomeTemplate } = await import('../mail-templates/welcomeEmail');
    const data = WelcomeTemplate({
      name,
    });

    const result = await this.sendEmail({
      email,
      ...data,
    });
    return result;
  }
}

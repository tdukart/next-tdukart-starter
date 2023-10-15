import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transportOptions: SMTPTransport.Options = {
  host: process.env.EMAIL_SERVER_HOST ?? '',
  port: parseInt(process.env.EMAIL_SERVER_PORT ?? '', 10),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(transportOptions);

export default transporter;

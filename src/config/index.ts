import 'dotenv/config';

export const APP_NAME = process.env.APP_NAME;
export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const DATABASE_URI = process.env.DATABASE_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
export const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;
export const HELLO_ADDRESS = process.env.HELLO_ADDRESS;

export const mailer = {
  PORT: Number(process.env.PORTMAIL) || 465,
  HOST: process.env.HOSTMAIL,
  SECURE: process.env.SECURE === 'true' ? true : false,
  SERVICE: process.env.SERVICE || 'gmail',
  USERNAME: process.env.MAIL_USERNAME,
  PASSWORD: process.env.MAIL_PASSWORD,
};
export const admin = {
  FIRSTNAME: process.env.ADMIN_FIRSTNAME,
  LASTNAME: process.env.ADMIN_LASTNAME,
  PHONENUMBER: process.env.ADMIN_PHONENUMBER,
  EMAIL: process.env.ADMIN_EMAIL,
  PASSWORD: process.env.ADMIN_PASSWORD,
};

export const super_admin = {
  FIRSTNAME: process.env.SUPER_ADMIN_FIRSTNAME,
  LASTNAME: process.env.SUPER_ADMIN_LASTNAME,
  PHONENUMBER: process.env.SUPER_ADMIN_PHONENUMBER,
  EMAIL: process.env.SUPER_ADMIN_EMAIL,
  PASSWORD: process.env.SUPER_ADMIN_PASSWORD,
};

export const CLIENT_URLS = process.env.CLIENT_URLS;

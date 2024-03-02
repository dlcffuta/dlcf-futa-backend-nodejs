import 'dotenv/config';

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const DATABASE_URI = process.env.DATABASE_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
export const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;

export const admin = {
    FIRSTNAME: process.env.ADMIN_FIRSTNAME,
    LASTNAME: process.env.ADMIN_LASTNAME,
    PHONENUMBER: process.env.ADMIN_PHONENUMBER,
    EMAIL: process.env.ADMIN_EMAIL,
    PASSWORD: process.env.ADMIN_PASSWORD,
};
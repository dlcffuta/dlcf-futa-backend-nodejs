declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    DATABASE_URI: string;
    ADMIN_JWT_SECRET: string;
    JWT_EXPIRATION: string;
    BACKEND_BASE_URL: string;
    APP_NAME: string;
    ADMIN_PASSWORD: string;
    ADMIN_EMAIL: string;
    ADMIN_PHONENUMBER: string;
    ADMIN_FIRSTNAME: string;
    ADMIN_LASTNAME: string;
    SUPER_ADMIN_PASSWORD: string;
    SUPER_ADMIN_EMAIL: string;
    SUPER_ADMIN_PHONENUMBER: string;
    SUPER_ADMIN_FIRSTNAME: string;
    SUPER_ADMIN_LASTNAME: string;
    CLIENT_URLS: string;
    HELLO_ADDRESS: string;
    PORTMAIL: number;
    HOSTMAIL: string;
    MAIL_PASSWORD: string;
    MAIL_USERNAME: string;
    SERVICE: string;
    SECURE: string;
    SALT_ROUNDS: number;
  }
}

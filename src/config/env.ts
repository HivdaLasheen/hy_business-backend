import dotenv from "dotenv";
dotenv.config();

const env = {
  port: process.env.PORT ?? 8000,
  domain: process.env.DOMAIN ?? "localhost",
  envType: process.env.ENV_TYPE ?? "dev",
  NODE_ENV: process.env.NODE_ENV ?? "development",
  dbUrl: process.env.DB_URL ?? "",
  secretKey: process.env.SECRET_KEY ?? "",
  email: {
    port: process.env.EMAIL_PORT ?? 465,
    host: process.env.EMAIL_HOST ?? "smtp.gmail.com",
    secure: process.env.EMAIL_SECURE ?? false,
    hostSecure: process.env.EMAIL_HOST_SECURE ?? "smtp.gmail.com",
    portSecure: process.env.EMAIL_PORT_SECURE ?? 465,
    senderMail: process.env.EMAIL_SENDER_MAIL ?? "",
    senderAppPassword: process.env.EMAIL_SENDER_APP_PASSWORD ?? "",
  },
};

if (!env.secretKey) throw new Error("process.env.SECRET_KEY is undefined.");
if (!env.dbUrl) throw new Error("process.env.DB_URL is undefined.");

export default env;

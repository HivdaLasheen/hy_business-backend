import dotenv from "dotenv";
dotenv.config();

const env = {
  PORT: process.env.PORT ?? 8000,
  ENV: process.env.ENV_TYPE ?? "dev",
  DB_URL: process.env.URL ?? "",
};

export default env;

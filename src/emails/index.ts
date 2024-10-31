import nodemailer from "nodemailer";
import config from "../config";

const isSecure = Boolean(config.email.secure);

const transporter = nodemailer.createTransport({
  host: isSecure ? config.email.hostSecure : config.email.host,
  port: Number(isSecure ? config.email.portSecure : config.email.port),
  secure: false,
  auth: {
    user: config.email.senderMail,
    pass: config.email.senderAppPassword,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function testEmailConnection() {
  return transporter
    .verify()
    .then((value) => value)
    .catch(() => false);
}

export default transporter;

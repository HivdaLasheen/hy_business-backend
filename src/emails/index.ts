import nodemailer from "nodemailer";
import config from "../config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email.senderMail,
    pass: config.email.senderAppPassword,
  },
});

export async function testEmailConnection() {
  return transporter
    .verify()
    .then((value) => value)
    .catch(() => false);
}

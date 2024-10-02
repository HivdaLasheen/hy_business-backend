import transporter from ".";
import config from "../config";

export default async function sendPasswordResetEmail(
  email: string,
  token: string,
  role: string
) {
  const fullDomain =
    config.domain === "localhost" ? `localhost:${config.port}` : config.domain;

  const verificationLink = encodeURI(
    `http://${fullDomain}/auth/password/reset?token=${token}&role=${role}`
  );

  const mailOptions = {
    from: "noreply@test.com",
    to: email,
    subject: "Password Reset",
    text: `Click the link below to reset your password:\n\n${verificationLink}`,
    // html: htmlTemplate(),
  };

  await transporter.sendMail(mailOptions);
}

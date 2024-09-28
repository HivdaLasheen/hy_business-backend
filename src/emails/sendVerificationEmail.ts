import transporter from ".";
import config from "../config";

export default async function sendVerificationEmail(
  email: string,
  token: string,
  role: string
) {
  const fullDomain =
    config.domain === "localhost" ? `localhost:${config.port}` : config.domain;

  const verificationLink = encodeURI(
    `http://${fullDomain}/auth/verify-email?token=${token}&role=${role}`
  );

  const mailOptions = {
    from: "noreply@test.com",
    to: email,
    subject: "Email Verification",
    html: htmlTemplate(verificationLink),
  };

  await transporter.sendMail(mailOptions);
}

function htmlTemplate(verificationLink: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { width: 100%; max-width: 600px; margin: 50px auto; background-color: #ffffff; border: 1px solid #dddddd; padding: 20px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
        .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #dddddd; }
        .content { padding: 20px; }
        .button { display: inline-block; margin-top: 20px; padding: 10px 20px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px; }
        .footer { text-align: center; padding-top: 20px; border-top: 1px solid #dddddd; font-size: 12px; color: #888888; }
    </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h2>Email Verification</h2>
          </div>
          <div class="content">
              <p>Hello,</p>
              <p>Thank you for registering. Please click the button below to verify your email address:</p>
              <a href="${verificationLink}" class="button">Verify Email</a>
              <p>If the button doesn't work, copy and paste the following link into your browser:</p>
              <p>${verificationLink}</p>
              <p>Thank you!</p>
          </div>
          <div class="footer">
              &copy; 2024 HY Business. All rights reserved.
          </div>
      </div>
  </body>
  </html>
  `;
}

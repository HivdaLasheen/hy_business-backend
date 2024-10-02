import { Request, Response } from "express";
import { validationResult } from "express-validator";
import generateVerificationToken from "../../utils/tokens/generateVerificationToken";
import createErrorObject from "../../utils/createValidationErrorObject";
import comparePassword from "../../utils/password/comparePassword";
import hashPassword from "../../utils/password/hashPassword";
import HttpStatusCodes from "../../config/httpStatusCodes";
import prisma from "../../prisma";
import sendPasswordResetEmail from "../../emails/sendPasswordResetEmail";

async function requestPasswordReset(req: Request, res: Response): Promise<any> {
  const { email, role } = req.body;

  const table = role === "applicant" ? "applicant" : "organization";
  const authTable = role === "applicant" ? "applicantAuth" : "organizationAuth";

  const user = await (prisma[table] as any).findUnique({
    where: {
      email,
    },
  });

  if (!user)
    return res.status(HttpStatusCodes.NOT_FOUND).json({
      message: `${table} was not found`,
    });

  const verificationToken = generateVerificationToken();
  const verificationTokenExp = Date.now() + 3600000;

  await (prisma[authTable] as any).update({
    where: { [`${table}Id`]: user.id },
    data: {
      resetPasswordToken: verificationToken,
      resetPasswordTokenExp: new Date(verificationTokenExp),
    },
  });

  await sendPasswordResetEmail(email, verificationToken, role);

  return res
    .status(200)
    .json({ message: "Password reset link sent to your email." });
}

async function passwordReset(req: Request, res: Response): Promise<any> {
  const { password: newPassword } = req.body;
  const { token, role } = req.query;

  const table = role === "applicant" ? "applicant" : "organization";
  const authTable = role === "applicant" ? "applicantAuth" : "organizationAuth";

  const auth = await (prisma[authTable] as any).findUnique({
    where: {
      resetPasswordToken: token,
    },
  });

  if (
    !auth ||
    !auth.resetPasswordTokenExp ||
    auth.resetPasswordTokenExp.getTime() < Date.now()
  )
    return res
      .status(HttpStatusCodes.NOT_FOUND)
      .json({ message: "Invalid or expired token." });

  if (!auth.isEmailVerified)
    return res.status(400).json({ message: "Email is not verified." });

  const hashedPassword = await hashPassword(newPassword);

  try {
    await prisma.$transaction(async (prisma) => {
      await (prisma[table] as any).update({
        where: { id: auth[`${table}Id`] },
        data: {
          password: hashedPassword,
        },
      });

      await (prisma[authTable] as any).update({
        where: {
          resetPasswordToken: token,
        },
        data: {
          resetPasswordToken: null,
          resetPasswordTokenExp: null,
        },
      });
    });

    return res
      .status(HttpStatusCodes.OK)
      .json({ message: "Password reset successfully." });
  } catch (error) {
    console.error(error);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error." });
  }
}

export { requestPasswordReset, passwordReset };

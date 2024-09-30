import { Request, Response } from "express";
import { validationResult } from "express-validator";
import generateVerificationToken from "../../utils/tokens/generateVerificationToken";
import createErrorObject from "../../utils/createValidationErrorObject";
import sendVerificationEmail from "../../emails/sendVerificationEmail";
import comparePassword from "../../utils/password/comparePassword";
import generateJwtToken from "../../utils/tokens/generateJwtToken";
import HttpStatusCodes from "../../config/httpStatusCodes";
import setCookie from "../../utils/setCookie";
import prisma from "../../prisma";

async function login(req: Request, res: Response): Promise<any> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, role, rememberMe } = req.body as {
    email: string;
    password: string;
    role: string;
    rememberMe: boolean;
  };

  const roleTable = role === "applicant" ? "applicant" : "organization";
  const authRoleTable =
    role === "applicant" ? "applicantAuth" : "organizationAuth";

  const user = await (prisma[roleTable] as any).findFirst({
    where: {
      email,
    },
  });

  if (!user)
    return res.status(400).json({
      errors: [createErrorObject("Invalid email or password.", email, "email")],
    });

  const isPasswordMatched = await comparePassword(password, user.password);

  if (!isPasswordMatched)
    return res.status(400).json({
      errors: [createErrorObject("Invalid email or password.", "", "password")],
    });

  const userAuth = await (prisma[authRoleTable] as any).findFirst({
    where: {
      [`${roleTable}Id`]: user.id,
    },
  });

  if (!userAuth.isEmailVerified) {
    const verificationToken = generateVerificationToken();
    const verificationTokenExp = Date.now() + 3600000;

    await (prisma[authRoleTable] as any).update({
      where: {
        [`${roleTable}Id`]: user.id,
      },
      data: {
        emailToken: verificationToken,
        emailTokenExp: new Date(verificationTokenExp),
      },
    });

    await sendVerificationEmail(email, verificationToken, role);

    return res.status(HttpStatusCodes.UNAUTHORIZED).json({
      message:
        "Please verify your email. A new verification email has been sent.",
    });
  }

  const jwtToken = generateJwtToken({ id: user.id, role: role }, rememberMe);

  setCookie("token", res, jwtToken, rememberMe);

  return res
    .status(200)
    .json({ message: "Logged in successfully!", token: jwtToken });
}

async function adminLogin(req: Request, res: Response): Promise<any> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, rememberMe } = req.body as {
    username: string;
    password: string;
    rememberMe: boolean;
  };

  const admin = await prisma.admin.findFirst({
    where: {
      username,
    },
  });

  if (!admin)
    return res.status(400).json({
      errors: [
        createErrorObject("Invalid username or password.", "", "password"),
      ],
    });

  const isPasswordMatched = await comparePassword(password, admin.password);

  if (!isPasswordMatched)
    return res.status(400).json({
      errors: [
        createErrorObject("Invalid username or password.", "", "password"),
      ],
    });

  const jwtToken = generateJwtToken(
    { id: admin.id, role: "admin" },
    rememberMe
  );

  setCookie("token", res, jwtToken, rememberMe);

  return res
    .status(200)
    .json({ message: "Logged in successfully.", token: jwtToken });
}

export { login, adminLogin };

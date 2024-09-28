import { Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../prisma";
import createErrorObject from "../utils/createValidationErrorObject";
import hashPassword from "../utils/hashPassword";
import sendVerificationEmail from "../emails/sendVerificationEmail";
import generateVerificationToken from "../utils/generateVerificationToken";
import { Prisma } from "@prisma/client";

export async function applicantSignup(
  req: Request,
  res: Response
): Promise<any> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    email,
    password,
    firstName,
    lastName,
    middleName,
    dateOfBirth,
    gender,
    country,
    city,
  } = req.body;

  const isEmailTake = await prisma.applicant.findUnique({
    where: {
      email: email,
    },
  });

  if (isEmailTake)
    return res.status(400).json({
      errors: [createErrorObject("Email is already taken.", email, "email")],
    });

  const hashedPassword = await hashPassword(password);
  const { id: countryId } = await prisma.countryLookup.findFirstOrThrow({
    where: {
      name: country,
    },
  });

  const applicant = await prisma.applicant.create({
    data: {
      email,
      password: hashedPassword,
      countryId,
      firstName,
      middleName,
      lastName,
      dateOfBirth: new Date(dateOfBirth),
      gender,
      city: city,
    },
  });

  const verificationToken = generateVerificationToken(32);
  const verificationTokenExp = Date.now() + 3600000;

  await prisma.applicantAuth.create({
    data: {
      applicantId: applicant.id,
      emailToken: verificationToken,
      emailTokenExp: new Date(verificationTokenExp),
    },
  });

  await sendVerificationEmail(email, verificationToken, "applicant");

  return res
    .status(201)
    .json({ message: "Applicant created, please verify your email." });
}

export async function login(req: Request, res: Response): Promise<any> {}

export async function verifyAccount(req: Request, res: Response): Promise<any> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { token, role } = req.query as { token: string; role: string };
  const roleTable = role === "applicant" ? "applicantAuth" : "organizationAuth";
  const auth = await (prisma[roleTable] as any).findFirst({
    where: {
      emailToken: token,
    },
  });

  if (!auth || !auth.emailTokenExp || auth.emailTokenExp.getTime() < Date.now())
    return res.status(400).json({ message: "Invalid or expired token." });

  if (auth.isEmailVerified)
    return res.status(400).json({ message: "Account already verified." });

  await (prisma[roleTable] as any).update({
    where: {
      emailToken: token,
    },
    data: {
      isEmailVerified: true,
    },
  });

  return res.status(200).json({ message: "Email verified successfully!" });
}

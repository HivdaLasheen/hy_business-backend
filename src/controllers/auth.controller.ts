import { Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../prisma";
import createErrorObject from "../utils/createValidationErrorObject";
import hashPassword from "../utils/hashPassword";

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
    },
  });

  await prisma.applicantAuth.create({
    data: {
      applicantId: applicant.id,
    },
  });

  return res.status(200).json({ message: "success" });
}

export function login(req: Request, res: Response) {}

import { Request, Response } from "express";
import { validationResult } from "express-validator";
import generateVerificationToken from "../../utils/tokens/generateVerificationToken";
import createErrorObject from "../../utils/createValidationErrorObject";
import sendVerificationEmail from "../../emails/sendVerificationEmail";
import hashPassword from "../../utils/password/hashPassword";
import prisma from "../../prisma";

async function applicantSignup(req: Request, res: Response): Promise<any> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, firstName, lastName, middleName, dateOfBirth, gender, country, city } =
    req.body;

  const isEmailTake =
    (await prisma.applicant.findUnique({
      where: {
        email: email,
      },
    })) ||
    (await prisma.organization.findUnique({
      where: {
        email: email,
      },
    }));

  if (isEmailTake)
    return res.status(400).json({
      errors: [createErrorObject("Email is already taken.", email, "email")],
    });

  try {
    const hashedPassword = await hashPassword(password);
    const verificationToken = generateVerificationToken();
    const verificationTokenExp = Date.now() + 3600000;

    await prisma.$transaction(async (prisma) => {
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
          city,
        },
      });

      await prisma.applicantAuth.create({
        data: {
          applicantId: applicant.id,
          emailToken: verificationToken,
          emailTokenExp: new Date(verificationTokenExp),
        },
      });
    });

    await sendVerificationEmail(email, verificationToken, "applicant");

    return res.status(201).json({
      message: "Applicant account created, please verify your email.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function organizationSignup(req: Request, res: Response): Promise<any> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name, type, linkedin, isVirtual, phoneNumber } = req.body;

  const isEmailTaken =
    (await prisma.applicant.findUnique({
      where: {
        email: email,
      },
    })) ||
    (await prisma.organization.findUnique({
      where: {
        email: email,
      },
    }));

  if (isEmailTaken)
    return res.status(400).json({
      errors: [createErrorObject("Email is already taken.", email, "email")],
    });

  const hashedPassword = await hashPassword(password);

  const verificationToken = generateVerificationToken();
  const verificationTokenExp = Date.now() + 3600000;

  try {
    await prisma.$transaction(async (prisma) => {
      const organization = await prisma.organization.create({
        data: {
          email,
          password: hashedPassword,
          name,
          type,
          linkedin,
          isVirtual: isVirtual === "true" ? true : false,
          phoneNumber,
        },
      });

      await prisma.organizationAuth.create({
        data: {
          organizationId: organization.id,
          emailToken: verificationToken,
          emailTokenExp: new Date(verificationTokenExp),
        },
      });
    });

    await sendVerificationEmail(email, verificationToken, "organization");

    return res.status(201).json({
      message: "Organization account created, please verify your email.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function verifyAccount(req: Request, res: Response): Promise<any> {
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

  await (prisma[roleTable] as any).update({
    where: {
      emailToken: token,
    },
    data: {
      isEmailVerified: true,
      emailToken: null,
      emailTokenExp: null,
    },
  });

  return res.status(200).json({ message: "Email verified successfully!" });
}

export { organizationSignup, applicantSignup, verifyAccount };

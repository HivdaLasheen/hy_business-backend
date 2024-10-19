import { Request, Response } from "express";
import prisma from "../../prisma";
import config from "../../config";
import fs from "fs";
import HttpStatusCodes from "../../config/httpStatusCodes";
import singleFileUpload from "../../file-upload/singleFile.upload";
import sharp from "sharp";

async function retrieveApplicantProfile(id: number) {
  return await prisma.applicant
    .findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        middleName: true,
        lastName: true,
        city: true,
        countryLookup: {
          select: {
            name: true,
          },
        },
        dateOfBirth: true,
        ethnicity: true,
        religion: true,
        gender: true,
        github: true,
        linkedin: true,
        portfolio: true,
        phoneNumber: true,
        softSkills: true,
      },
    })
    .then((record: any) => {
      if (record?.countryLookup?.name) {
        record.country = record?.countryLookup.name;
        delete record.countryLookup;
      }
      return record;
    });
}

async function getApplicantProfile(req: Request, res: Response): Promise<any> {
  const id = Number(req.params.id);
  const profile = await retrieveApplicantProfile(id);

  if (!profile)
    return res.status(HttpStatusCodes.NOT_FOUND).json({ error: "Applicant was not found." });
  return res.status(HttpStatusCodes.OK).json(profile);
}

async function putProfile(req: Request, res: Response): Promise<any> {
  const id = Number(req.params.id);
  const { religion, ethnicity, portfolio, github, linkedin, softSkills, phoneNumber } = req.body;

  await prisma.applicant.update({
    where: {
      id,
    },
    data: {
      religion,
      ethnicity,
      portfolio,
      github,
      linkedin,
      softSkills,
      phoneNumber,
    },
  });

  return res.status(HttpStatusCodes.OK).json({ message: "Profile updated successfully." });
}

const uploadPfp = [
  singleFileUpload(
    "pfp",
    { filename: "PFP", path: config.paths.storage.pfp },
    { mimetypes: ["image/png", "image/jpeg", "image/jpg"], sizeLimit: 1024 * 1024 * 5 }
  ),
  async (req: Request, res: Response): Promise<any> => {
    const id = Number(req.params.id);

    if (!req.file)
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ error: "Profile Picture is required." });

    const filename = req.file.filename;
    const filePath = `${config.paths.storage.pfp}/${filename}`;
    const metadata = await sharp(filePath).metadata();

    if (metadata.width !== metadata.height) {
      fs.unlinkSync(filePath);
      return res.status(400).json({
        error: "Profile picture must be a square image.",
      });
    }

    const applicant = await prisma.applicant.findUnique({
      where: {
        id,
      },
      select: {
        profilePicture: true,
      },
    });

    if (applicant?.profilePicture) {
      const oldPfpPath = `${config.paths.storage.pfp}/${applicant.profilePicture}`;
      if (fs.existsSync(oldPfpPath)) fs.unlinkSync(oldPfpPath);
    }

    await prisma.applicant.update({
      where: {
        id,
      },
      data: {
        profilePicture: filename,
      },
    });

    return res
      .status(HttpStatusCodes.OK)
      .json({ message: "Profile Picture uploaded successfully." });
  },
];

async function getPFP(req: Request, res: Response): Promise<any> {
  const id = Number(req.params.id);

  const applicant = await prisma.applicant.findUnique({
    where: {
      id,
    },
    select: {
      profilePicture: true,
    },
  });

  if (!applicant)
    return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: "Applicant was not found." });

  const filePath = applicant?.profilePicture
    ? `${config.paths.storage.pfp}/${applicant.profilePicture}`
    : `${config.paths.storage.default.pfp}`;

  return res.status(HttpStatusCodes.OK).sendFile(filePath);
}

export { getApplicantProfile, putProfile, uploadPfp, getPFP };

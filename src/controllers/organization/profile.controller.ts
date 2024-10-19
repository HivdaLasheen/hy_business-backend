import { Request, Response } from "express";
import prisma from "../../prisma";
import config from "../../config";
import fs from "fs";
import HttpStatusCodes from "../../config/httpStatusCodes";
import singleFileUpload from "../../file-upload/singleFile.upload";
import sharp from "sharp";

// Function to retrieve organization profile by ID
async function retrieveOrganizationProfile(id: number) {
  return await prisma.organization
    .findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        type: true,
        phoneNumber: true,
        linkedin: true,
        website: true,
        industry: true,
        sizeOfCompany: true,
        logo: true,
      },
    })
    .then((record: any) => {
      return record;
    });
}

// Function to get organization profile
async function getOrganizationProfile(req: Request, res: Response): Promise<any> {
  const id = Number(req.params.id);
  const profile = await retrieveOrganizationProfile(id);

  if (!profile)
    return res.status(HttpStatusCodes.NOT_FOUND).json({ error: "Organization was not found." });
  return res.status(HttpStatusCodes.OK).json(profile);
}

// Function to update organization profile
async function putProfile(req: Request, res: Response): Promise<any> {
  const id = Number(req.params.id);
  const { type, industry, sizeOfCompany, phoneNumber, linkedin, website } = req.body;

  await prisma.organization.update({
    where: {
      id,
    },
    data: {
      type,
      industry,
      sizeOfCompany,
      phoneNumber,
      linkedin,
      website,
    },
  });

  return res.status(HttpStatusCodes.OK).json({ message: "Profile updated successfully." });
}

// Function to upload organization logo
const uploadLogo = [
  singleFileUpload(
    "logo",
    { filename: "Logo", path: config.paths.storage.logo },
    { mimetypes: ["image/png", "image/jpeg", "image/jpg"], sizeLimit: 1024 * 1024 * 5 }
  ),
  async (req: Request, res: Response): Promise<any> => {
    const id = Number(req.params.id);

    if (!req.file)
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ error: "Logo is required." });

    const filename = req.file.filename;
    const filePath = `${config.paths.storage.logo}/${filename}`;
    const metadata = await sharp(filePath).metadata();

    // Optional: Validate logo dimensions (if needed)
    // Here you could add specific logic to check dimensions or other properties.

    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
      select: {
        logo: true,
      },
    });

    // Delete old logo if it exists
    if (organization?.logo) {
      const oldLogoPath = `${config.paths.storage.logo}/${organization.logo}`;
      if (fs.existsSync(oldLogoPath)) fs.unlinkSync(oldLogoPath);
    }

    await prisma.organization.update({
      where: {
        id,
      },
      data: {
        logo: filename,
      },
    });

    return res
      .status(HttpStatusCodes.OK)
      .json({ message: "Logo uploaded successfully." });
  },
];

// Function to get organization logo
async function getLogo(req: Request, res: Response): Promise<any> {
  const id = Number(req.params.id);

  const organization = await prisma.organization.findUnique({
    where: {
      id,
    },
    select: {
      logo: true,
    },
  });

  if (!organization)
    return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: "Organization was not found." });

  const filePath = organization?.logo
    ? `${config.paths.storage.logo}/${organization.logo}`
    : `${config.paths.storage.default.logo}`; // Set a default logo path

  return res.status(HttpStatusCodes.OK).sendFile(filePath);
}

export { getOrganizationProfile, putProfile, uploadLogo, getLogo };

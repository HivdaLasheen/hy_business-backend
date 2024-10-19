import { Request, Response } from "express";
import singleFileUpload from "../../file-upload/singleFile.upload";
import HttpStatusCodes from "../../config/httpStatusCodes";
import prisma from "../../prisma";
import config from "../../config";
import fs from "fs";
import { ApplicantWorkExperience } from "@prisma/client";

async function GetApplicantWorkExperience(
  applicantId: number
): Promise<ApplicantWorkExperience | null> {
  const workExperience = await prisma.applicantWorkExperience.findUnique({
    where: {
      applicantId,
    },
  });

  return workExperience ?? null;
}

async function getWorkExperience(req: Request, res: Response): Promise<any> {
  const id = Number(req.params.id);

  const workExperience = await prisma.applicantWorkExperience.findUnique({
    where: {
      applicantId: id,
    },
    select: {
      role: true,
      yearsOfExperience: true,
    },
  });

  if (workExperience) {
    const prevWorkExperience = await prisma.applicantPrevWorkExperience.findMany({
      where: {
        applicantId: id,
      },
      select: {
        startDate: true,
        endDate: true,
      },
    });

    workExperience.yearsOfExperience = prevWorkExperience.reduce((acc, curr) => {
      const startDate = new Date(curr.startDate);
      const endDate = curr.endDate ? new Date(curr.endDate) : new Date();

      const diff = Math.abs(endDate.getTime() - startDate.getTime());
      const years = diff / (1000 * 3600 * 24 * 365);

      return Number((acc + years).toFixed(2));
    }, 0);
  }

  return res.status(HttpStatusCodes.OK).json({
    workExperience: workExperience || {},
  });
}

async function createWorkExperience(req: Request, res: Response): Promise<any> {
  const id = Number(req.params.id);
  const { role } = req.body;

  const workExperience = await GetApplicantWorkExperience(id);

  if (workExperience)
    await prisma.applicantWorkExperience.update({
      where: {
        applicantId: id,
      },
      data: {
        role,
      },
    });
  else
    await prisma.applicantWorkExperience.create({
      data: {
        applicantId: id,
        role,
      },
    });

  return res.status(HttpStatusCodes.CREATED).json({
    role,
  });
}

const uploadCV = [
  singleFileUpload(
    "cv",
    { filename: "CV", path: config.paths.storage.cv },
    { sizeLimit: 1024 * 1024 * 2, mimetype: "application/pdf" }
  ),
  async (req: Request, res: Response): Promise<any> => {
    const id = Number(req.params.id);
    const { file } = req;

    if (!file) return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: "CV is required." });

    const workExperience = await GetApplicantWorkExperience(id);

    if (!workExperience) {
      fs.unlinkSync(`${config.paths.storage.cv}/${file.filename}`);
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "Work experience does not exists on your profile.",
      });
    }

    const oldCV = workExperience.resume;

    if (oldCV) {
      const oldCertificatePath = `${config.paths.storage.cv}/${oldCV}`;
      if (fs.existsSync(oldCertificatePath)) fs.unlinkSync(oldCertificatePath);
    }

    await prisma.applicantWorkExperience.update({
      where: {
        applicantId: id,
      },
      data: {
        resume: file.filename,
      },
    });

    return res.status(HttpStatusCodes.OK).json({ message: "CV uploaded successfully." });
  },
];

async function getCV(req: Request, res: Response): Promise<any> {
  const id = Number(req.params.id);
  const workExperience = await GetApplicantWorkExperience(id);

  if (!workExperience)
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      message: "Work experience does not exists on your profile.",
    });

  const cv = workExperience.resume;

  if (!cv) return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: "CV was not uploaded." });

  const fileName = cv.split("-").pop();
  const cvPath = `${config.paths.storage.cv}/${cv}`;

  if (!fs.existsSync(cvPath))
    return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: "CV was not found." });

  fs.readFile(cvPath, (err, data) => {
    if (err)
      return res
        .status(HttpStatusCodes.SERVICE_UNAVAILABLE)
        .json({ message: "Error sending the file" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline;filename=${fileName}`);

    return res.status(HttpStatusCodes.OK).send(data);
  });
}

const uploadCertificate = [
  singleFileUpload(
    "workCertificate",
    { filename: "WorkCertificate", path: config.paths.storage.workCertificate },
    { sizeLimit: 1024 * 1024 * 10, mimetype: "application/pdf" }
  ),
  async (req: Request, res: Response): Promise<any> => {
    const id = Number(req.params.id);
    const { file } = req;

    if (!file)
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: "Certificate is required." });

    const workExperience = await GetApplicantWorkExperience(id);

    if (!workExperience) {
      fs.unlinkSync(`${config.paths.storage.workCertificate}/${file.filename}`);
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "Work experience does not exists on your profile.",
      });
    }

    const oldWorkCertificate = workExperience.certificates;

    if (oldWorkCertificate) {
      const oldCertificatePath = `${config.paths.storage.workCertificate}/${oldWorkCertificate}`;
      if (fs.existsSync(oldCertificatePath)) fs.unlinkSync(oldCertificatePath);
    }

    await prisma.applicantWorkExperience.update({
      where: {
        applicantId: id,
      },
      data: {
        certificates: file.filename,
      },
    });

    return res.status(HttpStatusCodes.OK).json({ message: "Certificate uploaded successfully." });
  },
];

async function getCertificate(req: Request, res: Response): Promise<any> {
  const id = Number(req.params.id);
  const workExperience = await GetApplicantWorkExperience(id);

  if (!workExperience)
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      message: "Work experience does not exists on your profile.",
    });

  const certificate = workExperience.certificates;

  if (!certificate)
    return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: "Certificate was not uploaded." });

  const fileName = certificate.split("-").pop();
  const certificatePath = `${config.paths.storage.workCertificate}/${certificate}`;

  if (!fs.existsSync(certificatePath))
    return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: "Certificate was not found." });

  fs.readFile(certificatePath, (err, data) => {
    if (err)
      return res
        .status(HttpStatusCodes.SERVICE_UNAVAILABLE)
        .json({ message: "Error sending the file" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline;filename=${fileName}`);

    return res.status(HttpStatusCodes.OK).send(data);
  });
}

export {
  getWorkExperience,
  createWorkExperience,
  uploadCV,
  getCV,
  uploadCertificate,
  getCertificate,
};

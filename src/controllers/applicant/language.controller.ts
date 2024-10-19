import { Request, Response } from "express";
import singleFileUpload from "../../file-upload/singleFile.upload";
import HttpStatusCodes from "../../config/httpStatusCodes";
import prisma from "../../prisma";
import config from "../../config";
import fs from "fs";

async function languageExists(applicantId: number, languageId: number): Promise<boolean> {
  const language = await prisma.applicantsLanguages.findUnique({
    where: {
      applicantId_languageId: {
        applicantId,
        languageId,
      },
    },
  });

  return !!language;
}

async function getLanguages(req: Request, res: Response): Promise<any> {
  const id = Number(req.params.id);

  const languages = await prisma.applicantsLanguages.findMany({
    where: {
      applicantId: id,
    },
    select: {
      languagesLookup: {
        select: {
          name: true,
        },
      },
      level: true,
      languageId: true,
    },
  });

  return res.status(HttpStatusCodes.OK).json({
    language: languages.map((lang) => ({
      ...lang,
      languageName: lang.languagesLookup.name,
      languagesLookup: undefined,
    })),
  });
}

async function postLanguage(req: Request, res: Response): Promise<any> {
  const id = Number(req.params.id);
  const { languageId, level } = req.body;

  const language = await languageExists(id, languageId);

  if (language)
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      message: "Language already exists.",
    });

  await prisma.applicantsLanguages.create({
    data: {
      applicantId: id,
      languageId: Number(languageId),
      level,
    },
  });

  return res.status(HttpStatusCodes.CREATED).json({
    message: "Language added successfully.",
  });
}

async function deleteLanguage(req: Request, res: Response): Promise<any> {
  const [id, languageId] = [req.params.id, req.params.langId].map(Number);

  const language = await languageExists(id, languageId);

  if (!language)
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      message: "Language does not exists.",
    });

  await prisma.applicantsLanguages.delete({
    where: {
      applicantId_languageId: {
        applicantId: id,
        languageId: languageId,
      },
    },
  });

  return res.status(HttpStatusCodes.OK).json({
    message: "Language deleted successfully.",
  });
}

async function updateLangLevel(req: Request, res: Response): Promise<any> {
  const [id, languageId] = [req.params.id, req.params.langId].map(Number);
  const { level } = req.body;

  const language = await languageExists(id, languageId);

  if (!language)
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      message: "Language does not exists.",
    });

  await prisma.applicantsLanguages.update({
    where: {
      applicantId_languageId: {
        applicantId: id,
        languageId: languageId,
      },
    },
    data: {
      level,
    },
  });

  return res.status(HttpStatusCodes.OK).json({
    message: "Language level updated successfully.",
  });
}

const uploadCertificate = [
  singleFileUpload(
    "languageCertificate",
    { filename: "LanguageCertificate", path: config.paths.storage.language },
    { sizeLimit: 1024 * 1024 * 2, mimetype: "application/pdf" }
  ),
  async (req: Request, res: Response): Promise<any> => {
    const [id, languageId] = [req.params.id, req.params.langId].map(Number);
    const { file } = req;

    if (!file)
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: "Certificate is required." });

    const language = await prisma.applicantsLanguages.findUnique({
      where: {
        applicantId_languageId: {
          applicantId: id,
          languageId,
        },
      },
    });

    if (!language) {
      fs.unlinkSync(`${config.paths.storage.language}/${file.filename}`);
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ error: "Language does not exist on your profile." });
    }

    const oldCertificate = language.certificate;

    if (oldCertificate) {
      const oldCertificatePath = `${config.paths.storage.language}/${oldCertificate}`;
      if (fs.existsSync(oldCertificatePath)) fs.unlinkSync(oldCertificatePath);
    }

    await prisma.applicantsLanguages.update({
      where: {
        applicantId_languageId: {
          applicantId: id,
          languageId,
        },
      },
      data: {
        certificate: file.filename,
      },
    });

    return res
      .status(HttpStatusCodes.OK)
      .json({ message: "Language Certificate uploaded successfully." });
  },
];

async function getCertificate(req: Request, res: Response): Promise<any> {
  const [id, languageId] = [req.params.id, req.params.langId].map(Number);

  const language = await prisma.applicantsLanguages.findUnique({
    where: {
      applicantId_languageId: {
        applicantId: id,
        languageId,
      },
    },
  });

  if (!language)
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: "Language does not exist on your profile." });

  const certificate = language.certificate;

  if (!certificate)
    return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: "Certificate not uploaded." });

  const fileName = certificate.split("-").pop();
  const certificatePath = `${config.paths.storage.language}/${certificate}`;

  if (!fs.existsSync(certificatePath))
    return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: "Certificate not found." });

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
  getLanguages,
  postLanguage,
  deleteLanguage,
  updateLangLevel,
  uploadCertificate,
  getCertificate,
};

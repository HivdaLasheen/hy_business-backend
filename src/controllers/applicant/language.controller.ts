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

async function getLanguages(req: Request, res: Response) {
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

  res.status(HttpStatusCodes.OK).json({
    applicantId: id,
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

export { getLanguages, postLanguage, deleteLanguage, updateLangLevel };

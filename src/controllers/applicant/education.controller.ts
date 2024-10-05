import { Request, Response } from "express";
import prisma from "../../prisma";
import config from "../../config";
import fs from "fs";
import HttpStatusCodes from "../../config/httpStatusCodes";
import singleFileUpload from "../../file-upload/singleFile.upload";

async function postEducation(req: Request, res: Response): Promise<any> {
  const id = Number(req.params.id);
  const { body } = req;

  const education = await prisma.applicantEducation.findUnique({
    where: {
      applicantId: id,
    },
  });

  if (!education)
    await prisma.applicantEducation.create({
      data: {
        applicantId: id,
        ...body,
      },
    });
  else
    await prisma.applicantEducation.update({
      where: {
        applicantId: id,
      },
      data: body,
    });

  return res
    .status(HttpStatusCodes.OK)
    .json({ message: "Education details submitted successfully.", body });
}

async function getEducation(req: Request, res: Response): Promise<any> {
  const id = Number(req.params.id);

  const education = await prisma.applicantEducation.findUnique({
    where: {
      applicantId: id,
    },
    select: {
      major: true,
      degree: true,
      graduationYear: true,
      university: true,
    },
  });

  if (!education)
    return res
      .status(HttpStatusCodes.NOT_FOUND)
      .json({ error: "Education details was not found." });

  return res.status(HttpStatusCodes.OK).json(education);
}

async function getCertificate(req: Request, res: Response): Promise<any> {
  const id = Number(req.params.id);

  const education = await prisma.applicantEducation.findUnique({
    where: {
      applicantId: id,
    },
  });

  if (!education || !education.certificate)
    return res.status(HttpStatusCodes.NOT_FOUND).json({ error: "Certificate was not found." });

  const fileName = education.certificate.split("-").pop();
  const certificatePath = `${config.paths.storage.education}/${education.certificate}`;

  if (!fs.existsSync(certificatePath))
    return res.status(HttpStatusCodes.NOT_FOUND).json({ error: "Certificate was not found." });

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

const uploadCertificate = [
  singleFileUpload(
    "certificate",
    { filename: "Certificate", path: config.paths.storage.education },
    { sizeLimit: 1024 * 1024 * 2, mimetype: "application/pdf" }
  ),
  async (req: Request, res: Response): Promise<any> => {
    const id = Number(req.params.id);
    const { file } = req;

    if (!file)
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: "Certificate is required." });

    const education = await prisma.applicantEducation.findUnique({
      where: {
        applicantId: id,
      },
    });

    if (!education)
      await prisma.applicantEducation.create({
        data: {
          applicantId: id,
          certificate: file.filename,
        },
      });
    else {
      const oldCertificate = education.certificate;

      if (oldCertificate) {
        const oldCertificatePath = `${config.paths.storage.education}/${oldCertificate}`;
        if (fs.existsSync(oldCertificatePath)) fs.unlinkSync(oldCertificatePath);
      }

      await prisma.applicantEducation.update({
        where: {
          applicantId: id,
        },
        data: {
          certificate: file.filename,
        },
      });
    }

    return res.status(HttpStatusCodes.OK).json({ message: "Certificate uploaded successfully." });
  },
];

export { postEducation, getEducation, uploadCertificate, getCertificate };

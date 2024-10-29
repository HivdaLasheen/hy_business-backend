import { Request, Response } from "express";
import prisma from "../../prisma";
import HttpStatusCodes from "../../config/httpStatusCodes";
import createErrorObject from "../../utils/createValidationErrorObject";

async function getAllowedJobRoles(req: Request, res: Response): Promise<any> {
  const id = Number(req.params.id);
  const allowedJobRoles = await prisma.applicantAllowedJobRoles.findMany({
    where: {
      applicantId: id,
    },
  });

  return res.status(HttpStatusCodes.OK).json(allowedJobRoles);
}

async function getJobRole(req: Request, res: Response): Promise<any> {
  const id = Number(req.params.id);
  const jobRoleId = Number(req.params.jobRoleId);

  const allowedJobRole = await prisma.applicantAllowedJobRoles.findUnique({
    where: {
      applicantId_jobRoleId: {
        applicantId: id,
        jobRoleId,
      },
    },
  });

  if (!allowedJobRole)
    return res.status(HttpStatusCodes.FORBIDDEN).json({ message: "Job role not allowed." });

  const jobRole = await prisma.jobRoles.findUnique({
    where: {
      id: jobRoleId,
    },
  });

  return res.status(HttpStatusCodes.OK).json(jobRole);
}

async function postAllowedJobRoles(req: Request, res: Response): Promise<any> {
  const id = Number(req.params.id);
  const jobRoleId = Number(req.body.jobRoleId);

  if (!jobRoleId || typeof jobRoleId !== "number")
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      errors: [createErrorObject("Job Role ID is required.", String(jobRoleId), "jobRoleId")],
    });

  const allowedJobRole = await prisma.applicantAllowedJobRoles.findUnique({
    where: {
      applicantId_jobRoleId: {
        applicantId: id,
        jobRoleId,
      },
    },
  });

  if (!allowedJobRole)
    return res.status(HttpStatusCodes.FORBIDDEN).json({ message: "Job role not allowed." });

  if (allowedJobRole.status === "Submitted")
    return res.status(HttpStatusCodes.FORBIDDEN).json({ message: "Job role already submitted." });

  await prisma.applicantAllowedJobRoles.update({
    where: {
      applicantId_jobRoleId: {
        applicantId: id,
        jobRoleId,
      },
    },
    data: {
      status: "Submitted",
    },
  });

  return res.status(HttpStatusCodes.OK).json({ message: "Job role submitted successfully." });
}

export { getAllowedJobRoles, postAllowedJobRoles, getJobRole };

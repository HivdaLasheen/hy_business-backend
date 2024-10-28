import { Request, Response } from "express";
import Fuse from "fuse.js";
import prisma from "../../prisma";
import HttpStatusCodes from "../../config/httpStatusCodes";
import createErrorObject from "../../utils/createValidationErrorObject";

async function searchApplicants(req: Request, res: Response): Promise<any> {
  const { value, page = 1, limit = 15, key } = req.query;

  const startIndex = (Number(page) - 1) * Number(limit);
  const endIndex = Number(page) * Number(limit);

  const applicants = await prisma.applicant.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      middleName: true,
      email: true,
      phoneNumber: true,
      dateOfBirth: true,
      ethnicity: true,
      gender: true,
      religion: true,
      linkedin: true,
      github: true,
      portfolio: true,
    },
  });

  if (!value || !key)
    return res.status(HttpStatusCodes.OK).json(applicants.slice(startIndex, endIndex));

  const enrichedApplicants = applicants.map((applicant) => ({
    ...applicant,
    fullName:
      `${applicant.firstName} ${applicant.middleName || ""} ${applicant.lastName}`.trim() ||
      undefined,
  }));

  const fuse = new Fuse(enrichedApplicants, {
    keys: [String(key)],
    threshold: 0.3,
  });

  const results = fuse.search(String(value)).map((result) => result.item);
  const paginatedResults = results.slice(startIndex, endIndex).map((result) => ({
    ...result,
    fullName: undefined,
  }));

  return res.status(HttpStatusCodes.OK).json(paginatedResults);
}

async function assignJobToApplicant(req: Request, res: Response): Promise<any> {
  const [jobId, applicantId] = [req.params.jobId, req.params.applicantId].map(Number);
  const { status } = req.body;

  if (!status || typeof status !== "string" || status.length > 50)
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      errors: [createErrorObject("Status is required and must be a string.", status, "status")],
    });

  const job = await prisma.jobRoles.findUnique({ where: { id: jobId, status: "active" } });
  const applicant = await prisma.applicant.findUnique({ where: { id: applicantId } });

  if (!job || !applicant)
    return res.status(HttpStatusCodes.NOT_FOUND).json({ error: "Job or applicant not found." });

  const allowedJobRole = await prisma.applicantAllowedJobRoles.findUnique({
    where: { applicantId_jobRoleId: { applicantId, jobRoleId: jobId } },
  });

  if (allowedJobRole)
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      error: "Applicant already has this job role.",
    });

  const updatedApplicant = await prisma.applicantAllowedJobRoles.create({
    data: { status, applicantId, jobRoleId: jobId },
  });

  return res.status(HttpStatusCodes.OK).json(updatedApplicant);
}

async function deleteAllowedJobRole(req: Request, res: Response): Promise<any> {
  const [jobId, applicantId] = [req.params.jobId, req.params.applicantId].map(Number);

  try {
    const deletedAllowedJobRole = await prisma.applicantAllowedJobRoles.delete({
      where: {
        applicantId_jobRoleId: { applicantId: applicantId, jobRoleId: jobId },
      },
    });

    return res.status(HttpStatusCodes.OK).json(deletedAllowedJobRole);
  } catch {
    return res.status(HttpStatusCodes.NOT_FOUND).json({ error: "Job role not found." });
  }
}

async function getApplicantJobStatus(req: Request, res: Response): Promise<any> {
  const [jobId, applicantId] = [req.params.jobId, req.params.applicantId].map(Number);

  const allowedJobRole = await prisma.applicantAllowedJobRoles.findUnique({
    where: { applicantId_jobRoleId: { applicantId, jobRoleId: jobId } },
  });

  if (!allowedJobRole)
    return res.status(HttpStatusCodes.NOT_FOUND).json({ error: "Job role not found." });

  return res.status(HttpStatusCodes.OK).json(allowedJobRole);
}

async function updateApplicantJobStatus(req: Request, res: Response): Promise<any> {
  const [jobId, applicantId] = [req.params.jobId, req.params.applicantId].map(Number);
  const { status } = req.body;

  if (!status || typeof status !== "string" || status.length > 50)
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      errors: [
        createErrorObject(
          "Status is required and must be a string and less than 50 characters.",
          status,
          "status"
        ),
      ],
    });

  const allowedJobRole = await prisma.applicantAllowedJobRoles.findUnique({
    where: { applicantId_jobRoleId: { applicantId, jobRoleId: jobId } },
  });

  if (!allowedJobRole)
    return res.status(HttpStatusCodes.NOT_FOUND).json({ error: "Job role not found." });

  const updatedAllowedJobRole = await prisma.applicantAllowedJobRoles.update({
    where: { applicantId_jobRoleId: { applicantId, jobRoleId: jobId } },
    data: { status },
  });

  return res.status(HttpStatusCodes.OK).json(updatedAllowedJobRole);
}

export {
  searchApplicants,
  assignJobToApplicant,
  deleteAllowedJobRole,
  getApplicantJobStatus,
  updateApplicantJobStatus,
};

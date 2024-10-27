import { Request, Response } from "express";
import Fuse from "fuse.js";
import prisma from "../../prisma";
import HttpStatusCodes from "../../config/httpStatusCodes";

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

export { searchApplicants };

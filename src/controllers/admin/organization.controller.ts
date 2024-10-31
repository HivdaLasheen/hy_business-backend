import { Request, Response } from "express";
import Fuse from "fuse.js";
import prisma from "../../prisma";
import HttpStatusCodes from "../../config/httpStatusCodes";

async function getOrganizations(req: Request, res: Response): Promise<any> {
  const organizations = await prisma.organization.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      website: true,
      linkedin: true,
      industry: true,
      sizeOfCompany: true,
      isVirtual: true,
      type: true,
      organizationLocations: true,
    },
  });

  return res.status(HttpStatusCodes.OK).json(organizations);
}

export { getOrganizations };

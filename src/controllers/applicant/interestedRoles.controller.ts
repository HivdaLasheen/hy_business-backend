import { Request, Response } from "express";
import HttpStatusCodes from "../../config/httpStatusCodes";
import prisma from "../../prisma";
import { ApplicantInterestJobRoles } from "@prisma/client";

async function retrieveInterestedRoles(applicantId: number): Promise<ApplicantInterestJobRoles[]> {
  const interestedRoles = await prisma.applicantInterestJobRoles.findMany({
    where: {
      applicantId,
    },
  });

  return interestedRoles;
}

async function getInterestedRoles(req: Request, res: Response): Promise<any> {
  const id = Number(req.params.id);
  const interestedRoles = await retrieveInterestedRoles(id);

  return res.status(HttpStatusCodes.OK).json(
    interestedRoles.map((role) => ({
      id: role.id,
      role: role.role,
    }))
  );
}

async function postInterestedRole(req: Request, res: Response): Promise<any> {
  const id = Number(req.params.id);
  const role: string = req.body.role;

  const roleExists = await prisma.applicantInterestJobRoles
    .findMany({
      where: {
        applicantId: id,
      },
    })
    .then((roles) => roles.some((r) => r.role?.toLowerCase() === role?.toLowerCase()));

  if (roleExists)
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      message: "Role already exists",
    });

  const interestedRole = await prisma.applicantInterestJobRoles.create({
    data: {
      role,
      applicantId: id,
    },
  });

  return res.status(HttpStatusCodes.CREATED).json({
    message: "Role added successfully",
    id: interestedRole.id,
  });
}

async function deleteInterestedRole(req: Request, res: Response): Promise<any> {
  const [id, roleId] = [req.params.id, req.params.roleId].map(Number);

  const role = await retrieveInterestedRoles(id).then((roles) =>
    roles.find((r) => r.id === roleId)
  );

  if (!role)
    return res.status(HttpStatusCodes.NOT_FOUND).json({
      message: "Role was not found.",
    });

  await prisma.applicantInterestJobRoles.delete({
    where: {
      id: roleId,
    },
  });

  return res.status(HttpStatusCodes.OK).json({
    message: "Role deleted successfully",
  });
}

export { getInterestedRoles, postInterestedRole, deleteInterestedRole };

import { Request, Response } from "express";
import prisma from "../../prisma";
import HttpStatusCodes from "../../config/httpStatusCodes";

// Function to add JobRole
async function addJobRole(req: Request, res: Response): Promise<void> {
  const organizationId = Number(req.params.id);

  const {
    jobTitle,
    type,
    minRequiredYearsOfExp,
    status,
    isUrgent,
    startDate,
    endDate,
    jobRoleLanguages,
    jobRoleSkills,
    ...rest
  } = req.body;

  try {
    const newJobRole = await prisma.jobRoles.create({
      data: {
        jobTitle,
        type,
        minRequiredYearsOfExp,
        status: status || "active",
        isUrgent: isUrgent || false,
        startDate: startDate || new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        ...rest,
        organizationId,
        jobRoleLanguages: {
          create: jobRoleLanguages.map((lang: any) => ({
            languageId: lang.languageId,
            level: lang.level,
          })),
        },
        jobRoleSkills: {
          create: jobRoleSkills.map((skill: any) => ({
            skillId: skill.skillId,
            proficiencyLevel: skill.proficiencyLevel,
          })),
        },
      },
      include: {
        jobRoleLanguages: true,
        jobRoleSkills: true,
      },
    });

    res.status(HttpStatusCodes.CREATED).json({
      message: "Job role created successfully.",
      jobRole: newJobRole,
    });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Error creating job role." });
  }
}

// Function to get all JobRole
async function getAllJobRoles(req: Request, res: Response): Promise<void> {
  const organizationId = Number(req.params.id);

  // if you need make filter in all job Roles by status or another

  // const { minExp, maxExp , status } = req.query;
  // if(status){
  //   type JobStatus = 'active' | 'closed';
  //   var statusValue: JobStatus | undefined = status && typeof status === 'string' ? status as JobStatus : undefined;
  // }

  try {
    const jobRoles = await prisma.jobRoles.findMany({
      where: {
        organizationId: organizationId,
        // minRequiredYearsOfExp: minExp ? { gte: Number(minExp) } : undefined,
        // maxRequiredYearsOfExp: maxExp ? { lte: Number(maxExp) } : undefined,
        // status: statusValue,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(HttpStatusCodes.OK).json(jobRoles);
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to retrieve job roles." });
  }
}

// Function to edit JobRole
async function editJobRole(req: Request, res: Response): Promise<void> {
  const jobRoleId = Number(req.params.jobRoleId);
  const { jobTitle, type, minRequiredYearsOfExp, jobRoleLanguages, jobRoleSkills, ...rest } =
    req.body;

  try {
    // Update job role details
    const updatedJobRole = await prisma.jobRoles.update({
      where: { id: jobRoleId },
      data: {
        jobTitle,
        type,
        minRequiredYearsOfExp,
        ...rest,
      },
    });

    // Update job role languages and skills
    if (jobRoleLanguages) {
      await prisma.jobRoleLanguages.deleteMany({ where: { jobRoleId } });
      await prisma.jobRoleLanguages.createMany({
        data: jobRoleLanguages.map((lang: any) => ({
          jobRoleId,
          languageId: lang.languageId,
          level: lang.level,
        })),
      });
    }

    if (jobRoleSkills) {
      await prisma.jobRoleSkills.deleteMany({ where: { jobRoleId } });
      await prisma.jobRoleSkills.createMany({
        data: jobRoleSkills.map((skill: any) => ({
          jobRoleId,
          skillId: skill.skillId,
          proficiencyLevel: skill.proficiencyLevel,
        })),
      });
    }

    res
      .status(HttpStatusCodes.OK)
      .json({ message: "Job role updated successfully.", jobRole: updatedJobRole });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Error updating job role." });
  }
}

// Function to update JobRole to close
async function closeJobRole(req: Request, res: Response): Promise<void> {
  const jobRoleId = Number(req.params.jobRoleId);
  const organizationId = Number(req.params.id);

  try {
    const existingJobRole = await prisma.jobRoles.findUnique({
      where: { id: jobRoleId, organizationId },
    });

    if (!existingJobRole) {
      res.status(HttpStatusCodes.NOT_FOUND).json({ error: "Job role not found." });
      return;
    }

    if (existingJobRole.status === "closed") {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ error: "Job role is already closed and cannot be deleted." });
      return;
    }

    const closedJobRole = await prisma.jobRoles.update({
      where: { id: jobRoleId },
      data: { status: "closed" },
    });

    res
      .status(HttpStatusCodes.OK)
      .json({ message: "Job role status updated to closed.", jobRole: closedJobRole });
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error updating job role status." });
  }
}

// Function to delete JobRole
async function deleteJobRole(req: Request, res: Response): Promise<void> {
  const jobRoleId = Number(req.params.jobRoleId);

  try {
    await prisma.jobRoles.delete({
      where: { id: jobRoleId },
    });

    res.status(HttpStatusCodes.OK).json({ message: "Job role deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Error deleting job role." });
  }
}

export { addJobRole, editJobRole, deleteJobRole, getAllJobRoles, closeJobRole };

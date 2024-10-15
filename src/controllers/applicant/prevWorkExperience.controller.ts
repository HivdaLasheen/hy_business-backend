import { Request, Response } from "express";
import HttpStatusCodes from "../../config/httpStatusCodes";
import prisma from "../../prisma";
import { ApplicantPrevWorkExperience } from "@prisma/client";

async function retrievePrevWorkExp(applicantId: number): Promise<ApplicantPrevWorkExperience[]> {
  const records = await prisma.applicantPrevWorkExperience
    .findMany({
      where: {
        applicantId,
      },
      include: {
        applicantPrevWorkExperienceSkills: {
          select: {
            proficiencyLevel: true,
            techSkillsLookup: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })
    .then((records) => {
      return records.map((record) => {
        const newRecord: any = { ...record };

        newRecord.skills = record.applicantPrevWorkExperienceSkills.map((skill) => ({
          name: skill.techSkillsLookup.name,
          proficiencyLevel: skill.proficiencyLevel,
        }));

        delete newRecord.applicantPrevWorkExperienceSkills;

        return newRecord;
      });
    });

  return records;
}

async function getAllPrevWorkExp(req: Request, res: Response): Promise<any> {
  const id = Number(req.params.id);
  const prevWorkExp = await retrievePrevWorkExp(id);

  return res.status(HttpStatusCodes.OK).json(prevWorkExp);
}

async function getPrevWorkExp(req: Request, res: Response): Promise<any> {
  const [id, workId] = [req.params.id, req.params.workId].map(Number);
  const prevWorkExp = await retrievePrevWorkExp(id).then((record) =>
    record.filter((workExp) => workExp.id === workId)
  );

  return res.status(HttpStatusCodes.OK).json(prevWorkExp[0] ?? {});
}

async function postNewPrevWorkExp(req: Request, res: Response): Promise<any> {
  const id = Number(req.params.id);
  const { jobTitle, companyName, startDate, endDate, description } = req.body;

  const technicalSkillsLookup = await prisma.techSkillsLookup.findMany();
  const technicalSkills = req.body.technicalSkills.map((skill: any) => {
    const skillId = technicalSkillsLookup.find((lookup) => lookup.name === skill.name)?.id;

    return {
      skillId,
      proficiencyLevel: skill.proficiencyLevel,
    };
  });

  const existingRecord = await prisma.applicantPrevWorkExperience.findFirst({
    where: {
      applicantId: id,
      jobTitle,
      companyName,
      startDate,
      endDate,
      description,
    },
  });

  if (existingRecord)
    return res.status(HttpStatusCodes.CONFLICT).json({
      message: "A previous work experience with the same details already exists.",
    });

  const newRecord = await prisma.applicantPrevWorkExperience.create({
    data: {
      applicantId: id,
      jobTitle,
      companyName,
      startDate,
      endDate,
      description,
      applicantPrevWorkExperienceSkills: {
        createMany: {
          data: technicalSkills,
        },
      },
    },
  });

  return res.status(HttpStatusCodes.CREATED).json({
    message: "Successfully added a previous work experience.",
    id: newRecord.id,
  });
}

async function deletePrevWorkExp(req: Request, res: Response): Promise<any> {
  const [id, workId] = [req.params.id, req.params.workId].map(Number);

  try {
    await prisma.applicantPrevWorkExperience.delete({
      where: {
        id: workId,
        AND: {
          applicantId: id,
        },
      },
    });

    return res.status(HttpStatusCodes.OK).json({
      message: "Successfully deleted the previous work experience.",
    });
  } catch (error) {
    return res.status(HttpStatusCodes.NOT_FOUND).json({
      message: "The previous work experience does not exist.",
    });
  }
}

export { getAllPrevWorkExp, getPrevWorkExp, postNewPrevWorkExp, deletePrevWorkExp };

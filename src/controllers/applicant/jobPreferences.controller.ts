import { Request, Response } from "express";
import prisma from "../../prisma";
import HttpStatusCodes from "../../config/httpStatusCodes";
import { ApplicantJobPreferences } from "@prisma/client";

async function retrieveApplicantJobPreferences(
  applicantId: number
): Promise<ApplicantJobPreferences | null> {
  return prisma.applicantJobPreferences.findUnique({
    where: {
      applicantId,
    },
  });
}

async function postJobPreferences(req: Request, res: Response): Promise<any> {
  const id = Number(req.params.id);
  const { remote, disruptions, relocation, preferredRegionsCountries } = req.body;
  const noticePeriod = Number(req.body.noticePeriod);

  const jobPreferencesExists = await retrieveApplicantJobPreferences(id);

  if (jobPreferencesExists)
    await prisma.applicantJobPreferences.update({
      where: {
        applicantId: id,
      },
      data: {
        noticePeriodInDays: noticePeriod,
        remoteWorkAvailability: !!remote,
        disruptions,
        relocation: !!relocation,
        preferredRegionsCountries: relocation ? preferredRegionsCountries : null,
      },
    });
  else
    await prisma.applicantJobPreferences.create({
      data: {
        applicantId: id,
        noticePeriodInDays: noticePeriod,
        remoteWorkAvailability: !!remote,
        disruptions,
        relocation: !!relocation,
        preferredRegionsCountries: relocation ? preferredRegionsCountries : null,
      },
    });

  return res.status(HttpStatusCodes.OK).json({
    message: jobPreferencesExists
      ? "Job preferences updated successfully."
      : "Job preferences created successfully.",
  });
}

async function getApplicantJobPreferences(req: Request, res: Response): Promise<any> {
  const id = Number(req.params.id);

  const jobPreferences = await retrieveApplicantJobPreferences(id);
  if (!jobPreferences)
    return res.status(HttpStatusCodes.NOT_FOUND).json({
      message: "Job preferences was not found.",
    });
  return res.status(HttpStatusCodes.OK).json(jobPreferences);
}

export { postJobPreferences, getApplicantJobPreferences };

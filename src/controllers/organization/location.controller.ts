import { Request, Response } from "express";
import prisma from "../../prisma";
import HttpStatusCodes from "../../config/httpStatusCodes";
// Function to add a new location for an organization
async function addOrganizationLocation(req: Request, res: Response): Promise<any> {
  const organizationId = Number(req.params.id);
  const { isHeadOffice, countryId, state, city, address, zipCode } = req.body;

  try {
    const newLocation = await prisma.organizationLocations.create({
      data: {
        organizationId: organizationId, 
        isHeadOffice: isHeadOffice || false, 
        countryId, 
        state,
        city,
        address,
        zipCode, 
      },
    });

    return res.status(HttpStatusCodes.CREATED).json({ message: "Location added successfully.", location: newLocation });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Error adding location." });
  }
}

// Function to get locations for an organization
async function getOrganizationLocations(req: Request, res: Response): Promise<any> {
  const organizationId = Number(req.params.id);

  try {
    const locations = await prisma.organizationLocations.findMany({
      where: {
        organizationId: organizationId, 
      },
    });

    return res.status(HttpStatusCodes.OK).json(locations);
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Error fetching locations." });
  }
}

// Function to delete a location for an organization
async function deleteOrganizationLocation(req: Request, res: Response): Promise<any> {
  const locationId = Number(req.params.locationId);

  try {
    await prisma.organizationLocations.delete({
      where: { id: locationId },
    });

    return res.status(HttpStatusCodes.OK).json({ message: "Location deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Error deleting location." });
  }
}

export { addOrganizationLocation, getOrganizationLocations, deleteOrganizationLocation };
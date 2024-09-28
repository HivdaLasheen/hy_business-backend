import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function testDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1;`;
    return true;
  } catch {
    return false;
  }
}

export default prisma;

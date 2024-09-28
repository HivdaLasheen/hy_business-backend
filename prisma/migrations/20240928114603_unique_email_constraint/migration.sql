/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `applicant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `organization` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `applicant_email_key` ON `applicant`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `organization_email_key` ON `organization`(`email`);

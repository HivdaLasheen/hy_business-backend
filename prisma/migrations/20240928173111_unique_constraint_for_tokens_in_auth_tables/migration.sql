/*
  Warnings:

  - A unique constraint covering the columns `[email_token]` on the table `applicant_auth` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reset_password_token]` on the table `applicant_auth` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email_token]` on the table `organization_auth` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reset_password_token]` on the table `organization_auth` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `applicant_auth_email_token_key` ON `applicant_auth`(`email_token`);

-- CreateIndex
CREATE UNIQUE INDEX `applicant_auth_reset_password_token_key` ON `applicant_auth`(`reset_password_token`);

-- CreateIndex
CREATE UNIQUE INDEX `organization_auth_email_token_key` ON `organization_auth`(`email_token`);

-- CreateIndex
CREATE UNIQUE INDEX `organization_auth_reset_password_token_key` ON `organization_auth`(`reset_password_token`);

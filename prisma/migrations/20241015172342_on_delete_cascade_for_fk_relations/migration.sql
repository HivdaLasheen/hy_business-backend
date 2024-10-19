-- DropForeignKey
ALTER TABLE `applicant_allowed_job_roles` DROP FOREIGN KEY `applicant_allowed_job_roles_ibfk_1`;

-- DropForeignKey
ALTER TABLE `applicant_allowed_job_roles` DROP FOREIGN KEY `applicant_allowed_job_roles_ibfk_2`;

-- DropForeignKey
ALTER TABLE `applicant_auth` DROP FOREIGN KEY `applicant_auth_ibfk_1`;

-- DropForeignKey
ALTER TABLE `applicant_prev_work_experience_skills` DROP FOREIGN KEY `applicant_prev_work_experience_skills_ibfk_1`;

-- DropForeignKey
ALTER TABLE `applicant_prev_work_experience_skills` DROP FOREIGN KEY `applicant_prev_work_experience_skills_ibfk_2`;

-- DropForeignKey
ALTER TABLE `applicants_languages` DROP FOREIGN KEY `applicants_languages_ibfk_1`;

-- DropForeignKey
ALTER TABLE `job_descriptions_recommendation` DROP FOREIGN KEY `job_descriptions_recommendation_ibfk_1`;

-- DropForeignKey
ALTER TABLE `job_role_skills` DROP FOREIGN KEY `job_role_skills_ibfk_1`;

-- DropForeignKey
ALTER TABLE `job_roles` DROP FOREIGN KEY `job_roles_ibfk_1`;

-- DropForeignKey
ALTER TABLE `organization_auth` DROP FOREIGN KEY `organization_auth_ibfk_1`;

-- DropForeignKey
ALTER TABLE `organization_locations` DROP FOREIGN KEY `organization_locations_ibfk_1`;

-- AddForeignKey
ALTER TABLE `applicant_allowed_job_roles` ADD CONSTRAINT `applicant_allowed_job_roles_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `applicant`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `applicant_allowed_job_roles` ADD CONSTRAINT `applicant_allowed_job_roles_ibfk_2` FOREIGN KEY (`job_role_id`) REFERENCES `job_roles`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `applicant_auth` ADD CONSTRAINT `applicant_auth_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `applicant`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `applicant_prev_work_experience_skills` ADD CONSTRAINT `applicant_prev_work_experience_skills_ibfk_1` FOREIGN KEY (`prev_work_id`) REFERENCES `applicant_prev_work_experience`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `applicant_prev_work_experience_skills` ADD CONSTRAINT `applicant_prev_work_experience_skills_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `tech_skills_lookup`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `applicants_languages` ADD CONSTRAINT `applicants_languages_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `applicant`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `job_descriptions_recommendation` ADD CONSTRAINT `job_descriptions_recommendation_ibfk_1` FOREIGN KEY (`job_role_id`) REFERENCES `job_roles`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `job_role_skills` ADD CONSTRAINT `job_role_skills_ibfk_1` FOREIGN KEY (`job_role_id`) REFERENCES `job_roles`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `job_roles` ADD CONSTRAINT `job_roles_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `organization_auth` ADD CONSTRAINT `organization_auth_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `organization_locations` ADD CONSTRAINT `organization_locations_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

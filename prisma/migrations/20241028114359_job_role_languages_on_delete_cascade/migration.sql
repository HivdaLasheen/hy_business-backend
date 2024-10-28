-- DropForeignKey
ALTER TABLE `job_role_languages` DROP FOREIGN KEY `job_role_languages_ibfk_1`;

-- DropForeignKey
ALTER TABLE `job_role_languages` DROP FOREIGN KEY `job_role_languages_ibfk_2`;

-- AddForeignKey
ALTER TABLE `job_role_languages` ADD CONSTRAINT `job_role_languages_ibfk_1` FOREIGN KEY (`job_role_id`) REFERENCES `job_roles`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `job_role_languages` ADD CONSTRAINT `job_role_languages_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `languages_lookup`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

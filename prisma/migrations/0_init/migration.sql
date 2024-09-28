-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(512) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `applicant` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(512) NOT NULL,
    `first_name` VARCHAR(50) NOT NULL,
    `middle_name` VARCHAR(50) NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `profile_picture` VARCHAR(512) NULL,
    `date_of_birth` DATE NOT NULL,
    `gender` ENUM('male', 'female', 'not-preferred-to-say') NULL DEFAULT 'not-preferred-to-say',
    `country_id` INTEGER UNSIGNED NOT NULL,
    `city` VARCHAR(100) NULL,
    `religion` VARCHAR(50) NULL,
    `ethnicity` VARCHAR(50) NULL,
    `phone_number` VARCHAR(50) NULL,
    `linkedin` VARCHAR(100) NULL,
    `github` VARCHAR(100) NULL,
    `portfolio` VARCHAR(100) NULL,
    `soft_skills` VARCHAR(512) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `referral_company_name` VARCHAR(50) NULL,

    INDEX `country_id`(`country_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `applicant_allowed_job_roles` (
    `applicant_id` INTEGER UNSIGNED NOT NULL,
    `job_role_id` INTEGER UNSIGNED NOT NULL,
    `status` VARCHAR(50) NULL DEFAULT 'Pending',
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `job_role_id`(`job_role_id`),
    PRIMARY KEY (`applicant_id`, `job_role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `applicant_auth` (
    `applicant_id` INTEGER UNSIGNED NOT NULL,
    `is_email_verified` BOOLEAN NULL DEFAULT false,
    `email_token` VARCHAR(240) NULL,
    `email_token_exp` DATETIME(0) NULL,
    `reset_password_token` VARCHAR(240) NULL,
    `reset_password_token_exp` DATETIME(0) NULL,

    PRIMARY KEY (`applicant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `applicant_education` (
    `applicant_id` INTEGER UNSIGNED NOT NULL,
    `major` VARCHAR(100) NULL,
    `degree` VARCHAR(100) NULL,
    `graduation_year` INTEGER NULL,
    `university` VARCHAR(100) NULL,
    `certificate` VARCHAR(512) NULL,

    PRIMARY KEY (`applicant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `applicant_interest_job_roles` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `applicant_id` INTEGER UNSIGNED NULL,
    `role` VARCHAR(50) NOT NULL,

    INDEX `applicant_id`(`applicant_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `applicant_job_preferences` (
    `applicant_id` INTEGER UNSIGNED NOT NULL,
    `disruptions` VARCHAR(512) NULL,
    `remote_work_availability` BOOLEAN NULL,
    `relocation` BOOLEAN NULL,
    `notice_period_in_days` INTEGER NULL,
    `preferred_regions_countries` VARCHAR(512) NULL,

    PRIMARY KEY (`applicant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `applicant_prev_work_experience` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `applicant_id` INTEGER UNSIGNED NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NULL,
    `company_name` VARCHAR(50) NOT NULL,
    `job_title` VARCHAR(50) NOT NULL,
    `description` VARCHAR(512) NULL,

    INDEX `applicant_id`(`applicant_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `applicant_prev_work_experience_skills` (
    `prev_work_id` INTEGER UNSIGNED NOT NULL,
    `skill_id` INTEGER UNSIGNED NOT NULL,
    `proficiencyLevel` ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert') NOT NULL,

    INDEX `skill_id`(`skill_id`),
    PRIMARY KEY (`prev_work_id`, `skill_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `applicant_work_experience` (
    `applicant_id` INTEGER UNSIGNED NOT NULL,
    `years_of_experience` FLOAT NULL,
    `role` VARCHAR(50) NOT NULL,
    `resume` VARCHAR(512) NULL,
    `certificates` VARCHAR(512) NULL,

    PRIMARY KEY (`applicant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `applicants_languages` (
    `applicant_id` INTEGER UNSIGNED NOT NULL,
    `language_id` INTEGER UNSIGNED NOT NULL,
    `level` ENUM('A1', 'A2', 'B1', 'B2', 'Fluent', 'Native') NOT NULL,
    `certificate` VARCHAR(512) NULL,

    INDEX `language_id`(`language_id`),
    PRIMARY KEY (`applicant_id`, `language_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `country_lookup` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `region` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_descriptions_recommendation` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `job_role_id` INTEGER UNSIGNED NOT NULL,
    `description` VARCHAR(1024) NULL,
    `accepted` BOOLEAN NULL DEFAULT false,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `job_role_id`(`job_role_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_role_languages` (
    `job_role_id` INTEGER UNSIGNED NOT NULL,
    `language_id` INTEGER UNSIGNED NOT NULL,
    `level` ENUM('A1', 'A2', 'B1', 'B2', 'Fluent', 'Native') NOT NULL,

    INDEX `language_id`(`language_id`),
    PRIMARY KEY (`job_role_id`, `language_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_role_skills` (
    `job_role_id` INTEGER UNSIGNED NOT NULL,
    `skill_id` INTEGER UNSIGNED NOT NULL,
    `proficiencyLevel` ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert') NOT NULL,

    INDEX `skill_id`(`skill_id`),
    PRIMARY KEY (`job_role_id`, `skill_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_roles` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `organization_id` INTEGER UNSIGNED NOT NULL,
    `status` ENUM('active', 'closed', 'on_hold') NULL DEFAULT 'active',
    `job_title` VARCHAR(100) NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `max_required_years_of_exp` FLOAT NULL,
    `min_required_years_of_exp` FLOAT NOT NULL,
    `seniority` VARCHAR(50) NOT NULL,
    `description` VARCHAR(1024) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NULL,
    `visa_availability` BOOLEAN NOT NULL,
    `remote_work_availability` BOOLEAN NOT NULL,
    `relocation_preferences` BOOLEAN NOT NULL,
    `salary` INTEGER NULL,
    `is_urgent` BOOLEAN NULL,
    `max_period_notice` INTEGER NULL,
    `number_of_vacant` INTEGER NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `organization_id`(`organization_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `languages_lookup` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organization` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(512) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `is_virtual` BOOLEAN NULL,
    `logo` VARCHAR(512) NULL,
    `linkedin` VARCHAR(100) NOT NULL,
    `website` VARCHAR(100) NULL,
    `phone_number` VARCHAR(50) NULL,
    `industry` VARCHAR(50) NULL,
    `size_of_company` VARCHAR(50) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organization_auth` (
    `organization_id` INTEGER UNSIGNED NOT NULL,
    `is_email_verified` BOOLEAN NULL DEFAULT false,
    `email_token` VARCHAR(240) NULL,
    `email_token_exp` DATETIME(0) NULL,
    `reset_password_token` VARCHAR(240) NULL,
    `reset_password_token_exp` DATETIME(0) NULL,

    PRIMARY KEY (`organization_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organization_locations` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `organization_id` INTEGER UNSIGNED NOT NULL,
    `is_head_office` BOOLEAN NULL DEFAULT false,
    `country_id` INTEGER UNSIGNED NULL,
    `state` VARCHAR(50) NULL,
    `city` VARCHAR(50) NULL,
    `address` VARCHAR(100) NULL,
    `zip_code` VARCHAR(20) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `country_id`(`country_id`),
    INDEX `organization_id`(`organization_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tech_skills_lookup` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `applicant` ADD CONSTRAINT `applicant_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `country_lookup`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `applicant_allowed_job_roles` ADD CONSTRAINT `applicant_allowed_job_roles_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `applicant`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `applicant_allowed_job_roles` ADD CONSTRAINT `applicant_allowed_job_roles_ibfk_2` FOREIGN KEY (`job_role_id`) REFERENCES `job_roles`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `applicant_auth` ADD CONSTRAINT `applicant_auth_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `applicant`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `applicant_education` ADD CONSTRAINT `applicant_education_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `applicant`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `applicant_interest_job_roles` ADD CONSTRAINT `applicant_interest_job_roles_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `applicant`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `applicant_job_preferences` ADD CONSTRAINT `applicant_job_preferences_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `applicant`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `applicant_prev_work_experience` ADD CONSTRAINT `applicant_prev_work_experience_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `applicant`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `applicant_prev_work_experience_skills` ADD CONSTRAINT `applicant_prev_work_experience_skills_ibfk_1` FOREIGN KEY (`prev_work_id`) REFERENCES `applicant_prev_work_experience`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `applicant_prev_work_experience_skills` ADD CONSTRAINT `applicant_prev_work_experience_skills_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `tech_skills_lookup`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `applicant_work_experience` ADD CONSTRAINT `applicant_work_experience_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `applicant`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `applicants_languages` ADD CONSTRAINT `applicants_languages_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `applicant`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `applicants_languages` ADD CONSTRAINT `applicants_languages_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `languages_lookup`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `job_descriptions_recommendation` ADD CONSTRAINT `job_descriptions_recommendation_ibfk_1` FOREIGN KEY (`job_role_id`) REFERENCES `job_roles`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `job_role_languages` ADD CONSTRAINT `job_role_languages_ibfk_1` FOREIGN KEY (`job_role_id`) REFERENCES `job_roles`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `job_role_languages` ADD CONSTRAINT `job_role_languages_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `languages_lookup`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `job_role_skills` ADD CONSTRAINT `job_role_skills_ibfk_1` FOREIGN KEY (`job_role_id`) REFERENCES `job_roles`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `job_role_skills` ADD CONSTRAINT `job_role_skills_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `tech_skills_lookup`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `job_roles` ADD CONSTRAINT `job_roles_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `organization_auth` ADD CONSTRAINT `organization_auth_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `organization_locations` ADD CONSTRAINT `organization_locations_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `organization_locations` ADD CONSTRAINT `organization_locations_ibfk_2` FOREIGN KEY (`country_id`) REFERENCES `country_lookup`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;


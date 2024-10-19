DROP DATABASE IF EXISTS hy_business;

CREATE DATABASE hy_business;

USE hy_business;

DROP TABLE IF EXISTS country_lookup;

CREATE TABLE country_lookup (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100),
    `region` VARCHAR(50)
);

DROP TABLE IF EXISTS applicant;

CREATE TABLE applicant (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `email` VARCHAR(254) NOT NULL UNIQUE,
    `password` VARCHAR(512) NOT NULL,
    `first_name` VARCHAR(50) NOT NULL,
    `middle_name` VARCHAR(50),
    `last_name` VARCHAR(50) NOT NULL,
    `profile_picture` VARCHAR(512),
    `date_of_birth` DATE NOT NULL,
    `gender` ENUM(
        'male',
        'female',
        'not-preferred-to-say'
    ) DEFAULT 'not-preferred-to-say',
    `country_id` INT UNSIGNED NOT NULL,
    `city` VARCHAR(100),
    `religion` VARCHAR(50),
    `ethnicity` VARCHAR(50),
    `phone_number` VARCHAR(50),
    `linkedin` VARCHAR(100),
    `github` VARCHAR(100),
    `portfolio` VARCHAR(100),
    `soft_skills` VARCHAR(512),
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `referral_company_name` VARCHAR(50),
    FOREIGN KEY (`country_id`) REFERENCES country_lookup (`id`)
);

DROP TABLE IF EXISTS applicant_auth;

CREATE TABLE applicant_auth (
    `applicant_id` INT UNSIGNED PRIMARY KEY,
    `is_email_verified` TINYINT(1) DEFAULT 0,
    `email_token` VARCHAR(240) UNIQUE,
    `email_token_exp` DATETIME,
    `reset_password_token` VARCHAR(240) UNIQUE,
    `reset_password_token_exp` DATETIME,
    FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`id`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS applicant_education;

CREATE TABLE applicant_education (
    `applicant_id` INT UNSIGNED PRIMARY KEY,
    `major` VARCHAR(100),
    `degree` VARCHAR(100),
    `graduation_year` INT,
    `university` VARCHAR(100),
    `certificate` VARCHAR(512),
    FOREIGN KEY (`applicant_id`) REFERENCES applicant (`id`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS applicant_job_preferences;

CREATE TABLE applicant_job_preferences (
    `applicant_id` INT UNSIGNED PRIMARY KEY,
    `disruptions` VARCHAR(512),
    `remote_work_availability` TINYINT(1),
    `relocation` TINYINT(1),
    `notice_period_in_days` INT,
    `preferred_regions_countries` VARCHAR(512),
    FOREIGN KEY (`applicant_id`) REFERENCES applicant (`id`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS languages_lookup;

CREATE TABLE languages_lookup (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50)
);

DROP TABLE IF EXISTS applicants_languages;

CREATE TABLE applicants_languages (
    `applicant_id` INT UNSIGNED NOT NULL,
    `language_id` INT UNSIGNED NOT NULL,
    `level` ENUM(
        'A1',
        'A2',
        'B1',
        'B2',
        'Fluent',
        'Native'
    ) NOT NULL,
    `certificate` VARCHAR(512),
    FOREIGN KEY (`applicant_id`) REFERENCES applicant (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`language_id`) REFERENCES languages_lookup (`id`),
    PRIMARY KEY (`applicant_id`, `language_id`)
);

DROP TABLE IF EXISTS applicant_interest_job_roles;

CREATE TABLE applicant_interest_job_roles (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `applicant_id` INT UNSIGNED,
    `role` VARCHAR(50) NOT NULL,
    FOREIGN KEY (`applicant_id`) REFERENCES applicant (`id`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS applicant_work_experience;

CREATE TABLE applicant_work_experience (
    `applicant_id` INT UNSIGNED PRIMARY KEY,
    `years_of_experience` FLOAT,
    `role` VARCHAR(50) NOT NULL,
    `resume` VARCHAR(512),
    `certificates` VARCHAR(512),
    FOREIGN KEY (`applicant_id`) REFERENCES applicant (`id`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS tech_skills_lookup;

CREATE TABLE tech_skills_lookup (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100)
);

DROP TABLE IF EXISTS applicant_prev_work_experience;

CREATE TABLE applicant_prev_work_experience (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `applicant_id` INT UNSIGNED,
    `start_date` DATE NOT NULL,
    `end_date` DATE,
    `company_name` VARCHAR(50) NOT NULL,
    `job_title` VARCHAR(50) NOT NULL,
    `description` VARCHAR(512),
    FOREIGN KEY (`applicant_id`) REFERENCES applicant (`id`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS applicant_prev_work_experience_skills;

CREATE TABLE applicant_prev_work_experience_skills (
    `prev_work_id` INT UNSIGNED NOT NULL,
    `skill_id` INT UNSIGNED NOT NULL,
    `proficiency_level` ENUM(
        'Beginner',
        'Intermediate',
        'Advanced',
        'Expert'
    ) NOT NULL,
    FOREIGN KEY (`prev_work_id`) REFERENCES applicant_prev_work_experience (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`skill_id`) REFERENCES tech_skills_lookup (`id`) ON DELETE CASCADE,
    PRIMARY KEY (`prev_work_id`, `skill_id`)
);

DROP TABLE IF EXISTS organization;

CREATE TABLE `organization` (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `email` VARCHAR(254) NOT NULL UNIQUE,
    `password` VARCHAR(512) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `is_virtual` TINYINT(1),
    `logo` VARCHAR(512),
    `linkedin` VARCHAR(100) NOT NULL,
    `website` VARCHAR(100),
    `phone_number` VARCHAR(50),
    `industry` VARCHAR(50),
    `size_of_company` VARCHAR(50),
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS organization_auth;

CREATE TABLE organization_auth (
    `organization_id` INT UNSIGNED PRIMARY KEY,
    `is_email_verified` TINYINT(1) DEFAULT 0,
    `email_token` VARCHAR(240) UNIQUE,
    `email_token_exp` DATETIME,
    `reset_password_token` VARCHAR(240) UNIQUE,
    `reset_password_token_exp` DATETIME,
    FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS organization_locations;

CREATE TABLE organization_locations (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `organization_id` INT UNSIGNED NOT NULL,
    `is_head_office` TINYINT(1) DEFAULT 0,
    `country_id` INT UNSIGNED,
    `state` VARCHAR(50),
    `city` VARCHAR(50),
    `address` VARCHAR(100),
    `zip_code` VARCHAR(20),
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`country_id`) REFERENCES country_lookup (`id`)
);

DROP TABLE IF EXISTS job_roles;

CREATE TABLE job_roles (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `organization_id` INT UNSIGNED NOT NULL,
    `status` ENUM('active', 'closed', 'on_hold') DEFAULT 'active',
    `job_title` VARCHAR(100) NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `max_required_years_of_exp` FLOAT,
    `min_required_years_of_exp` FLOAT NOT NULL,
    `seniority` VARCHAR(50) NOT NULL,
    `description` VARCHAR(1024) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE,
    `visa_availability` TINYINT(1) NOT NULL,
    `remote_work_availability` TINYINT(1) NOT NULL,
    `relocation_preferences` TINYINT(1) NOT NULL,
    `salary` INT,
    `is_urgent` TINYINT(1),
    `max_period_notice` INT,
    `number_of_vacant` INT,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS job_role_languages;

CREATE TABLE job_role_languages (
    `job_role_id` INT UNSIGNED NOT NULL,
    `language_id` INT UNSIGNED NOT NULL,
    `level` ENUM(
        'A1',
        'A2',
        'B1',
        'B2',
        'Fluent',
        'Native'
    ) NOT NULL,
    FOREIGN KEY (`job_role_id`) REFERENCES job_roles (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`language_id`) REFERENCES languages_lookup (`id`),
    PRIMARY KEY (`job_role_id`, `language_id`)
);

CREATE TABLE job_role_skills (
    `job_role_id` INT UNSIGNED NOT NULL,
    `skill_id` INT UNSIGNED NOT NULL,
    `proficiency_level` ENUM(
        'Beginner',
        'Intermediate',
        'Advanced',
        'Expert'
    ) NOT NULL,
    FOREIGN KEY (`job_role_id`) REFERENCES job_roles (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`skill_id`) REFERENCES tech_skills_lookup (`id`),
    PRIMARY KEY (`job_role_id`, `skill_id`)
);

DROP TABLE IF EXISTS applicant_allowed_job_roles;

CREATE TABLE applicant_allowed_job_roles (
    `applicant_id` INT UNSIGNED NOT NULL,
    `job_role_id` INT UNSIGNED NOT NULL,
    `status` VARCHAR(50) DEFAULT('Pending'),
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`applicant_id`) REFERENCES applicant (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`job_role_id`) REFERENCES job_roles (`id`) ON DELETE CASCADE,
    PRIMARY KEY (`applicant_id`, `job_role_id`)
);

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(512) NOT NULL
);

DROP TABLE IF EXISTS job_descriptions_recommendation;

CREATE TABLE job_descriptions_recommendation (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `job_role_id` INT UNSIGNED NOT NULL,
    `description` VARCHAR(1024),
    `accepted` TINYINT(1) DEFAULT 0,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`job_role_id`) REFERENCES job_roles (`id`) ON DELETE CASCADE
);
CREATE TABLE `contractAutoSend` (
	`id` text PRIMARY KEY,
	`contractId` text NOT NULL UNIQUE,
	`smtpConfigId` text NOT NULL,
	`emailTemplateId` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT `fk_contractAutoSend_contractId_contract_id_fk` FOREIGN KEY (`contractId`) REFERENCES `contract`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_contractAutoSend_smtpConfigId_smtp_config_id_fk` FOREIGN KEY (`smtpConfigId`) REFERENCES `smtp_config`(`id`) ON DELETE RESTRICT,
	CONSTRAINT `fk_contractAutoSend_emailTemplateId_email_template_id_fk` FOREIGN KEY (`emailTemplateId`) REFERENCES `email_template`(`id`) ON DELETE RESTRICT
);

PRAGMA foreign_keys=OFF;
--> statement-breakpoint
CREATE TABLE `__new_contractAutoSend` (
	`id` text PRIMARY KEY NOT NULL,
	`contractId` text NOT NULL,
	`emailTemplateId` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	CONSTRAINT `fk_contractAutoSend_contractId_contract_id_fk` FOREIGN KEY (`contractId`) REFERENCES `contract`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_contractAutoSend_emailTemplateId_email_template_id_fk` FOREIGN KEY (`emailTemplateId`) REFERENCES `email_template`(`id`) ON DELETE RESTRICT
);
--> statement-breakpoint
INSERT INTO `__new_contractAutoSend` (`id`, `contractId`, `emailTemplateId`, `createdAt`, `updatedAt`)
SELECT `id`, `contractId`, `emailTemplateId`, `createdAt`, `updatedAt` FROM `contractAutoSend`;
--> statement-breakpoint
DROP TABLE `contractAutoSend`;
--> statement-breakpoint
ALTER TABLE `__new_contractAutoSend` RENAME TO `contractAutoSend`;
--> statement-breakpoint
DROP TABLE `smtp_config`;
--> statement-breakpoint
PRAGMA foreign_keys=ON;

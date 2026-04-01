CREATE TABLE `contractClientAddressSnapshot` (
	`id` text PRIMARY KEY,
	`street1` text NOT NULL,
	`street2` text,
	`number` text NOT NULL,
	`postalCode` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`country` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`contractClientSnapshotId` text NOT NULL,
	`originalContractClientAddressId` text,
	CONSTRAINT `fk_contractClientAddressSnapshot_contractClientSnapshotId_contractClientSnapshot_id_fk` FOREIGN KEY (`contractClientSnapshotId`) REFERENCES `contractClientSnapshot`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_contractClientAddressSnapshot_originalContractClientAddressId_contractClientAddress_id_fk` FOREIGN KEY (`originalContractClientAddressId`) REFERENCES `contractClientAddress`(`id`) ON DELETE SET NULL
);
--> statement-breakpoint
CREATE TABLE `contractClientSnapshot` (
	`id` text PRIMARY KEY,
	`companyName` text NOT NULL,
	`responsibleName` text NOT NULL,
	`responsibleEmail` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`contractSnapshotId` text NOT NULL,
	`originalContractClientId` text,
	CONSTRAINT `fk_contractClientSnapshot_contractSnapshotId_contractSnapshot_id_fk` FOREIGN KEY (`contractSnapshotId`) REFERENCES `contractSnapshot`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_contractClientSnapshot_originalContractClientId_contractClient_id_fk` FOREIGN KEY (`originalContractClientId`) REFERENCES `contractClient`(`id`) ON DELETE SET NULL
);
--> statement-breakpoint
CREATE TABLE `contractRoleSnapshot` (
	`id` text PRIMARY KEY,
	`description` text NOT NULL,
	`rate` integer NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`contractSnapshotId` text NOT NULL,
	`originalContractRoleId` text,
	CONSTRAINT `fk_contractRoleSnapshot_contractSnapshotId_contractSnapshot_id_fk` FOREIGN KEY (`contractSnapshotId`) REFERENCES `contractSnapshot`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_contractRoleSnapshot_originalContractRoleId_contractRole_id_fk` FOREIGN KEY (`originalContractRoleId`) REFERENCES `contractRole`(`id`) ON DELETE SET NULL
);
--> statement-breakpoint
CREATE TABLE `contractSnapshot` (
	`id` text PRIMARY KEY,
	`userId` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`invoiceId` text,
	`originalContractId` text,
	CONSTRAINT `fk_contractSnapshot_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_contractSnapshot_invoiceId_invoice_id_fk` FOREIGN KEY (`invoiceId`) REFERENCES `invoice`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_contractSnapshot_originalContractId_contract_id_fk` FOREIGN KEY (`originalContractId`) REFERENCES `contract`(`id`) ON DELETE SET NULL
);
--> statement-breakpoint
CREATE TABLE `invoiceConfigurationSnapshot` (
	`id` text PRIMARY KEY,
	`lastInvoiceNumber` integer NOT NULL,
	`prefix` text NOT NULL,
	`suffix` text,
	`withYear` integer NOT NULL,
	`withMonth` integer NOT NULL,
	`withDay` integer NOT NULL,
	`withCompanyName` integer NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`userId` text NOT NULL,
	`invoiceId` text,
	`originalInvoiceConfigurationId` text,
	CONSTRAINT `fk_invoiceConfigurationSnapshot_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_invoiceConfigurationSnapshot_invoiceId_invoice_id_fk` FOREIGN KEY (`invoiceId`) REFERENCES `invoice`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_invoiceConfigurationSnapshot_originalInvoiceConfigurationId_invoiceConfiguration_id_fk` FOREIGN KEY (`originalInvoiceConfigurationId`) REFERENCES `invoiceConfiguration`(`id`) ON DELETE SET NULL
);
--> statement-breakpoint
CREATE TABLE `invoice` (
	`id` text PRIMARY KEY,
	`userId` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT `fk_invoice_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_invoiceConfiguration` (
	`id` text PRIMARY KEY,
	`lastInvoiceNumber` integer NOT NULL,
	`prefix` text NOT NULL,
	`suffix` text,
	`withYear` integer NOT NULL,
	`withMonth` integer NOT NULL,
	`withDay` integer NOT NULL,
	`withCompanyName` integer NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`userId` text NOT NULL UNIQUE,
	CONSTRAINT `fk_invoiceConfiguration_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_invoiceConfiguration`(`id`, `lastInvoiceNumber`, `prefix`, `suffix`, `withYear`, `withMonth`, `withDay`, `withCompanyName`, `userId`, `createdAt`, `updatedAt`) SELECT `id`, `lastInvoiceNumber`, `prefix`, `suffix`, `withYear`, `withMonth`, `withDay`, `withCompanyName`, `userId`, `createdAt`, `updatedAt` FROM `invoiceConfiguration`;--> statement-breakpoint
DROP TABLE `invoiceConfiguration`;--> statement-breakpoint
ALTER TABLE `__new_invoiceConfiguration` RENAME TO `invoiceConfiguration`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_contractAutoSend` (
	`id` text PRIMARY KEY,
	`contractId` text NOT NULL,
	`smtpConfigId` text NOT NULL,
	`emailTemplateId` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT `fk_contractAutoSend_contractId_contract_id_fk` FOREIGN KEY (`contractId`) REFERENCES `contract`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_contractAutoSend_smtpConfigId_smtp_config_id_fk` FOREIGN KEY (`smtpConfigId`) REFERENCES `smtp_config`(`id`) ON DELETE RESTRICT,
	CONSTRAINT `fk_contractAutoSend_emailTemplateId_email_template_id_fk` FOREIGN KEY (`emailTemplateId`) REFERENCES `email_template`(`id`) ON DELETE RESTRICT
);
--> statement-breakpoint
INSERT INTO `__new_contractAutoSend`(`id`, `contractId`, `smtpConfigId`, `emailTemplateId`, `createdAt`, `updatedAt`) SELECT `id`, `contractId`, `smtpConfigId`, `emailTemplateId`, `createdAt`, `updatedAt` FROM `contractAutoSend`;--> statement-breakpoint
DROP TABLE `contractAutoSend`;--> statement-breakpoint
ALTER TABLE `__new_contractAutoSend` RENAME TO `contractAutoSend`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
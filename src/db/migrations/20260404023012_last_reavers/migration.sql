CREATE TABLE `account` (
	`id` text PRIMARY KEY,
	`accountId` text NOT NULL,
	`providerId` text NOT NULL,
	`accessToken` text,
	`refreshToken` text,
	`idToken` text,
	`accessTokenExpiresAt` integer,
	`refreshTokenExpiresAt` integer,
	`scope` text,
	`password` text,
	`userId` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT `fk_account_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `companyAddress` (
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
	`companyId` text NOT NULL,
	CONSTRAINT `fk_companyAddress_companyId_company_id_fk` FOREIGN KEY (`companyId`) REFERENCES `company`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `company` (
	`id` text PRIMARY KEY,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`userId` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT `fk_company_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `contractAutoSend` (
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
CREATE TABLE `contractClientAddress` (
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
	`contractClientId` text NOT NULL,
	CONSTRAINT `fk_contractClientAddress_contractClientId_contractClient_id_fk` FOREIGN KEY (`contractClientId`) REFERENCES `contractClient`(`id`) ON DELETE CASCADE
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
CREATE TABLE `contractClient` (
	`id` text PRIMARY KEY,
	`companyName` text NOT NULL,
	`responsibleName` text NOT NULL,
	`responsibleEmail` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`contractId` text NOT NULL,
	CONSTRAINT `fk_contractClient_contractId_contract_id_fk` FOREIGN KEY (`contractId`) REFERENCES `contract`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `contractInvoiceRecurrenceItem` (
	`id` text PRIMARY KEY,
	`dayOfMonth` integer NOT NULL,
	`percentage` integer NOT NULL,
	`contractInvoiceRecurrenceId` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT `fk_contractInvoiceRecurrenceItem_contractInvoiceRecurrenceId_contractInvoiceRecurrence_id_fk` FOREIGN KEY (`contractInvoiceRecurrenceId`) REFERENCES `contractInvoiceRecurrence`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `contractInvoiceRecurrence` (
	`id` text PRIMARY KEY,
	`contractId` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT `fk_contractInvoiceRecurrence_contractId_contract_id_fk` FOREIGN KEY (`contractId`) REFERENCES `contract`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `contractRole` (
	`id` text PRIMARY KEY,
	`description` text NOT NULL,
	`rate` integer NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`contractId` text NOT NULL,
	CONSTRAINT `fk_contractRole_contractId_contract_id_fk` FOREIGN KEY (`contractId`) REFERENCES `contract`(`id`) ON DELETE CASCADE
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
CREATE TABLE `contract` (
	`id` text PRIMARY KEY,
	`userId` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT `fk_contract_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `email_template` (
	`id` text PRIMARY KEY,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`subject` text NOT NULL,
	`body` text NOT NULL,
	`userId` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT `fk_email_template_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE
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
CREATE TABLE `invoiceConfiguration` (
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
CREATE TABLE `invoiceItems` (
	`id` text PRIMARY KEY,
	`description` text NOT NULL,
	`amount` integer NOT NULL,
	`invoiceId` text,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT `fk_invoiceItems_invoiceId_invoice_id_fk` FOREIGN KEY (`invoiceId`) REFERENCES `invoice`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `invoice` (
	`id` text PRIMARY KEY,
	`issueDate` integer NOT NULL,
	`fileName` text NOT NULL,
	`isDeleted` integer DEFAULT false NOT NULL,
	`userId` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT `fk_invoice_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY,
	`expiresAt` integer NOT NULL,
	`token` text NOT NULL UNIQUE,
	`ipAddress` text,
	`userAgent` text,
	`userId` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT `fk_session_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `smtp_config` (
	`id` text PRIMARY KEY,
	`name` text NOT NULL,
	`host` text NOT NULL,
	`port` integer NOT NULL,
	`security` text NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`fromName` text,
	`fromEmail` text NOT NULL,
	`userId` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT `fk_smtp_config_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY,
	`name` text NOT NULL,
	`email` text NOT NULL UNIQUE,
	`emailVerified` integer DEFAULT false NOT NULL,
	`image` text,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expiresAt` integer NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `account` (`userId`);--> statement-breakpoint
CREATE UNIQUE INDEX `account_providerId_accountId_uidx` ON `account` (`providerId`,`accountId`);--> statement-breakpoint
CREATE UNIQUE INDEX `company_userId_uidx` ON `company` (`userId`);--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `session` (`userId`);--> statement-breakpoint
CREATE INDEX `session_expiresAt_idx` ON `session` (`expiresAt`);--> statement-breakpoint
CREATE INDEX `session_userId_expiresAt_idx` ON `session` (`userId`,`expiresAt`);--> statement-breakpoint
CREATE UNIQUE INDEX `verification_identifier_value_uidx` ON `verification` (`identifier`,`value`);--> statement-breakpoint
CREATE INDEX `verification_expiresAt_idx` ON `verification` (`expiresAt`);
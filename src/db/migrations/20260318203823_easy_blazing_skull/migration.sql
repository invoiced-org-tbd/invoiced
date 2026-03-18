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
CREATE TABLE `contractAutoSendConfigurationItem` (
	`id` text PRIMARY KEY,
	`dayOfMonth` integer NOT NULL,
	`percentage` integer NOT NULL,
	`contractAutoSendConfigurationId` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT `fk_contractAutoSendConfigurationItem_contractAutoSendConfigurationId_contractAutoSendConfiguration_id_fk` FOREIGN KEY (`contractAutoSendConfigurationId`) REFERENCES `contractAutoSendConfiguration`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `contractAutoSendConfiguration` (
	`id` text PRIMARY KEY,
	`enabled` integer DEFAULT false NOT NULL,
	`contractId` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT `fk_contractAutoSendConfiguration_contractId_contract_id_fk` FOREIGN KEY (`contractId`) REFERENCES `contract`(`id`) ON DELETE CASCADE
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
CREATE TABLE `contractClient` (
	`id` text PRIMARY KEY,
	`companyName` text NOT NULL,
	`responsibleName` text NOT NULL,
	`responsibleEmail` text NOT NULL,
	`contractId` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT `fk_contractClient_contractId_contract_id_fk` FOREIGN KEY (`contractId`) REFERENCES `contract`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `contractRole` (
	`id` text PRIMARY KEY,
	`description` text NOT NULL,
	`rate` integer NOT NULL,
	`contractId` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT `fk_contractRole_contractId_contract_id_fk` FOREIGN KEY (`contractId`) REFERENCES `contract`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `contract` (
	`id` text PRIMARY KEY,
	`description` text NOT NULL,
	`userId` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT `fk_contract_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE
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
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

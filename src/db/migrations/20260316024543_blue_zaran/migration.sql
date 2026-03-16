CREATE TABLE `contractRole` (
	`id` text PRIMARY KEY,
	`description` text NOT NULL,
	`rate` integer NOT NULL,
	`email` text NOT NULL,
	`contractId` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT `fk_contractRole_contractId_contract_id_fk` FOREIGN KEY (`contractId`) REFERENCES `contract`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `contract` (
	`id` text PRIMARY KEY,
	`description` text NOT NULL,
	`companyId` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT `fk_contract_companyId_company_id_fk` FOREIGN KEY (`companyId`) REFERENCES `company`(`id`) ON DELETE CASCADE
);

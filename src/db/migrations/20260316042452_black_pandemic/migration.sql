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

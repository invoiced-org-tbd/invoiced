CREATE TABLE `address` (
	`id` text PRIMARY KEY,
	`addressableType` text NOT NULL,
	`addressableId` text NOT NULL,
	`street1` text NOT NULL,
	`street2` text,
	`number` text NOT NULL,
	`postalCode` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`country` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `address_addressableType_addressableId_uidx` ON `address` (`addressableType`,`addressableId`);
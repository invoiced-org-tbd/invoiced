ALTER TABLE `contract` ADD `userId` text NOT NULL REFERENCES user(id);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_contract` (
	`id` text PRIMARY KEY,
	`description` text NOT NULL,
	`userId` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT `fk_contract_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_contract`(`id`, `description`, `createdAt`, `updatedAt`) SELECT `id`, `description`, `createdAt`, `updatedAt` FROM `contract`;--> statement-breakpoint
DROP TABLE `contract`;--> statement-breakpoint
ALTER TABLE `__new_contract` RENAME TO `contract`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
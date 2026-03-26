CREATE TABLE `invoiceConfiguration` (
	`id` text PRIMARY KEY,
	`pattern` text NOT NULL,
	`lastInvoiceNumber` integer NOT NULL,
	`userId` text NOT NULL,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT `fk_invoiceConfiguration_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE
);

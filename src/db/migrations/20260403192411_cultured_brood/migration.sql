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
ALTER TABLE `invoice` ADD `issueDate` integer NOT NULL;--> statement-breakpoint
DROP TABLE `contractRoleSnapshot`;
ALTER TABLE `invoiceConfiguration` ADD `prefix` text NOT NULL;--> statement-breakpoint
ALTER TABLE `invoiceConfiguration` ADD `suffix` text;--> statement-breakpoint
ALTER TABLE `invoiceConfiguration` ADD `withYear` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `invoiceConfiguration` ADD `withMonth` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `invoiceConfiguration` ADD `withDay` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `invoiceConfiguration` ADD `withCompanyName` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `invoiceConfiguration` DROP COLUMN `pattern`;
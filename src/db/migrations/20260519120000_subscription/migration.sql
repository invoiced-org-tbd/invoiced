CREATE TABLE `subscription` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`plan` text NOT NULL,
	`status` text NOT NULL,
	`abacateSubscriptionId` text,
	`abacateCustomerId` text,
	`currentPeriodEnd` integer,
	`trialEndsAt` integer,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	CONSTRAINT `fk_subscription_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE UNIQUE INDEX `subscription_userId_uidx` ON `subscription` (`userId`);

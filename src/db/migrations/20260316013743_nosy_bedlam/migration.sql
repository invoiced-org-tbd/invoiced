DROP INDEX IF EXISTS `verification_identifier_idx`;--> statement-breakpoint
CREATE UNIQUE INDEX `account_providerId_accountId_uidx` ON `account` (`providerId`,`accountId`);--> statement-breakpoint
CREATE UNIQUE INDEX `company_userId_uidx` ON `company` (`userId`);--> statement-breakpoint
CREATE INDEX `session_expiresAt_idx` ON `session` (`expiresAt`);--> statement-breakpoint
CREATE INDEX `session_userId_expiresAt_idx` ON `session` (`userId`,`expiresAt`);--> statement-breakpoint
CREATE UNIQUE INDEX `verification_identifier_value_uidx` ON `verification` (`identifier`,`value`);--> statement-breakpoint
CREATE INDEX `verification_expiresAt_idx` ON `verification` (`expiresAt`);
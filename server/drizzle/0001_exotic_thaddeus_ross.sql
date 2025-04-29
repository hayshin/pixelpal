ALTER TABLE `user_arts` RENAME TO `userArts`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_userArts` (
	`userName` text NOT NULL,
	`artId` text NOT NULL,
	FOREIGN KEY (`userName`) REFERENCES `users`(`name`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`artId`) REFERENCES `arts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_userArts`("userName", "artId") SELECT "userName", "artId" FROM `userArts`;--> statement-breakpoint
DROP TABLE `userArts`;--> statement-breakpoint
ALTER TABLE `__new_userArts` RENAME TO `userArts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
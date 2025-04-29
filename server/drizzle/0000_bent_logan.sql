CREATE TABLE `arts` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`height` integer NOT NULL,
	`width` integer NOT NULL,
	`created` integer DEFAULT (unixepoch()) NOT NULL,
	`updated` integer DEFAULT (unixepoch()) NOT NULL,
	`owner` text NOT NULL,
	`creater` text NOT NULL,
	`board` text DEFAULT (json_array()) NOT NULL,
	FOREIGN KEY (`owner`) REFERENCES `users`(`name`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`creater`) REFERENCES `users`(`name`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`name` text PRIMARY KEY NOT NULL,
	`password` text,
	`created` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user_arts` (
	`userName` text NOT NULL,
	`artId` text NOT NULL,
	FOREIGN KEY (`userName`) REFERENCES `users`(`name`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`artId`) REFERENCES `arts`(`id`) ON UPDATE no action ON DELETE no action
);

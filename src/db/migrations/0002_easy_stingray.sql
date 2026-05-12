CREATE TABLE `listing` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`price` real,
	`is_free` integer DEFAULT false NOT NULL,
	`category` text NOT NULL,
	`status` text DEFAULT 'available' NOT NULL,
	`contact` text NOT NULL
);

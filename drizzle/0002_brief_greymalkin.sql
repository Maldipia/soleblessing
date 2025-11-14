CREATE TABLE `raffleEntries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`raffleId` int NOT NULL,
	`userId` int NOT NULL,
	`isWinner` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `raffleEntries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `raffles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`productId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`startDate` timestamp NOT NULL,
	`endDate` timestamp NOT NULL,
	`winnerCount` int NOT NULL DEFAULT 1,
	`status` enum('upcoming','active','ended','winners_selected') NOT NULL DEFAULT 'upcoming',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `raffles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `saleEvents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`discountPercentage` int,
	`startDate` timestamp NOT NULL,
	`endDate` timestamp NOT NULL,
	`status` enum('upcoming','active','ended') NOT NULL DEFAULT 'upcoming',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `saleEvents_id` PRIMARY KEY(`id`)
);

CREATE TABLE `candidate_profiles` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` serial AUTO_INCREMENT,
	`age` serial AUTO_INCREMENT,
	`gender` varchar(20),
	`phone` varchar(20),
	`linkedin_url` varchar(255),
	`profile_photo` text,
	`current_position` varchar(255),
	`current_company` varchar(255),
	`current_salary` decimal(10,2),
	`years_of_experience` serial AUTO_INCREMENT,
	`bio` text,
	`skills` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `candidate_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`full_name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`user_type` enum('CANDIDATE','COMPANY','ADMIN') NOT NULL DEFAULT 'CANDIDATE',
	`company_name` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `candidate_profiles` ADD CONSTRAINT `candidate_profiles_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
CREATE TABLE `activations` (
	`id` text PRIMARY KEY NOT NULL,
	`license_id` text NOT NULL,
	`device_id` text NOT NULL,
	`device_public_key` text NOT NULL,
	`device_label` text NOT NULL,
	`platform` text NOT NULL,
	`app_version` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`activated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`last_seen` integer DEFAULT (unixepoch()) NOT NULL,
	`last_nonce` text,
	FOREIGN KEY (`license_id`) REFERENCES `licenses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `activations_license_idx` ON `activations` (`license_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `activations_license_device_unique` ON `activations` (`license_id`,`device_id`);--> statement-breakpoint
CREATE TABLE `customers` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`display_name` text,
	`stripe_customer_id` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `customers_email_unique` ON `customers` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `customers_stripe_customer_unique` ON `customers` (`stripe_customer_id`);--> statement-breakpoint
CREATE TABLE `license_events` (
	`id` text PRIMARY KEY NOT NULL,
	`license_id` text NOT NULL,
	`event_type` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`license_id`) REFERENCES `licenses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `license_events_license_idx` ON `license_events` (`license_id`);--> statement-breakpoint
CREATE TABLE `licenses` (
	`id` text PRIMARY KEY NOT NULL,
	`key_hash` text NOT NULL,
	`customer_id` text NOT NULL,
	`purchase_id` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`purchase_id`) REFERENCES `purchases`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `licenses_key_hash_unique` ON `licenses` (`key_hash`);--> statement-breakpoint
CREATE UNIQUE INDEX `licenses_purchase_unique` ON `licenses` (`purchase_id`);--> statement-breakpoint
CREATE INDEX `licenses_customer_idx` ON `licenses` (`customer_id`);--> statement-breakpoint
CREATE TABLE `purchases` (
	`id` text PRIMARY KEY NOT NULL,
	`customer_id` text NOT NULL,
	`stripe_session_id` text NOT NULL,
	`product_id` text NOT NULL,
	`amount_total` integer NOT NULL,
	`currency` text DEFAULT 'eur' NOT NULL,
	`status` text DEFAULT 'paid' NOT NULL,
	`license_id` text,
	`encrypted_license_key` text,
	`license_key_iv` text,
	`purchased_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `purchases_session_product_unique` ON `purchases` (`stripe_session_id`,`product_id`);--> statement-breakpoint
CREATE INDEX `purchases_customer_idx` ON `purchases` (`customer_id`);
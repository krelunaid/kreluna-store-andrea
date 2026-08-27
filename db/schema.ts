import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const customers = sqliteTable(
  "customers",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    displayName: text("display_name"),
    stripeCustomerId: text("stripe_customer_id"),
    createdAt: integer("created_at").notNull().default(sql`(unixepoch())`),
    updatedAt: integer("updated_at").notNull().default(sql`(unixepoch())`),
  },
  (table) => [
    uniqueIndex("customers_email_unique").on(table.email),
    uniqueIndex("customers_stripe_customer_unique").on(table.stripeCustomerId),
  ],
);

export const purchases = sqliteTable(
  "purchases",
  {
    id: text("id").primaryKey(),
    customerId: text("customer_id").notNull().references(() => customers.id),
    stripeSessionId: text("stripe_session_id").notNull(),
    productId: text("product_id").notNull(),
    amountTotal: integer("amount_total").notNull(),
    currency: text("currency").notNull().default("eur"),
    status: text("status").notNull().default("paid"),
    licenseId: text("license_id"),
    encryptedLicenseKey: text("encrypted_license_key"),
    licenseKeyIv: text("license_key_iv"),
    purchasedAt: integer("purchased_at").notNull().default(sql`(unixepoch())`),
  },
  (table) => [
    uniqueIndex("purchases_session_product_unique").on(table.stripeSessionId, table.productId),
    index("purchases_customer_idx").on(table.customerId),
  ],
);

export const licenses = sqliteTable(
  "licenses",
  {
    id: text("id").primaryKey(),
    keyHash: text("key_hash").notNull(),
    customerId: text("customer_id").notNull().references(() => customers.id),
    purchaseId: text("purchase_id").notNull().references(() => purchases.id),
    status: text("status").notNull().default("active"),
    createdAt: integer("created_at").notNull().default(sql`(unixepoch())`),
  },
  (table) => [
    uniqueIndex("licenses_key_hash_unique").on(table.keyHash),
    uniqueIndex("licenses_purchase_unique").on(table.purchaseId),
    index("licenses_customer_idx").on(table.customerId),
  ],
);

export const activations = sqliteTable(
  "activations",
  {
    id: text("id").primaryKey(),
    licenseId: text("license_id").notNull().references(() => licenses.id),
    deviceId: text("device_id").notNull(),
    devicePublicKey: text("device_public_key").notNull(),
    deviceLabel: text("device_label").notNull(),
    platform: text("platform").notNull(),
    appVersion: text("app_version").notNull(),
    status: text("status").notNull().default("active"),
    activatedAt: integer("activated_at").notNull().default(sql`(unixepoch())`),
    lastSeen: integer("last_seen").notNull().default(sql`(unixepoch())`),
    lastNonce: text("last_nonce"),
  },
  (table) => [
    index("activations_license_idx").on(table.licenseId),
    uniqueIndex("activations_license_device_unique").on(table.licenseId, table.deviceId),
  ],
);

export const licenseEvents = sqliteTable(
  "license_events",
  {
    id: text("id").primaryKey(),
    licenseId: text("license_id").notNull().references(() => licenses.id),
    eventType: text("event_type").notNull(),
    createdAt: integer("created_at").notNull().default(sql`(unixepoch())`),
  },
  (table) => [index("license_events_license_idx").on(table.licenseId)],
);

import type { ChatGPTUser } from "../../chatgpt-auth";
import { base64UrlDecode, base64UrlEncode, requireDb, requireSecret } from "./runtime";
import { createStripeCustomer, listCompletedCheckoutSessions, type StripeCheckoutSession } from "./stripe";

type CustomerRow = {
  id: string;
  email: string;
  display_name: string | null;
  stripe_customer_id: string | null;
};

export type PurchaseRow = {
  id: string;
  product_id: string;
  amount_total: number;
  currency: string;
  purchased_at: number;
  license_id: string | null;
  encrypted_license_key: string | null;
  license_key_iv: string | null;
};

export async function ensureCustomer(user: ChatGPTUser): Promise<CustomerRow> {
  const db = requireDb();
  await db
    .prepare(
      `INSERT INTO customers (id, email, display_name, created_at, updated_at)
       VALUES (?1, ?2, ?3, unixepoch(), unixepoch())
       ON CONFLICT(id) DO UPDATE SET email = excluded.email, display_name = excluded.display_name, updated_at = unixepoch()`,
    )
    .bind(user.userId, user.email.trim().toLowerCase(), user.displayName)
    .run();

  let customer = await db.prepare("SELECT * FROM customers WHERE id = ?1").bind(user.userId).first<CustomerRow>();
  if (!customer) throw new Error("Account Kreluna non disponibile.");

  if (!customer.stripe_customer_id) {
    const stripeCustomer = await createStripeCustomer({
      userId: user.userId,
      email: user.email,
      name: user.displayName,
    });
    await db
      .prepare("UPDATE customers SET stripe_customer_id = ?1, updated_at = unixepoch() WHERE id = ?2")
      .bind(stripeCustomer.id, user.userId)
      .run();
    customer = { ...customer, stripe_customer_id: stripeCustomer.id };
  }
  return customer;
}

function generateLicenseKey(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const random = crypto.getRandomValues(new Uint8Array(16));
  const body = Array.from(random, (value) => alphabet[value % alphabet.length]).join("");
  return `RIX-${body.slice(0, 4)}-${body.slice(4, 8)}-${body.slice(8, 12)}-${body.slice(12, 16)}`;
}

async function hashLicense(key: string): Promise<string> {
  const pepper = requireSecret("RISONIX_LICENSE_PEPPER");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${pepper}:${key}`));
  return base64UrlEncode(digest);
}

async function encryptLicense(key: string): Promise<{ ciphertext: string; iv: string }> {
  const encryptionKey = await crypto.subtle.importKey(
    "raw",
    base64UrlDecode(requireSecret("LICENSE_ENCRYPTION_KEY_B64")),
    { name: "AES-GCM" },
    false,
    ["encrypt"],
  );
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, encryptionKey, new TextEncoder().encode(key));
  return { ciphertext: base64UrlEncode(encrypted), iv: base64UrlEncode(iv) };
}

export async function decryptLicense(purchase: PurchaseRow): Promise<string | null> {
  if (!purchase.encrypted_license_key || !purchase.license_key_iv) return null;
  const encryptionKey = await crypto.subtle.importKey(
    "raw",
    base64UrlDecode(requireSecret("LICENSE_ENCRYPTION_KEY_B64")),
    { name: "AES-GCM" },
    false,
    ["decrypt"],
  );
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: base64UrlDecode(purchase.license_key_iv) },
    encryptionKey,
    base64UrlDecode(purchase.encrypted_license_key),
  );
  return new TextDecoder().decode(decrypted);
}

export async function recordPaidSession(user: ChatGPTUser, session: StripeCheckoutSession): Promise<void> {
  if (session.payment_status !== "paid" || session.status !== "complete") return;
  const productIds = (session.metadata?.product_ids ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  if (!productIds.includes("risonix")) return;

  const customer = await ensureCustomer(user);
  if (session.customer !== customer.stripe_customer_id || session.client_reference_id !== user.userId) {
    throw new Error("Questo pagamento non appartiene all’account connesso.");
  }

  const db = requireDb();
  const existing = await db
    .prepare("SELECT id FROM purchases WHERE stripe_session_id = ?1 AND product_id = 'risonix'")
    .bind(session.id)
    .first<{ id: string }>();
  if (existing) return;

  const purchaseId = crypto.randomUUID();
  const licenseId = crypto.randomUUID();
  const licenseKey = generateLicenseKey();
  const keyHash = await hashLicense(licenseKey);
  const encrypted = await encryptLicense(licenseKey);
  await db.batch([
    db
      .prepare(
        `INSERT OR IGNORE INTO purchases
         (id, customer_id, stripe_session_id, product_id, amount_total, currency, status, license_id, encrypted_license_key, license_key_iv, purchased_at)
         VALUES (?1, ?2, ?3, 'risonix', ?4, ?5, 'paid', ?6, ?7, ?8, unixepoch())`,
      )
      .bind(
        purchaseId,
        user.userId,
        session.id,
        session.amount_total ?? 4900,
        session.currency ?? "eur",
        licenseId,
        encrypted.ciphertext,
        encrypted.iv,
      ),
    db
      .prepare(
        `INSERT OR IGNORE INTO licenses (id, key_hash, customer_id, purchase_id, status, created_at)
         VALUES (?1, ?2, ?3, ?4, 'active', unixepoch())`,
      )
      .bind(licenseId, keyHash, user.userId, purchaseId),
    db
      .prepare(
        `INSERT OR IGNORE INTO license_events (id, license_id, event_type, created_at)
         VALUES (?1, ?2, 'license_created_after_payment', unixepoch())`,
      )
      .bind(crypto.randomUUID(), licenseId),
  ]);
}

export async function reconcilePurchases(user: ChatGPTUser): Promise<CustomerRow> {
  const customer = await ensureCustomer(user);
  if (!customer.stripe_customer_id) return customer;
  const sessions = await listCompletedCheckoutSessions(customer.stripe_customer_id);
  for (const session of sessions.data) await recordPaidSession(user, session);
  return customer;
}

export async function listPurchases(userId: string): Promise<PurchaseRow[]> {
  const result = await requireDb()
    .prepare(
      `SELECT id, product_id, amount_total, currency, purchased_at, license_id, encrypted_license_key, license_key_iv
       FROM purchases WHERE customer_id = ?1 AND status = 'paid' ORDER BY purchased_at DESC`,
    )
    .bind(userId)
    .all<PurchaseRow>();
  return result.results;
}

export async function hasPaidProduct(userId: string, productId: string): Promise<boolean> {
  const row = await requireDb()
    .prepare("SELECT 1 AS owned FROM purchases WHERE customer_id = ?1 AND product_id = ?2 AND status = 'paid' LIMIT 1")
    .bind(userId, productId)
    .first<{ owned: number }>();
  return Boolean(row?.owned);
}

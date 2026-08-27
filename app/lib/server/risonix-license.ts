import { base64UrlDecode, base64UrlEncode, jsonError, requireDb, requireSecret } from "./runtime";

type ActivationRequest = {
  license_key?: string;
  device_id?: string;
  device_public_key?: string;
  device_label?: string;
  platform?: string;
  app_version?: string;
};

type HeartbeatRequest = {
  activation_id?: string;
  nonce?: string;
  timestamp?: number;
  signature?: string;
  platform?: string;
  app_version?: string;
};

type ActivationRow = {
  id: string;
  license_id: string;
  device_id: string;
  device_public_key: string;
  device_label: string;
  last_nonce: string | null;
};

async function licenseHash(key: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${requireSecret("RISONIX_LICENSE_PEPPER")}:${key}`),
  );
  return base64UrlEncode(digest);
}

async function signingKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "pkcs8",
    base64UrlDecode(requireSecret("RISONIX_SIGNING_PKCS8_B64")),
    { name: "Ed25519" },
    false,
    ["sign"],
  );
}

async function issueLease(activation: ActivationRow) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresAt = issuedAt + 180;
  const payload = {
    version: 1,
    license_id: activation.license_id,
    activation_id: activation.id,
    device_id: activation.device_id,
    issued_at: issuedAt,
    expires_at: expiresAt,
    online_required: true,
  };
  const lease = base64UrlEncode(new TextEncoder().encode(JSON.stringify(payload)));
  const signature = await crypto.subtle.sign("Ed25519", await signingKey(), new TextEncoder().encode(lease));
  return {
    activation_id: activation.id,
    lease,
    lease_signature: base64UrlEncode(signature),
    signing_public_key: null,
    expires_at: new Date(expiresAt * 1000).toISOString(),
    device_label: activation.device_label,
  };
}

function validateActivation(body: ActivationRequest): string | null {
  const key = body.license_key?.trim().toUpperCase() ?? "";
  if (!key.startsWith("RIX-") || key.length < 19) return "Formato licenza non valido.";
  if (!body.device_id || body.device_id.length < 20 || body.device_id.length > 80) {
    return "Identificatore dispositivo non valido.";
  }
  if (!body.device_public_key) return "Chiave dispositivo non valida.";
  try {
    if (base64UrlDecode(body.device_public_key).length !== 32) return "Chiave dispositivo non valida.";
  } catch {
    return "Chiave dispositivo non valida.";
  }
  if ((body.device_label?.length ?? 0) > 120 || (body.platform?.length ?? 0) > 40 || (body.app_version?.length ?? 0) > 40) {
    return "Dati dispositivo troppo lunghi.";
  }
  return null;
}

export async function activateLicense(request: Request): Promise<Response> {
  const body = (await request.json().catch(() => ({}))) as ActivationRequest;
  const validationError = validateActivation(body);
  if (validationError) return jsonError(validationError);
  const licenseKey = body.license_key!.trim().toUpperCase();
  const keyHash = await licenseHash(licenseKey);
  const db = requireDb();
  const license = await db
    .prepare("SELECT id, status FROM licenses WHERE key_hash = ?1")
    .bind(keyHash)
    .first<{ id: string; status: string }>();
  if (!license) return jsonError("Codice licenza non valido.", 403);
  if (license.status !== "active") return jsonError("Questa licenza è disattivata.", 403);

  let activation = await db
    .prepare(
      `SELECT id, license_id, device_id, device_public_key, device_label, last_nonce
       FROM activations WHERE license_id = ?1 AND status = 'active' LIMIT 1`,
    )
    .bind(license.id)
    .first<ActivationRow>();
  if (activation && (activation.device_id !== body.device_id || activation.device_public_key !== body.device_public_key)) {
    return jsonError(
      "Licenza già associata a un altro dispositivo. Disattivalo dall’area Kreluna prima del trasferimento.",
      409,
    );
  }
  if (activation) {
    await db
      .prepare("UPDATE activations SET last_seen = unixepoch(), platform = ?1, app_version = ?2 WHERE id = ?3")
      .bind(body.platform ?? "unknown", body.app_version ?? "unknown", activation.id)
      .run();
  } else {
    const activationId = crypto.randomUUID();
    await db.batch([
      db
        .prepare(
          `INSERT INTO activations
           (id, license_id, device_id, device_public_key, device_label, platform, app_version, status, activated_at, last_seen)
           VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, 'active', unixepoch(), unixepoch())`,
        )
        .bind(
          activationId,
          license.id,
          body.device_id,
          body.device_public_key,
          body.device_label ?? "Dispositivo Risonix",
          body.platform ?? "unknown",
          body.app_version ?? "unknown",
        ),
      db
        .prepare("INSERT INTO license_events (id, license_id, event_type, created_at) VALUES (?1, ?2, 'device_activated', unixepoch())")
        .bind(crypto.randomUUID(), license.id),
    ]);
    activation = {
      id: activationId,
      license_id: license.id,
      device_id: body.device_id!,
      device_public_key: body.device_public_key!,
      device_label: body.device_label ?? "Dispositivo Risonix",
      last_nonce: null,
    };
  }
  return Response.json(await issueLease(activation));
}

export async function heartbeatLicense(request: Request): Promise<Response> {
  const body = (await request.json().catch(() => ({}))) as HeartbeatRequest;
  const now = Math.floor(Date.now() / 1000);
  if (!body.activation_id || !body.nonce || !body.timestamp || !body.signature) {
    return jsonError("Richiesta di verifica incompleta.");
  }
  if (Math.abs(now - body.timestamp) > 120) {
    return jsonError("Richiesta scaduta. Controlla data e ora del dispositivo.", 403);
  }
  if (body.nonce.length < 20 || body.nonce.length > 80) return jsonError("Nonce non valido.");

  const db = requireDb();
  const activation = await db
    .prepare(
      `SELECT a.id, a.license_id, a.device_id, a.device_public_key, a.device_label, a.last_nonce
       FROM activations a JOIN licenses l ON l.id = a.license_id
       WHERE a.id = ?1 AND a.status = 'active' AND l.status = 'active'`,
    )
    .bind(body.activation_id)
    .first<ActivationRow>();
  if (!activation) return jsonError("Attivazione non valida o disabilitata.", 403);
  if (activation.last_nonce === body.nonce) return jsonError("Richiesta già utilizzata.", 403);

  try {
    const publicKey = await crypto.subtle.importKey(
      "raw",
      base64UrlDecode(activation.device_public_key),
      { name: "Ed25519" },
      false,
      ["verify"],
    );
    const message = new TextEncoder().encode(`${body.activation_id}:${body.nonce}:${body.timestamp}`);
    const valid = await crypto.subtle.verify("Ed25519", publicKey, base64UrlDecode(body.signature), message);
    if (!valid) return jsonError("Verifica del dispositivo non riuscita.", 403);
  } catch {
    return jsonError("Firma dispositivo non valida.", 403);
  }

  await db
    .prepare("UPDATE activations SET last_seen = unixepoch(), last_nonce = ?1, platform = ?2, app_version = ?3 WHERE id = ?4")
    .bind(body.nonce, body.platform ?? "unknown", body.app_version ?? "unknown", activation.id)
    .run();
  return Response.json(await issueLease(activation));
}

export function licenseHealth(): Response {
  return Response.json({
    service: "risonix-license-server",
    status: "ok",
    public_key: requireSecret("RISONIX_SIGNING_PUBLIC_KEY_B64"),
  });
}

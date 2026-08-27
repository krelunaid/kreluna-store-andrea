import { env } from "cloudflare:workers";

export function requireDb(): D1Database {
  if (!env.DB) throw new Error("Database Kreluna non disponibile.");
  return env.DB;
}

export function requireFiles(): R2Bucket {
  if (!env.FILES) throw new Error("Archivio download Kreluna non disponibile.");
  return env.FILES;
}

export function requireSecret(name: keyof typeof env): string {
  const value = env[name];
  if (typeof value !== "string" || value.length < 16) {
    throw new Error(`Configurazione ${String(name)} non disponibile.`);
  }
  return value;
}

export function base64UrlEncode(value: ArrayBuffer | Uint8Array): string {
  const bytes = value instanceof Uint8Array ? value : new Uint8Array(value);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function base64UrlDecode(value: string): Uint8Array {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

export function constantTimeEqual(left: string, right: string): boolean {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

export function jsonError(message: string, status = 400): Response {
  return Response.json({ error: message }, { status });
}

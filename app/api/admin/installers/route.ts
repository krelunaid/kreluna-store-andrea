import { installerCatalog, isInstallerPlatform } from "../../../lib/server/installers";
import { constantTimeEqual, jsonError, requireFiles, requireSecret } from "../../../lib/server/runtime";

export const dynamic = "force-dynamic";

function authorized(request: Request): boolean {
  const provided = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  return constantTimeEqual(provided, requireSecret("INSTALLER_UPLOAD_TOKEN"));
}

export async function PUT(request: Request) {
  if (!authorized(request)) return jsonError("Autorizzazione non valida.", 403);
  const platform = new URL(request.url).searchParams.get("platform");
  if (!isInstallerPlatform(platform)) return jsonError("Piattaforma non valida.");
  if (!request.body) return jsonError("File installer mancante.");
  const installer = installerCatalog[platform];
  await requireFiles().put(installer.key, request.body, {
    httpMetadata: {
      contentType: installer.contentType,
      contentDisposition: `attachment; filename="${installer.filename}"`,
    },
    customMetadata: {
      product: "risonix",
      version: "1.0.0",
      platform,
      sha256: installer.sha256,
      signed: String(installer.signed),
    },
  });
  const stored = await requireFiles().head(installer.key);
  return Response.json({ ok: true, platform, size: stored?.size ?? null, etag: stored?.httpEtag ?? null });
}

export async function GET(request: Request) {
  if (!authorized(request)) return jsonError("Autorizzazione non valida.", 403);
  const status = await Promise.all(
    Object.entries(installerCatalog).map(async ([platform, installer]) => {
      const object = await requireFiles().head(installer.key);
      return { platform, available: Boolean(object), size: object?.size ?? null, etag: object?.httpEtag ?? null };
    }),
  );
  return Response.json({ installers: status });
}

import { getChatGPTUser } from "../../../chatgpt-auth";
import { installerCatalog, isInstallerPlatform } from "../../../lib/server/installers";
import { hasPaidProduct, reconcilePurchases } from "../../../lib/server/store";
import { jsonError, requireFiles } from "../../../lib/server/runtime";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return jsonError("Accedi al tuo account Kreluna per scaricare Risonix.", 401);
  const platform = new URL(request.url).searchParams.get("platform");
  if (!isInstallerPlatform(platform)) return jsonError("Piattaforma non valida.");

  try {
    await reconcilePurchases(user);
    if (!(await hasPaidProduct(user.userId, "risonix"))) {
      return jsonError("Risonix non risulta acquistato da questo account.", 403);
    }
    const installer = installerCatalog[platform];
    const object = await requireFiles().get(installer.key);
    if (!object?.body) return jsonError("Installer temporaneamente non disponibile.", 404);
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("Content-Type", installer.contentType);
    headers.set("Content-Disposition", `attachment; filename="${installer.filename}"`);
    headers.set("Cache-Control", "private, no-store");
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("ETag", object.httpEtag);
    return new Response(object.body, { headers });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Download non riuscito.", 500);
  }
}

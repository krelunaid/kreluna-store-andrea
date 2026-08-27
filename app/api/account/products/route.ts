import { chatGPTSignInPath, getChatGPTUser } from "../../../chatgpt-auth";
import { installerCatalog } from "../../../lib/server/installers";
import { decryptLicense, listPurchases, reconcilePurchases } from "../../../lib/server/store";
import { jsonError, requireFiles } from "../../../lib/server/runtime";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) {
    return Response.json(
      { error: "Accedi per vedere i tuoi prodotti.", signInUrl: chatGPTSignInPath("/?account=1") },
      { status: 401 },
    );
  }

  try {
    await reconcilePurchases(user);
    const [purchases, macObject, windowsObject] = await Promise.all([
      listPurchases(user.userId),
      requireFiles().head(installerCatalog.macos.key),
      requireFiles().head(installerCatalog.windows.key),
    ]);
    const products = await Promise.all(
      purchases.map(async (purchase) => ({
        id: purchase.product_id,
        name: purchase.product_id === "risonix" ? "Risonix" : purchase.product_id,
        purchasedAt: new Date(purchase.purchased_at * 1000).toISOString(),
        amount: purchase.amount_total,
        currency: purchase.currency,
        licenseKey: await decryptLicense(purchase),
        downloads: {
          macos: macObject
            ? { available: true, url: "/api/download/risonix?platform=macos", label: installerCatalog.macos.label }
            : { available: false, url: null, label: installerCatalog.macos.label },
          windows: windowsObject
            ? { available: true, url: "/api/download/risonix?platform=windows", label: installerCatalog.windows.label }
            : { available: false, url: null, label: installerCatalog.windows.label },
        },
      })),
    );
    return Response.json({ authenticated: true, user: { displayName: user.displayName, email: user.email }, products });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Impossibile caricare i prodotti.", 500);
  }
}

import { chatGPTSignInPath, getChatGPTUser } from "../../../chatgpt-auth";
import { jsonError } from "../../../lib/server/runtime";
import { getCheckoutSession } from "../../../lib/server/stripe";
import { recordPaidSession } from "../../../lib/server/store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) {
    return Response.json(
      { error: "Accedi per confermare l’acquisto.", signInUrl: chatGPTSignInPath("/?account=1") },
      { status: 401 },
    );
  }
  const body = (await request.json().catch(() => ({}))) as { sessionId?: string };
  if (!body.sessionId?.startsWith("cs_")) return jsonError("Riferimento pagamento non valido.");
  try {
    const session = await getCheckoutSession(body.sessionId);
    if (session.payment_status !== "paid" || session.status !== "complete") {
      return jsonError("Il pagamento non risulta ancora completato.", 409);
    }
    await recordPaidSession(user, session);
    return Response.json({ ok: true });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Conferma acquisto non riuscita.", 500);
  }
}

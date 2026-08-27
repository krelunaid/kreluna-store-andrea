import { requireSecret } from "./runtime";

type StripeError = { error?: { message?: string; code?: string } };

export async function stripeRequest<T>(
  path: string,
  options: { method?: "GET" | "POST"; form?: URLSearchParams } = {},
): Promise<T> {
  const secret = requireSecret("STRIPE_SECRET_KEY");
  const method = options.method ?? (options.form ? "POST" : "GET");
  const response = await fetch(`https://api.stripe.com/v1${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${secret}`,
      ...(options.form ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
    },
    body: options.form?.toString(),
  });
  const payload = (await response.json().catch(() => ({}))) as T & StripeError;
  if (!response.ok) {
    throw new Error(payload.error?.message ?? "Stripe non ha completato la richiesta.");
  }
  return payload;
}

export type StripeCustomer = { id: string; email?: string | null };

export type StripeCheckoutSession = {
  id: string;
  customer: string | null;
  client_reference_id: string | null;
  payment_status: "paid" | "unpaid" | "no_payment_required";
  status: "open" | "complete" | "expired";
  amount_total: number | null;
  currency: string | null;
  metadata?: Record<string, string>;
};

export async function createStripeCustomer(input: {
  userId: string;
  email: string;
  name: string;
}): Promise<StripeCustomer> {
  const form = new URLSearchParams();
  form.set("email", input.email);
  form.set("name", input.name);
  form.set("metadata[kreluna_user_id]", input.userId);
  return stripeRequest<StripeCustomer>("/customers", { method: "POST", form });
}

export async function listCompletedCheckoutSessions(customerId: string) {
  const query = new URLSearchParams({ customer: customerId, status: "complete", limit: "20" });
  return stripeRequest<{ data: StripeCheckoutSession[] }>(`/checkout/sessions?${query}`);
}

export async function getCheckoutSession(sessionId: string) {
  return stripeRequest<StripeCheckoutSession>(`/checkout/sessions/${encodeURIComponent(sessionId)}`);
}

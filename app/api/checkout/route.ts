import { env } from "cloudflare:workers";
import { checkoutCatalogMap } from "../../lib/checkout-catalog";

type CheckoutItemInput = {
  id: string;
  quantity?: number;
};

type CheckoutInput = {
  items?: CheckoutItemInput[];
  demo?: boolean | "true" | "false" | 0 | 1 | string;
};

type CheckoutEnv = {
  STRIPE_SECRET_KEY?: string;
  ALLOW_DEMO_CHECKOUT?: string;
  NODE_ENV?: string;
};

function toBoolean(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value !== "string") return false;
  const normalized = value.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes" || normalized === "on";
}

function encodeLineItems(form: URLSearchParams, items: CheckoutItemInput[]) {
  items.forEach((item, index) => {
    const catalogItem = checkoutCatalogMap[item.id];
    if (!catalogItem) return;

    const quantity = Number(item.quantity) > 0 ? Math.max(1, Number(item.quantity)) : 1;
    const base = `line_items[${index}]`;

    form.append(`${base}[price_data][currency]`, catalogItem.currency);
    form.append(`${base}[price_data][tax_behavior]`, "inclusive");
    form.append(
      `${base}[price_data][product_data][name]`,
      catalogItem.name,
    );
    form.append(
      `${base}[price_data][product_data][tax_code]`,
      catalogItem.taxCode,
    );
    if (catalogItem.description) {
      form.append(
        `${base}[price_data][product_data][description]`,
        catalogItem.description,
      );
    }
    form.append(`${base}[price_data][unit_amount]`, String(catalogItem.priceCents));
    form.append(`${base}[quantity]`, String(quantity));
  });
}

function getRedirectUrl(request: Request, path: string) {
  const requestUrl = new URL(request.url);
  const base = `${requestUrl.protocol}//${requestUrl.host}`;
  return new URL(path, base).toString();
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as CheckoutInput;
  const items = Array.isArray(body.items) ? body.items : [];
  const requestUrl = new URL(request.url);
  const query = requestUrl.searchParams;

  if (!items.length) {
    return Response.json({ error: "Il carrello è vuoto." }, { status: 400 });
  }

  const validItems = items.filter((item) => checkoutCatalogMap[item.id]);
  if (!validItems.length) {
    return Response.json(
      { error: "Prodotto non disponibile per questo pagamento." },
      { status: 400 },
    );
  }

  const missing = items
    .filter((item) => !checkoutCatalogMap[item.id])
    .map((item) => item.id);
  if (missing.length > 0) {
    return Response.json(
      { error: `Articoli non configurati: ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  const runtimeEnv = (env as CheckoutEnv) ?? {};
  const requestedDemo = toBoolean(body.demo) || query.get("demo") === "1";
  const demoByDefault =
    toBoolean(runtimeEnv.ALLOW_DEMO_CHECKOUT) ||
    (!runtimeEnv.STRIPE_SECRET_KEY && runtimeEnv.NODE_ENV !== "production");

  const secretKey = runtimeEnv.STRIPE_SECRET_KEY;

  if (!secretKey) {
    if (requestedDemo || demoByDefault) {
      const demoTx = `demo-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`;
      const successUrl = getRedirectUrl(
        request,
        `/?checkout=success&demo=1&tx=${encodeURIComponent(demoTx)}`,
      );
      return Response.json({ checkoutUrl: successUrl, demo: true });
    }

    return Response.json(
      {
        error:
          "Pagamento non configurato. Aggiungi STRIPE_SECRET_KEY in ambiente Cloudflare per abilitare il checkout.",
      },
      { status: 501 },
    );
  }

  const form = new URLSearchParams();
  form.append("mode", "payment");
  form.append("success_url", getRedirectUrl(request, "/?checkout=success"));
  form.append("cancel_url", getRedirectUrl(request, "/?checkout=cancel"));
  encodeLineItems(form, validItems);

  const checkoutRequest = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });

  const responseText = await checkoutRequest.text();
  const payload = responseText
    ? (() => {
        try {
          return JSON.parse(responseText);
        } catch {
          return {};
        }
      })()
    : {};

  if (!checkoutRequest.ok) {
    return Response.json(
      {
        error: payload?.error?.message ?? "Errore nella creazione della sessione di pagamento.",
        stripeCode: payload?.error?.code,
      },
      { status: 502 },
    );
  }

  if (!payload.url) {
    return Response.json(
      { error: "La risposta di Stripe non contiene un URL di checkout." },
      { status: 500 },
    );
  }

  return Response.json({ checkoutUrl: payload.url });
}

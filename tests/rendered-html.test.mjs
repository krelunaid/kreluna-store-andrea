import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the Kreluna Store experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Kreluna Store/);
  assert.match(html, /Trova il software/);
  assert.match(html, /Categorie principali/);
  assert.match(html, /Per te/);
  assert.match(html, /Per la tua azienda/);
  assert.match(html, /Risonix/);
  assert.match(html, /Musica &amp; audio/);
  assert.match(html, /49,00/);
  assert.match(html, /Kreluna\+/);
  assert.doesNotMatch(html, /InvoiceFlow|ShopPro|CRM Plus|SocialPilot AI|StockPilot|TeamDesk HR|BookingFlow|Kreluna AI Assistant/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Building your site/i);
});

test("keeps starter preview infrastructure removed", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Kreluna Store/);
  assert.match(page, /Find the software/);
  assert.match(page, /language-switch/);
  assert.match(layout, /Kreluna Store — Tutto il software/);
  assert.match(layout, /<html lang="it">/);
  assert.match(packageJson, /"name": "kreluna-store"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /codex-preview|SkeletonPreview/);
  await assert.rejects(access(new URL("../app/_sites-preview", templateRoot)));
});

test("delegates Risonix purchases to the protected Kreluna checkout", async () => {
  const [route, catalog] = await Promise.all([
    readFile(new URL("../app/api/checkout/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/lib/checkout-catalog.ts", import.meta.url), "utf8"),
  ]);

  assert.match(catalog, /canonicalCheckoutUrl:\s*"https:\/\/www\.kreluna\.it\/risonix\/acquista"/);
  assert.match(route, /delegated:\s*true/);
  assert.ok(
    route.indexOf("const canonicalItems") < route.indexOf("const runtimeEnv"),
    "Risonix must be delegated before the generic Stripe checkout is configured",
  );
});

test("routes the Store profile to a general Kreluna account", async () => {
  const [storePage, accountPage] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/account/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(storePage, /const ACCOUNT_URL = "\/account"/);
  assert.match(storePage, /Account Kreluna/);
  assert.doesNotMatch(storePage, /window\.location\.assign\(RISONIX_ACCOUNT_URL\)/);
  assert.match(accountPage, /requireChatGPTUser\("\/account"\)/);
  assert.match(accountPage, /Il tuo account Kreluna/);
  assert.match(accountPage, /Gestisci Risonix/);
});

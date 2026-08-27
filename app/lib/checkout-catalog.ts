export type CheckoutCatalogItem = {
  id: string;
  name: string;
  priceCents: number;
  currency: "eur";
  taxCode: string;
  description?: string;
  cadence?: "one-time" | "monthly";
};

export const checkoutCatalog: CheckoutCatalogItem[] = [
  {
    id: "risonix",
    name: "Risonix",
    priceCents: 4900,
    currency: "eur",
    taxCode: "txcd_10202000",
    description: "Riconosci i brani della tua raccolta con impronta acustica e confronto locale.",
    cadence: "one-time",
  },
  {
    id: "kreluna-plus-basic",
    name: "Kreluna+ Basic",
    priceCents: 990,
    currency: "eur",
    taxCode: "txcd_10103000",
    description: "Piano Kreluna+ Basic con 5€ di crediti mensili e sconto fino al 15%.",
    cadence: "monthly",
  },
  {
    id: "kreluna-plus-pro",
    name: "Kreluna+ Pro",
    priceCents: 1990,
    currency: "eur",
    taxCode: "txcd_10103000",
    description: "Piano Kreluna+ Pro con 20€ di crediti mensili e funzioni esclusive.",
    cadence: "monthly",
  },
];

export const checkoutCatalogMap = Object.fromEntries(
  checkoutCatalog.map((item) => [item.id, item]),
);

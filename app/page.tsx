"use client";

import {
  ArrowRight,
  BarChart3,
  AudioWaveform,
  Bell,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Clock3,
  CreditCard,
  Gift,
  Grid2X2,
  Heart,
  Home,
  LifeBuoy,
  Menu,
  PackageCheck,
  RefreshCcw,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trash2,
  UserRound,
  UsersRound,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type Locale = "it" | "en";

const englishCopy: Record<string, string> = {
  "Vai al contenuto": "Skip to content",
  "ESPLORA": "EXPLORE",
  "SUPPORTO": "SUPPORT",
  "Home": "Home",
  "Categorie": "Categories",
  "Consigliati per te": "Recommended for you",
  "I miei prodotti": "My products",
  "Preferiti": "Favorites",
  "Cronologia": "History",
  "Assistenza": "Support",
  "Scopri Kreluna+": "Discover Kreluna+",
  "Più vantaggi su ogni app.": "More benefits on every app.",
  "Esplora": "Explore",
  "Account personale": "Personal account",
  "Carrello": "Cart",
  "Lingua del sito": "Site language",
  "Cerca app, strumenti, soluzioni...": "Search apps, tools and solutions...",
  "Cerca nel Kreluna Store": "Search the Kreluna Store",
  "Il marketplace Kreluna": "The Kreluna marketplace",
  "Trova il software": "Find the software",
  "giusto per te.": "that fits you.",
  "Solo software Kreluna realmente disponibile, verificato e pronto da scoprire.": "Only real Kreluna software that is available, verified and ready to discover.",
  "Scopri le categorie": "Explore categories",
  "I più popolari": "Most popular",
  "Sicuro e verificato": "Safe and verified",
  "Prezzi trasparenti": "Transparent pricing",
  "Verificato": "Verified",
  "SCEGLI IL TUO PERCORSO": "CHOOSE YOUR PATH",
  "Come userai Kreluna Store?": "How will you use Kreluna Store?",
  "Seleziona il profilo per vedere le soluzioni più adatte alle tue esigenze.": "Choose a profile to see the solutions that best fit your needs.",
  "PROFESSIONISTI E CREATOR": "PROFESSIONALS AND CREATORS",
  "Per te": "For you",
  "App immediate per organizzarti, creare e far crescere il tuo lavoro.": "Ready-to-use apps to organize, create and grow your work.",
  "Facili da usare": "Easy to use",
  "Attivazione rapida": "Quick activation",
  "TEAM, PMI E IMPRESE": "TEAMS, SMEs AND COMPANIES",
  "Per la tua azienda": "For your business",
  "Soluzioni complete per coordinare persone, vendite e operazioni.": "Complete solutions to coordinate people, sales and operations.",
  "Per tutto il team": "For the whole team",
  "Controllo centralizzato": "Centralized control",
  "Novità per aziende": "New for businesses",
  "Nuovo servizio in arrivo": "A new service is coming",
  "Stiamo per lanciare il nostro servizio premium per aziende.": "We are about to launch our premium service for businesses.",
  "Scopri come funziona": "See how it works",
  "Prossimamente": "Coming soon",
  "Versione Business di Kreluna Store": "Kreluna Store Business edition",
  "Stiamo preparando una piattaforma completa per team e brand, con gestione prodotti, ordini e supporto dedicato, pensata per chi lavora in gruppo.": "We are building a complete platform for teams and brands, with product and order management plus dedicated support.",
  "Gestione centralizzata ruoli, permessi e team": "Centralized roles, permissions and team management",
  "Avvio rapido in pochi giorni, niente sviluppo complesso": "Launch in days, with no complex development",
  "Aggiornamenti continui e rollout semplificato": "Continuous updates and simplified rollout",
  "Entro 30 ottobre 2026": "By October 30, 2026",
  "Contattaci": "Contact us",
  "Nome": "Name",
  "Il tuo nome": "Your name",
  "Ti interessa anche questo messaggio?": "Tell us what interests you",
  "Scrivici il tuo settore e riceverai un aggiornamento prioritario.": "Tell us about your industry to receive priority updates.",
  "Interessa a:": "This is for:",
  "Ti facciamo sapere quando parte": "Notify me when it launches",
  "Categorie principali": "Main categories",
  "Tutto quello che serve al tuo business, ordinato per esigenza.": "Everything your business needs, organized by purpose.",
  "Vedi tutte": "View all",
  "Musica & audio": "Music & audio",
  "Vendite & e-commerce": "Sales & e-commerce",
  "Gestione aziendale": "Business management",
  "Contabilità & fatture": "Accounting & invoicing",
  "Marketing & social": "Marketing & social",
  "Magazzino & logistica": "Inventory & logistics",
  "Risorse umane": "Human resources",
  "SCELTI PER TE": "SELECTED FOR YOU",
  "PER IL TUO BUSINESS": "FOR YOUR BUSINESS",
  "App scelte per te": "Apps selected for you",
  "Soluzioni per la tua azienda": "Solutions for your business",
  "Strumenti verificati, semplici da attivare e senza sorprese.": "Verified tools, easy to activate and with no surprises.",
  "Software affidabili per far lavorare meglio il tuo team e la tua impresa.": "Reliable software to help your team and business work better.",
  "Più rilevanti": "Most relevant",
  "Tutti": "All",
  "Più popolari": "Most popular",
  "Novità": "New",
  "Prova gratuita": "Free trial",
  "Riconosci i brani della tua raccolta con impronta acustica e confronto locale.": "Identify songs in your collection using acoustic fingerprints and local matching.",
  "Kreluna originale": "Kreluna original",
  "Più scelto": "Most popular",
  "Consigliato": "Recommended",
  "Facile da usare": "Easy to use",
  "Ideale per PMI": "Ideal for SMEs",
  "1 licenza · 1 dispositivo": "1 license · 1 device",
  "Nuovo nel Kreluna Store": "New in the Kreluna Store",
  "una tantum": "one-time",
  "Scopri": "Discover",
  "Fatturazione semplice, automatica e sempre sotto controllo.": "Simple, automated invoicing that is always under control.",
  "Il tuo negozio online completo, pronto per vendere ovunque.": "Your complete online store, ready to sell anywhere.",
  "Clienti, vendite e opportunità riuniti in un solo spazio.": "Customers, sales and opportunities in one place.",
  "Crea, pianifica e migliora i contenuti con l’intelligenza artificiale.": "Create, schedule and improve content with artificial intelligence.",
  "Scorte, ordini e spedizioni aggiornati in tempo reale.": "Inventory, orders and shipments updated in real time.",
  "Presenze, ferie e documenti del team senza complicazioni.": "Attendance, leave and team documents without complications.",
  "Appuntamenti e prenotazioni online, attivi in pochi minuti.": "Online appointments and bookings, live in minutes.",
  "Automatizza le attività ripetitive e ritrova tempo per il tuo business.": "Automate repetitive tasks and reclaim time for your business.",
  "Nessuna app trovata": "No apps found",
  "Prova a cambiare ricerca o a rimuovere i filtri selezionati.": "Try changing your search or removing the selected filters.",
  "Azzera i filtri": "Clear filters",
  "IL TUO VANTAGGIO ESCLUSIVO": "YOUR EXCLUSIVE BENEFIT",
  "Più valore. Più vantaggi. Sempre con te.": "More value. More benefits. Always with you.",
  "Sconti sulle app, crediti mensili e assistenza prioritaria in un unico piano.": "App discounts, monthly credits and priority support in one plan.",
  "Sconti fino al 25%": "Discounts up to 25%",
  "Crediti mensili inclusi": "Monthly credits included",
  "Accesso anticipato": "Early access",
  "PIÙ SCELTO": "MOST POPULAR",
  "PER CHI VUOLE DI PIÙ": "FOR THOSE WHO WANT MORE",
  "Assistenza prioritaria": "Priority support",
  "Funzioni esclusive": "Exclusive features",
  "Attiva Basic": "Activate Basic",
  "Attiva Pro": "Activate Pro",
  "PERCHÉ KRELUNA STORE": "WHY KRELUNA STORE",
  "Semplice dall’inizio alla crescita": "Simple from day one to growth",
  "Sicuro": "Secure",
  "Ogni app è verificata prima della pubblicazione.": "Every app is verified before publication.",
  "Trasparente": "Transparent",
  "Prezzi chiari, rinnovi sotto controllo.": "Clear pricing and renewals under control.",
  "Testa gli strumenti prima di scegliere.": "Try tools before choosing.",
  "Flessibile": "Flexible",
  "Nessun vincolo, cambia quando vuoi.": "No lock-in. Change whenever you want.",
  "Trova l’app giusta": "Find the right app",
  "Attiva": "Activate",
  "In pochi clic": "In a few clicks",
  "Usa": "Use",
  "Tutto insieme": "Everything together",
  "Cresci": "Grow",
  "Fai evolvere il business": "Move your business forward",
  "Il marketplace dei software che fanno avanzare il tuo business.": "The software marketplace that moves your business forward.",
  "Tutti i diritti riservati.": "All rights reserved.",
  "IL TUO CARRELLO": "YOUR CART",
  "Pronto da attivare": "Ready to activate",
  "Il carrello è vuoto": "Your cart is empty",
  "Esplora le app e aggiungi quelle più utili al tuo business.": "Explore apps and add the most useful ones for your business.",
  "Scopri le app": "Explore apps",
  "Totale del carrello": "Cart total",
  "Prezzi e condizioni sono mostrati prima del pagamento.": "Prices and terms are shown before payment.",
  "Procedi all’attivazione": "Proceed to activation",
  "Chiudi carrello": "Close cart",
  "Chiudi dettagli": "Close details",
  "Novità Kreluna": "New from Kreluna",
  "Configurazione guidata inclusa": "Guided setup included",
  "Aggiornamenti automatici": "Automatic updates",
  "Assistenza Kreluna verificata": "Verified Kreluna support",
  "Prezzo completo": "Full price",
  "A partire da": "Starting from",
  "Nei preferiti": "In favorites",
  "Salva": "Save",
  "Scopri Risonix": "Discover Risonix",
  "Prova gratis": "Try for free",
};

const italianCopy = Object.fromEntries(
  Object.entries(englishCopy).map(([italian, english]) => [english, italian]),
);

function translatedText(value: string, locale: Locale) {
  const dictionary = locale === "en" ? englishCopy : italianCopy;
  const leading = value.match(/^\s*/)?.[0] ?? "";
  const trailing = value.match(/\s*$/)?.[0] ?? "";
  const core = value.trim();
  let translated = dictionary[core] ?? core;

  if (locale === "en") {
    translated = translated
      .replace(/^(\d+) soluzioni$/, "$1 solutions")
      .replace(/^(\d+) recensioni$/, "$1 reviews")
      .replace(/^Sconti fino al (\d+)%$/, "Discounts up to $1%")
      .replace(/^(\d+) € di crediti inclusi$/, "$1 € in credits included");
  } else {
    translated = translated
      .replace(/^(\d+) solutions$/, "$1 soluzioni")
      .replace(/^(\d+) reviews$/, "$1 recensioni")
      .replace(/^Discounts up to (\d+)%$/, "Sconti fino al $1%")
      .replace(/^(\d+) € in credits included$/, "$1 € di crediti inclusi");
  }

  return `${leading}${translated}${trailing}`;
}

function applyLocale(root: HTMLElement, locale: Locale) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    if (node.parentElement && !["SCRIPT", "STYLE"].includes(node.parentElement.tagName)) {
      node.nodeValue = translatedText(node.nodeValue ?? "", locale);
    }
    node = walker.nextNode();
  }

  root.querySelectorAll<HTMLElement>("[aria-label], [placeholder], [title]").forEach((element) => {
    ["aria-label", "placeholder", "title"].forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (value) element.setAttribute(attribute, translatedText(value, locale));
    });
  });
}

type Product = {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  description: string;
  price: number;
  rating?: string;
  reviews?: number;
  badge: string;
  badgeTone: "blue" | "orange" | "purple" | "green";
  trial: string;
  icon: LucideIcon;
  iconTone: string;
  popular?: boolean;
  isNew?: boolean;
  oneTime?: boolean;
  detailUrl?: string;
};

const categories = [
  {
    id: "music-audio",
    label: "Musica & audio",
    shortLabel: "Musica & audio",
    icon: AudioWaveform,
    tone: "risonix",
    count: 1,
  },
];

const products: Product[] = [
  {
    id: "risonix",
    name: "Risonix",
    category: "Musica & audio",
    categoryId: "music-audio",
    description: "Riconosci i brani della tua raccolta con impronta acustica e confronto locale.",
    price: 49,
    badge: "Kreluna originale",
    badgeTone: "green",
    trial: "1 licenza · 1 dispositivo",
    icon: AudioWaveform,
    iconTone: "risonix",
    popular: true,
    isNew: true,
    oneTime: true,
    detailUrl: "https://www.kreluna.it/risonix",
  },
];

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "categorie", label: "Categorie", icon: Grid2X2 },
  { id: "consigliati", label: "Consigliati per te", icon: Sparkles },
  { id: "prodotti", label: "I miei prodotti", icon: PackageCheck },
  { id: "preferiti", label: "Preferiti", icon: Heart },
  { id: "cronologia", label: "Cronologia", icon: Clock3 },
];

const filterOptions = [
  { id: "all", label: "Tutti" },
  { id: "popular", label: "Più popolari" },
  { id: "new", label: "Novità" },
] as const;

const launchBenefits = [
  { icon: ShieldCheck, text: "Gestione centralizzata ruoli, permessi e team" },
  { icon: Clock3, text: "Avvio rapido in pochi giorni, niente sviluppo complesso" },
  { icon: RefreshCcw, text: "Aggiornamenti continui e rollout semplificato" },
] as const;

type FilterId = (typeof filterOptions)[number]["id"];
type Audience = "personal" | "business";

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? "brand--compact" : ""}`}>
      <span className="brand-bag" aria-hidden="true">
        <span>K</span>
      </span>
      {!compact && (
        <span className="brand-copy">
          <strong>Kreluna</strong>
          <small>STORE</small>
        </span>
      )}
    </div>
  );
}

function SearchField({
  query,
  onQueryChange,
  onSelect,
  mobile = false,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  onSelect: (product: Product) => void;
  mobile?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const suggestions = query.trim()
    ? products
        .filter((product) =>
          `${product.name} ${product.category}`
            .toLocaleLowerCase("it")
            .includes(query.trim().toLocaleLowerCase("it")),
        )
        .slice(0, 4)
    : [];

  return (
    <div className={`search-wrap ${mobile ? "search-wrap--mobile" : ""}`}>
      <Search size={18} aria-hidden="true" />
      <input
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => window.setTimeout(() => setFocused(false), 120)}
        placeholder="Cerca app, strumenti, soluzioni..."
        aria-label="Cerca nel Kreluna Store"
      />
      {query && (
        <button
          type="button"
          className="search-clear"
          onClick={() => onQueryChange("")}
          aria-label="Cancella ricerca"
        >
          <X size={15} />
        </button>
      )}
      {focused && query.trim() && (
        <div className="search-suggestions">
          {suggestions.length ? (
            suggestions.map((product) => {
              const Icon = product.icon;
              return (
                <button
                  type="button"
                  key={product.id}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => onSelect(product)}
                >
                  <span className={`mini-product-icon tone-${product.iconTone}`}>
                    <Icon size={16} />
                  </span>
                  <span>
                    <strong>{product.name}</strong>
                    <small>{product.category}</small>
                  </span>
                  <ChevronRight size={15} />
                </button>
              );
            })
          ) : (
            <p>Nessun risultato per “{query}”</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>("it");
  const [activeNav, setActiveNav] = useState("home");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [audience, setAudience] = useState<Audience>("personal");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState("");
  const [launchName, setLaunchName] = useState("");
  const [launchEmail, setLaunchEmail] = useState("");
  const [launchMessage, setLaunchMessage] = useState("");
  const [launchAudience, setLaunchAudience] = useState<"te" | "azienda">("te");
  const [launchSuccess, setLaunchSuccess] = useState("");
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("lang") === "en") {
      setLocale("en");
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    const root = document.querySelector<HTMLElement>(".store-shell");
    if (root) applyLocale(root, locale);

    const url = new URL(window.location.href);
    if (locale === "en") url.searchParams.set("lang", "en");
    else url.searchParams.delete("lang");
    window.history.replaceState({}, "", url);
  });

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("it");
    return products.filter((product) => {
      const matchesQuery =
        !normalizedQuery ||
        `${product.name} ${product.category} ${product.description}`
          .toLocaleLowerCase("it")
          .includes(normalizedQuery);
      const matchesCategory =
        activeCategory === "all" || product.categoryId === activeCategory;
      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "popular" && product.popular) ||
        (activeFilter === "new" && product.isNew);
      return matchesQuery && matchesCategory && matchesFilter;
    });
  }, [activeCategory, activeFilter, query]);

  const cartProducts = cart
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));
  const cartTotal = cartProducts.reduce((total, product) => total + product.price, 0);

  const announce = (message: string) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2600);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const chooseCategory = (id: string) => {
    setActiveCategory(id);
    setActiveFilter("all");
    setActiveNav("categorie");
    window.setTimeout(() => scrollTo("prodotti"), 20);
  };

  const chooseAudience = (nextAudience: Audience) => {
    setAudience(nextAudience);
    setActiveCategory("all");
    setActiveFilter(nextAudience === "business" ? "popular" : "all");
    announce(
      nextAudience === "business"
        ? "Vista Per la tua azienda selezionata"
        : "Vista Per te selezionata",
    );
  };

  const chooseSearchResult = (product: Product) => {
    setQuery(product.name);
    setSelectedProduct(product);
  };

  const toggleFavorite = (product: Product) => {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(product.id)) {
        next.delete(product.id);
        announce(`${product.name} rimosso dai preferiti`);
      } else {
        next.add(product.id);
        announce(`${product.name} salvato nei preferiti`);
      }
      return next;
    });
  };

  const addToCart = (product: Product) => {
    setCart((current) => {
      if (current.includes(product.id)) {
        announce(`${product.name} è già nel carrello`);
        return current;
      }
      announce(`${product.name} aggiunto al carrello`);
      return [...current, product.id];
    });
  };

  const openPopular = () => {
    setActiveFilter("popular");
    setActiveCategory("all");
    window.setTimeout(() => scrollTo("prodotti"), 20);
  };

  const handleLaunchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!launchName.trim() || !launchEmail.trim() || !launchMessage.trim()) {
      announce("Compila nome, email e messaggio per restare aggiornato");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(launchEmail.trim())) {
      announce("Inserisci un indirizzo email valido");
      return;
    }
    const audienceLabel =
      launchAudience === "te"
        ? "per te"
        : "per la tua azienda";
    setLaunchSuccess(`Grazie! Ti avviseremo ${audienceLabel} non appena apriamo le iscrizioni.`);
    announce("Richiesta inviata con successo.");
    setLaunchName("");
    setLaunchEmail("");
    setLaunchMessage("");
  };

  const handleNav = (id: string) => {
    setActiveNav(id);
    setMenuOpen(false);
    if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
    else if (id === "categorie") scrollTo("categorie");
    else if (id === "consigliati" || id === "prodotti") scrollTo("prodotti");
    else if (id === "preferiti") {
      setQuery("");
      setActiveCategory("all");
      setActiveFilter("all");
      scrollTo("prodotti");
      announce(
        favorites.size
          ? `${favorites.size} ${favorites.size === 1 ? "preferito salvato" : "preferiti salvati"}`
          : "Non hai ancora salvato preferiti",
      );
    } else announce("Questa sezione sarà collegata nel prossimo passaggio");
  };

  return (
    <div className="store-shell">
      <a className="skip-link" href="#contenuto">
        Vai al contenuto
      </a>

      {menuOpen && (
        <button
          className="menu-backdrop"
          type="button"
          onClick={() => setMenuOpen(false)}
          aria-label="Chiudi menu"
        />
      )}

      <aside className={`sidebar ${menuOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar-top">
          <Brand />
          <button
            type="button"
            className="sidebar-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Chiudi menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Navigazione principale">
          <span className="nav-label">ESPLORA</span>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                type="button"
                key={item.id}
                className={activeNav === item.id ? "active" : ""}
                onClick={() => handleNav(item.id)}
                aria-current={activeNav === item.id ? "page" : undefined}
              >
                <Icon size={18} strokeWidth={2} />
                <span>{item.label}</span>
                {item.id === "preferiti" && favorites.size > 0 && (
                  <small>{favorites.size}</small>
                )}
              </button>
            );
          })}
          <span className="nav-label nav-label--support">SUPPORTO</span>
          <button type="button" onClick={() => announce("Ti metteremo in contatto con l’assistenza Kreluna") }>
            <LifeBuoy size={18} strokeWidth={2} />
            <span>Assistenza</span>
          </button>
        </nav>

        <div className="sidebar-plus">
          <div className="sidebar-plus-icon">
            <Sparkles size={18} />
          </div>
          <div>
            <strong>Scopri Kreluna+</strong>
            <p>Più vantaggi su ogni app.</p>
          </div>
          <button type="button" onClick={() => scrollTo("kreluna-plus")}>
            Esplora <ArrowRight size={14} />
          </button>
        </div>

        <button className="sidebar-profile" type="button" onClick={() => announce("Profilo demo Kreluna") }>
          <span className="avatar">AG</span>
          <span>
            <strong>Andrea</strong>
            <small>Account personale</small>
          </span>
          <ChevronRight size={16} />
        </button>
      </aside>

      <div className="main-shell">
        <header className="topbar">
          <div className="topbar-inner">
            <button
              type="button"
              className="mobile-menu-button"
              onClick={() => setMenuOpen(true)}
              aria-label="Apri menu"
            >
              <Menu size={22} />
            </button>
            <div className="mobile-brand">
              <Brand />
            </div>
            <SearchField
              query={query}
              onQueryChange={setQuery}
              onSelect={chooseSearchResult}
            />
            <div className="topbar-actions">
              <div className="language-switch" role="group" aria-label="Lingua del sito">
                <button
                  type="button"
                  className={locale === "it" ? "active" : ""}
                  onClick={() => setLocale("it")}
                  aria-pressed={locale === "it"}
                  aria-label="Italiano"
                >
                  IT
                </button>
                <button
                  type="button"
                  className={locale === "en" ? "active" : ""}
                  onClick={() => setLocale("en")}
                  aria-pressed={locale === "en"}
                  aria-label="English"
                >
                  EN
                </button>
              </div>
              <button
                type="button"
                className="topbar-icon"
                onClick={() => handleNav("preferiti")}
                aria-label={`Preferiti${favorites.size ? `, ${favorites.size}` : ""}`}
              >
                <Heart size={19} />
                {favorites.size > 0 && <span className="action-dot">{favorites.size}</span>}
              </button>
              <button
                type="button"
                className="topbar-icon"
                onClick={() => announce("Non hai nuove notifiche")}
                aria-label="Notifiche"
              >
                <Bell size={19} />
                <span className="notification-dot" />
              </button>
              <button
                type="button"
                className="cart-button"
                onClick={() => setCartOpen(true)}
                aria-label={`Apri carrello, ${cart.length} prodotti`}
              >
                <ShoppingCart size={19} />
                <span>Carrello</span>
                {cart.length > 0 && <small>{cart.length}</small>}
              </button>
              <button type="button" className="profile-compact" onClick={() => announce("Profilo demo Kreluna") }>
                <span className="avatar">AG</span>
                <ChevronDown size={15} />
              </button>
            </div>
          </div>
        </header>

        <main id="contenuto" className="page-content">
          <div className="mobile-search">
            <SearchField
              query={query}
              onQueryChange={setQuery}
              onSelect={chooseSearchResult}
              mobile
            />
          </div>

          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-glow hero-glow--one" />
            <div className="hero-glow hero-glow--two" />
            <div className="hero-copy">
              <span className="eyebrow">
                <Sparkles size={14} /> Il marketplace Kreluna
              </span>
              <h1 id="hero-title">
                Trova il software<br />
                <span>giusto per te.</span>
              </h1>
              <p>
                Solo software Kreluna realmente disponibile, verificato e pronto da scoprire.
              </p>
              <div className="hero-actions">
                <button type="button" className="button button--primary" onClick={() => scrollTo("categorie")}>
                  Scopri le categorie <ArrowRight size={17} />
                </button>
                <button type="button" className="button button--secondary" onClick={openPopular}>
                  I più popolari
                </button>
              </div>
              <div className="hero-trust">
                <span><ShieldCheck size={15} /> Sicuro e verificato</span>
                <span><CreditCard size={15} /> Prezzi trasparenti</span>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="hero-orbit hero-orbit--one" />
              <div className="hero-orbit hero-orbit--two" />
              <div className="visual-window">
                <div className="visual-window-top">
                  <span /> <span /> <span />
                </div>
                <div className="visual-window-content">
                  <div className="visual-sidebar">
                    <div className="visual-logo">K</div>
                    <i /> <i /> <i /> <i />
                  </div>
                  <div className="visual-main">
                    <div className="visual-search" />
                    <div className="visual-heading" />
                    <div className="visual-subheading" />
                    <div className="visual-card-row">
                      <b className="visual-card visual-card--blue" />
                      <b className="visual-card visual-card--violet" />
                      <b className="visual-card visual-card--orange" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="cube-cluster">
                <span className="cube cube--one"><ShoppingBag size={26} /></span>
                <span className="cube cube--two"><BarChart3 size={20} /></span>
                <span className="cube cube--three"><Sparkles size={19} /></span>
              </div>
              <div className="floating-chip floating-chip--rating"><Star size={14} fill="currentColor" /> 4,9</div>
              <div className="floating-chip floating-chip--secure"><ShieldCheck size={14} /> Verificato</div>
            </div>
          </section>

          <section className="audience-section" aria-labelledby="audience-title">
            <div className="audience-heading">
              <div>
                <span className="section-kicker">SCEGLI IL TUO PERCORSO</span>
                <h2 id="audience-title">Come userai Kreluna Store?</h2>
              </div>
              <p>Seleziona il profilo per vedere le soluzioni più adatte alle tue esigenze.</p>
            </div>

            <div className="audience-grid" role="radiogroup" aria-label="Tipo di utilizzo">
              <button
                type="button"
                role="radio"
                aria-checked={audience === "personal"}
                className={`audience-card audience-card--personal ${audience === "personal" ? "audience-card--active" : ""}`}
                onClick={() => chooseAudience("personal")}
              >
                <span className="audience-icon"><UserRound size={25} /></span>
                <span className="audience-copy">
                  <small>PROFESSIONISTI E CREATOR</small>
                  <strong>Per te</strong>
                  <span>App immediate per organizzarti, creare e far crescere il tuo lavoro.</span>
                  <span className="audience-tags"><em><CircleCheck size={13} /> Facili da usare</em><em><Zap size={13} /> Attivazione rapida</em></span>
                </span>
                <span className="audience-select"><Check size={17} /></span>
              </button>

              <button
                type="button"
                role="radio"
                aria-checked={audience === "business"}
                className={`audience-card audience-card--business ${audience === "business" ? "audience-card--active" : ""}`}
                onClick={() => chooseAudience("business")}
              >
                <span className="audience-icon"><Building2 size={25} /></span>
                <span className="audience-copy">
                  <small>TEAM, PMI E IMPRESE</small>
                  <strong>Per la tua azienda</strong>
                  <span>Soluzioni complete per coordinare persone, vendite e operazioni.</span>
                  <span className="audience-tags"><em><UsersRound size={13} /> Per tutto il team</em><em><BarChart3 size={13} /> Controllo centralizzato</em></span>
                </span>
                <span className="audience-select"><Check size={17} /></span>
              </button>
            </div>
          </section>

          <section id="lancio" className="section-block launch-section" aria-labelledby="launch-title">
            <div className="section-heading launch-heading">
              <div>
                <span className="section-kicker">Novità per aziende</span>
                <h2 id="launch-title">Nuovo servizio in arrivo</h2>
                <p>Stiamo per lanciare il nostro servizio premium per aziende.</p>
              </div>
              <button
                type="button"
                className="text-link"
                onClick={() => scrollTo("kreluna-plus")}
              >
                Scopri come funziona <ArrowRight size={16} />
              </button>
            </div>

            <div className="launch-layout">
              <article className="launch-card" aria-label="Anteprima servizio">
                <span className="launch-badge">Prossimamente</span>
                <h3>Versione Business di Kreluna Store</h3>
                <p>
                  Stiamo preparando una piattaforma completa per team e brand, con gestione
                  prodotti, ordini e supporto dedicato, pensata per chi lavora in gruppo.
                </p>
                <div className="launch-benefits">
                  {launchBenefits.map((item) => {
                    const Icon = item.icon;
                    return (
                      <span key={item.text}>
                        <Icon size={16} /> {item.text}
                      </span>
                    );
                  })}
                </div>
                <div className="launch-dates">
                  <span>Prossimamente</span>
                  <strong>Entro 30 ottobre 2026</strong>
                </div>
                <div className="launch-actions">
                  <button type="button" className="button button--primary" onClick={() => announce("Il flusso servizio verrà collegato nel prossimo passaggio")}>
                    Scopri come funziona
                  </button>
                  <button type="button" className="button button--secondary" onClick={() => announce("Puoi contattarci dal form qui sotto")}>
                    Contattaci
                  </button>
                </div>
              </article>

              <form className="launch-form" onSubmit={handleLaunchSubmit}>
                <label htmlFor="launch-name">Nome</label>
                <input
                  id="launch-name"
                  type="text"
                  value={launchName}
                  onChange={(event) => setLaunchName(event.target.value)}
                  placeholder="Il tuo nome"
                  required
                />

                <label htmlFor="launch-email">Email</label>
                <input
                  id="launch-email"
                  type="email"
                  value={launchEmail}
                  onChange={(event) => setLaunchEmail(event.target.value)}
                  placeholder="nome@azienda.it"
                  required
                />

                <label htmlFor="launch-message">Ti interessa anche questo messaggio?</label>
                <textarea
                  id="launch-message"
                  value={launchMessage}
                  onChange={(event) => setLaunchMessage(event.target.value)}
                  placeholder="Scrivici il tuo settore e riceverai un aggiornamento prioritario."
                  required
                />

                <label>Interessa a:</label>
                <div className="launch-audience">
                  <label>
                    <input
                      type="radio"
                      name="launch-audience"
                      checked={launchAudience === "te"}
                      onChange={() => setLaunchAudience("te")}
                    />
                    Per te
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="launch-audience"
                      checked={launchAudience === "azienda"}
                      onChange={() => setLaunchAudience("azienda")}
                    />
                    Per la tua azienda
                  </label>
                </div>

                <button type="submit" className="button button--primary">
                  Ti facciamo sapere quando parte
                </button>

                {launchSuccess && (
                  <p className="launch-success" role="status">
                    {launchSuccess}
                  </p>
                )}
              </form>
            </div>
          </section>

          <section id="categorie" className="section-block categories-section" aria-labelledby="categories-title">
            <div className="section-heading">
              <div>
                <span className="section-kicker">ESPLORA</span>
                <h2 id="categories-title">Categorie principali</h2>
                <p>Tutto quello che serve al tuo business, ordinato per esigenza.</p>
              </div>
              <button type="button" className="text-link" onClick={() => chooseCategory("all")}>
                Vedi tutte <ArrowRight size={16} />
              </button>
            </div>
            <div className="category-grid">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    type="button"
                    key={category.id}
                    className={`category-card ${activeCategory === category.id ? "category-card--active" : ""}`}
                    onClick={() => chooseCategory(category.id)}
                  >
                    <span className={`category-icon tone-${category.tone}`}>
                      <Icon size={23} />
                    </span>
                    <strong>{category.label}</strong>
                    <small>{category.count} soluzioni</small>
                    <span className="category-arrow"><ChevronRight size={16} /></span>
                  </button>
                );
              })}
            </div>
          </section>

          <section id="prodotti" className="section-block products-section" aria-labelledby="products-title">
            <div className="section-heading products-heading">
              <div>
                <span className="section-kicker">{audience === "personal" ? "SCELTI PER TE" : "PER IL TUO BUSINESS"}</span>
                <h2 id="products-title">{audience === "personal" ? "App scelte per te" : "Soluzioni per la tua azienda"}</h2>
                <p>{audience === "personal" ? "Strumenti verificati, semplici da attivare e senza sorprese." : "Software affidabili per far lavorare meglio il tuo team e la tua impresa."}</p>
              </div>
              <div className="sort-button" aria-hidden="true">
                <SlidersHorizontal size={16} /> Più rilevanti <ChevronDown size={14} />
              </div>
            </div>

            <div className="filter-row" aria-label="Filtri prodotti">
              {filterOptions.map((filter) => (
                <button
                  type="button"
                  key={filter.id}
                  className={activeFilter === filter.id ? "active" : ""}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
              {activeCategory !== "all" && (
                <button type="button" className="active category-filter" onClick={() => setActiveCategory("all")}>
                  {categories.find((category) => category.id === activeCategory)?.shortLabel}
                  <X size={13} />
                </button>
              )}
            </div>

            {filteredProducts.length ? (
              <div className={`product-grid ${filteredProducts.length === 1 ? "product-grid--single" : ""}`}>
                {filteredProducts.map((product) => {
                  const Icon = product.icon;
                  const isFavorite = favorites.has(product.id);
                  const isInCart = cart.includes(product.id);
                  return (
                    <article className="product-card" key={product.id}>
                      <div className="product-card-top">
                        <span className={`product-icon tone-${product.iconTone}`}>
                          <Icon size={25} />
                        </span>
                        <span className={`product-badge badge-${product.badgeTone}`}>{product.badge}</span>
                        <button
                          type="button"
                          className={`favorite-button ${isFavorite ? "active" : ""}`}
                          onClick={() => toggleFavorite(product)}
                          aria-label={`${isFavorite ? "Rimuovi" : "Aggiungi"} ${product.name} ${isFavorite ? "dai" : "ai"} preferiti`}
                        >
                          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                        </button>
                      </div>
                      <div className="product-copy">
                        <span className="product-category">{product.category}</span>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                      </div>
                      {product.rating ? (
                        <div className="rating-row">
                          <span className="stars" aria-label={`Valutazione ${product.rating} su 5`}>
                            <Star size={14} fill="currentColor" /> {product.rating}
                          </span>
                          <span>{product.reviews} recensioni</span>
                        </div>
                      ) : (
                        <div className="rating-row rating-row--new">
                          <Sparkles size={14} /> Nuovo nel Kreluna Store
                        </div>
                      )}
                      <div className="trial-row"><CircleCheck size={14} /> {product.trial}</div>
                      <div className="product-footer">
                        <div className="price">
                          <strong>{product.price.toFixed(2).replace(".", ",")} €</strong>
                          <small>{product.oneTime ? "una tantum" : "/mese"}</small>
                        </div>
                        <div className="product-actions">
                          <button type="button" className="details-button" onClick={() => setSelectedProduct(product)}>
                            Scopri
                          </button>
                          <button
                            type="button"
                            className={`add-button ${isInCart ? "add-button--added" : ""}`}
                            onClick={() => addToCart(product)}
                            aria-label={`${isInCart ? "Già aggiunto" : "Aggiungi"} ${product.name} al carrello`}
                          >
                            {isInCart ? <Check size={17} /> : <ShoppingCart size={17} />}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                <Search size={28} />
                <h3>Nessuna app trovata</h3>
                <p>Prova a cambiare ricerca o a rimuovere i filtri selezionati.</p>
                <button
                  type="button"
                  className="button button--primary"
                  onClick={() => {
                    setQuery("");
                    setActiveCategory("all");
                    setActiveFilter("all");
                  }}
                >
                  Azzera i filtri
                </button>
              </div>
            )}
          </section>

          <section id="kreluna-plus" className="plus-banner" aria-labelledby="plus-title">
            <div className="plus-pattern" aria-hidden="true" />
            <div className="plus-copy">
              <span className="plus-label"><Sparkles size={14} /> IL TUO VANTAGGIO ESCLUSIVO</span>
              <h2 id="plus-title">Kreluna<span>+</span></h2>
              <h3>Più valore. Più vantaggi. Sempre con te.</h3>
              <p>Sconti sulle app, crediti mensili e assistenza prioritaria in un unico piano.</p>
              <div className="plus-benefits">
                <span><ShieldCheck size={16} /> Sconti fino al 25%</span>
                <span><Gift size={16} /> Crediti mensili inclusi</span>
                <span><Zap size={16} /> Accesso anticipato</span>
              </div>
            </div>
            <div className="plans">
              <article className="plan-card plan-card--basic">
                <span>PIÙ SCELTO</span>
                <h3>Kreluna+ Basic</h3>
                <p><strong>9,90 €</strong> /mese</p>
                <ul>
                  <li><Check size={14} /> Sconti fino al 15%</li>
                  <li><Check size={14} /> 5 € di crediti inclusi</li>
                  <li><Check size={14} /> Assistenza prioritaria</li>
                </ul>
                <button type="button" onClick={() => announce("Piano Basic selezionato: lo collegheremo al checkout nel prossimo passaggio") }>
                  Attiva Basic
                </button>
              </article>
              <article className="plan-card plan-card--pro">
                <span>PER CHI VUOLE DI PIÙ</span>
                <h3>Kreluna+ Pro</h3>
                <p><strong>19,90 €</strong> /mese</p>
                <ul>
                  <li><Check size={14} /> Sconti fino al 25%</li>
                  <li><Check size={14} /> 20 € di crediti inclusi</li>
                  <li><Check size={14} /> Funzioni esclusive</li>
                </ul>
                <button type="button" onClick={() => announce("Piano Pro selezionato: lo collegheremo al checkout nel prossimo passaggio") }>
                  Attiva Pro
                </button>
              </article>
            </div>
          </section>

          <section className="why-section" aria-labelledby="why-title">
            <div className="section-heading">
              <div>
                <span className="section-kicker">PERCHÉ KRELUNA STORE</span>
                <h2 id="why-title">Semplice dall’inizio alla crescita</h2>
              </div>
            </div>
            <div className="why-grid">
              {[
                { icon: ShieldCheck, title: "Sicuro", text: "Ogni app è verificata prima della pubblicazione." },
                { icon: CreditCard, title: "Trasparente", text: "Prezzi chiari, rinnovi sotto controllo." },
                { icon: Gift, title: "Prova gratuita", text: "Testa gli strumenti prima di scegliere." },
                { icon: RefreshCcw, title: "Flessibile", text: "Nessun vincolo, cambia quando vuoi." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title}>
                    <span><Icon size={22} /></span>
                    <div><h3>{item.title}</h3><p>{item.text}</p></div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="journey" aria-label="Come funziona Kreluna Store">
            {[
              { icon: Search, label: "Scopri", text: "Trova l’app giusta" },
              { icon: Zap, label: "Attiva", text: "In pochi clic" },
              { icon: PackageCheck, label: "Usa", text: "Tutto insieme" },
              { icon: Rocket, label: "Cresci", text: "Fai evolvere il business" },
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div className="journey-step" key={step.label}>
                  <span className="journey-icon"><Icon size={20} /></span>
                  <div><strong>{step.label}</strong><small>{step.text}</small></div>
                  {index < 3 && <ChevronRight className="journey-arrow" size={18} />}
                </div>
              );
            })}
          </section>

          <footer className="footer">
            <Brand />
            <p>Il marketplace dei software che fanno avanzare il tuo business.</p>
            <div className="footer-links">
              <a href="#categorie">Categorie</a>
              <a href="#prodotti">App</a>
              <a href="#kreluna-plus">Kreluna+</a>
              <a href="#contenuto">Assistenza</a>
              <a href="#contenuto">Privacy</a>
            </div>
            <small>© 2026 Kreluna. Tutti i diritti riservati.</small>
          </footer>
        </main>
      </div>

      <nav className="mobile-bottom-nav" aria-label="Navigazione mobile">
        <button type="button" className={activeNav === "home" ? "active" : ""} onClick={() => handleNav("home")}><Home size={19} /><span>Home</span></button>
        <button type="button" className={activeNav === "categorie" ? "active" : ""} onClick={() => handleNav("categorie")}><Grid2X2 size={19} /><span>Categorie</span></button>
        <button type="button" onClick={() => setCartOpen(true)}><ShoppingCart size={19} /><span>Carrello</span>{cart.length > 0 && <small>{cart.length}</small>}</button>
        <button type="button" className={activeNav === "preferiti" ? "active" : ""} onClick={() => handleNav("preferiti")}><Heart size={19} /><span>Preferiti</span></button>
      </nav>

      {cartOpen && (
        <div
          className="drawer-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setCartOpen(false);
          }}
        >
          <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
            <div className="drawer-header">
              <div><span>IL TUO CARRELLO</span><h2 id="cart-title">Pronto da attivare</h2></div>
              <button type="button" onClick={() => setCartOpen(false)} aria-label="Chiudi carrello"><X size={20} /></button>
            </div>
            <div className="drawer-content">
              {cartProducts.length ? cartProducts.map((product) => {
                const Icon = product.icon;
                return (
                  <article className="cart-item" key={product.id}>
                    <span className={`mini-product-icon tone-${product.iconTone}`}><Icon size={19} /></span>
                    <div><strong>{product.name}</strong><small>{product.trial}</small></div>
                    <p>{product.price.toFixed(2).replace(".", ",")} €<small>{product.oneTime ? " una tantum" : "/mese"}</small></p>
                    <button type="button" onClick={() => setCart((current) => current.filter((id) => id !== product.id))} aria-label={`Rimuovi ${product.name}`}><Trash2 size={16} /></button>
                  </article>
                );
              }) : (
                <div className="cart-empty">
                  <span><ShoppingCart size={28} /></span>
                  <h3>Il carrello è vuoto</h3>
                  <p>Esplora le app e aggiungi quelle più utili al tuo business.</p>
                  <button type="button" className="button button--primary" onClick={() => { setCartOpen(false); scrollTo("prodotti"); }}>Scopri le app</button>
                </div>
              )}
            </div>
            {cartProducts.length > 0 && (
              <div className="drawer-footer">
                <div><span>Totale del carrello</span><strong>{cartTotal.toFixed(2).replace(".", ",")} €</strong></div>
                <p><ShieldCheck size={14} /> Prezzi e condizioni sono mostrati prima del pagamento.</p>
                <button type="button" onClick={() => announce("Il checkout sarà collegato nel prossimo passaggio") }>
                  Procedi all’attivazione <ArrowRight size={17} />
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {selectedProduct && (
        <div
          className="modal-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedProduct(null);
          }}
        >
          <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="modal-product-title">
            <button className="modal-close" type="button" onClick={() => setSelectedProduct(null)} aria-label="Chiudi dettagli"><X size={20} /></button>
            <div className="modal-product-heading">
              {(() => { const Icon = selectedProduct.icon; return <span className={`product-icon tone-${selectedProduct.iconTone}`}><Icon size={30} /></span>; })()}
              <div>
                <span>{selectedProduct.category}</span>
                <h2 id="modal-product-title">{selectedProduct.name}</h2>
                <p>{selectedProduct.rating ? <><Star size={14} fill="currentColor" /> {selectedProduct.rating} · {selectedProduct.reviews} recensioni</> : <><Sparkles size={14} /> Novità Kreluna</>}</p>
              </div>
            </div>
            <p className="modal-description">{selectedProduct.description}</p>
            <div className="modal-feature-list">
              <span><CircleCheck size={17} /> Configurazione guidata inclusa</span>
              <span><CircleCheck size={17} /> Aggiornamenti automatici</span>
              <span><CircleCheck size={17} /> Assistenza Kreluna verificata</span>
            </div>
            <div className="modal-price-row">
              <div><small>{selectedProduct.oneTime ? "Prezzo completo" : "A partire da"}</small><strong>{selectedProduct.price.toFixed(2).replace(".", ",")} € <span>{selectedProduct.oneTime ? "una tantum" : "/mese"}</span></strong></div>
              <span className="modal-trial"><Gift size={16} /> {selectedProduct.trial}</span>
            </div>
            <div className="modal-actions">
              <button type="button" className="button button--secondary" onClick={() => toggleFavorite(selectedProduct)}>
                <Heart size={17} fill={favorites.has(selectedProduct.id) ? "currentColor" : "none"} />
                {favorites.has(selectedProduct.id) ? "Nei preferiti" : "Salva"}
              </button>
              <button type="button" className="button button--primary" onClick={() => {
                if (selectedProduct.detailUrl) {
                  window.location.href = selectedProduct.detailUrl;
                  return;
                }
                addToCart(selectedProduct);
                setSelectedProduct(null);
                setCartOpen(true);
              }}>
                {selectedProduct.detailUrl ? "Scopri Risonix" : "Prova gratis"} <ArrowRight size={17} />
              </button>
            </div>
          </section>
        </div>
      )}

      <div className={`toast ${toast ? "toast--visible" : ""}`} role="status" aria-live="polite">
        <CircleCheck size={18} /> {toast}
      </div>
    </div>
  );
}

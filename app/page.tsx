"use client";

import {
  ArrowRight,
  BarChart3,
  Bell,
  Boxes,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Clock3,
  CreditCard,
  FileText,
  Gift,
  Grid2X2,
  Heart,
  Home,
  LifeBuoy,
  Megaphone,
  Menu,
  PackageCheck,
  ReceiptText,
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
  WandSparkles,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";

type Product = {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  description: string;
  price: number;
  rating: string;
  reviews: number;
  badge: string;
  badgeTone: "blue" | "orange" | "purple" | "green";
  trial: string;
  icon: LucideIcon;
  iconTone: string;
  popular?: boolean;
  isNew?: boolean;
};

const categories = [
  {
    id: "ecommerce",
    label: "Vendite & e-commerce",
    shortLabel: "Vendite",
    icon: ShoppingBag,
    tone: "mint",
    count: 48,
  },
  {
    id: "business",
    label: "Gestione aziendale",
    shortLabel: "Aziendale",
    icon: BarChart3,
    tone: "violet",
    count: 61,
  },
  {
    id: "accounting",
    label: "Contabilità & fatture",
    shortLabel: "Contabilità",
    icon: ReceiptText,
    tone: "sky",
    count: 35,
  },
  {
    id: "marketing",
    label: "Marketing & social",
    shortLabel: "Marketing",
    icon: Megaphone,
    tone: "orange",
    count: 54,
  },
  {
    id: "logistics",
    label: "Magazzino & logistica",
    shortLabel: "Logistica",
    icon: Boxes,
    tone: "amber",
    count: 29,
  },
  {
    id: "people",
    label: "Risorse umane",
    shortLabel: "Risorse umane",
    icon: UsersRound,
    tone: "teal",
    count: 27,
  },
];

const products: Product[] = [
  {
    id: "invoice-flow",
    name: "InvoiceFlow",
    category: "Contabilità & fatture",
    categoryId: "accounting",
    description: "Fatturazione semplice, automatica e sempre sotto controllo.",
    price: 9.9,
    rating: "4,9",
    reviews: 184,
    badge: "Più scelto",
    badgeTone: "blue",
    trial: "14 giorni gratis",
    icon: FileText,
    iconTone: "sky",
    popular: true,
  },
  {
    id: "shop-pro",
    name: "ShopPro",
    category: "Vendite & e-commerce",
    categoryId: "ecommerce",
    description: "Il tuo negozio online completo, pronto per vendere ovunque.",
    price: 14.9,
    rating: "4,8",
    reviews: 219,
    badge: "Prova gratuita",
    badgeTone: "orange",
    trial: "7 giorni gratis",
    icon: ShoppingCart,
    iconTone: "orange",
    popular: true,
  },
  {
    id: "crm-plus",
    name: "CRM Plus",
    category: "Gestione aziendale",
    categoryId: "business",
    description: "Clienti, vendite e opportunità riuniti in un solo spazio.",
    price: 19.9,
    rating: "4,9",
    reviews: 142,
    badge: "Consigliato",
    badgeTone: "purple",
    trial: "14 giorni gratis",
    icon: UsersRound,
    iconTone: "violet",
    popular: true,
  },
  {
    id: "social-pilot",
    name: "SocialPilot AI",
    category: "Marketing & social",
    categoryId: "marketing",
    description: "Crea, pianifica e migliora i contenuti con l’intelligenza artificiale.",
    price: 12.9,
    rating: "4,7",
    reviews: 96,
    badge: "Novità",
    badgeTone: "green",
    trial: "7 giorni gratis",
    icon: WandSparkles,
    iconTone: "magenta",
    isNew: true,
  },
  {
    id: "stock-pilot",
    name: "StockPilot",
    category: "Magazzino & logistica",
    categoryId: "logistics",
    description: "Scorte, ordini e spedizioni aggiornati in tempo reale.",
    price: 16.9,
    rating: "4,8",
    reviews: 117,
    badge: "-20%",
    badgeTone: "orange",
    trial: "14 giorni gratis",
    icon: Boxes,
    iconTone: "amber",
    popular: true,
  },
  {
    id: "team-desk",
    name: "TeamDesk HR",
    category: "Risorse umane",
    categoryId: "people",
    description: "Presenze, ferie e documenti del team senza complicazioni.",
    price: 11.9,
    rating: "4,7",
    reviews: 88,
    badge: "Facile da usare",
    badgeTone: "green",
    trial: "7 giorni gratis",
    icon: UsersRound,
    iconTone: "teal",
    isNew: true,
  },
  {
    id: "booking-flow",
    name: "BookingFlow",
    category: "Vendite & e-commerce",
    categoryId: "ecommerce",
    description: "Appuntamenti e prenotazioni online, attivi in pochi minuti.",
    price: 8.9,
    rating: "4,8",
    reviews: 73,
    badge: "Ideale per PMI",
    badgeTone: "blue",
    trial: "14 giorni gratis",
    icon: CircleCheck,
    iconTone: "mint",
    isNew: true,
  },
  {
    id: "kreluna-ai",
    name: "Kreluna AI Assistant",
    category: "Gestione aziendale",
    categoryId: "business",
    description: "Automatizza le attività ripetitive e ritrova tempo per il tuo business.",
    price: 9.9,
    rating: "4,9",
    reviews: 156,
    badge: "AI",
    badgeTone: "purple",
    trial: "7 giorni gratis",
    icon: Sparkles,
    iconTone: "gradient",
    popular: true,
    isNew: true,
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
  { id: "trial", label: "Prova gratuita" },
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
  const toastTimer = useRef<number | null>(null);

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
        (activeFilter === "new" && product.isNew) ||
        (activeFilter === "trial" && Boolean(product.trial));
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
                Oltre 300 app e strumenti selezionati per far crescere la tua attività,
                tutti in un unico posto.
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
              <div className="product-grid">
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
                      <div className="rating-row">
                        <span className="stars" aria-label={`Valutazione ${product.rating} su 5`}>
                          <Star size={14} fill="currentColor" /> {product.rating}
                        </span>
                        <span>{product.reviews} recensioni</span>
                      </div>
                      <div className="trial-row"><CircleCheck size={14} /> {product.trial}</div>
                      <div className="product-footer">
                        <div className="price">
                          <strong>{product.price.toFixed(2).replace(".", ",")} €</strong>
                          <small>/mese</small>
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
                    <p>{product.price.toFixed(2).replace(".", ",")} €<small>/mese</small></p>
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
                <div><span>Totale mensile</span><strong>{cartTotal.toFixed(2).replace(".", ",")} €</strong></div>
                <p><ShieldCheck size={14} /> Nessun addebito durante la prova gratuita.</p>
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
                <p><Star size={14} fill="currentColor" /> {selectedProduct.rating} · {selectedProduct.reviews} recensioni</p>
              </div>
            </div>
            <p className="modal-description">{selectedProduct.description}</p>
            <div className="modal-feature-list">
              <span><CircleCheck size={17} /> Configurazione guidata inclusa</span>
              <span><CircleCheck size={17} /> Aggiornamenti automatici</span>
              <span><CircleCheck size={17} /> Assistenza Kreluna verificata</span>
            </div>
            <div className="modal-price-row">
              <div><small>A partire da</small><strong>{selectedProduct.price.toFixed(2).replace(".", ",")} € <span>/mese</span></strong></div>
              <span className="modal-trial"><Gift size={16} /> {selectedProduct.trial}</span>
            </div>
            <div className="modal-actions">
              <button type="button" className="button button--secondary" onClick={() => toggleFavorite(selectedProduct)}>
                <Heart size={17} fill={favorites.has(selectedProduct.id) ? "currentColor" : "none"} />
                {favorites.has(selectedProduct.id) ? "Nei preferiti" : "Salva"}
              </button>
              <button type="button" className="button button--primary" onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); setCartOpen(true); }}>
                Prova gratis <ArrowRight size={17} />
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

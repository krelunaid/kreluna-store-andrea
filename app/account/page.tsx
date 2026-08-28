import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LogOut,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import {
  chatGPTSignOutPath,
  requireChatGPTUser,
} from "../chatgpt-auth";
import styles from "./account.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Account Kreluna | Kreluna Store",
  description: "Gestisci il tuo account, i prodotti e i servizi Kreluna.",
  robots: { index: false, follow: false },
};

const RISONIX_ACCOUNT_URL = "https://www.kreluna.it/risonix/account";

export default async function AccountPage() {
  const user = await requireChatGPTUser("/account");
  const initials = user.displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "K";

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Torna a Kreluna Store">
          <span className={styles.brandMark}>K</span>
          <span>
            <strong>Kreluna</strong>
            <small>STORE</small>
          </span>
        </Link>
        <Link className={styles.backLink} href="/">
          <ArrowLeft size={17} /> Torna allo Store
        </Link>
      </header>

      <section className={styles.shell} aria-labelledby="account-title">
        <div className={styles.intro}>
          <span className={styles.eyebrow}>AREA PERSONALE</span>
          <h1 id="account-title">Il tuo account Kreluna.</h1>
          <p>Un solo accesso per prodotti, licenze e servizi del Kreluna Store.</p>
        </div>

        <article className={styles.profileCard}>
          <div className={styles.avatar} aria-hidden="true">{initials}</div>
          <div className={styles.profileCopy}>
            <span className={styles.activeBadge}><CheckCircle2 size={14} /> Accesso attivo</span>
            <h2>{user.displayName}</h2>
            <p>{user.email}</p>
          </div>
          <a className={styles.signOut} href={chatGPTSignOutPath("/")}>
            <LogOut size={16} /> Esci
          </a>
        </article>

        <div className={styles.grid}>
          <article className={styles.serviceCard}>
            <div className={`${styles.serviceIcon} ${styles.serviceIconBlue}`}>
              <PackageCheck size={23} />
            </div>
            <div className={styles.serviceCopy}>
              <span>PRODOTTI E LICENZE</span>
              <h2>Risonix</h2>
              <p>Controlla ordini, licenza attiva e download per Windows e macOS.</p>
            </div>
            <a className={styles.primaryAction} href={RISONIX_ACCOUNT_URL}>
              Gestisci Risonix <ArrowRight size={17} />
            </a>
          </article>

          <article className={styles.serviceCard}>
            <div className={`${styles.serviceIcon} ${styles.serviceIconViolet}`}>
              <Sparkles size={23} />
            </div>
            <div className={styles.serviceCopy}>
              <span>SERVIZIO IN PREPARAZIONE</span>
              <h2>Kreluna IA</h2>
              <p>Quando sarà disponibile, abbonamento e utilizzo nelle app saranno gestiti qui.</p>
            </div>
            <span className={styles.comingSoon}>Prossimamente</span>
          </article>
        </div>

        <aside className={styles.securityNote}>
          <ShieldCheck size={21} />
          <div>
            <strong>Account personale protetto</strong>
            <p>Il login identifica il tuo account Kreluna. Le aree dei singoli prodotti rimangono collegate e protette.</p>
          </div>
        </aside>

        <Link className={styles.mobileBack} href="/">
          <UserRound size={17} /> Continua nello Store
        </Link>
      </section>
    </main>
  );
}

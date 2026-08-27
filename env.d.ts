declare module "cloudflare:workers" {
  interface Env {
    DB: D1Database;
    FILES: R2Bucket;
    STRIPE_SECRET_KEY?: string;
    RISONIX_LICENSE_PEPPER?: string;
    RISONIX_SIGNING_PKCS8_B64?: string;
    RISONIX_SIGNING_PUBLIC_KEY_B64?: string;
    LICENSE_ENCRYPTION_KEY_B64?: string;
    INSTALLER_UPLOAD_TOKEN?: string;
  }
}

export {};

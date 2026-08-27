export const installerCatalog = {
  macos: {
    key: "risonix/1.0.0/Risonix-1.0.0-macOS-arm64.dmg",
    filename: "Risonix-1.0.0-macOS-arm64.dmg",
    contentType: "application/x-apple-diskimage",
    label: "macOS Apple Silicon",
    sha256: "a3aed10eb7dfd42c0b54da80423fa592593bd79a9f2e08b6ceda19b8682b257d",
    signed: true,
  },
  windows: {
    key: "risonix/1.0.0/Risonix-1.0.0-Windows-x64.msi",
    filename: "Risonix-1.0.0-Windows-x64.msi",
    contentType: "application/x-msi",
    label: "Windows 10/11 64 bit",
    sha256: "77e2f6eb29fe917b057318b10956230d0329a8a7f813e354fcf6571d805460fd",
    signed: false,
  },
} as const;

export type InstallerPlatform = keyof typeof installerCatalog;

export function isInstallerPlatform(value: string | null): value is InstallerPlatform {
  return value === "macos" || value === "windows";
}

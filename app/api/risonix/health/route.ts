import { licenseHealth } from "../../../lib/server/risonix-license";

export const dynamic = "force-dynamic";
export async function GET() {
  return licenseHealth();
}

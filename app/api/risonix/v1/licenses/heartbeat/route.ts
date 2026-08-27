import { heartbeatLicense } from "../../../../../lib/server/risonix-license";

export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  return heartbeatLicense(request);
}

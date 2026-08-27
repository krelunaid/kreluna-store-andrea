import { chatGPTSignInPath, getChatGPTUser } from "../../chatgpt-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) {
    return Response.json({
      authenticated: false,
      signInUrl: chatGPTSignInPath("/?account=1"),
    });
  }
  return Response.json({
    authenticated: true,
    user: {
      displayName: user.displayName,
      email: user.email,
      initials: user.displayName
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("") || "KR",
    },
    signOutUrl: "/signout-with-chatgpt?return_to=%2F",
  });
}

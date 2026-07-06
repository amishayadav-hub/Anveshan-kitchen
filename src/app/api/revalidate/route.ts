import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { bustCache } from "@/lib/community-store";

export const runtime = "nodejs";

// On-demand revalidation webhook. The admin dashboard calls this after writing
// to Firestore so content edits go live immediately instead of waiting for the
// hourly ISR window. Protected by a shared secret (REVALIDATE_SECRET).
//
// Body: { secret: string, paths: string[] }
// e.g. { secret, paths: ["/recipes", "/recipes/besan-ladoo"] }
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Revalidation not configured" }, { status: 503 });
  }

  const body = await req.json().catch(() => ({}));
  if (body.secret !== secret) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const paths: string[] = Array.isArray(body.paths)
    ? body.paths.filter((p: unknown): p is string => typeof p === "string" && p.startsWith("/"))
    : [];

  for (const path of paths) {
    // Literal paths (e.g. /recipes/besan-ladoo) need no type argument.
    revalidatePath(path);
  }

  // Also clear the community feed's in-memory cache so Real Peeps edits made in
  // the admin dashboard show up immediately instead of after the 30s TTL.
  bustCache();

  return NextResponse.json({ revalidated: paths });
}

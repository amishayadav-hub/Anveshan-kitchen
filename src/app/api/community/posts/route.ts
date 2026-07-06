import { NextRequest, NextResponse } from "next/server";
import { getPage } from "@/lib/community-store";

export const runtime = "nodejs";

// GET /api/community/posts?cursor=0&limit=17 — paginated community posts.
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const cursor = Math.max(0, parseInt(sp.get("cursor") ?? "0", 10) || 0);
  const limit = Math.min(30, Math.max(1, parseInt(sp.get("limit") ?? "17", 10) || 17));
  const { posts, nextCursor } = await getPage(cursor, limit);
  return NextResponse.json({ posts, nextCursor, hasMore: true });
}

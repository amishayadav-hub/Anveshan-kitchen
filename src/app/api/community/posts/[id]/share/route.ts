import { NextRequest, NextResponse } from "next/server";
import { sharePost, findPost } from "@/lib/community-store";

export const runtime = "nodejs";

// POST /api/community/posts/:id/share — records a share, returns a shareable URL.
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await findPost(id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const shares = await sharePost(id);
  const url = new URL(`/recipes/real-peeps?post=${id}`, req.nextUrl.origin).toString();
  return NextResponse.json({ ok: true, id, shares, url, title: post.title });
}

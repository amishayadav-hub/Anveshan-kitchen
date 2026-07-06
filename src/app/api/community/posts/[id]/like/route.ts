import { NextRequest, NextResponse } from "next/server";
import { likePost } from "@/lib/community-store";

export const runtime = "nodejs";

// POST /api/community/posts/:id/like  body: { liked?: boolean }
// liked defaults to true (like); pass { liked: false } to unlike.
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as { liked?: boolean };
  const liked = body.liked !== false;
  const likes = await likePost(id, liked);
  return NextResponse.json({ ok: true, id, liked, likes });
}

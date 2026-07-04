import { NextRequest, NextResponse } from "next/server";
import { findPost } from "@/lib/community-store";

export const runtime = "nodejs";

// GET /api/community/posts/:id — a single post.
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = findPost(id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ post: { ...post, id } });
}

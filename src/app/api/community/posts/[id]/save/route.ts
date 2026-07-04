import { NextRequest, NextResponse } from "next/server";
import { savePost } from "@/lib/community-store";

export const runtime = "nodejs";

// POST /api/community/posts/:id/save  body: { saved?: boolean }
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as { saved?: boolean };
  const saved = body.saved !== false;
  const saves = savePost(id, saved);
  return NextResponse.json({ ok: true, id, saved, saves });
}

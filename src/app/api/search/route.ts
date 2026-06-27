import { NextResponse } from "next/server";
import { searchRecipes } from "@/lib/semantic-search";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { query, topK = 3 } = await request.json().catch(() => ({ query: "" }));
  if (!query || typeof query !== "string") {
    return NextResponse.json({ error: "Provide a 'query' string." }, { status: 400 });
  }

  try {
    const results = await searchRecipes(query, topK);
    return NextResponse.json({ query, results });
  } catch (e) {
    const msg = (e as Error).message;
    if (msg === "INDEX_NOT_BUILT") {
      return NextResponse.json(
        { error: "Embeddings index not built. Run: node scripts/build-embeddings.mjs" },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: "Search failed (embedding model).", detail: msg },
      { status: 500 }
    );
  }
}

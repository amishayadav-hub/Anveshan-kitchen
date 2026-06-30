"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/ui/SearchBar";

interface Result {
  name: string;
  description?: string;
  ingredients: string[];
  steps?: string[];
  location: string;
  score: number;
}

export default function SmartSearch({ initialQuery = "" }: { initialQuery?: string }) {
  const [results, setResults] = useState<Result[]>([]);
  // Seed "loading" up front when we arrive with a query, so the mount effect
  // doesn't need a synchronous setState to show the spinner.
  const [state, setState] = useState<"idle" | "loading" | "error">(
    initialQuery.trim() ? "loading" : "idle"
  );
  const [error, setError] = useState("");

  // Run the full search whenever we land here with a query (?q=…). The page
  // remounts this component per query (key={q}), so a fresh mount = a fresh run.
  // The fetch is inlined (rather than a shared helper) so all setState calls
  // happen inside this nested async callback, after an await — never
  // synchronously in the effect body.
  useEffect(() => {
    const query = initialQuery.trim();
    if (!query) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, topK: 8 }),
        });
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok) throw new Error(data.error || "Search failed");
        setResults(data.results);
        setState("idle");
      } catch (err) {
        if (cancelled) return;
        setError((err as Error).message);
        setState("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [initialQuery]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Smart Recipe Search</h1>
      <p className="text-gray-500 text-sm mb-6">
        Describe what you feel like — it understands context, not just keywords.
      </p>

      <SearchBar
        defaultValue={initialQuery}
        placeholder="Find your favorite items"
        action="/recipes/search"
      />

      {state === "loading" && (
        <p className="mt-4 text-sm text-gray-500">Searching…</p>
      )}

      {state === "error" && (
        <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </p>
      )}

      <div className="mt-8 space-y-4">
        {results.map((r, i) => (
          <div key={i} className="rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-bold text-gray-900">{r.name}</h2>
              <span className="text-xs font-semibold text-anv-green bg-anv-green/10 rounded-full px-2.5 py-1 shrink-0">
                {(r.score * 100).toFixed(0)}% match
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">📍 {r.location}</p>
            {r.description && (
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{r.description}</p>
            )}

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-4">
              Ingredients
            </p>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">{r.ingredients.join(", ")}</p>

            {r.steps && r.steps.length > 0 && (
              <>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-4">
                  Method
                </p>
                <ol className="mt-1 space-y-1.5">
                  {r.steps.map((s, si) => (
                    <li key={si} className="flex gap-2 text-sm text-gray-600 leading-relaxed">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-anv-cream text-anv-green text-xs font-bold flex items-center justify-center">
                        {si + 1}
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

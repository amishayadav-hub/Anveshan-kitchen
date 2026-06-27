"use client";

import { useState } from "react";

interface Result {
  name: string;
  description?: string;
  ingredients: string[];
  steps?: string[];
  location: string;
  score: number;
}

export default function SmartSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setState("loading");
    setError("");
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, topK: 3 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Search failed");
      setResults(data.results);
      setState("idle");
    } catch (err) {
      setError((err as Error).message);
      setState("error");
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Smart Recipe Search</h1>
      <p className="text-gray-500 text-sm mb-6">
        Describe what you feel like — it understands context, not just keywords.
      </p>

      <form onSubmit={run} className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. something warm and sweet for winter"
          className="flex-1 rounded-full border border-gray-300 px-5 py-3 text-sm focus:border-anv-green focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="rounded-full bg-anv-green text-white font-semibold px-6 py-3 text-sm hover:bg-anv-green-dark transition-colors disabled:opacity-60"
        >
          {state === "loading" ? "Searching…" : "Search"}
        </button>
      </form>

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

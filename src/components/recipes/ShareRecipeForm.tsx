"use client";

import { useState } from "react";
import Link from "next/link";
import { AnveshanProduct } from "@/types";
import { submitRecipe } from "@/lib/submissions";
import { track } from "@/lib/analytics";

interface Props {
  products: AnveshanProduct[];
}

const inputCls =
  "w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-anv-green transition-colors";

export default function ShareRecipeForm({ products }: Props) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [story, setStory] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  function toggleProduct(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !recipeName.trim() || selected.length === 0) {
      setError("Please add your name, a recipe name, and at least one Anveshan product.");
      return;
    }
    setError("");
    setState("loading");
    try {
      await submitRecipe({ name: name.trim(), city: city.trim(), recipeName: recipeName.trim(), products: selected, story: story.trim() });
      track("share_recipe_submit", { recipe: recipeName.trim(), products: selected.length });
      setState("done");
    } catch {
      setState("error");
      setError("Something went wrong submitting your recipe. Please try again.");
    }
  }

  if (state === "done") {
    return (
      <div className="max-w-lg mx-auto text-center py-16 px-4">
        <div className="w-16 h-16 rounded-full bg-anv-cream flex items-center justify-center mx-auto mb-5">
          <span className="text-anv-green text-3xl">✓</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Thank you, {name.split(" ")[0]}!</h2>
        <p className="mt-3 text-gray-500">
          Your recipe has been submitted. Our team reviews every entry — the best ones get featured right
          here on Anveshan Kitchen. 🌿
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/recipes"
            className="bg-anv-green text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-anv-green-dark transition-colors"
          >
            Browse Recipes
          </Link>
          <button
            onClick={() => {
              setName(""); setCity(""); setRecipeName(""); setSelected([]); setStory(""); setState("idle");
            }}
            className="px-6 py-2.5 rounded-full font-semibold text-sm border border-gray-200 text-gray-600 hover:border-anv-green hover:text-anv-green transition-colors"
          >
            Share Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Your Name *">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Priya Sharma"
            className={inputCls}
          />
        </Field>
        <Field label="City (optional)">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Jaipur"
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Recipe Name *">
        <input
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          placeholder="e.g. Grandma's Bilona Ghee Halwa"
          className={inputCls}
        />
      </Field>

      <Field label="Which Anveshan products did you use? *">
        <div className="flex flex-wrap gap-2 mt-1">
          {products.map((p) => {
            const active = selected.includes(p.id);
            return (
              <button
                type="button"
                key={p.id}
                onClick={() => toggleProduct(p.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  active
                    ? "bg-anv-green text-white border-anv-green"
                    : "bg-white text-gray-600 border-gray-200 hover:border-anv-green hover:text-anv-green"
                }`}
              >
                {active ? "✓ " : "+ "}
                {p.name}
              </button>
            );
          })}
        </div>
      </Field>

      <Field label="Tell us about your recipe (optional)">
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          rows={5}
          placeholder="How do you make it? What makes it special? Any tips with the Anveshan products..."
          className={`${inputCls} resize-none`}
        />
      </Field>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all ${
          state === "loading"
            ? "bg-gray-200 text-gray-400 cursor-wait"
            : "bg-anv-green text-white hover:bg-anv-green-dark"
        }`}
      >
        {state === "loading" ? "Submitting..." : "Share My Recipe 🌿"}
      </button>

      <p className="text-center text-xs text-gray-400">
        By submitting, you allow Anveshan to feature your recipe on the website.
      </p>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</span>
      {children}
    </label>
  );
}

"use client";

import { useState, KeyboardEvent } from "react";

interface Props {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

export default function IngredientTagInput({
  tags,
  onChange,
  placeholder = "Type an ingredient and press Enter...",
  maxTags = 15,
}: Props) {
  const [input, setInput] = useState("");

  function addTag(value: string) {
    const trimmed = value.trim().toLowerCase();
    if (!trimmed || tags.includes(trimmed) || tags.length >= maxTags) return;
    onChange([...tags, trimmed]);
    setInput("");
  }

  function removeTag(index: number) {
    onChange(tags.filter((_, i) => i !== index));
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    }
    if (e.key === "Backspace" && !input && tags.length) {
      removeTag(tags.length - 1);
    }
  }

  return (
    <div className="w-full border border-gray-200 rounded-xl p-3 bg-white focus-within:border-anv-green focus-within:ring-2 focus-within:ring-anv-green/15 transition-all min-h-[56px] flex flex-wrap gap-2 items-center cursor-text"
      onClick={() => document.getElementById("ingredient-input")?.focus()}
    >
      {tags.map((tag, i) => (
        <span
          key={i}
          className="flex items-center gap-1.5 bg-anv-green/8 border border-anv-green/20 text-anv-green text-sm px-3 py-1 rounded-full"
        >
          {tag}
          <button
            type="button"
            aria-label={`Remove ${tag}`}
            onClick={(e) => { e.stopPropagation(); removeTag(i); }}
            className="text-anv-green/50 hover:text-anv-green font-bold leading-none px-0.5"
          >
            ×
          </button>
        </span>
      ))}

      {tags.length < maxTags && (
        <input
          id="ingredient-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(input)}
          placeholder={tags.length === 0 ? placeholder : "Add more..."}
          className="flex-1 min-w-[160px] outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent"
        />
      )}

      {tags.length >= maxTags && (
        <span className="text-xs text-gray-400 ml-1">Max {maxTags} ingredients</span>
      )}
    </div>
  );
}

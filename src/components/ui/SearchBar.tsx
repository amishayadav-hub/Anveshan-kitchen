"use client";

import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

// A single predictive-search result. Mirrors the /api/search payload but only
// the fields the dropdown needs are required, so the bar can be reused against
// any endpoint that returns at least a `name`.
export interface SearchResult {
  name: string;
  description?: string;
  location?: string;
  score?: number;
}

interface SearchBarProps {
  /** Placeholder copy. */
  placeholder?: string;
  /** Results page to navigate to on submit/select (query appended as ?<paramName>=). */
  action?: string;
  /** Endpoint for live predictive results. Receives POST { query, topK }. */
  apiEndpoint?: string;
  /** Query-string key (also the input's `name`). */
  paramName?: string;
  /** How many predictive results to request. */
  topK?: number;
  /** Debounce window for live search, in ms. */
  debounceMs?: number;
  /** Seed value (e.g. from the URL on a results page). */
  defaultValue?: string;
  autoFocus?: boolean;
  className?: string;
  /** Override the default "navigate to results page" submit behaviour. */
  onSubmitQuery?: (query: string) => void;
  /** Override the default "navigate to results page" result-click behaviour. */
  onSelectResult?: (result: SearchResult) => void;
}

type Status = "idle" | "loading" | "empty" | "error";

const ICON_COLOR = "rgba(36,36,36,0.75)";

export default function SearchBar({
  placeholder = "Find your favorite items",
  action = "/recipes/search",
  apiEndpoint = "/api/search",
  paramName = "q",
  topK = 6,
  debounceMs = 250,
  defaultValue = "",
  autoFocus = false,
  className = "",
  onSubmitQuery,
  onSelectResult,
}: SearchBarProps) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  // When the bar is seeded (e.g. ?q= on a results page), skip the predictive
  // search for that initial value — only react to what the user actually types.
  const skipSeededSearchRef = useRef(defaultValue.trim().length > 0);

  const listboxId = useId();
  const optionId = (i: number) => `${listboxId}-opt-${i}`;

  // ---- Live (predictive) search -------------------------------------------
  useEffect(() => {
    if (skipSeededSearchRef.current) {
      skipSeededSearchRef.current = false;
      return;
    }
    const timer = setTimeout(async () => {
      const q = value.trim();
      abortRef.current?.abort();
      if (!q) {
        setResults([]);
        setStatus("idle");
        setActiveIndex(-1);
        return;
      }
      const ac = new AbortController();
      abortRef.current = ac;
      setStatus("loading");
      setOpen(true);
      try {
        const res = await fetch(apiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: q, topK }),
          signal: ac.signal,
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || "Search failed");
        const hits: SearchResult[] = Array.isArray(data.results) ? data.results : [];
        setResults(hits);
        setStatus(hits.length ? "idle" : "empty");
        setActiveIndex(-1);
      } catch (err) {
        if ((err as Error).name === "AbortError") return; // superseded by a newer keystroke
        setResults([]);
        setStatus("error");
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [value, apiEndpoint, paramName, topK, debounceMs]);

  // ---- Close on outside click ---------------------------------------------
  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  // ---- Keep the active option scrolled into view --------------------------
  useEffect(() => {
    if (open && activeIndex >= 0) {
      document.getElementById(optionId(activeIndex))?.scrollIntoView({ block: "nearest" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, open]);

  // ---- Actions -------------------------------------------------------------
  const goToResults = useCallback(
    (q: string) => {
      const trimmed = q.trim();
      if (!trimmed) return;
      router.push(`${action}?${paramName}=${encodeURIComponent(trimmed)}`);
    },
    [action, paramName, router]
  );

  function submit(q: string) {
    setOpen(false);
    setActiveIndex(-1);
    if (onSubmitQuery) onSubmitQuery(q.trim());
    else goToResults(q);
  }

  function select(result: SearchResult) {
    setValue(result.name);
    setOpen(false);
    setActiveIndex(-1);
    if (onSelectResult) onSelectResult(result);
    else goToResults(result.name);
  }

  function clear() {
    setValue("");
    setResults([]);
    setStatus("idle");
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    submit(value);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open && results.length) {
          setOpen(true);
          return;
        }
        setActiveIndex((i) => (results.length ? Math.min(i + 1, results.length - 1) : -1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, -1));
        break;
      case "Enter":
        if (open && activeIndex >= 0 && results[activeIndex]) {
          e.preventDefault(); // pick the highlighted option instead of submitting
          select(results[activeIndex]);
        }
        break;
      case "Escape":
        setOpen(false);
        setActiveIndex(-1);
        break;
    }
  }

  const showDropdown = open && value.trim().length > 0;

  return (
    <div
      ref={rootRef}
      className={`relative w-full ${className}`}
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <form
        role="search"
        onSubmit={onSubmit}
        className="flex w-full items-center h-[49px] rounded-[50px] border border-[#888888] bg-white"
      >
        <input
          ref={inputRef}
          name={paramName}
          type="text"
          value={value}
          autoFocus={autoFocus}
          autoComplete="off"
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => {
            if (value.trim() && results.length) setOpen(true);
          }}
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            showDropdown && activeIndex >= 0 ? optionId(activeIndex) : undefined
          }
          className="min-w-0 flex-1 h-[45px] border-0 bg-transparent text-black placeholder:text-[#888888] outline-none"
          style={{ padding: "15px", fontSize: "13.5px", fontFamily: "Arial, sans-serif" }}
        />

        {/* Clear: hidden until the user has typed something. */}
        {value.length > 0 && (
          <button
            type="button"
            aria-label="Clear search term"
            onClick={clear}
            className="flex h-11 w-9 shrink-0 items-center justify-center text-[#888888] hover:text-[rgba(36,36,36,0.75)] bg-transparent"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}

        <button
          type="submit"
          aria-label="Search"
          className="flex h-11 w-11 shrink-0 items-center justify-center bg-transparent"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={ICON_COLOR}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
      </form>

      {showDropdown && (
        <ul
          id={listboxId}
          role="listbox"
          aria-live="polite"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-80 overflow-auto rounded-2xl border border-gray-200 bg-white py-1 shadow-lg"
        >
          {status === "loading" && (
            <li role="presentation" className="px-4 py-3 text-sm text-gray-500">
              Searching…
            </li>
          )}

          {status === "error" && (
            <li role="presentation" className="px-4 py-3 text-sm text-red-600">
              Something went wrong. Try again.
            </li>
          )}

          {status === "empty" && (
            <li role="presentation" className="px-4 py-3 text-sm text-gray-500">
              No results
            </li>
          )}

          {status === "idle" &&
            results.map((r, i) => (
              <li
                key={`${r.name}-${i}`}
                id={optionId(i)}
                role="option"
                aria-selected={i === activeIndex}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseDown={(e) => {
                  e.preventDefault(); // keep focus on the input
                  select(r);
                }}
                className={`flex cursor-pointer flex-col gap-0.5 px-4 py-2.5 ${
                  i === activeIndex ? "bg-gray-100" : ""
                }`}
              >
                <span className="text-sm font-medium text-gray-900">{r.name}</span>
                {r.location && <span className="text-xs text-gray-500">{r.location}</span>}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

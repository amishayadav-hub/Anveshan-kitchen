"use client";

import { useState, type ReactNode } from "react";

interface Faq {
  question: string;
  answer: string;
}

interface Props {
  faqs: Faq[];
  // Optional answer renderer (e.g. to auto-link Anveshan product mentions).
  renderAnswer?: (answer: string) => ReactNode;
  defaultOpen?: number; // index open on first render (-1 = all closed, the default)
}

// Anveshan-PDP-style FAQ accordion: open item gets a dark-green header with a
// white "Q.", others collapse to a "+" toggle. Starts fully collapsed.
export default function FaqAccordion({ faqs, renderAnswer, defaultOpen = -1 }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="space-y-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50/60">
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className={`w-full flex items-center justify-between gap-4 text-left px-5 py-4 transition-colors ${
                isOpen ? "bg-anv-green text-white" : "text-gray-900 hover:bg-gray-100"
              }`}
            >
              <span className="font-semibold">
                <span className={isOpen ? "text-white" : "text-anv-green"}>Q.</span> {f.question}
              </span>
              <span className="shrink-0 text-xl leading-none">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <div className="px-5 py-4 text-gray-600 leading-relaxed text-sm">
                <span className="font-bold text-anv-green">A.</span>{" "}
                {renderAnswer ? renderAnswer(f.answer) : f.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

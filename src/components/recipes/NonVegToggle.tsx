"use client";

interface Props {
  on: boolean;
  onChange: (on: boolean) => void;
}

// Non-Veg mode switch (red), mirrors VegToggle. ON = show only non-veg recipes.
export default function NonVegToggle({ on, onChange }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label="Non-vegetarian only"
      onClick={() => onChange(!on)}
      className="inline-flex items-center gap-2 select-none"
      title="Show only non-vegetarian recipes"
    >
      <span className="text-xs font-semibold text-gray-700">Non-Veg</span>
      <span
        className={`relative w-9 h-5 rounded-full transition-colors ${
          on ? "bg-red-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform flex items-center justify-center ${
            on ? "translate-x-4" : "translate-x-0"
          }`}
        >
          {/* non-veg square mark */}
          <span
            className={`w-2.5 h-2.5 rounded-[3px] border flex items-center justify-center ${
              on ? "border-red-600" : "border-gray-400"
            }`}
          >
            <span className={`w-1 h-1 rounded-full ${on ? "bg-red-600" : "bg-gray-400"}`} />
          </span>
        </span>
      </span>
    </button>
  );
}

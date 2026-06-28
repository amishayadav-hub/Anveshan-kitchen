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
      onClick={() => onChange(!on)}
      className="inline-flex items-center gap-2.5 select-none"
      title="Show only non-vegetarian recipes"
    >
      <span className="text-sm font-semibold text-gray-700">Non-Veg</span>
      <span
        className={`relative w-11 h-6 rounded-full transition-colors ${
          on ? "bg-red-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform flex items-center justify-center ${
            on ? "translate-x-5" : "translate-x-0"
          }`}
        >
          {/* non-veg square mark */}
          <span
            className={`w-3 h-3 rounded-[3px] border flex items-center justify-center ${
              on ? "border-red-600" : "border-gray-400"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${on ? "bg-red-600" : "bg-gray-400"}`} />
          </span>
        </span>
      </span>
    </button>
  );
}

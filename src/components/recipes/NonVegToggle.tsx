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
      {/* Non-veg indicator mark (red square + triangle) — replaces the text label */}
      <span className="flex h-4 w-4 items-center justify-center rounded-[3px] border-[1.5px] border-red-600">
        <span className="h-0 w-0 border-l-[3px] border-r-[3px] border-b-[5px] border-l-transparent border-r-transparent border-b-red-600" />
      </span>
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

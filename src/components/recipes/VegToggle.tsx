"use client";

interface Props {
  on: boolean;
  onChange: (on: boolean) => void;
}

// Swiggy/Zomato-style Veg Mode switch. ON = show only vegetarian recipes.
export default function VegToggle({ on, onChange }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label="Vegetarian only"
      onClick={() => onChange(!on)}
      className="inline-flex items-center gap-2 select-none"
      title="Show only vegetarian recipes"
    >
      <span className="text-xs font-semibold text-gray-700">Veg</span>
      <span
        className={`relative w-9 h-5 rounded-full transition-colors ${
          on ? "bg-anv-green" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform flex items-center justify-center ${
            on ? "translate-x-4" : "translate-x-0"
          }`}
        >
          {/* veg square mark */}
          <span
            className={`w-2.5 h-2.5 rounded-[3px] border flex items-center justify-center ${
              on ? "border-anv-green" : "border-gray-400"
            }`}
          >
            <span className={`w-1 h-1 rounded-full ${on ? "bg-anv-green" : "bg-gray-400"}`} />
          </span>
        </span>
      </span>
    </button>
  );
}

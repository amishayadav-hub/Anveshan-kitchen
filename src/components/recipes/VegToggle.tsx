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
      className="inline-flex items-center gap-2.5 select-none"
      title="Show only vegetarian recipes"
    >
      <span className="text-sm font-semibold text-gray-700">Veg</span>
      <span
        className={`relative w-11 h-6 rounded-full transition-colors ${
          on ? "bg-anv-green" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform flex items-center justify-center ${
            on ? "translate-x-5" : "translate-x-0"
          }`}
        >
          {/* veg square mark */}
          <span
            className={`w-3 h-3 rounded-[3px] border flex items-center justify-center ${
              on ? "border-anv-green" : "border-gray-400"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${on ? "bg-anv-green" : "bg-gray-400"}`} />
          </span>
        </span>
      </span>
    </button>
  );
}

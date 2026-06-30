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
      {/* Switch: square veg-mark thumb (always green) on a pill track that turns
          green when active. */}
      <span
        className={`relative h-5 w-9 rounded-full transition-colors ${
          on ? "bg-green-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 flex h-4 w-4 items-center justify-center rounded-[5px] bg-white shadow transition-transform ${
            on ? "translate-x-4" : "translate-x-0"
          }`}
        >
          <span className="flex h-3 w-3 items-center justify-center rounded-[3px] border-[1.5px] border-green-600">
            <span className="h-1 w-1 rounded-full bg-green-600" />
          </span>
        </span>
      </span>
    </button>
  );
}

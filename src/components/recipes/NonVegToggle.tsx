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
      {/* Switch: square non-veg-mark thumb (always red) on a pill track that
          turns red when active. */}
      <span
        className={`relative h-5 w-9 rounded-full transition-colors ${
          on ? "bg-red-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 flex h-4 w-4 items-center justify-center rounded-[5px] bg-white shadow transition-transform ${
            on ? "translate-x-4" : "translate-x-0"
          }`}
        >
          <span className="flex h-3 w-3 items-center justify-center rounded-[3px] border-[1.5px] border-red-600">
            <span className="h-0 w-0 border-l-[2.5px] border-r-[2.5px] border-b-[4px] border-l-transparent border-r-transparent border-b-red-600" />
          </span>
        </span>
      </span>
    </button>
  );
}

"use client";

interface Props {
  on: boolean;
  onChange: (on: boolean) => void;
}

// Clean iOS-style switch: pill track (grey → red) with a circular white knob
// that has even margin + a soft shadow, and a small red triangle inside for the
// non-veg identity. Smooth 200ms slide.
export default function NonVegToggle({ on, onChange }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label="Show only non-vegetarian recipes"
      onClick={() => onChange(!on)}
      title="Show only non-vegetarian recipes"
      className="inline-flex items-center select-none rounded-full p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
    >
      <span
        className={`relative h-5 w-9 rounded-full transition-colors duration-200 ${
          on ? "bg-red-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-200 ${
            on ? "translate-x-4" : "translate-x-0"
          }`}
        >
          <span className="h-0 w-0 border-l-[3px] border-r-[3px] border-b-[5px] border-l-transparent border-r-transparent border-b-red-600" />
        </span>
      </span>
    </button>
  );
}

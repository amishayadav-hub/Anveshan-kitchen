// Small line icons (Lucide paths) used in place of emojis. Inherit color via
// currentColor; size with the `className` prop (defaults to w-4 h-4).

interface IconProps {
  className?: string;
}

function Base({ className = "w-4 h-4", children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </Base>
  );
}

export function UsersIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </Base>
  );
}

export function GaugeIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </Base>
  );
}

export function UtensilsIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M3 2v7c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </Base>
  );
}

export function ExternalLinkIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </Base>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </Base>
  );
}

export function FlameIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </Base>
  );
}

export function SparklesIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M9.94 14.06 8 20l-1.94-5.94L0 12l6.06-2.06L8 4l1.94 5.94L16 12z" />
      <path d="M18 4v4" />
      <path d="M21 6h-4" />
      <path d="M19 16v2" />
      <path d="M20 17h-2" />
    </Base>
  );
}

export function ArrowLeftIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </Base>
  );
}

export function ChefHatIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
      <path d="M6 17h12" />
    </Base>
  );
}

export function LeafIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </Base>
  );
}

export function WandIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="m3 21 9-9" />
      <path d="M15 4V2" />
      <path d="M15 10V8" />
      <path d="M12.5 5.5H10.5" />
      <path d="M19.5 5.5H17.5" />
      <path d="m18 9 1-1" />
      <path d="m13 4 1-1" />
    </Base>
  );
}

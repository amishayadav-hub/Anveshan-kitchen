import Link from "next/link";

// Slim top header with the Anveshan logo, shown across the recipe app.
export default function Header() {
  return (
    <header className="bg-white border-b border-anv-cream-dark sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center">
        <Link href="/recipes" aria-label="Anveshan Kitchen">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.shopify.com/s/files/1/0270/3346/9006/files/anveshan-logo-updates-register-mark.png?v=1728463199"
            alt="Anveshan"
            className="h-7 md:h-8 w-auto"
          />
        </Link>
      </div>
    </header>
  );
}
